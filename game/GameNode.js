export class GameNode {
	constructor(number, humanScore, computerScore, turn, parent) { // parent, lai varētu rekonstuēt uzvaru nesošo ceļu
		this.number = number;
		this.humanScore = humanScore;
		this.computerScore = computerScore;
		this.turn = turn;
		this.move = null;
		this.children = [];
		this.parent = parent || null
	}

	isGameEnd() {
		return this.children.length <= 0 || this.number <= 10;
	}
}