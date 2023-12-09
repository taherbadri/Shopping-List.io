const form = document.querySelector(".submit-form");
const inputContainer = document.querySelector(".input-container");
const itemInput = document.getElementById("item-input");
const qtyInput = document.getElementById("qty-input");
const unitSelector = document.querySelector("#unit-selector");
const addItem = document.querySelector(".add-item");
const list = document.querySelector(".item-list");
const clearBtn = document.querySelector(".clear");
const filter = document.querySelector("#filter");
let editMode = false;

// get items from local
const getFromLocal = () => {
	let itemsFromStorage;

	if (localStorage.getItem("items") === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem("items"));
	}

	return itemsFromStorage;
};

// add items to local storage
const addItemsToStorage = (item) => {
	const itemFromStorage = getFromLocal();
	itemFromStorage.push(item);
	localStorage.setItem("items", JSON.stringify(itemFromStorage));
};

// Create delete icon
const createIcon = (classes) => {
	const icon = document.createElement("span");
	icon.className = classes;
	return icon;
};

// Create Delete button
const createDelete = (classes) => {
	const deleteBtn = document.createElement("button");
	deleteBtn.className = classes;
	deleteBtn.appendChild(createIcon("bi bi-x remove-item"));
	return deleteBtn;
};

const addToList = (itemNameQty) => {
	const li = document.createElement("li");
	li.className =
		"list-group-item d-flex justify-content-between rounded text-bg-light border m-2";
	li.appendChild(document.createTextNode(itemNameQty));
	li.appendChild(createDelete("btn btn-link text-danger p-0"));

	list.appendChild(li);
};

// Display Items from Local Storage
const displayItems = (e) => {
	const items = getFromLocal();
	items.forEach((currentItem) => {
		addToList(currentItem);
	});
	hide();
};

// reset the previous input tag and button styling
const reset = () => {
	inputContainer.innerHTML = `<label for="item-input" class="form-label w-50"> <input
	type="text" class="form-control" name="item"
	id="item-input" placeholder="Enter Item"></label>
<label for="qty-input" class="form-label w-50"> <input
	type="number" max="100" min="1"
	class="form-control"
	name="quantity" id="qty-input"
	placeholder="Enter Qty"></label>
<label for="unit-selector" class="form-label w-50">
<select
	class="form-control"
	name="unit" id="unit-selector"><option value="0"
		selected>Select unit</option>
	<option value="kg">kg</option>
	<option value="g">gm</option>
	<option value="l">lt</option>
	<option value="ml">ml</option>
	<option value="doz">doz</option>
	<option value="pkt">pkt</option>
	<option value="pcs">pcs</option>
</select>
</label>`;
	addItem.classList.replace("btn-success", "btn-dark");
	addItem.querySelector("span").classList.replace("bi-pen", "bi-plus");
	addItem.lastChild.textContent = " Add Item";
	editMode = false;
};

// check if the item already exists in the storage and list
const doesExist = (item) => {
	const itemFromStorage = getFromLocal();
	return itemFromStorage.includes(item);
};

const addItems = (e) => {
	e.preventDefault();
	let item =
		itemInput.value.slice(0, 1).toUpperCase() + itemInput.value.slice(1);
	let qty = qtyInput.value;
	let unit = unitSelector.value;
	// check for edit mode
	if (editMode) {
		const itemToEdit = list.querySelector(".shadow");
		removeFromLocal(itemToEdit.textContent);
		itemToEdit.classList.remove("shadow");
		itemToEdit.remove();
		const editInput = document.querySelector(".edit-item");
		console.log(editInput, editInput.value);
		addToList(`${editInput.value}`);
		addItemsToStorage(`${editInput.value}`);
		reset();
		return;
	} else {
		if (doesExist(`${item} ${qty} ${unit}`)) {
			alert("That item already Exists!");
			return;
		}
	}
	if (item === "") {
		alert("Please add an item");
		return;
	} else if (qty === "") {
		alert("Please add appropriate Quantity");
		return;
	} else if (unit === "0") {
		alert("Please specify unit of item");
		return;
	}
	console.log(unit);
	addToList(`${item} ${qty} ${unit}`);
	addItemsToStorage(`${item} ${qty} ${unit}`);
	item = "";
	qty = "";
	unit = "0";
	hide();
};

// remove from local storage
const removeFromLocal = (itemTextQty) => {
	let itemFromStorage = getFromLocal();
	itemFromStorage = itemFromStorage.filter((item) => item !== itemTextQty);
	localStorage.setItem("items", JSON.stringify(itemFromStorage));
};

const editInput = (itemValue) => {
	const label = document.createElement("label");
	label.className = "form-label w-100";
	const input = document.createElement("input");
	input.className = "form-control edit-item";
	input.setAttribute("value", itemValue);
	label.appendChild(input);
	console.log(label);
	inputContainer.innerHTML = label.innerHTML;
};

// edit item
const editItem = (item) => {
	editMode = true;
	list.querySelectorAll("li").forEach((li) => li.classList.remove("shadow"));
	item.classList.add("shadow");
	addItem.classList.replace("btn-dark", "btn-success");
	addItem.querySelector("span").classList.replace("bi-plus", "bi-pen");
	addItem.lastChild.textContent = " Replace item";
	editInput(item.textContent);
};

// on item click
const onItemClick = (e) => {
	if (e.target.classList.contains("remove-item")) {
		removeItem(e.target.parentNode.parentNode);
	} else {
		editItem(e.target);
	}
};

// Remove Single Item Function
const removeItem = (item) => {
	if (confirm("Do you wish to delete this item?")) {
		item.remove();
		removeFromLocal(item.textContent);
		hide();
	}
};

const removeAll = () => {
	if (confirm(`Do you want to Delete all items ?`)) {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
			localStorage.removeItem("items");
			hide();
		}
	}
};

const hide = () => {
	const items = list.querySelectorAll("li");
	if (items.length === 0) {
		clearBtn.style.display = "none";
		filter.style.display = "none";
	} else {
		clearBtn.style.display = "block";
		filter.style.display = "block";
	}
};

const filterItems = (e) => {
	const items = list.querySelectorAll("li");
	items.forEach((currentItem) => {
		const text = currentItem.textContent.toLowerCase();
		if (text.indexOf(filter.value.toLowerCase()) != -1) {
			currentItem.classList.replace("d-none", "d-flex");
		} else {
			currentItem.classList.replace("d-flex", "d-none");
		}
	});
};

form.addEventListener("submit", addItems);
list.addEventListener("click", onItemClick);
clearBtn.addEventListener("click", removeAll);
filter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
hide();
