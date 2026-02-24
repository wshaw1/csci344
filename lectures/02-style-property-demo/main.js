const changeElementStyle = (newColor, selector) => {
	document.querySelector('body').style.backgroundColor = newColor;

	let bodyEl = document.querySelector(selector);
	bodyEl.style.backgroundColor = newColor;
	
};
