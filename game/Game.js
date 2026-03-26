import {GameSetup} from "./GameSetup.js";
import {GameTree} from "./GameTree.js";
import { maxTreeDepth } from "../config.js";

export class Game extends GameSetup {
	constructor() {
		super();
		this.tree = null;
		this.current = null;
		this.history = [];
	}

	startGame() {
		this.tree = new GameTree(this.startingNumber, this.startingPlayer);
		this.current = this.tree.root;

		// ja spēli sāk dators, tad tas uzreiz dara gājienu
		if (this.startingPlayer === 'computer') {
			this.computerMove();
		}
	}

	humanMove(move) {
		// Atrodi bērnu mezglu ar šo gājienu
		const m = move === 2 ? '/2' : '/3';
		const next = this.current.children.find(c => c.move === m);

		if (!next) {
			console.log('Nederīgs gājiens!');
			return false;
		}

		this.current = next;
		console.log("cilvēks izdarīja gājienu, pašreizējais stāvoklis:", this.current.number);
		this.history.unshift(`<div>Cilvēks dala ar ${move}</div><div>${this.current.computerScore}</div><div>${this.current.humanScore}</div><div>${this.current.number}</div>`);
		return true;
	}

	computerMove() {
		if (!this.current || this.current.children.length === 0){
			return;
		} // lai nesastrēgtu
		
		let bestScore = -Infinity;
		let bestMove = null;

		for (const child of this.current.children) {
			const score = this.algorithm === 'alfabeta'
				? this.#alphabeta(child, -Infinity, Infinity, maxTreeDepth, false)
				: this.#minimax(child, maxTreeDepth, false);

			if (score > bestScore) {
				bestScore = score;
				bestMove = child;
			}
		}
		console.log("Dators: labākais gājiens dotajā situācijā:", bestMove);

		this.current = bestMove;
		this.history.unshift(`<div>Dators dala ar ${this.current.move}</div><div>${this.current.computerScore}</div><div>${this.current.humanScore}</div><div>${this.current.number}</div>`);
	}
	#evaluateScore(node) {// heiristisko vērtējumu piešķiršana virsotnēm
		return node.computerScore - node.humanScore
	}

	#minimax(node, depth) { // pievienoju algoritmiem arī dziļumu
		if (depth === 0 ||node.children.length === 0) {
			return this.#evaluateScore(node);
		}

		if (node.turn === 'computer') {
			return Math.max(...node.children.map(c => this.#minimax(c, depth-1 )));
		} else {
			return Math.min(...node.children.map(c => this.#minimax(c, depth-1)));
		}
	}

	#alphabeta(node, alpha, beta, depth, isMaxing) {
		if (depth === 0 || node.children.length === 0) {
			return this.#evaluateScore(node);
		}

		if (isMaxing) {
			let maxScore = -Infinity;
			for (const child of node.children) {
				const score = this.#alphabeta(child, alpha, beta, depth-1,false);
				maxScore = Math.max(maxScore, score);
				alpha = Math.max(alpha, score);
				if (beta <= alpha) break;
			}
			return maxScore;
		} else {
			let minScore = Infinity;
			for (const child of node.children) {
				const score = this.#alphabeta(child, alpha, beta, depth-1, true);
				minScore = Math.min(minScore, score);
				beta = Math.min(beta, score);
				if (beta <= alpha) break;
			}
			return minScore;
		}
	}

	getBestPath(){ // uzvaru nesošo ceļu atrašana
		if (!this.current){
			return [];
		}
		let path = [];
		let backtrack = this.current;

		while (backtrack) {
			path.push(backtrack);
			backtrack = backtrack.parent;
		}
		path.reverse()
		return path
	}

	getWinner() {
		const { humanScore, computerScore } = this.current;
		if (computerScore > humanScore) {
			return 'Dators uzvar!';
		}
		if (humanScore > computerScore) {
			return 'Cilvēks uzvar!';
		}
		return 'Neizšķirts!';
	}

	isOver() {
		let used_path = this.getBestPath(); // nevaru UI, tāpēc vienīgais ceļš - izprintēt konsolē
		console.log(used_path);
		return this.current.isGameEnd();
	}
}