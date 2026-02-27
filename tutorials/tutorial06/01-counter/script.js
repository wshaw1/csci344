let count = 0;
const counterDisplay = document.querySelector('#counter');
const incrementButton = document.querySelector('#incrementBtn');
const decrementButton = document.querySelector('#decrementBtn');
const resetButton = document.querySelector('#resetBtn');

function increment() {
	count++;
	updateDisplay();
}

function decrement() {
	count--;
	updateDisplay();
}

function reset() {
	count = 0;
	updateDisplay();
}

function updateDisplay() {
	counterDisplay.textContent = count;
	if (count > 0) {
		counterDisplay.style.color = '#4CAF50';
	} else if (count < 0) {
		counterDisplay.style.color = '#f44336';
	} else {
		counterDisplay.style.color = '#666';
	}
}

updateDisplay();
