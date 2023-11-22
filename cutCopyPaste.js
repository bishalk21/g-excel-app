{
  /**
   * Cut Copy Paste
   *   - select range - ctrl + click
   *        -
   *   - copy
   *   - cut
   *   - paste
   *
   * open and save
   */
}

let ctrlKey;

document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey;
});

document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey;
});

// select range from one cell to another
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(
      `.cell[data-row="${i}"][data-column="${j}"]`
    );
    handleSelectedCells(cell);
  }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

let rangeStorage = [];

function handleSelectedCells(cell) {
  cell.addEventListener("click", (e) => {
    // select range
    if (!ctrlKey) return;
    if (rangeStorage.length >= 2) {
      defaultSelectedCellsUI();
      rangeStorage = [];
    }

    // UI
    cell.style.border = "2px solid #218c74";

    let rowID = Number(cell.getAttribute("data-row"));
    let columnID = Number(cell.getAttribute("data-column"));

    rangeStorage.push([rowID, columnID]);
  });
}

function defaultSelectedCellsUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(
      `.cell[data-row="${rangeStorage[i][0]}"][data-column="${rangeStorage[i][1]}"]`
    );
    cell.style.border = "1px solid #f6f1f1d8";
  }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  copyData = [];
  let startRow = rangeStorage[0][0];
  let startColumn = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endColumn = rangeStorage[1][1];

  for (let i = startRow; i <= endRow; i++) {
    let copyRow = [];
    for (j = startColumn; j <= endColumn; j++) {
      let cellProperties = cellDatabase[i][j];
      copyRow.push(cellProperties);
    }
    copyData.push(copyRow);
  }

  defaultSelectedCellsUI();
});

cutBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  copyData = [];
  //   let startRow = rangeStorage[0][0];
  //   let startColumn = rangeStorage[0][1];
  //   let endRow = rangeStorage[1][0];
  //   let endColumn = rangeStorage[1][1];

  let [startRow, startColumn, endRow, endColumn] = [
    rangeStorage[0][0],
    rangeStorage[0][1],
    rangeStorage[1][0],
    rangeStorage[1][1],
  ];

  for (let i = startRow; i <= endRow; i++) {
    for (j = startColumn; j <= endColumn; j++) {
      let cell = document.querySelector(
        `.cell[data-row="${i}"][data-column="${j}"]`
      );
      // db
      let cellProperties = cellDatabase[i][j];
      cellProperties.value = "";
      cellProperties.bold = false;
      cellProperties.italic = false;
      cellProperties.underline = false;
      cellProperties.alignment = "left";
      cellProperties.fontFamily = "monospace";
      cellProperties.fontSize = 14;
      cellProperties.fontColor = "000000";
      cellProperties.backgroundColor = "000000";

      // UI
      cell.click();
    }
  }
});

pasteBtn.addEventListener("click", (e) => {
  // past cells data work
  if (rangeStorage.length < 2) return;

  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let columnDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  // target
  let address = addressBar.value;
  let [startRow, startColumn] = decodeRowAndColumnIdFromAddress(address);

  for (let i = startRow, r = 0; i <= startRow + rowDiff; i++, r++) {
    for (let j = startColumn, c = 0; j <= startColumn + columnDiff; j++, c++) {
      let cell = document.querySelector(
        `.cell[data-row="${i}"][data-column="${j}"]`
      );
      if (!cell) return;

      // data
      let data = copyData[r][c];
      let cellProperties = cellDatabase[i][j];
      cellProperties.value = data.value;
      cellProperties.bold = data.bold;
      cellProperties.italic = data.italic;
      cellProperties.underline = data.underline;
      cellProperties.alignment = data.alignment;
      cellProperties.fontFamily = data.fontFamily;
      cellProperties.fontSize = data.fontSize;
      cellProperties.fontColor = data.fontColor;
      cellProperties.backgroundColor = data.backgroundColor;

      // UI
      cell.click();
    }
  }
});
