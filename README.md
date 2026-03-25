# Google Sheets Clone

Description: A web-based spreadsheet application built with HTML, CSS, and JavaScript, featuring cell editing, formatting options, formula support, and sheet management. The application allows users to create and manage spreadsheets with functionalities similar to Google Sheets, including support for formulas, cell formatting, and multiple sheets. The project also includes optimizations for handling cell dependencies and recalculations when cell values change, using a graph algorithm for cycle detection in directed graphs. The application is designed to be responsive and performant, with heavy DOM manipulation for rendering the spreadsheet grid and cells, and two-way data binding between the UI and the underlying data model.

- Features:
  - Toolbar with formatting options (bold, italic, underline, font size, color, etc.)
  - Cell editing with support for formulas and functions
  - cells cut, copy, and paste functionality
  - multiple sheets within a single spreadsheet
  - upload and download spreadsheets in CSV or Excel format
  - formula execution engine that supports basic arithmetic operations, cell references, and common functions (e.g., SUM, AVERAGE)
  - graph algorithm (cycle detection in directed graphs) for handling cell dependencies and recalculations when cell values change (path tracing)
  - heavy dom manipulation for rendering the spreadsheet grid and cells, with optimizations for performance and responsiveness
  - multiple sheets handling with synchronous storage and retrieval of sheet data, allowing users to switch between sheets seamlessly while maintaining the integrity of the data and formulas across different sheets
  - two-way data binding between the UI and the underlying data model, ensuring that changes in the UI are reflected in the data and vice versa
    - when a user edits a cell, the change is immediately reflected in the underlying data model, and any dependent cells that reference the edited cell are automatically updated based on their formulas, ensuring that the spreadsheet remains consistent and up-to-date with user interactions. the ui is also updated in real-time to reflect changes in the data model, providing a seamless and responsive user experience when working with the spreadsheet.
- cells storage: cells are stored in a 2D array or an object with cell identifiers as keys (e.g., A1, B2) and their corresponding values and formulas as values. This allows for efficient access and manipulation of cell data, as well as easy implementation of features like formula evaluation and cell dependencies.
- cell is represented as an object with properties such as value (the current value of the cell), formula (the formula entered by the user, if any), and formatting options (e.g., bold, italic, font size). This structure allows for easy management of cell data and formatting, enabling features like formula evaluation and dynamic updates based on user interactions.
- implement downloadable sheets to be reusable on uploads across devices
- implement canvas based rendering to build sheets ui with optimizations for performance and responsiveness, especially when dealing with large spreadsheets. This approach allows for efficient rendering of the spreadsheet grid and cells, while minimizing DOM manipulation and improving overall user experience.
- infinite scalability of sheets with virtualization concept with cells operation features (cut, copy, paste) and formula execution engine that supports basic arithmetic operations, cell references, and common functions (e.g., SUM, AVERAGE), while ensuring that the application remains performant and responsive even as the size of the spreadsheet grows significantly.

  ```js
  /** Key Learnings
   * 1. createElement:
   *    - Used to create a new HTML element dynamically in JavaScript.
   *    - Syntax: document.createElement(tagName)
   *    - Example: let div = document.createElement("div");
   * 2. classList.add:
   *    - Used to add one or more class names to an element's class list.
   *    - Syntax: element.classList.add(className1, className2, ...)
   *    - Example: div.classList.add("my-class");
   * 3. setAttribute:
   *    - Used to set the value of an attribute on an HTML element.
   *    - Syntax: element.setAttribute(attributeName, attributeValue)
   *    - Example: div.setAttribute("contenteditable", "true");
   * 4. String.fromCharCode:
   *    - Used to convert Unicode values to characters.
   *    - Syntax: String.fromCharCode(num1, num2, ...)
   *    - Example: String.fromCharCode(65) returns "A"
   * 5. contenteditable:
   *    - An HTML attribute that makes an element editable by the user.
   *    - When set to "true", the content of the element can be edited directly in the browser.
   *    - Example: <div contenteditable="true">This is editable</div>
   * 6. DOM Manipulation:
   *    - The process of dynamically changing the structure, style, or content of a web page using JavaScript.
   *    - Common methods include createElement, appendChild, setAttribute, and classList.
   *    - Example: document.body.appendChild(div) adds the created div to the body of the document.
   * 7. Nested Loops for Grid Creation:
   *    - Used to create a grid-like structure (e.g., rows and columns) by nesting one loop inside another.
   *    - The outer loop typically iterates over rows, while the inner loop iterates over columns.
   *    - Example: for (let i = 0; i < rows; i++) { for (let j = 0; j < columns; j++) { ... } }
   * 8. Event Listeners:
   *    - Used to execute a function when a specific event occurs on an element.
   *    - Syntax: element.addEventListener(eventType, callbackFunction)
   *    - Example: cell.addEventListener("click", () => { ... });
   * 9. Template Literals:
   *    - Used to embed expressions within string literals for easier string formatting.
   *    - Syntax: `string text ${expression} string text`
   *    - Example: `.cell[rid="${srcRow}"][cid="${srcColumn}"]` selects a cell with specific row and column attributes.
   * 10. Promises and Async/Await:
   *    - Used to handle asynchronous operations in JavaScript.
   *    - A Promise represents a value that may be available now, later, or never.
   *    - Async functions return a Promise, and the await keyword is used to wait for a Promise to resolve before proceeding.
   */
  ```

