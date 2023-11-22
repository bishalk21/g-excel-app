let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

downloadBtn.addEventListener("click", () => {
  let jsonData = JSON.stringify(cellDatabase, graphComponentMatrix);
  let file = new Blob([jsonData], { type: "application/json" });
  let url = URL.createObjectURL(file);
  let a = document.createElement("a");
  a.href = url;
  a.download = "sheetDB.json";
  a.click();
});

openBtn.addEventListener("click", () => {
  // fileReader
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let fr = new FileReader();
    let files = input.files;
    let fileObj = files[0];

    fr.readAsText(fileObj);
    fr.addEventListener("load", (e) => {
      let readSheetData = JSON.parse(fr.result);

      // BASIC SHEET with default data will be created
      addSheetBtn.click();

      // SheetDB, GRAPH COMPONENT MATRIX
      cellDatabase = readSheetData[0];
      graphComponentMatrix = readSheetData[1];
      collectedSheetDb[collectedSheetDb.length - 1] = cellDatabase;
      collectedGraphComponentMatrix[collectedGraphComponentMatrix.length - 1] =
        graphComponentMatrix;

      handleSheetActiveProperties();
    });
  });
});
