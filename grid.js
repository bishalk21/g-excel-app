let rows = 100;
let columns = 26;

let addressColsContainer = document.querySelector(".address-columns-container");
let addressRowsContainer = document.querySelector(".address-rows-container");

// create address columns
for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.classList.add("address-col");
  addressCol.innerText = i + 1;
  addressColsContainer.appendChild(addressCol);
}

// create address rows
for (let i = 0; i < columns; i++) {
  let addressRow = document.createElement("div");
  addressRow.classList.add("address-row");
  addressRow.innerText = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'
  addressRowsContainer.appendChild(addressRow);
}

// create cells
let cellsContainer = document.querySelector(".cells-container");
for (let i = 0; i < rows; i++) {
  let rowContainer = document.createElement("div");
  rowContainer.classList.add("row-container");
  for (let j = 0; j < columns; j++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("spellcheck", "false");
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    rowContainer.appendChild(cell);

    // on click of cell --> get the row id and column id and show in address bar
    // displayAddressOnClick(cell, i, j);
    cell.addEventListener("click", () => {
      let addressBar = document.querySelector(".address-bar");
      let colAddress = String.fromCharCode(65 + j);
      let rowAddress = i + 1;
      addressBar.value = colAddress + rowAddress;
    });
  }
  cellsContainer.appendChild(rowContainer);
}

// on click of cell --> get the row id and column id and show in address bar
function displayAddressOnClick(cell, rowId, colId) {
  cell.addEventListener("click", () => {
    let addressBar = document.querySelector(".address-bar");
    let colAddress = String.fromCharCode(65 + colId);
    let rowAddress = rowId + 1;
    addressBar.value = colAddress + rowAddress;
  });
}

// by default first cell should be selected and show in address bar
let firstCell = document.querySelector(".cell");
firstCell.click();
