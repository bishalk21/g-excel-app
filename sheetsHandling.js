/** Multiple Sheets Management in Google Sheets
 * In a spreadsheet application like Google Sheets,
 * managing multiple sheets involves handling the storage and retrieval of data across different sheets
 * while ensuring a seamless user experience. This includes implementing features such as
 * sheet navigation, data synchronization, and efficient data management to allow users to easily
 * switch between sheets and access their data without any issues.
 * Key learnings in this area include understanding
 * how to structure the data for multiple sheets,
 * implementing efficient algorithms for data retrieval and storage,
 * and ensuring that the user interface is intuitive and responsive when navigating between sheets.
 *
 * Features:
 * - Sheet Creation and Deletion: Allow users to create new sheets and delete existing ones as needed.
 * - Sheet Navigation: Allow users to easily switch between different sheets in the application.
 * - Data Synchronization: Ensure that changes made in one sheet are reflected in other sheets if necessary, maintaining data consistency across the application.
 * - Efficient Data Management: Implement efficient algorithms for storing and retrieving data across multiple sheets to ensure optimal performance and responsiveness.
 */

// 1. Sheet Creation and Deletion
let addSheetBtn = document.querySelector(".add-sheet");
addSheetBtn.addEventListener("click", () => {
  createNewSheet();
});
function createNewSheet() {
  let newSheet = document.createElement("div");
  //   newSheet.classList.add("sheet");
  newSheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  // Assign a unique sheet ID based on the current number of sheets
  newSheet.setAttribute("id", allSheetFolders.length);

  let sheetContent = document.createElement("div");
  sheetContent.classList.add("sheet-content");
  sheetContent.innerText = `Sheet ${allSheetFolders.length + 1}`; // Sheet names will be Sheet 1, Sheet 2, etc.

  newSheet.appendChild(sheetContent);
  let sheetFolderContainer = document.querySelector(".sheet-folder-container");
  sheetFolderContainer.appendChild(newSheet);
}
