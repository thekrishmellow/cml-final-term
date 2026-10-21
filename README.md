# CML End-Term Practice Portal: Group B
**Classical Machine Learning | Scaler School of Technology | Term 5 (Batch 2029)**
*Instructor: Chitwan Manchanda | Exam Slot: Thursday 22 Oct 2026, 1:30 PM - 3:30 PM IST (120 Mins)*

---

## 🚀 How to Run the Website

You can run this practice portal directly in any web browser!

### Option 1: Direct File Opening
Double click `index.html` or open it with your browser:
```bash
open index.html
```

### Option 2: Local Web Server (Recommended)
Run a local HTTP server:
```bash
python3 -m http.server 8080
```
Then open: **[http://localhost:8080](http://localhost:8080)**

---

## 🌟 Key Features

1. **Section A: 20 Multiple Choice Questions (A1 to A20)**
   - Instant visual feedback (green for correct, red for incorrect with correct answer highlighted).
   - Detailed step-by-step mathematical derivations and conceptual explanations.
   - Session tags (S1 to S15), difficulty levels, and question types.

2. **Section B: 15 Fill-in-the-Blanks Questions (B1 to B15)**
   - Smart input matching (handles casing, spaces, alternative spellings, and decimal variations like `.865` vs `0.865`).
   - "Check Answers" with instant pass/fail badges.
   - "Show Solution & Working" drawer for complete mathematical steps.

3. **Section C: 8 Python Coding Challenges (C1 to C8)**
   - **In-Browser Python Execution**: Powered by Pyodide WebAssembly with `numpy`, `pandas`, and `scikit-learn`.
   - **Interactive Code Editor**: Tab support (4 spaces), indent preservation, font size controls.
   - **Run Code**: Executes code and displays stdout/stderr in a sleek macOS-style dark terminal console.
   - **Check & Auto-Grade**: Automatically runs unit test assertions and displays test pass/fail badges with execution timing.
   - **Reset Code, Copy, and Download `.py`**: Seamless code management.
   - **Reveal Verified Solution**: Complete, production-grade solutions with exam tips.

4. **Practice Mode vs Timed Exam Mode**
   - **Practice Mode**: Instant feedback, hints, and explanations on every question.
   - **Timed Exam Mode**: 120-minute countdown timer (matching the SST exam schedule), question navigator palette (1 to 43 matrix), flag questions for review, and a final score report with grade and percentage upon submission.

5. **Topic Map & Dynamic Filtering**
   - Filter by Section: All (43), Section A (20), Section B (15), Section C (8).
   - Filter by Session: S1 to S15 (Intro to ML, Linear Regression, Bias-Variance, Decision Trees, Random Forests, Boosting, KMeans, PCA).
   - Filter by Difficulty: Easy, Medium, Exam Level.
   - Instant real-time search across all questions and topics.

6. **Formula & Cheat Sheet Modal**
   - Quick reference modal containing all formulas for MAE, RMSE, R², Adjusted R², Normal Equation, Gradient Descent, Sigmoid, Log Loss, Gini Impurity, Gini Gain, Silhouette, and PCA Variance.

7. **Local Storage Persistence**
   - All your answers, written Python code, flagged questions, and progress are saved in your browser's `localStorage`. You won't lose your work if you refresh the page.
