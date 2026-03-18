import {range} from "../config.js";

export class Game {
	constructor() {
		this.starter = '';
		this.algorithm = '';
		this.startingNumber = '';
	}

	selectStarter(option) {
		this.starter = option;
	}

	selectAlgorithm(option) {
		this.algorithm = option;
	}

	selectStartingNumber(number) {
		this.startingNumber = number;
	}

	generateNumber() {
		const [max, min] = range;
		const numbers = [];

		// šeit veicam ciklu, līdz tiek atrasti 5 randomizēti skaitļi kas dalās ar 2 un 3
		while(numbers.length < 5) {
			const generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min

			if((generatedNumber % 3 === 0) && (generatedNumber % 2 === 0)) {
				numbers.push(generatedNumber);
			}
		}

		return numbers;
	}
}