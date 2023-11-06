// cyclic detection algorithm in directed graph

// storage - 2D matrix
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < columns; j++) {
    row.push([]); // more than one child node (dependency)
  }
  graphComponentMatrix.push(row);
}

// cyclic detection True - Cyclic, False - Acyclic
function isGraphCyclic() {
  // dependency -> visited, dfsVisited (2D matrix)
  let visited = [];
  let dfsVisited = [];

  for (let i = 0; i < rows; i++) {
    let visitedRow = []; // node visit status trace
    let dfsVisitedRow = []; // stack visit status trace

    for (let j = 0; j < columns; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }

    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (visited[i][j] === false) {
        let response = dfsCycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        if (response === true) return true;
      }
    }
  }
  return false;
}

// start -> visited: true, dfsVisited: true
// end ---> dfsVisited: false
// if visited[i][j] --> already explored path so return or go back (no use to explore again)
// cycle detected condition --> if (visited[i][j] && !dfsVisited[i][j]): true
function dfsCycleDetection(
  graphComponentMatrix,
  srcRow,
  srcColumn,
  visited,
  dfsVisited
) {
  visited[srcRow][srcColumn] = true;
  dfsVisited[srcRow][srcColumn] = true;

  // A1 --> [ [0,1], [1,0], ..... ]
  for (
    let children = 0;
    children < graphComponentMatrix[srcRow][srcColumn].length;
    children++
  ) {
    let [neighborRow, neighborCol] =
      graphComponentMatrix[srcRow][srcColumn][children];
    if (visited[neighborRow][neighborCol] === false) {
      let response = dfsCycleDetection(
        graphComponentMatrix,
        neighborRow,
        neighborCol,
        visited,
        dfsVisited
      );
      // if found cycle
      if (response === true) return true;
    } else if (
      visited[neighborRow][neighborCol] === true &&
      dfsVisited[neighborRow][neighborCol] === true
    ) {
      return true;
    }
  }
  dfsVisited[srcRow][srcColumn] = false;
  return false;
}
