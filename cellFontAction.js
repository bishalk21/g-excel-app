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
      backgroundColor: "#ffffff",
    };
    cellRows.push(cellProperties);
  }
  cellDatabase.push(cellRows);
}
