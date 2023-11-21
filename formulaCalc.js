// algorithm
// click any cell, change the value, store the value of the cell

// event listener
// blur
// focus

// blur triggers first as compared to click

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(
      `.cell[data-row="${i}"][data-column="${j}"]`
    );
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProperties] = getActiveCell(address); // active cell
      let enteredValue = activeCell.innerText;

      if (enteredValue === cellProperties.value) return;

      cellProperties.value = enteredValue;

      // if data modifies, remove parent child relation, formula empty and update the children with new hardcoded value
      removeChildFromParent(cellProperties.formula);
      cellProperties.formula = "";
      updateChildrenCell(address);
      //   console.log(cellProperties);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");

{
  /**
   *  write expression in formula bar
   *  click on formula bar 'enter' and update the ui and database
   *    - normal expression ----> (10 + 20)
   *    - dependency expression ---> (10 + A1 + A3)
   *
   * A1 --> 30
   * A2 --> 20
   * B1 --> A1 + A2
   * C2 --> 2 * B1
   * Now the value of A1 is changed to 20, so we need to update the formula
   * - data update in between recursively
   */
}

formulaBar.addEventListener("keydown", async (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    // IF CHANGE IN FORMULA, BREAK OLD PARENT CHILD RELATION, EVALUATE NEW FORMULA AND UPDATE WITH NEW PARENT CHILD RELATION
    let address = addressBar.value;
    let [cell, cellProperties] = getActiveCell(address);
    if (inputFormula !== cellProperties.formula)
      removeChildFromParent(cellProperties.formula);
    // {
    //   cellProperties.children = [];
    // }

    addChildToGraphComponent(inputFormula, address);

    // check for cyclic, then evaluate
    let cycleResponse = isGraphCyclic(graphComponentMatrix);
    if (cycleResponse === true) {
      // alert("Cyclic dependency detected");

      let response = confirm(
        "You have a cyclic dependency. Do you want to trace the path?"
      );
      while (response === true) {
        // keep on tracking color of cyclic path until user is satisfied
        await dfsCycleDetectionTracePath(graphComponentMatrix, cycleResponse);
        response = confirm("Do you want to trace the path?");
      }

      // if cyclic is detected, break the parent child relation
      removeChildFromGraphComponent(inputFormula, address);

      return;
    }

    let evaluateValue = evaluateFormula(inputFormula);

    setCellUIAndCellProp(evaluateValue, inputFormula, address);
    addChildToParent(inputFormula);
    updateChildrenCell(address);
    // console.log(cellDatabase);
  }
});

// add child to graph component
function addChildToGraphComponent(formula, childAddress) {
  let [childRowId, childColumnId] =
    decodeRowAndColumnIdFromAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentRowId, parentColumnId] = decodeRowAndColumnIdFromAddress(
        encodedFormula[i]
      );
      // B1 --> A1 + 10
      // RowId - 1(i), ColumnId - 0(j)
      graphComponentMatrix[parentRowId][parentColumnId].push([
        childRowId,
        childColumnId,
      ]);
    }
  }
}

// remove child from graph component
function removeChildFromGraphComponent(formula, childAddress) {
  let [childRowId, childColumnId] =
    decodeRowAndColumnIdFromAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentRowId, parentColumnId] = decodeRowAndColumnIdFromAddress(
        encodedFormula[i]
      );

      // pop()
      // B1 --> A1 + 10
      graphComponentMatrix[parentRowId][parentColumnId].pop();

      //   graphComponentMatrix[parentRowId][parentColumnId].splice(
      //     graphComponentMatrix[parentRowId][parentColumnId].indexOf([
      //       childRowId,
      //       childColumnId,
      //     ]),
      //     1
      //   );
    }
  }
}

// update the children value in the database
function updateChildrenCell(parentAddress) {
  let [parentcell, parentCellProperties] = getActiveCell(parentAddress);
  let children = parentCellProperties.children;
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProperties] = getActiveCell(childAddress);
    let childFormula = childCellProperties.formula;

    let evaluateValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluateValue, childFormula, childAddress);
    updateChildrenCell(childAddress);
  }
}

// if any of the cell is dependent on another cell
function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProperties] = getActiveCell(encodedFormula[i]);
      parentCellProperties.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProperties] = getActiveCell(encodedFormula[i]);
      let index = parentCellProperties.children.indexOf(childAddress);
      parentCellProperties.children.splice(index, 1);
    }
  }
}

function evaluateFormula(formula) {
  // 10 + A1
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0); // if (A1) --> 65, if (C3) --> 67
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProperties] = getActiveCell(encodedFormula[i]);
      encodedFormula[i] = cellProperties.value;
    }
  }
  let decodedValue = encodedFormula.join(" ");
  // 10 + 20
  return eval(decodedValue);
}

function setCellUIAndCellProp(evaluateValue, formula, address) {
  //   let address = addressBar.value;
  let [cell, cellProperties] = getActiveCell(address); // active cell

  // update UI
  cell.innerText = evaluateValue;

  // update database
  cellProperties.value = evaluateValue;
  cellProperties.formula = formula;
}
