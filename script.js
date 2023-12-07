const form = document.querySelector(".submit-form");
const itemInput = document.getElementById("item-input");
const qtyInput = document.getElementById("qty-input");
const addItem = document.querySelector(".add-item");
const list = document.querySelector(".item-list");
const clearBtn = document.querySelector(".clear");
const filter = document.querySelector("#filter");

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

// Create list item
const createLi = (classes) => {
	const li = document.createElement("li");
	const PascalCase =
		itemInput.value.slice(0, 1).toUpperCase() + itemInput.value.slice(1);
	console.log(PascalCase);
	const itemName = document.createTextNode(PascalCase);
	const itemqty = document.createTextNode(` ${qtyInput.value}`);
	li.className = classes;
	li.appendChild(itemName);
	li.appendChild(itemqty);
	li.appendChild(createDelete("btn btn-link text-danger p-0 remove-item"));
	return li;
};

const addItems = (e) => {
	e.preventDefault();
	if (itemInput.value === "") {
		alert("Please add an item");
	} else if (qtyInput.value === "") {
		alert("Please add appropriate Quantity");
	} else {
		list.appendChild(
			createLi(
				"list-group-item d-flex justify-content-between rounded text-bg-light border m-2"
			)
		);
		itemInput.value = "";
		qtyInput.value = "";
		hide();
	}
};

// Remove Single Item Function
const removeItem = (e) => {
	if (confirm("Do you wish to delete this item?")) {
		if (e.target.classList.contains("remove-item")) {
			e.target.parentNode.parentNode.remove();
			hide();
		}
	}
};

const removeAll = () => {
	if (confirm(`Do you want to Delete all items ?`)) {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
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

form.addEventListener("submit", addItems);
list.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeAll);
hide();
