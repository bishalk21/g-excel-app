// Storage - 2D array to store the children of each cell
// graphComponentMatrix[i][j] will store the list of children (dependent cells) of the cell at row i and column j
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < columns; j++) {
    // Each cell will have a list of its children (dependent cells)
    row.push([]);
  }
  graphComponentMatrix.push(row);
}

/** Cycle Detection in Directed Graphs
 * In the context of a spreadsheet application, we can represent the dependencies between cells as a directed graph,
 * where each cell is a node and there is a directed edge from cell A to cell B if cell A depends on cell B (i.e., if cell A's formula references cell B).
 * A cycle in this graph would indicate a circular dependency, which is not allowed in spreadsheets because it would lead to infinite loops in calculations.
 * For example, if cell A1 depends on cell B1, and cell B1 depends on cell A1, we have a cycle: A1 -> B1 -> A1.
 * To detect cycles in this directed graph, we can use a depth-first search (DFS) approach.
 * 1. We will maintain a visited set to keep track of the nodes we have already visited during our DFS traversal.
 * 2. We will also maintain a recursion stack (or path set) to keep track of the nodes currently being explored in the current path of the DFS.
 * 3. If we encounter a neighbor that has already been visited and is in the recursion stack, it means we have found a cycle.
 * 4. If we complete the DFS without finding any cycles, then the graph is acyclic.
 * The time complexity of this algorithm is O(V + E), where V is the number of vertices (cells) and E is the number of edges (dependencies),
 * because we need to visit each vertex and edge once during the DFS traversal. The space complexity is O(V + E) for the adjacency list and the visited and recursion stack sets.
 */
function isGraphCyclic(graphComponentMatrix) {
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
          dfsCycleDetection(graphComponentMatrix, visited, dfsVisited, i, j)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function dfsCycleDetection(
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
        dfsCycleDetection(
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
