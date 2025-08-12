# angle-name-selection-quiz
This is an interactive geometry quiz app that helps students practice identifying the correct angle by its name in a convex polygon.</br>
Demo: https://xn--msiu-goa8b.vn/github/angle-name-selection-quiz/</br>

Features:</br>

Randomly generates convex polygons with 4 or more vertices.</br>
Draws all sides and diagonals, clearly highlighting the structure.</br>
For each question, asks the user to select the correct minimal angle (the smallest angle at a vertex, formed by a pair of consecutive segments—either a side and a diagonal, or two adjacent diagonals).</br>
Only minimal angles divided by sides and diagonals are selectable; larger angles are not.</br>
Immediate feedback and score tracking.</br>
Clean, responsive interface.</br>

How to use:</br>

1. Click on the arc corresponding to the angle named in the question.</br>
2. Get instant feedback and try a new question.</br>

Technologies Used</br>

JavaScript (ES6): The main logic for generating polygons, calculating minimal angles, rendering the quiz, and handling user interaction is written in modern JavaScript.</br>
p5.js: A JavaScript library for creative coding, used here to draw polygons, diagonals, and angle arcs on the canvas. It provides easy-to-use functions for geometry and graphics.</br>
HTML: The user interface is built with standard HTML, including buttons, feedback messages, and layout structure.</br>
CSS: For styling the interface, ensuring a clean and responsive look.</br>
MathJax: Used to render mathematical notation (angle names) in LaTeX format for clarity and professionalism.
