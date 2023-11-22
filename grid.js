let rows = 100;
let columns = 26;

let addressColumnContainer = document.querySelector(".address-col-container");
let addressRowContainer = document.querySelector(".address-row-container");
let cellsContainer = document.querySelector(".cells-container");
let addressBar = document.querySelector(".address-bar");

// looping through rows
for (let i = 0; i < rows; i++) {
  // for each row, create a column div element
  let addressColumn = document.createElement("div");
  // set the class of the column div
  addressColumn.setAttribute("class", "address-column");
  // set the text content (value) of the column div
  addressColumn.innerText = i + 1;
  // append the column div to the address column container
  addressColumnContainer.appendChild(addressColumn);
}

// looping through columns
for (let i = 0; i < columns; i++) {
  // for each column, create a row div element
  let addressRow = document.createElement("div");
  // set the class of the row div
  addressRow.setAttribute("class", "address-row");
  // set the text content (value) of the row div
  addressRow.innerText = String.fromCharCode(65 + i);
  // append the row div to the address row container
  addressRowContainer.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
  let rowCount = document.createElement("div");
  rowCount.setAttribute("class", "row-container");
  for (let j = 0; j < columns; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");

    // attribute for spell check
    cell.setAttribute("spellcheck", "false");

    // for cell and storage identification
    cell.setAttribute("data-row", i);
    cell.setAttribute("data-column", j);

    rowCount.appendChild(cell);
    addListenerForAddressBarDisplay(cell, i, j);
  }
  cellsContainer.appendChild(rowCount);
}

function addListenerForAddressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1;
    let columnID = String.fromCharCode(65 + j);
    addressBar.value = `${columnID}${rowID}`;
  });
}