Google Sheets is a web-based spreadsheet program that is part of the Google Drive office suite, along with Google Docs and Google Slides. It allows users to create, edit, and share spreadsheets online while collaborating with other users in real time.

- Framework: React (Next.js for SSR (Server-Side Rendering) optimization)
- State Management: React Query (for efficient data fetching and API caching), Zustand (for global state management or local UI state)
- Collaboration: WebSockets (for real-time updates and collaboration features using Firebase Firestore or Socket.IO or WebRTC)
- Rendering Engine: Canvas/ WebGL API (for rendering the spreadsheet grid and cells efficiently)
- Styling: Tailwind CSS/ CSS-in-JS (for utility-first styling and responsive design, nad performance optimization)
- Offline Support: Service Workers (for caching assets and enabling offline functionality) + IndexedDB (for storing data locally when offline)
- Data Persistence: Local Storage (for saving user preferences and settings) + Cloud Storage (for saving user data and spreadsheets in the cloud, using Firebase Storage or AWS S3) or Firebase Firestore (for real-time database and synchronization)
- Authentication: Firebase Authentication (for user authentication and management) or Auth0 (for secure authentication and authorization)
- Testing: Jest (for unit testing) + React Testing Library (for component testing) + Cypress (for end-to-end testing)

Backend:

- Server: Node.js (for building the backend server and API)
- Framework: Express.js (for building RESTful APIs and handling server-side logic)
- Database: MongoDB (for storing user data, spreadsheets, and collaboration information) or Firebase Firestore (for real-time database and synchronization) or PostgreSQL (for relational data storage and complex queries)
- Real-time Communication: WebSockets (for real-time updates and collaboration features using Firebase Firestore
  or Socket.IO or WebRTC) or CRDTs (Conflict-free Replicated Data Types for handling concurrent edits and synchronization in real-time collaboration)
- Authentication: Firebase Authentication (for user authentication and management) or Auth0 (for secure authentication and authorization)
- API Documentation: Swagger (for documenting the API endpoints and request/response formats) or GraphQL (for flexible and efficient API querying and data fetching)

Architecture:

1. Component Breakdown:

- SheetContainer: The main component that holds the entire spreadsheet and manages the state of the sheets.
- Toolbar: A component that provides various tools and options for formatting, inserting, and manipulating cells and sheets.
- GridContainer: Responsible for rendering the grid of cells and handling user interactions with the cells.
- CellEditor: A component that allows users to edit the content of a cell, including formulas and formatting.
  - FormulaParserComponent: A sub-component of CellEditor that parses and evaluates formulas entered by the user.
  - ChartComponent: A component that renders charts based on the data in the spreadsheet, using a charting library like Chart.js or D3.js.
  - TextFormattingComponent: A component that provides options for formatting text within cells, such as font size, color, and alignment.

2. Data Flow:

- User Input: When a user interacts with the spreadsheet (e.g., editing a cell, applying formatting, inserting a new sheet), the corresponding component captures the input and updates the local state.
- Formula Evaluation: If the user enters a formula, the CellEditor component uses the FormulaParserComponent to parse and evaluate the formula, updating the cell's value accordingly.

3. Rendering Strategy:

- DOM Virtualization: The GridContainer component implements DOM virtualization to efficiently render only the visible portion of the grid, improving performance when dealing with large spreadsheets.
- Canvas/WebGL: For rendering complex charts and visualizations, the ChartComponent utilizes Canvas or WebGL APIs to ensure smooth performance and responsiveness.

4. Implementation

