export function updateHistory(element, history) {
	if (history.length <= 0) return;

	element.innerHTML = '';

	history.map((item, index) => {
		element.innerHTML += `<div>${history.length - index}</div> ${item}`
	});
}