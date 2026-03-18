import {range} from "../config.js";

export class Game {
	constructor() {
		this.starter = '';
		this.startingPlayer = '';
		this.algorithm = '';
		this.startingNumber = '';
	}

	setStartingPlayer(player) {
		this.startingPlayer = player;
	}

	setAlgorithm(algorithm) {
		this.algorithm = algorithm;
	}

	setStartingNumber(number) {
		this.startingNumber = number;
	}

	generateNumber() {
		const [max, min] = range;
		const numbers = [];
	computerMove() {
		if(this.algorithm === 'minmax') {
			this.current = this.#getBestMove(this.current);
			this.history.unshift(`Dators dala ar ${this.current.move}. Rezultāts: Cilvēks: ${this.current.humanScore}, Dators: ${this.current.computerScore}. (skaitlis: ${this.current.number})`);
		}

		if(this.algorithm === 'alfabeta') {

		}
	}

		// šeit veicam ciklu, līdz tiek atrasti 5 randomizēti skaitļi kas dalās ar 2 un 3
		while(numbers.length < 5) {
			const generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min
	#getBestMove(node) {
		let bestScore = -Infinity;
		let bestChild = null;

			if((generatedNumber % 3 === 0) && (generatedNumber % 2 === 0)) {
				numbers.push(generatedNumber);
		for (const child of node.children) {
			const score = this.#minimax(child);
			if (score > bestScore) {
				bestScore = score;
				bestChild = child;
			}
		}

		return numbers;
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
	}
}