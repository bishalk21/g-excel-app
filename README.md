# Google Sheets

## Features

- Static UI Structuring
  - HTML
  - Heavy CSS: clean UI (flex-box, grid, etc.)
- Responsive: mobile first
- Heavy DOM manipulation
- Two way binding: Manipulation in both UI and storage (cell properties)
- Formula evaluation
- Graph Algorithm (cycle detection in directed graph)
  - Formula cycle validation
  - Cycle validation color tracking
- Storage Manipulation
  - Multiple sheet handling
  - New, open, download sheets
  - cut, copy, paste in multiple sheets

### Learnings

- input elements or all the inline elements does not have width and height. but can set custom width and height by setting `display`: `inline-block` or `block`
- getting an elements by class name from the DOM
- for loop in JavaScript
- creating (`createElement`), setting styles (`setAttribute`) and appending (`appendChild`) element to the DOM using javascript
- adding event listeners
- inserting or adding content to an element using javascript (`innerText` or `innerHTML`)
- setting value to an input element using javascript (`value`)
- Cell properties modification using javascript
  - font-size, font-family, text-align, background-color, etc. and on reverse
    - if I click back to the bold font of one cell from another cell, should display bold on the menu cell bar
- cell properties storage (`Two way binding`) - using matrix

  - which cell are manipulated (data change in storage)
  - also display the manipulated cell value in the menu cell bar (UI structure or change)

- pushing or adding elements to an array (`push` or `unshift`)

## Tools used

- [Google material icons](https://developers.google.com/fonts/docs/material_icons)

```html
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
```
