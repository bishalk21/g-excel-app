{
  /**
   * Multiple sheet handling
   *   - create multiple sheets
   *   - create storage for each sheet in synchronous way
   *       - active sheet management
   *       - if active sheet is changed, then update storage or data in that sheet, not UI
   *
   * Create an array for all the cells in all the sheets
   */
}

let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetFolderContainer = document.querySelector(".sheet-folder-container");

addSheetBtn.addEventListener("click", () => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  // sheet.setAttribute("id", `sheet-${allSheetFolders.length + 1}`);
  sheet.setAttribute("id", allSheetFolders.length);

  sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;

  sheetFolderContainer.appendChild(sheet);

  sheet.scrollIntoView({ behavior: "smooth", block: "center" });

  sheetDbStorage();
  createGraphComponentMatrix();
  handleSheetActive(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    if (e.button !== 2) return;

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("Can't remove last sheet");
      return;
    }

    let response = confirm("Are you sure you want to remove this sheet?");
    if (response === false) return;

    let sheetIndex = Number(sheet.getAttribute("id"));
    collectedSheetDb.splice(sheetIndex, 1);
    collectedGraphComponentMatrix.splice(sheetIndex, 1);

    // UI
    handleSheetUIRemoval(sheet);

    // by default bring sheet to active
    cellDatabase = collectedSheetDb[0];
    graphComponentMatrix = collectedGraphComponentMatrix[0];
    handleSheetActiveProperties();
  });
}

function handleSheetUIRemoval(sheet) {
  sheet.remove();
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].setAttribute("id", i);
    let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i + 1}`;
    allSheetFolders[i].style.backgroundColor = "transparent";
  }

  allSheetFolders[0].style.backgroundColor = "#ced6e0";
}

function handleSheetDB(sheetIndex) {
  cellDatabase = collectedSheetDb[sheetIndex];
  graphComponentMatrix = collectedGraphComponentMatrix[sheetIndex];
}

function handleSheetActiveProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell = document.querySelector(
        `.cell[data-row="${i}"][data-column="${j}"]`
      );
      cell.click();
    }
  }

  // on every sheet click or add
  // by default click on first cell
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActive(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIndex = Number(sheet.getAttribute("id"));

    handleSheetDB(sheetIndex);
    handleSheetActiveProperties();
    handleSheetUI(sheet);
  });
}

function sheetDbStorage() {
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
  collectedSheetDb.push(cellDatabase);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push([]); // more than one child node (dependency)
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponentMatrix.push(graphComponentMatrix);
}
