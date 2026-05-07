function isGraphCyclicTracePath(graphComponentMatrix, isCyclicReturnPath) {
  let [startRow, startCol] = isCyclicReturnPath; // Destructure the starting point of the cycle from the return value
  let visited = [];
  let dfsVisited = [];
  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < columns; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }
  // Start DFS from the point where the cycle was detected to trace the path of the cycle
  let response = dfsCycleDetectionTracePath(
    graphComponentMatrix,
    visited,
    dfsVisited,
    startRow,
    startCol,
  );

  return response; // Return the result of the cycle path tracing
}

function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  visited,
  dfsVisited,
  rowID,
  colID,
) {
  visited[rowID][colID] = true;
  dfsVisited[rowID][colID] = true;

  let cell = document.querySelector(`.cell[rid="${rowID}"][cid="${colID}"]`);
  cell.style.backgroundColor = "lightcoral"; // Highlight the cell in the cycle with a different color

  let children = graphComponentMatrix[rowID][colID];
  for (let i = 0; i < children.length; i++) {
    let [childRow, childCol] = children[i];
    if (!visited[childRow][childCol]) {
      if (
        dfsCycleDetectionTracePath(
          graphComponentMatrix,
          visited,
          dfsVisited,
          childRow,
          childCol,
        )
      ) {
        let cyclicCell = document.querySelector(
          `.cell[rid="${childRow}"][cid="${childCol}"]`,
        );
        cyclicCell.style.backgroundColor = "lightcoral"; // Highlight the cell in the cycle with a different color
        return true;
      }
    } else if (dfsVisited[childRow][childCol]) {
      return true;
    }
  }

  dfsVisited[rowID][colID] = false;
  return false;
}
