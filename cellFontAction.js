// storage
let cellDatabase = [];

for (let i = 0; i < rows; i++) {
  let cellRows = [];
  for (let j = 0; j < columns; j++) {
    let cellProperties = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: 14,
      fontColor: "#000000",
      backgroundColor: "#000000", // just for indication purpose
      value: "",
      formula: "",
      children: [],
    };
    cellRows.push(cellProperties);
  }
  cellDatabase.push(cellRows);
}

// selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignments = document.querySelectorAll(".alignment");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let fontColor = document.querySelector(".font-color-format");
let backgroundColor = document.querySelector(".bg-color-format");
let leftAlign = alignments[0];
let centerAlign = alignments[1];
let rightAlign = alignments[2];
let activeColor = "#d1d8e0";
let inactiveColor = "#ecf0f1";

// address bar
// let addressBar = document.querySelector(".address-bar");

// application of two way binding
// attaching property listeners
// 1.  getting the current cell or access the active cell and  get address of the active cell with encoded row and column
// 2. decode the row and column and get the row and column using querySelector from document
// 3. access cell and storage object
bold.addEventListener("click", () => {
  let address = addressBar.value;

  let [cell, cellProperties] = getActiveCell(address);

  // modification
  cellProperties.bold = !cellProperties.bold; // data change
  cell.style.fontWeight = cellProperties.bold ? "bold" : "normal"; // UI style change
  bold.style.backgroundColor = cellProperties.bold
    ? activeColor
    : inactiveColor;
});

// italic
italic.addEventListener("click", () => {
  let address = addressBar.value;

  let [cell, cellProperties] = getActiveCell(address);

  cellProperties.italic = !cellProperties.italic;
  cell.style.fontStyle = cellProperties.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProperties.italic
    ? activeColor
    : inactiveColor;
});

// underline
underline.addEventListener("click", () => {
  let address = addressBar.value;

  let [cell, cellProperties] = getActiveCell(address);

  cellProperties.underline = !cellProperties.underline;
  cell.style.textDecoration = cellProperties.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProperties.underline
    ? activeColor
    : inactiveColor;
});

// font-size
fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProperties] = getActiveCell(address);

  cellProperties.fontSize = fontSize.value; // data change
  cell.style.fontSize = cellProperties.fontSize + "px"; // UI style change
  fontSize.value = cellProperties.fontSize;
});

// font-family
fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProperties] = getActiveCell(address);

  cellProperties.fontFamily = fontFamily.value; // data change
  cell.style.fontFamily = cellProperties.fontFamily; // UI style change
  fontFamily.value = cellProperties.fontFamily;
});

// font-color
fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProperties] = getActiveCell(address);

  cellProperties.fontColor = fontColor.value; // data change
  cell.style.color = cellProperties.fontColor; // UI style change
  fontColor.value = cellProperties.fontColor;
});

// background-color
backgroundColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProperties] = getActiveCell(address);

  cellProperties.backgroundColor = backgroundColor.value; // data change
  cell.style.backgroundColor = cellProperties.backgroundColor; // UI style change
  backgroundColor.value = cellProperties.backgroundColor;
});

// alignment
alignments.forEach((alignElement) => {
  alignElement.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProperties] = getActiveCell(address);

    let alignValue = e.target.classList[0]; // "left", "center" or "right"
    // console.log("hello", alignValue);
    cellProperties.alignment = alignValue; // data change
    // console.log(cellProperties.alignment);
    cell.style.textAlign = cellProperties.alignment; // UI style change
    // console.log(cell.style.textAlign);

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

// if no css, then apply default
let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  addEventListenerToCellProperties(allCells[i]);
}

function addEventListenerToCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rowID, columnID] = decodeRowAndColumnIdFromAddress(address);
    let cellProperties = cellDatabase[rowID][columnID];

    // apply cell properties
    cell.style.fontWeight = cellProperties.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProperties.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProperties.underline ? "underline" : "none";
    cell.style.fontSize = cellProperties.fontSize + "px";
    cell.style.fontFamily = cellProperties.fontFamily;
    cell.style.color = cellProperties.fontColor;
    cell.style.backgroundColor =
      cellProperties.backgroundColor === "#000000"
        ? "transparent"
        : cellProperties.backgroundColor;
    cell.style.textAlign = cellProperties.alignment;

    // apply properties UI props container
    bold.style.backgroundColor = cellProperties.bold
      ? activeColor
      : inactiveColor;
    italic.style.backgroundColor = cellProperties.italic
      ? activeColor
      : inactiveColor;
    underline.style.backgroundColor = cellProperties.underline
      ? activeColor
      : inactiveColor;
    fontSize.value = cellProperties.fontSize;
    fontFamily.value = cellProperties.fontFamily;
    fontColor.value = cellProperties.fontColor;
    backgroundColor.value = cellProperties.backgroundColor;

    switch (cellProperties.alignment) {
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

    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProperties.formula;
    cell.value = cellProperties.value;
  });
}

// function to get the active cell
function getActiveCell(address) {
  let [rowID, columnID] = decodeRowAndColumnIdFromAddress(address); // array destructuring

  let cell = document.querySelector(
    `.cell[data-row="${rowID}"][data-column="${columnID}"]`
  );
  let cellProperties = cellDatabase[rowID][columnID];
  return [cell, cellProperties];
}

// decode the row and column
function decodeRowAndColumnIdFromAddress(address) {
  // at first address is string "A1" --->
  let rowID = Number(address.slice(1) - 1); // "1" --> 0
  let columnID = Number(address.charCodeAt(0)) - 65; // "A" --> 65
  return [rowID, columnID];
}
