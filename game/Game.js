import {GameSetup} from "./GameSetup.js";
import {GameTree} from "./GameTree.js";

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

		// todo: šeit jāuztaisa funkcionalitāte, lai bloķētu pogu, lai nav nemaz iespēja izvēlēties nederīgu gājienu
		if (!next) {
			console.log('Nederīgs gājiens!');
			return false;
		}

		this.current = next;
		this.history.unshift(`<div>Cilvēks dala ar ${move}</div><div>${this.current.computerScore}</div><div>${this.current.humanScore}</div><div>${this.current.number}</div>`);
		return true;
	}

	computerMove() {
		if (this.algorithm === 'minmax') {
			this.current = this.#getBestMove(this.current, this.algorithm);
			this.history.unshift(`<div>Dators dala ar ${this.current.move}</div><div>${this.current.computerScore}</div><div>${this.current.humanScore}</div><div>${this.current.number}</div>`);
		}

		if (this.algorithm === 'alfabeta') {
			this.current = this.#getBestMove(this.current, this.algorithm);
			this.history.unshift(`<div>Dators dala ar ${this.current.move}</div><div>${this.current.computerScore}</div><div>${this.current.humanScore}</div><div>${this.current.number}</div>`);
		}
	}

	#getBestMove(node, algorithm) {
		let bestScore = -Infinity;
		let bestChild = null;

		for (const child of node.children) {
			let score;
			if (algorithm === 'alfabeta') {
				score = this.#alphabeta(child, -Infinity, Infinity, false);
			} else {
				score = this.#minimax(child);
			}

			if (score > bestScore) {
				bestScore = score;
				bestChild = child;
			}

			if (algorithm === 'alfabeta') {
				bestScore = Math.max(bestScore, score);
			}
		}

		return bestChild;
	}

	#minimax(node) {
		if (node.children.length === 0) {
			return node.computerScore - node.humanScore;
		}

		if (node.turn === 'computer') {
			return Math.max(...node.children.map(c => this.#minimax(c)));
		} else {
			return Math.min(...node.children.map(c => this.#minimax(c)));
		}
	}

	#alphabeta(node, alpha, beta, isMaxing) {
		if (node.children.length === 0) {
			return node.computerScore - node.humanScore;
		}

		if (isMaxing) {
			let maxScore = -Infinity;
			for (const child of node.children) {
				const score = this.#alphabeta(child, alpha, beta, false);
				maxScore = Math.max(maxScore, score);
				alpha = Math.max(alpha, score);
				if (beta <= alpha) break;
			}
			return maxScore;
		} else {
			let minScore = Infinity;
			for (const child of node.children) {
				const score = this.#alphabeta(child, alpha, beta, true);
				minScore = Math.min(minScore, score);
				beta = Math.min(beta, score);
				if (beta <= alpha) break;
			}
			return minScore;
		}
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
		return this.current.isGameEnd();
	}
}