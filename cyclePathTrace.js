async function isGraphCyclicTracePath(graphComponentMatrix, isCyclicResponse) {
  let [startRow, startCol] = isCyclicResponse; // Destructure the starting point of the cycle from the return value
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
  let response = await dfsCycleDetectionTracePath(
    graphComponentMatrix,
    visited,
    dfsVisited,
    startRow,
    startCol,
  );
  if (response === true) {
    // return true; // Cycle path traced successfully
    return Promise.resolve(true); // Return a resolved promise to indicate that the cycle path tracing is complete
  }
  //   return false;
  return Promise.resolve(false); // Return a resolved promise to indicate that the cycle path tracing is complete, even if no cycle is found (though this case should not occur since we are starting from a known cycle point)
  //   return response; // Return the result of the cycle path tracing
}

/** setTimeout
 * - asynchronous function that allows you to execute a piece of code after a specified delay (in milliseconds).
 * - It takes two arguments: a callback function that contains the code to be executed, and the delay time in milliseconds.
 * - When setTimeout is called, it schedules the callback function to be executed after the specified delay, allowing you to create timed events or delays in your code.
 * - In the context of cycle path tracing, setTimeout can be used to create a visual effect by introducing a delay between highlighting each cell in the cycle, making it easier to see the path being traced.
 * - to make the asynchronous behavior of setTimeout work with the synchronous nature of DFS,
 *   we can use a combination of visited and dfsVisited arrays to control the flow of the DFS and ensure that the visual updates happen in a way that allows us to see the cycle path being traced.
 * - we can wrap the setTimeout in a Promise and use async/await to ensure that the DFS waits for the visual update to complete before proceeding to the next step in the traversal.
 */
// function colorPromise(cell, color) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       cell.style.backgroundColor = color;
//       resolve();
//     }, 1000);
//   });
// }
function colorPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  visited,
  dfsVisited,
  rowID,
  colID,
) {
  visited[rowID][colID] = true;
  dfsVisited[rowID][colID] = true;

  let cell = document.querySelector(`.cell[rid="${rowID}"][cid="${colID}"]`);
  // delay to visualize the cycle path tracing
  //   colorPromise(cell, "lightblue").then(() => {
  //     // Cell color updated
  //   });
  cell.style.backgroundColor = "lightblue"; // Highlight the current cell in the cycle path with a color
  await colorPromise(); // Wait for the visual update to complete before proceeding with the DFS traversal

  let children = graphComponentMatrix[rowID][colID];
  for (let i = 0; i < children.length; i++) {
    let [childRow, childCol] = children[i];
    if (!visited[childRow][childCol]) {
      let response = await dfsCycleDetectionTracePath(
        graphComponentMatrix,
        visited,
        dfsVisited,
        childRow,
        childCol,
      );
      if (response === true) {
        // colorPromise(cell, "transparent").then(() => {
        //   // Cell color reset
        // });
        cell.style.backgroundColor = "transparent"; // Reset the color of the current cell after a short delay
        await colorPromise();

        // return true;
        return Promise.resolve(true); // Return a resolved promise to indicate that the cycle path tracing is complete
      }
    } else if (dfsVisited[childRow][childCol] && visited[childRow][childCol]) {
      let cycleStartCell = document.querySelector(
        `.cell[rid="${childRow}"][cid="${childCol}"]`,
      );
      // delay to visualize the cycle path tracing
      //   setTimeout(() => {
      //     cycleStartCell.style.backgroundColor = "lightsalmon"; // Highlight the starting cell of the cycle with a different color
      //     cycleStartCell.style.backgroundColor = "transparent"; // Reset the color of the starting cell after a short delay
      //   }, 1000);
      cycleStartCell.style.backgroundColor = "lightsalmon"; // Highlight the starting cell of the cycle with a different color
      await colorPromise();
      cycleStartCell.style.backgroundColor = "transparent";
      cell.style.backgroundColor = "transparent"; // Reset the color of the current cell after a short delay
      await colorPromise();
      //   return true;
      return Promise.resolve(true); // Return a resolved promise to indicate that the cycle path tracing is complete
    }
  }

  dfsVisited[rowID][colID] = false;
  //   return false;
  return Promise.resolve(false); // Return a resolved promise to indicate that the current path does not lead to a cycle
}
