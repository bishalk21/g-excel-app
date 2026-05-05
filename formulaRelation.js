/** Formula Relations
 * 1. Cell
 * - store the value of the cell
 *   - focus event: the cursor is blinking in the cell,
 *                  we can get the value of the cell and show in the formula bar
 *   - blur event: when we move the cursor out of the cell A1 or click on another cell B2,
 *                 the blur event will be triggered for cell A1,
 *                 we have to check if the value of the cell A1 has changed or not,
 *                 if it has changed, then we need to update the value of the cell A1 in the sheetsDB,
 *                 and also update the value of the cells that are dependent on it,
 *                 like we were working on a cell and then we click on another cell, the first cell will lose focus and trigger the blur event,
 *   - blur event is also triggered when we press the enter key after editing a cell,
 *     because after pressing enter, the cell will lose focus and trigger the blur event
 *   - blur event triggers first compared to the click event,
 *     because when we click on another cell,
 *     the first cell will lose focus and
 *     trigger the blur event before the click event is triggered for the second cell
 * - when the value of the cell changes,
 *   we need to update the value of the cells that are dependent on it
 *
 * 2. Formula Bar (Formula Evaluation)
 * - when we enter a formula in the formula bar and press enter,
 *   we need to evaluate the formula and update the value of the cell in the sheetsDB,
 *   and also update the value of the cells that are dependent on it
 *   - enter event: when we press the enter key after entering a formula in the formula bar,
 *     we need to evaluate the formula and update the value of the cell in the sheetsDB,
 *     and also update the value of the cells that are dependent on it
 * - normal expression: = 2 + 3
 * - dependency expression: = A1 + 2
 *   - in this case, the value of the cell will depend on the value of cell A1,
 *     so we need to update the value of the cell whenever the value of cell A1 changes
 *   - we get the encoded value of the formula from the formula bar,
 *     and then we need to decode it to get the actual value of the formula,
 *     for example, if the formula is = A1 + 2,
 *     we need to get the value of cell A1 from the sheetsDB and
 *     then add 2 to it to get the evaluated value of the formula
 */

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCell(address);
      let enteredData = activeCell.innerText; // UI change

      if (enteredData === cellProp.value) {
        return; // No change in value, so we can return early
      }

      cellProp.value = enteredData; // data change
      //   console.log(cellProp);
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      // when the value of the cell changes, we need to update the value of the cells that are dependent on it
      updateChildrenCells(address);
    });
  }
}

let formulaBar = document.querySelector(".formula-input");
/**
 * keydown event is triggered when we press a key on the keyboard,
 * and we can use it to detect when the user presses the Enter key
 * when the user presses the Enter key, we need to evaluate the formula and update the value of the cell in the sheetsDB,
 * and also update the value of the cells that are dependent on it
 */
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    let evaluatedValue = evaluateFormula(inputFormula);
    // now we need to update the value of the cell in the sheetsDB,
    // and also update the value of the cells that are dependent on it

    // if change in formula, then we need to remove the child from the parent, because the dependency will change
    let address = addressBar.value;
    let [activeCell, cellProp] = getActiveCell(address);
    if (inputFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    addChildToGraphComponentMatrix(inputFormula, address);
    // check for cycle in the graph component matrix
    let isCyclic = isGraphCyclic(graphComponentMatrix);
    if (isCyclic) {
      alert(
        "Your formula has a cyclic dependency. Please change the formula to remove the cycle.",
      );
      // remove the child from the graph component matrix
      removeChildFromGraphComponentMatrix(inputFormula, address);
      return;
    }

    setCellUIAndCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);
    // console.log(sheetsDB);
    updateChildrenCells(address);
  }
});

/** Add Child to parent
 * when we enter a formula in the formula bar and press enter,
 * we need to evaluate the formula and update the value of the cell in the sheetsDB,
 * and also update the value of the cells that are dependent on it
 * - for example, if we enter the formula = A1 + 2 in cell B1,
 *   then the value of cell B1 will depend on the value of cell A1,
 *   so we need to add B1 as a child to A1, so that whenever the value of A1 changes, we can update the value of B1 as well
 * - we can get the cell reference from the formula and then get the cell properties from the sheetsDB,
 *   and then we can add the parent cell address to the children array of the cell properties
 */
function addChildToParent(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    // check if the token is a cell reference (e.g., A1, B2, etc.)
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
      let childAddress = addressBar.value;
      parentCellProp.children.push(childAddress);
    }
  }
}

