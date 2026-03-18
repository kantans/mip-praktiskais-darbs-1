import {Game} from "./game/Game.js";

const game = new Game();

// konteineri
const firstStepContainer = document.getElementById('firstStep');
const secondStepContainer = document.getElementById('secondStep');
const thirdStepContainer = document.getElementById('thirdStep');
const gameContainer = document.getElementById('gameContainer');


// 1. solis, izvēlēties kas sāk spēli
document.getElementById("chooseHuman").addEventListener("click", () => {
	game.setStartingPlayer("human");
	firstStepContainer.classList.add('hidden'); // aizver pirmo soli
	secondStepContainer.classList.remove('hidden'); // atver otro soli
	console.log('game started by human')
});

document.getElementById("chooseComputer").addEventListener("click", () => {
	game.setStartingPlayer("computer");
	firstStepContainer.classList.add('hidden'); // aizver pirmo soli
	secondStepContainer.classList.remove('hidden'); // atver otro soli
	console.log('game started by robot')
});



// 2. solis, izvēlēties datora spēles algoritmu
document.getElementById("chooseMinMax").addEventListener("click", () => {
	game.setAlgorithm("minmax");
	secondStepContainer.classList.add('hidden'); // aizver pirmo soli
	thirdStepContainer.classList.remove('hidden'); // atver trešo soli
	console.log('computer will use min-max algorithm')
});

document.getElementById("chooseAlfaBeta").addEventListener("click", () => {
	game.setAlgorithm("alfabeta");
	secondStepContainer.classList.add('hidden'); // aizver pirmo soli
	thirdStepContainer.classList.remove('hidden'); // atver trešo soli
	console.log('computer will use alfa-beta algorithm')
});



// 3. solis, izvēlēties spēles sākuma skaitli
const numbers = game.generateNumber();
const optionContainer = document.getElementById('options');

numbers.forEach((number) => {
	const button = document.createElement('button');
	button.textContent = number;
	button.classList.add('py-10', 'rounded-lg', 'bg-sky-500', 'hover:bg-sky-600', 'duration-200', 'cursor-pointer')

	button.addEventListener('click', () => {
		game.setStartingNumber(number);
		thirdStepContainer.classList.add('hidden'); // aizver trešo soli
		gameContainer.classList.remove('hidden'); // atver spēles konteineru
		console.log(`the starting number will be ${number}`);
	});

	optionContainer.append(button);
});




