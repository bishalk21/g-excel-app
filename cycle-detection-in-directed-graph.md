## Cycle detection in a directed graph

- common problem in computer science and graph theory.
- important for various applications, such as topological sorting and ensuring the absence of loops in systems or processes.
- several algorithms to detect cycles in directed graphs, and one of the most common approaches is Depth-First Search (DFS).

### Here's how you can detect cycles in a directed graph using DFS:

1. Initialize Data Structures:

- Create a Boolean array to keep track of visited vertices.
- Create a stack or another data structure to keep track of the current path in the graph.

2. Perform DFS:

- Start from any unvisited vertex in the graph.
- Mark the current vertex as visited.
- Add the current vertex to the path stack.

3. Explore Neighbors:

- For each neighbor of the current vertex:
- If the neighbor is already in the path stack, a cycle is detected. You can stop and report the presence of a cycle.
- If the neighbor is not visited, recursively visit the neighbor.

4. Backtrack:

- After exploring all neighbors, remove the current vertex from the path stack.

5. Repeat:

- Repeat steps 2 to 4 for all unvisited vertices in the graph.

6. Result:

- If the algorithm completes without detecting a cycle, the graph is acyclic (DAG - Directed Acyclic Graph).
- If a cycle is detected during the DFS, you can report it as needed.

```js
function hasCycle(graph) {
  const visited = new Array(graph.length).fill(false);
  const inPath = new Array(graph.length).fill(false);

  function dfs(node) {
    if (inPath[node]) {
      return true; // Cycle detected
    }
    if (visited[node]) {
      return false; // Already visited, no cycle
    }

    visited[node] = true;
    inPath[node] = true;

    for (const neighbor of graph[node]) {
      if (dfs(neighbor)) {
        return true; // Cycle detected
      }
    }

    inPath[node] = false;
    return false;
  }

  for (let node = 0; node < graph.length; node++) {
    if (!visited[node] && dfs(node)) {
      return true; // Cycle detected
    }
  }

  return false; // No cycle found
}

// Example usage:
const graph = [[1, 2], [2], [0, 3], [3]];

console.log(hasCycle(graph)); // Output: true (Cycle is present)
```