/** Remove Child from Parent
 * when a cell's value is updated, we need to remove it from the children array of its parent cells
 * for example, if we have a formula = A1 + 2 in cell B1, and then we change the formula to = A2 + 2 in cell B1,
 * then we need to remove B1 from the children array of A1 and add B1 to the children array of A2
 * - we can get the cell reference from the old formula and then get the cell properties from the sheetsDB,
 *   and then we can remove the parent cell address from the children array of the cell properties
 */
function removeChildFromParent(oldFormula) {
  let encodedFormula = oldFormula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    // check if the token is a cell reference (e.g., A1, B2, etc.)
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
      let childAddress = addressBar.value;
      let childIndex = parentCellProp.children.indexOf(childAddress);
      if (childIndex !== -1) {
        parentCellProp.children.splice(childIndex, 1);
      }
    }
  }
}

/** Update children of cell
 * when a cell's value is updated, we need to update the value of the cells that are dependent on it
 * for example, if we have a formula = A1 + 2 in cell B1, and then we change the value of cell A1,
 * then we need to update the value of cell B1 as well, because the value of cell B1 depends on the value of cell A1
 * - we can get the children array from the cell properties of the updated cell,
 *   and then we can loop through the children array and update the value of each child cell by evaluating its formula again
 */
function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getActiveCell(parentAddress);
  let children = parentCellProp.children;
  for (let i = 0; i < children.length; i++) {
    // Update each child cell by evaluating its formula
    let childAddress = children[i];
    let [childCell, childCellProp] = getActiveCell(childAddress);
    let evaluatedValue = evaluateFormula(childCellProp.formula);
    setCellUIAndCellProp(evaluatedValue, childCellProp.formula, childAddress);
    // Recursively update the children of the child cell
    updateChildrenCells(childAddress);
  }
}

/** Add child to graph component matrix
 * This function adds a child cell to the list of children for a given parent cell in the graph component matrix
 */
function addChildToGraphComponentMatrix(formula, childAddress) {
  let [rowID, colID] = decodeAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    // check if the token is a cell reference (e.g., A1, B2, etc.)
    if (asciiVal >= 65 && asciiVal <= 90) {
      // let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
      // parentCellProp.children.push(childAddress);
      let [parentRowID, parentColID] = decodeAddress(encodedFormula[i]);
      graphComponentMatrix[parentRowID][parentColID].push([rowID, colID]);
    }
  }
}

/** Remove child from graph component matrix
 * This function removes a child cell from the list of children for a given parent cell in the graph component matrix
 */
function removeChildFromGraphComponentMatrix(formula, childAddress) {
  let [rowID, colID] = decodeAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    // check if the token is a cell reference (e.g., A1, B2, etc.)
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [parentRowID, parentColID] = decodeAddress(encodedFormula[i]);
      // let children = graphComponentMatrix[parentRowID][parentColID];
      // for (let j = 0; j < children.length; j++) {
      //   if (children[j][0] === rowID && children[j][1] === colID) {
      //     children.splice(j, 1);
      //     break;
      //   }
      // }
      graphComponentMatrix[parentRowID][parentColID].pop();
    }
  }
}

/**
 * evaluate the formula and return the evaluated value
 */
function evaluateFormula(formula) {
  // we need to decode the formula to get the actual value of the formula,
  // for example, if the formula is = A1 + 2,
  // we need to get the value of cell A1 from the sheetsDB and
  // then add 2 to it to get the evaluated value of the formula
  let encodedFormula = formula.split(" ");
  // In a real implementation, you would decode the formula here
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    // check if the token is a cell reference (e.g., A1, B2, etc.)
    if (asciiVal >= 65 && asciiVal <= 90) {
      // let colId = asciiVal - 65; // Convert 'A' to 0, 'B' to 1, etc.
      // let rowId = parseInt(encodedFormula[i].substring(1)) - 1; // Get the row number and convert to 0-based index
      // let cellValue = sheetsDB[rowId][colId].value;
      let [cell, cellProp] = getActiveCell(encodedFormula[i]);
      // let cellValue = cellProp.value;
      // replace the cell reference in the formula with its actual value
      // formula = formula.replace(encodedFormula[i], cellValue);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula); // Evaluate the decoded formula and return the result
}

/**
 * update the value of the cell in the sheetsDB,
 * and also update the value of the cells that are dependent on it
 */
function setCellUIAndCellProp(evaluatedValue, formula, address) {
  // let address = addressBar.value;
  let [activeCell, cellProp] = getActiveCell(address);
  activeCell.innerText = evaluatedValue; // UI change
  // data change
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