- Virtualization: Implement DOM virtualization in the GridContainer component to render only the visible cells, improving performance when dealing with large spreadsheets.
- Formula Calculation or Evaluation: Implement a formula parser and evaluator in the CellEditor component to handle user-entered formulas, allowing for dynamic calculations and updates to cell values.
- Real-time Collaboration: Implement real-time collaboration features using WebSockets or Firebase Firestore, allowing multiple users to edit the same spreadsheet simultaneously and see each other's changes in real time.
- Offline Support: Implement offline support using Service Workers and IndexedDB, allowing users to continue working on their spreadsheets even when they lose internet connectivity, with changes syncing back to the server once connectivity is restored.

1. Virtualized Grid Rendering: Implement DOM virtualization in the GridContainer component to efficiently render only the visible portion of the grid, improving performance when dealing with large spreadsheets.
   - use react-window or react-virtualized libraries to implement virtualization for the grid rendering.
   - implement infinite scrolling to load more rows and columns as the user scrolls through the spreadsheet.

   ```js
   const Grid = () => {
     const rowCount = 1000; // Example row count
     return (
       <VariableSizeGrid
         columnCount={columnCount}
         rowCount={rowCount}
         columnWidth={(index) => 100}
         rowHeight={(index) => 30}
         width={window.innerWidth}
         height={window.innerHeight}
       >
         {({ columnIndex, rowIndex, style }) => (
           <div style={style}>
             {/* Render cell content based on columnIndex and rowIndex */}
             Cell {rowIndex}, {columnIndex}
           </div>
         )}
       </VariableSizeGrid>
     );
   };
   ```

2. Real-time Collaboration with WebSockets: Implement real-time collaboration features using WebSockets, allowing multiple users to edit the same spreadsheet simultaneously and see each other's changes in real time.
   - Use Socket.IO for real-time communication between clients and the server.
   - Implement event listeners for cell updates, broadcasting changes to all connected clients.

   ```js
   // Server-side (Node.js with Express)
   const io = require("socket.io")(server);
   io.on("connection", (socket) => {
     socket.on("cellUpdate", (data) => {
       // Broadcast the cell update to all other clients
       socket.broadcast.emit("cellUpdate", data);
     });
   });

   // Client-side (React)
   useEffect(() => {
     const socket = io();
     socket.on("cellUpdate", (data) => {
       // Update the local state with the received cell update
       setCells((prevCells) => {
         const updatedCells = [...prevCells];
         updatedCells[data.rowIndex][data.columnIndex] = data.value;
         return updatedCells;
       });
     });
     return () => {
       socket.disconnect();
     };
   }, []);
   ```

   - users see real-time cursor movement and cell edits from other collaborators, enhancing the collaborative experience.

   ```js
   // Server-side (Node.js with Express)
   const io = require("socket.io")(server);
   io.on("connection", (socket) => {
     socket.on("cellUpdate", (data) => {
       // Broadcast the cell update to all other clients
       socket.broadcast.emit("cellUpdate", data);
     });
     socket.on("cursorMove", (data) => {
       // Broadcast the cursor movement to all other clients
       socket.broadcast.emit("cursorMove", data);
     });
   });

   // Client-side (React)
   const socket = io("https://backend.example.com");
   const CollaborativeCell = ({ cellId, initialVal }) => {
     const [value, setValue] = useState(initialVal);
     const [isEditing, setIsEditing] = useState(false);
     const [cursorPosition, setCursorPosition] = useState(null);

     const handleChange = (e) => {
       setValue(e.target.value);
       socket.emit("cellUpdate", { cellId, value: e.target.value });
     };

     const handleCursorMove = (e) => {
       setCursorPosition({ x: e.clientX, y: e.clientY });
       socket.emit("cursorMove", {
         cellId,
         position: { x: e.clientX, y: e.clientY },
       });
     };

     useEffect(() => {
       socket.on("cellUpdate", (data) => {
         if (data.cellId === cellId) {
           setValue(data.value);
         }
       });
       socket.on("cursorMove", (data) => {
         if (data.cellId === cellId) {
           // Update cursor position for other collaborators
         }
       });
       return () => {
         socket.off("cellUpdate");
         socket.off("cursorMove");
       };
     }, [cellId]);

     return (
       <div onMouseMove={handleCursorMove}>
         {isEditing ? (
           <input
             value={value}
             onChange={handleChange}
             onBlur={() => setIsEditing(false)}
           />
         ) : (
           <span onClick={() => setIsEditing(true)}>{value}</span>
         )}
         {/* Render collaborator cursors based on received cursor positions */}
       </div>
     );
   };
   ```

