# Angle Name Selection Quiz

An interactive geometry quiz application that helps students practice identifying the correct angle by its name in a convex polygon. The app randomly generates polygons, draws all sides and diagonals, and asks users to click on the arc corresponding to the angle named in the question.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/angle-name-selection-quiz](https://www.sieu.io.vn/github/angle-name-selection-quiz)

## ✨ Features

- **Random Polygon Generation** – Randomly generates convex polygons with 4 or more vertices
- **Full Geometric Rendering** – Draws all sides and diagonals, clearly highlighting the polygon's structure
- **Minimal Angle Selection** – Asks the user to select the correct minimal angle (the smallest angle at a vertex, formed by a pair of consecutive segments—either a side and a diagonal, or two adjacent diagonals)
- **Interactive Arc Selection** – Only minimal angles divided by sides and diagonals are selectable; larger angles are not
- **Instant Feedback** – Provides immediate feedback after each answer
- **Score Tracking** – Keeps track of correct answers, total questions, and accuracy percentage
- **Clean Interface** – Responsive and user-friendly design with a clear layout
- **Responsive** – Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **HTML5** – The user interface is built with standard HTML, including buttons, feedback messages, and layout structure
- **CSS3** – For styling the interface, ensuring a clean and responsive look
- **JavaScript (ES6)** – The main logic for generating polygons, calculating minimal angles, rendering the quiz, and handling user interaction
- **p5.js** – A JavaScript library for creative coding, used to draw polygons, diagonals, and angle arcs on the canvas
- **MathJax** – Used to render mathematical notation (angle names) in LaTeX format for clarity and professionalism

## 📁 Project Structure

```
angle-name-selection-quiz/
├── index.html              # Main HTML file
├── main.js                 # JavaScript quiz logic and p5.js rendering
├── style.css               # Stylesheet
└── README.md               # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/angle-name-selection-quiz.git
   ```
2. **Navigate to the project folder**   
   ```bash
   cd angle-name-selection-quiz
   ```
3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server (e.g., Live Server in VS Code)

## 📝 How It Works

1. **Start the quiz** – The app generates a random convex polygon and displays it on the canvas
2. **Read the question** – A question asks you to click on the arc corresponding to a specific angle name (e.g., `∠ABC`)
3. **Click on the correct arc** – Click on the arc in the polygon that you believe corresponds to the named angle
4. **Get instant feedback** – The app tells you immediately whether your answer is correct
5. **Track your score** – The score display shows:
   - `Correct` – Number of correct answers
   - `Total` – Total number of questions attempted
   - `Accuracy` – Success rate as a percentage
6. **Continue** – Click the "New Question" button to generate a new polygon and question
     
**How angles are identified:**

The app calculates all minimal angles at each vertex formed by consecutive segments (either a side and a diagonal, or two adjacent diagonals). Only these minimal angles are selectable. Larger angles formed by non-consecutive segments are not selectable, ensuring that the user focuses on the correct geometric definition.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is open-source and available under the MIT License.
