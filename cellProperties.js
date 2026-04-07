// cells storage
let sheetsDB = [];
for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < columns; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "Arial",
      fontSize: "16",
      fontColor: "#000000",
      fillColor: "#FFFFFF",
      value: "",
      formula: "",
      children: [],
    };
    sheetRow.push(cellProp);
  }
  sheetsDB.push(sheetRow);
}

// cell properties: bold, italic, underline, alignment, font family, font size, font color, fill color
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-select");
let fontSize = document.querySelector(".font-size-select");
let fontColor = document.querySelector(".text-color-picker");
let fillColor = document.querySelector(".fill-color-picker");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

/** On cell property change or modify
 * 1. get or access the cell object from sheetsDB
 *    - get the row id and column id from the cell's attributes or
 *    - get the address from the address bar and then decode it to get row id and column id
 * 2. use document.querySelector or any other DOM manipulation method to get the cell's UI element based on the row id and column id
 * 2. modify the cell object based on the property change
 * 3. reflect the changes in the cell's UI by modifying the cell's style or innerText based on the property change
 *
 * - make cell active default (grid.js)
 * - apply active state UI (cellProperties.js)
 * - on click of property --> get the active cell's row id and column id and then access the cell object from sheetsDB and modify the property in that object and also reflect the change in the cell's UI
 */

// application of two way binding:
// when we click on cell then the properties of that cell should be reflected in the property bar and
// when we change any property from the property bar
// then it should be reflected in the cell's UI and
// also in the cell's object in sheetsDB

let addressBar = document.querySelector(".address-bar");
let activeColor = "#d1d8e0";
let inactiveColor = "transparent";
bold.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.bold = !cellProp.bold;
  // reflect the change in cell's UI
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
});

// active cell access
function getActiveCell(address) {
  let [rowId, colId] = decodeAddress(address);
  // access the cell object from sheetsDB
  let cell = document.querySelector(`.cell[rid="${rowId}"][cid="${colId}"]`);
  // access storage object
  let cellProp = sheetsDB[rowId][colId];
  return [cell, cellProp];
}

// decoding the address to get row id and column id
function decodeAddress(address) {
  // address is in format A1, B2, C3 etc.
  // address[0] will give the column part and address.slice(1) will give the row part
  let rowId = Number(address.slice(1)) - 1; // converting to number and making it zero indexed
  // let colId = address.charCodeAt(0) - 65; // converting column letter to number (A=0, B=1, C=2 etc.)
  let colId = Number(address.charCodeAt(0) - 65);
  return [rowId, colId];
}