3. Formula execution engine: Implement a formula parser and evaluator in the CellEditor component to handle user-entered formulas, allowing for dynamic calculations and updates to cell values.
   - Use a library like mathjs or implement a custom parser to evaluate formulas entered by users.
   - Support basic arithmetic operations, cell references, and common functions (e.g., SUM, AVERAGE).

   ```js
   import { evaluate } from "mathjs";

   const FormulaParserComponent = ({ formula }) => {
     const [result, setResult] = useState(null);

     useEffect(() => {
       try {
         const evaluatedResult = evaluate(formula);
         setResult(evaluatedResult);
       } catch (error) {
         setResult("Error");
       }
     }, [formula]);

     return <div>{result}</div>;
   };
   ```

   - When a user enters a formula in a cell (e.g., `=SUM(A1:A5)`), the FormulaParserComponent evaluates the formula and updates the cell's value with the result, allowing for dynamic calculations based on other cell values.

   ```js
   const CellEditor = ({ cellId, initialVal }) => {
     const [value, setValue] = useState(initialVal);
     const [isEditing, setIsEditing] = useState(false);

     const handleChange = (e) => {
       setValue(e.target.value);
     };

     return (
       <div>
         {isEditing ? (
           <input
             value={value}
             onChange={handleChange}
             onBlur={() => setIsEditing(false)}
           />
         ) : (
           <span onClick={() => setIsEditing(true)}>{value}</span>
         )}
         {value.startsWith("=") && (
           <FormulaParserComponent formula={value.slice(1)} />
         )}
       </div>
     );
   };
   ```

   - evaluate formula and sync results

   ```js
   const evaluateFormula = (formula) => {
     try {
       return new Function("return " + formula)();
       // or use a library like mathjs for more complex formulas
     } catch (error) {
       return "Error";
     }
   };
   const FormulaCell = ({ formula }) => {
     const [result, setResult] = useState(null);
     useEffect(() => {
       const evaluatedResult = evaluateFormula(formula);
       setResult(evaluatedResult);
     }, [formula]);
     return <div>{result}</div>;
   };
   // this is not a secure way to evaluate formulas, and should be used with caution. In a production application, consider using a library like mathjs or implementing a custom parser to safely evaluate formulas without exposing security risks.

   // we can use tokenization and parsing techniques to safely evaluate formulas, ensuring that only valid operations and functions are allowed, and preventing the execution of arbitrary code. This can be achieved by implementing a custom parser that checks the syntax and semantics of the formula before evaluating it, or by using a library that provides secure formula evaluation capabilities.
   const initialSheetData = [
    A1: { value: 10, formula: null },
    A2: { value: 20, formula: null },
    A3: { value: null, formula: "=A1 + A2" },
    A4: { value: null, formula: "=SUM(A1:A3)" },
    A5: { value: null, formula: "=AVERAGE(A1:A4)" },
    A6: { value: null, formula: "=IF(A1 > 15, 'High', 'Low')" },
   ]
   // helper: identify if a token is a cell reference
   const isCellReference = (token ) => /^[A-Z]+\d+$/.test(token)

   // helper: identify if token is a cell range (e.g., A1:A5)
    const isCellRange = (token) => /^[A-Z]+\d+:[A-Z]+\d+$/.test(token)

    // helper: get range of cells for a given cell range token
    const getCellRange = (token) => {
      const [start, end] = token.split(":");
      const startCol = start.match(/[A-Z]+/)[0];
      const startRow = parseInt(start.match(/\d+/)[0], 10);
      const endCol = end.match(/[A-Z]+/)[0];
      const endRow = parseInt(end.match(/\d+/)[0], 10);
      let cells = [];
        for (let row = startRow; row <= endRow; row++) {
          let cellId = `${startCol}${row}`;
            cells.push(Number(sheetData[cellId]?.value) || 0);
        }
        return cells;
    }
    // tokenizer: break formula into tokens (e.g., cell references, operators, functions)
    const tokenizeFormula = (formula) => {
     return formula.substring(1).match(/SUM|AVERAGE|IF|[A-Z]+\d+:[A-Z]+\d+|[A-Z]+\d+|[+\-*/()]/g) || [];
   }

   // Evaluator: evaluate the formula based on tokens and current sheet data
   const evaluateFormula = (formula, sheetData) => {
        if (!formula.startsWith("=")) return formula; // Not a formula, return as is
        const tokens = tokenizeFormula(formula);
        const stack = [];
        tokens.forEach((token) => {
          if (isCellReference(token)) {
            stack.push(Number(sheetData[token]?.value) || 0);
          } else if (isCellRange(token)) {
            const rangeValues = getCellRange(token);
            stack.push(rangeValues);
          } else if (token === "SUM") {
            const rangeValues = stack.pop();
            stack.push(rangeValues.reduce((a, b) => a + b, 0));
          } else if (token === "AVERAGE") {
            const rangeValues = stack.pop();
            stack.push(rangeValues.reduce((a, b) => a + b, 0) / rangeValues.length);
          } else if (token === "IF") {
            const falseValue = stack.pop();
            const trueValue = stack.pop();
            const condition = stack.pop();
            stack.push(condition ? trueValue : falseValue);
          } else if (["+", "-", "*", "/"].includes(token)) {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
              case "+":
                stack.push(a + b);
                break;
              case "-":
                stack.push(a - b);
                break;
              case "*":
                stack.push(a * b);
                break;
              case "/":
                stack.push(a / b);
                break;
              default:
                break;
            }
          }
        });
        return stack.pop();
   }

   // cell component that uses the formula evaluator
    const Cell = ({ cellId, sheetData, updateSheetData }) => {
      const [formula, setFormula] = useState(sheetData[cellId]?.formula || "")
      useEffect(()=> {
        if (formula.startsWith("=")) {
          const result = evaluateFormula(formula, sheetData);
          updateSheetData(cellId, { value: result, formula });

        }
      }, [formula, sheetData])
      return (
        <input
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          onBlur={() => {
            if (!formula.startsWith("=")) {
              updateSheetData(cellId, { value: formula, formula: null });
            }
          }}
        />
      );
    };

    // spreadsheet component that manages the sheet data and renders cells
    const Spreadsheet = () => {
      const [sheetData, setSheetData] = useState(initialSheetData);
      const updateSheetData = (cellId, data) => {
        setSheetData((prevData) => ({
          ...prevData,
          [cellId]: { ...prevData[cellId], ...data },
        }));
      };
      return (
        <div>
          {Object.keys(sheetData).map((cellId) => (
            <Cell
              key={cellId}
              cellId={cellId}
              sheetData={sheetData}
              updateSheetData={updateSheetData}
            />
          ))}
        </div>
      );
    };
   ```

