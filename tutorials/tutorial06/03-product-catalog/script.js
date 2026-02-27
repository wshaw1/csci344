const products = [
	{ name: "cheap thing", price: 1, description: "a good budget item", category: "low-end", inStock: true },
	{ name: "thing", price: 5, description: "a good item", category: "normal", inStock: false },
	{ name: "expensive thing", price: 10, description: "a good luxury item", category: "high-end", inStock: true }
];
const productGrid = document.querySelector('#productGrid');

function formatPrice(price) {
	return `$${Number(price).toFixed(2)}`
}

function createProductCard(product) {
	return `
		<div class="product-card">
			<h2>${product.name}</h2>
			<div class="price">${formatPrice(product.price)}</div>
			<p class="description">${product.description}</p>
			<span class="category">${product.category}</span>
			<span class="${product.inStock ? "stock-status in-stock" : "stock-status out-of-stock"}">${product.inStock ? "In Stock" : "Out of Stock"}</span>
		</div>
		`;
}

function renderProducts() {
	productGrid.innerHTML = '';
	let curr;
	for (i = 0; i < products.length; i++) {
		productGrid.insertAdjacentHTML('beforeend', createProductCard(products[i]));
	}
}

renderProducts();
function addItemToList(event) {
  // Prevent the default form submission behavior (which would reload the page)
  event.preventDefault();

	const newItemName = document.querySelector('#productName').value.trim();
	const newItemPrice = Number(document.querySelector('#productPrice').value.trim());
	const newItemDescription = document.querySelector('#productDescription').value.trim();
	const newItemCategory = document.querySelector('#productCategory').value;
	const newItemInStock = document.querySelector('#productInStock').checked;

	console.log(newItemPrice);

	const newProduct = { 
		name: newItemName, 
		price: newItemPrice, 
		description: newItemDescription, 
		category: newItemCategory, 
		inStock: newItemInStock
	};
	
	products.push(newProduct);
	renderProducts();
	productForm.reset();
  
}

productForm.addEventListener('submit', addItemToList);
