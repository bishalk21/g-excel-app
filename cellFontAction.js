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
      backgroundColor: "#000000",
    };
    cellRows.push(cellProperties);
  }
  cellDatabase.push(cellRows);
}

// selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let fontColor = document.querySelector(".font-color-format");
let backgroundColor = document.querySelector(".bg-color-format");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColor = "#d1d8w0";
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

  let [activeCell, cellProperty] = getActiveCell(address);

  // modification
  cellProperty.bold = !cellProperty.bold; // data change
  activeCell.style.fontWeight = cellProperty.bold ? "bold" : "normal"; // UI style change
  bold.style.backgroundColor = cellProperty.bold ? activeColor : inactiveColor;
});

// italic
italic.addEventListener("click", () => {
  let address = addressBar.value;

  let [activeCell, cellProperty] = getActiveCell(address);

  cellProperty.italic = !cellProperty.italic;
  activeCell.style.fontStyle = cellProperty.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProperty.italic
    ? activeColor
    : inactiveColor;
});

// underline
underline.addEventListener("click", () => {
  let address = addressBar.value;

  let [activeCell, cellProperty] = getActiveCell(address);

  cellProperty.underline = !cellProperty.underline;
  activeCell.style.textDecoration = cellProperty.underline
    ? "underline"
    : "none";
  underline.style.backgroundColor = cellProperty.underline
    ? activeColor
    : inactiveColor;
});

// font-size
fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [activeCell, cellProperty] = getActiveCell(address);

  cellProperty.fontSize = fontSize.value; // data change
  activeCell.style.fontSize = cellProperty.fontSize + "px"; // UI style change
  fontSize.value = cellProperty.fontSize;
});

// font-family
fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [activeCell, cellProperty] = getActiveCell(address);

  cellProperty.fontFamily = fontFamily.value; // data change
  activeCell.style.fontFamily = cellProperty.fontFamily; // UI style change
  fontFamily.value = cellProperty.fontFamily;
});

// font-color
fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [activeCell, cellProperty] = getActiveCell(address);

  cellProperty.fontColor = fontColor.value; // data change
  activeCell.style.color = cellProperty.fontColor; // UI style change
  fontColor.value = cellProperty.fontColor;
});

// background-color
backgroundColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [activeCell, cellProperty] = getActiveCell(address);

  cellProperty.backgroundColor = backgroundColor.value; // data change
  activeCell.style.backgroundColor = cellProperty.backgroundColor; // UI style change
  backgroundColor.value = cellProperty.backgroundColor;
});

// alignment
alignment.forEach((alignElement) => {
  alignElement.addEventListener("click", (e) => {
    console.log("hello");
    let address = addressBar.value;
    let [activeCell, cellProperty] = getActiveCell(address);

    let alignValue = e.target.classList[0]; // "left", "center" or "right"
    cellProperty.alignment = alignValue; // data change
    activeCell.style.textAlign = cellProperty.alignment; // UI style change

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
    let [rowAddressID, columnAddressID] =
      decodeRowAndColumnIdFromAddress(address);
    let cellProperty = cellDatabase[rowAddressID][columnAddressID];

    // apply cell properties
    cell.style.fontWeight = cellProperty.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProperty.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProperty.underline ? "underline" : "none";
    cell.style.fontSize = cellProperty.fontSize + "px";
    cell.style.fontFamily = cellProperty.fontFamily;
    cell.style.color = cellProperty.fontColor;
    cell.style.backgroundColor =
      cellProperty.backgroundColor === "#000000"
        ? "transparent"
        : cellProperty.backgroundColor;
    cell.style.textAlign = cellProperty.alignment;

    // apply properties UI props container
    bold.style.backgroundColor = cellProperty.bold
      ? activeColor
      : inactiveColor;
    italic.style.backgroundColor = cellProperty.italic
      ? activeColor
      : inactiveColor;
    underline.style.backgroundColor = cellProperty.underline
      ? activeColor
      : inactiveColor;
    fontSize.value = cellProperty.fontSize;
    fontFamily.value = cellProperty.fontFamily;
    fontColor.value = cellProperty.fontColor;
    backgroundColor.value = cellProperty.backgroundColor;

    switch (cellProperty.alignment) {
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

// function to get the active cell
function getActiveCell(address) {
  let [rowAddressID, columnAddressID] =
    decodeRowAndColumnIdFromAddress(address); // array destructuring

  let activeCell = document.querySelector(
    `.cell[data-row="${rowAddressID}"][data-column="${columnAddressID}"]`
  );
  let cellProperty = cellDatabase[rowAddressID][columnAddressID];
  return [activeCell, cellProperty];
}

// decode the row and column
function decodeRowAndColumnIdFromAddress(address) {
  // at first address is string "A1" --->
  let rowAddressID = Number(address.slice(1) - 1); // "1" --> 0
  let columnAddressID = Number(address.charCodeAt(0)) - 65; // "A" --> 65
  return [rowAddressID, columnAddressID];
}
