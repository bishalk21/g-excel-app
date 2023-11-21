{
  /**
   * color tracking - cyclic path (cycle detection)
   *    - delay color change
   *    - wait for color change sync
   *        - setTimeout: is asynchronous
   *        - clearTimeout
   *        - Promises, Async/Await: are used to convert async code to sync code
   *            - wrap setTimeout in Promise
   */
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
  let [srcRow, srcColumn] = cycleResponse;

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

  // for (let i = 0; i < rows; i++) {
  //   for (let j = 0; j < columns; j++) {
  //     if (visited[i][j] === false) {
  //       let response = dfsCycleDetection(
  //         graphComponentMatrix,
  //         i,
  //         j,
  //         visited,
  //         dfsVisited
  //       );
  //       if (response === true) return true;
  //     }
  //   }
  // }

  let response = await dfsCycleDetectionTracePath(
    graphComponentMatrix,
    srcRow,
    srcColumn,
    visited,
    dfsVisited
  );

  if (response === true) return Promise.resolve(true);

  return Promise.resolve(false);
}

function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// start -> visited: true, dfsVisited: true
// end ---> dfsVisited: false
// if visited[i][j] --> already explored path so return or go back (no use to explore again)
// cycle detected condition --> if (visited[i][j] && !dfsVisited[i][j]): true

// color tracking - cyclic path (cycle detection)
async function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  srcRow,
  srcColumn,
  visited,
  dfsVisited
) {
  visited[srcRow][srcColumn] = true;
  dfsVisited[srcRow][srcColumn] = true;

  let cell = document.querySelector(
    `.cell[rid="${srcRow}"][cid="${srcColumn}"]`
  );

  cell.style.backgroundColor = "lightblue";
  await colorPromise();

  // A1 --> [ [0,1], [1,0], ..... ]
  for (
    let children = 0;
    children < graphComponentMatrix[srcRow][srcColumn].length;
    children++
  ) {
    let [neighborRow, neighborCol] =
      graphComponentMatrix[srcRow][srcColumn][children];
    if (visited[neighborRow][neighborCol] === false) {
      let response = await dfsCycleDetectionTracePath(
        graphComponentMatrix,
        neighborRow,
        neighborCol,
        visited,
        dfsVisited
      );
      // if found cycle
      if (response === true) {
        cell.style.backgroundColor = "transparent";
        await colorPromise();
        return Promise.resolve(true);
      }
    } else if (
      visited[neighborRow][neighborCol] === true &&
      dfsVisited[neighborRow][neighborCol] === true
    ) {
      let cyclicCell = document.querySelector(
        `.cell[rid="${neighborRow}"][cid="${neighborCol}"]`
      );
      cyclicCell.style.backgroundColor = "lightSalmon";
      await colorPromise();

      cyclicCell.style.backgroundColor = "transparent";

      cell.style.backgroundColor = "transparent";
      await colorPromise();
      return Promise.resolve(true);
    }
  }
  dfsVisited[srcRow][srcColumn] = false;
  return Promise.resolve(false);
}
