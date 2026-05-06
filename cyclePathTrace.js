function isGraphCyclicTracePath(graphComponentMatrix) {
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
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!visited[i][j]) {
        if (
          dfsCycleDetectionTracePath(
            graphComponentMatrix,
            visited,
            dfsVisited,
            i,
            j,
          )
        ) {
          return true;
        }
      }
    }
  }
  return false;
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
        return true;
      }
    } else if (dfsVisited[childRow][childCol]) {
      return true;
    }
  }

  dfsVisited[rowID][colID] = false;
  return false;
}
