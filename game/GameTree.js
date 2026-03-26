import {GameNode} from "./GameNode.js";
import { maxTreeDepth } from "../config.js";

export class GameTree {
	constructor(startingNumber, startingPlayer) {
		this.maxDepth = maxTreeDepth; // pievienoju ģenerēšanas ierobežojumu
		this.root = this.#buildTree(startingNumber, 0, 0, startingPlayer, 0);
	}

	#buildTree(number, humanScore, computerScore, turn, depth) {
		const node = new GameNode(number, humanScore, computerScore, turn);

		if (number <= 10 || depth >= this.maxDepth) return node; // beigu nosacījums

		if (number % 2 === 0) {
			const nextTurn = turn === 'human' ? 'computer' : 'human';
			const h = turn === 'human' ? humanScore : humanScore + 2; // ja dala cilvēks, datoram +2
			const c = turn === 'computer' ? computerScore : computerScore + 2; // ja dala dators, cilvēkam +2

			const child = this.#buildTree(number / 2, h, c, nextTurn, depth+1);
			child.parent = node; // saglabāju priekšteci, lai varētu pēc spēles beigām atrast uzvaru nesošo ceļu
			child.move = '/2';
			node.children.push(child);
		}

		if (number % 3 === 0) {
			const nextTurn = turn === 'human' ? 'computer' : 'human';
			const h = turn === 'human' ? humanScore + 3 : humanScore; // ja dala cilvēks, cilvēkam + 3
			const c = turn === 'computer' ? computerScore + 3 : computerScore; // ja dala dators, datoram +3

			const child = this.#buildTree(number / 3, h, c, nextTurn, depth+1);
			child.parent = node;
			child.move = '/3';
			node.children.push(child);
		}

		return node;
	}
}