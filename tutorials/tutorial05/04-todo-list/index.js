
function addTodo() {
	const list = document.querySelector('#todoList');
	const input = document.querySelector('#todoInput');
	const userText = input.value;
	const cleanText = userText.trim();
	list.insertAdjacentHTML('beforeend', `<li>${cleanText}</li>`);
	input.value = '';
}
