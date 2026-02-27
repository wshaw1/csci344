const items = ['item1', 'item2', 'item3', 'item4', 'item5'];
const itemList = document.querySelector('#itemList');

function displayItems() {
	itemList.innerHTML = '';
	for (i = 0; i < items.length; i++) {
		itemList.insertAdjacentHTML('beforeend', `<li>${items[i]}</li>`);
	}
}

displayItems();
