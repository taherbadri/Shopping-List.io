const form = document.querySelector(".submit-form");
const itemInput = document.getElementById("item-input");
const qtyInput = document.getElementById("qty-input");
const addItem = document.querySelector(".add-item");
const list = document.querySelector(".item-list");
const clearBtn = document.querySelector(".clear");
const filter = document.querySelector("#filter");

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

const addItems = (e) => {
	e.preventDefault();
	const item =
		itemInput.value.slice(0, 1).toUpperCase() + itemInput.value.slice(1);
	const qty = qtyInput.value;
	if (item === "") {
		alert("Please add an item");
	} else if (qty === "") {
		alert("Please add appropriate Quantity");
	} else {
		addToList(`${item} ${qty}`);
		addItemsToStorage(`${item} ${qty}`);
		itemInput.value = "";
		qtyInput.value = "";
		hide();
	}
};

// remove from local storage
const removeFromLocal = (itemTextQty) => {
	let itemFromStorage = getFromLocal();
	itemFromStorage = itemFromStorage.filter((item) => item !== itemTextQty);
	localStorage.setItem("items", JSON.stringify(itemFromStorage));
};
// on item click
const onItemClick = (e) => {
	if (e.target.classList.contains("remove-item")) {
		removeItem(e.target.parentNode.parentNode);
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
			currentItem.classList.remove("d-none");
			currentItem.classList.add("d-flex");
		} else {
			currentItem.classList.add("d-none");
			currentItem.classList.remove("d-flex");
		}
	});
};

form.addEventListener("submit", addItems);
list.addEventListener("click", onItemClick);
clearBtn.addEventListener("click", removeAll);
filter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
hide();