Features Supported:

- Basic Operations: Support for basic arithmetic operations (addition, subtraction, multiplication, division) and cell references (e.g., A1, B2).
- Common Functions: Implement common spreadsheet functions such as SUM, AVERAGE, IF, etc., allowing users to perform calculations based on cell values and ranges.
- if statements: Support for conditional logic using IF statements, enabling users to create dynamic formulas based on specific conditions.
- auto updating cell dependencies: When a cell value changes, automatically update any dependent cells that reference it in their formulas, ensuring that the spreadsheet remains consistent and up-to-date.
- Error Handling: Implement error handling for invalid formulas, circular references, and other common spreadsheet errors, providing feedback to users when their formulas cannot be evaluated correctly.

API contracts:

1. fetch spreadsheet data: GET /api/spreadsheet/:id
   - Response: { id: string, name: string, sheets: [{ id: string, name: string, data: object }] }

   ```json
   {
     "id": "spreadsheet123",
     "name": "My Spreadsheet",
     "sheets": [
       {
         "id": "sheet1",
         "name": "Sheet 1",
         "data": {
           "A1": { "value": 10, "formula": null },
           "A2": { "value": 20, "formula": null },
           "A3": { "value": null, "formula": "=A1 + A2" }
         }
       }
     ]
   }
   ```

2. update cell value: POST /api/spreadsheet/:spreadsheetId/sheet/:sheetId/cell
   - Request Body: { cellId: string, value: any, formula: string | null }

   ```json
   {
     "cellId": "A3",
     "value": 30,
     "formula": "=A1 + A2"
   }
   ```

   - Response: { success: boolean, updatedCell: { cellId: string, value

   ```json
   {
     "success": true,
     "updatedCell": {
       "cellId": "A3",
       "value": 30,
       "formula": "=A1 + A2"
     }
   }
   ```

3. Subscribe to real-time updates: WebSocket connection to ws://backend.example.com/spreadsheet/:spreadsheetId
   - Server sends updates in the format: { type: "cellUpdate", cellId: string, value: any, formula: string | null }

   ```json
   {
     "type": "cellUpdate",
     "cellId": "A3",
     "value": 30,
     "formula": "=A1 + A2"
   }
   ```
