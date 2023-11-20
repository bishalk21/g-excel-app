## Cycle detection in a directed graph

A `directed graph` is a set of objects, otherwise called vertices or nodes, connected together and all the edges are directed from one vertex to another.
A directed graph is an ordered pair G = (V, E) where,

- V is a set of elements known as vertices or nodes.
- E is a set of ordered pair of vertices called as edges or directed edges.

`Cycle` in a directed graph can be detected with the help of Depth-First Search algorithm.

DFS Algorithm for Cycle Detection in an Directed Graph

`The dfs algorithm for cycle detection in undirected graph will not work here because we cannot say that directed graph is having a cycle, if we get to a node which is already marked as visited and previous node is different.`

- common problem in computer science and graph theory.
- important for various applications, such as topological sorting and ensuring the absence of loops in systems or processes.
- several algorithms to detect cycles in directed graphs, and one of the most common approaches is Depth-First Search (DFS).

### Here's how you can detect cycles in a directed graph using DFS:

📌 Initialize a visited boolean array with all nodes unvisited, a boolean recursion stack with all nodes set to false.
A recursion stack is to track the nodes that are currently in recursion. We mark node as true if the node has further recursion calls and change it to false for no recursion calls.
📌 Run a loop from 0 to n - 1 as the graph may have different components.
📌 If the current node is not visited, call the dfs recursive function passing the current node, visited array, recursion stack array.

dfs(graph, node, visited, recursionStack)

📌 Inside the dfs function, check if the node is already in the recursion stack.
If it is already in the recursion stack, this means we are going to repeat the recursion call which results in a cycle. So we detect cycle in graph and return true.
📌 Check if the node is already visited. If yes, return false.
📌 Mark the node as visited and mark the node in recursion stack.
📌 Traverse through the children of the current node.
📌 Continue doing the recursion for all the children.
📌 If the recursion calls for the current node is over, reset the value to false in the recursion stack array.
📌 If we get out of the initial for loop and all the nodes are now visited, this means we have no cycle.

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
