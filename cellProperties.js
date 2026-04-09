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

bold.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.bold = !cellProp.bold;
  // reflect the change in cell's UI
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
});

italic.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.italic = !cellProp.italic;
  // reflect the change in cell's UI
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
});

underline.addEventListener("click", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.underline = !cellProp.underline;
  // reflect the change in cell's UI
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline
    ? activeColor
    : inactiveColor;
});

fontSize.addEventListener("change", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.fontSize = fontSize.value;
  // reflect the change in cell's UI
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.fontFamily = fontFamily.value;
  // reflect the change in cell's UI
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.fontColor = fontColor.value;
  // reflect the change in cell's UI
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

fillColor.addEventListener("change", () => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  // modify the cell object
  cellProp.fillColor = fillColor.value;
  // reflect the change in cell's UI
  cell.style.backgroundColor = cellProp.fillColor;
  fillColor.value = cellProp.fillColor;
});

/** alignment change
 * - on click of alignment button
 * --> get the active cell's row id and column id and
 * --> then access the cell object from sheetsDB and
 * --> modify the alignment property in that object and
 * --> also reflect the change in the cell's UI by changing the text-align style of the cell
 * --> also update the alignment button styles to show which alignment is currently active for the selected cell
 *
 * - ui change in both cell and alignment buttons
 * --> for cell --> change the text-align style of the cell based on the selected alignment
 * --> for alignment buttons --> change the background color of the selected alignment button to activeColor and reset the background color of other alignment buttons to inactiveColor
 * --> for another cell when clicked
 * ----> get the alignment property of that cell from sheetsDB and
 * ----> update the background color of alignment buttons accordingly to reflect the current alignment of the newly selected cell
 */
alignment.forEach((alignElem) => {
  console.log(alignElem);
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);
    let alignValue = e.target.classList[0];
    // let alignValue = alignElem.classList[0];
    // modify the cell object - data change
    cellProp.alignment = alignValue;
    // ui change
    cell.style.textAlign = cellProp.alignment;
    // switch case for alignment buttons background color change
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = activeColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = activeColor;
        break;
    }
  });
});

// function to attach click event listener to each cell and
// update the alignment buttons background color based on the selected cell's alignment property
let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  attachClickEventListenerToCells(allCells[i]);
}
function attachClickEventListenerToCells(cell) {
  cell.addEventListener("click", () => {
    let address = addressBar.value;
    let [rid, cid] = decodeAddress(address);
    let cellProp = sheetsDB[rid][cid];

    // apply cell properties to alignment buttons
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.fillColor;
    cell.style.textAlign = cellProp.alignment;

    // apply properties to property bar UI
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    fillColor.value = cellProp.fillColor;
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
    italic.style.backgroundColor = cellProp.italic
      ? activeColor
      : inactiveColor;
    underline.style.backgroundColor = cellProp.underline
      ? activeColor
      : inactiveColor;

    // (apply UI prop
    // alignment buttons background color change based on the selected cell's alignment property
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = activeColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = activeColor;
        break;
    }
  });
}
