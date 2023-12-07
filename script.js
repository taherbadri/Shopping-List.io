const form = document.querySelector(".submit-form");
const itemInput = document.getElementById("item-input");
const qtyInput = document.getElementById("qty-input");
const addItem = document.querySelector(".add-item");
const list = document.querySelector(".item-list");

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
	deleteBtn.appendChild(createIcon("bi bi-x"));
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
	li.appendChild(createDelete("btn btn-link text-danger p-0"));
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
	}
};

form.addEventListener("submit", addItems);
