// CML End-Term Practice Sheet: Group B - Complete Question Database
// Scaler School of Technology | Classical Machine Learning (Term 5) | Instructor: Chitwan Manchanda

const CML_DATA = {
  metadata: {
    title: "CML End-Term Practice Sheet: Group B",
    subtitle: "Classical Machine Learning | Scaler School of Technology | Term 5 (Batch 2029)",
    instructor: "Chitwan Manchanda",
    examSlot: "Thursday 22 Oct 2026, 1:30 PM to 3:30 PM IST (120 Minutes)",
    totalQuestions: 43,
    sections: {
      A: { count: 20, name: "Section A: Multiple Choice", type: "mcq" },
      B: { count: 15, name: "Section B: Fill in the Blanks", type: "blanks" },
      C: { count: 8, name: "Section C: Coding Challenges", type: "coding" }
    }
  },

  sessions: [
    { id: "S1", name: "Intro to Classical ML", topics: "T, E, P framing; classification vs regression" },
    { id: "S2", name: "Data Preparation", topics: "ordinal vs nominal encoding, leakage, imputation, pipelines" },
    { id: "S3", name: "Linear Regression", topics: "MAE, RMSE, R², normal equation" },
    { id: "S4", name: "Regression Assumptions", topics: "residual plots, VIF" },
    { id: "S5", name: "Gradient Descent", topics: "update rule, learning rate" },
    { id: "S6", name: "Polynomial Regression & Bias-Variance", topics: "choosing degree, adjusted R²" },
    { id: "S7", name: "Regularisation & Cross-Validation", topics: "Ridge, Lasso, scaling, k-fold CV" },
    { id: "S8", name: "Logistic Regression & Classification Metrics", topics: "sigmoid, log-loss, precision, recall, F1, ROC AUC, thresholds, class weights" },
    { id: "S9", name: "k-Nearest Neighbours", topics: "distances, k-NN regression, choosing k" },
    { id: "S10", name: "Decision Trees I", topics: "Gini, entropy, Gini gain, depth and overfitting" },
    { id: "S11", name: "Decision Trees II", topics: "pruning (ccp_alpha), feature importance" },
    { id: "S12", name: "Bagging & Random Forests", topics: "bootstrap, variance reduction, max_features" },
    { id: "S13", name: "Boosting", topics: "AdaBoost / GBM ideas, tuning knobs, overfitting" },
    { id: "S14", name: "Clustering (KMeans)", topics: "initialisation (k-means++, n_init), inertia, elbow, silhouette" },
    { id: "S15", name: "Dimensionality Reduction (PCA)", topics: "explained variance, compression, PCA in a pipeline" }
  ],

  // ==================== SECTION A: 20 MCQs ====================
  sectionA: [
    {
      id: "A1",
      number: 1,
      session: "S1",
      difficulty: "easy",
      type: "conceptual",
      question: "A bank wants a system that flags loan applications that are likely to default. It will learn from 5 years of past applications whose outcomes are known, and the team will judge it by its recall on next quarter's applications. Using Tom Mitchell's definition (task T, experience E, performance P), which mapping is correct?",
      options: [
        "T = recall on next quarter's applications; E = flagging risky applications; P = past applications",
        "T = past applications with known outcomes; E = recall; P = flagging risky applications",
        "T = flag applications likely to default; E = past applications with known outcomes; P = recall on new applications",
        "T = flag applications likely to default; E = recall on new applications; P = past applications with known outcomes"
      ],
      correctIndex: 2, // Option C
      explanation: "Tom Mitchell's formal definition states: 'A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.'\n• Task (T): The operational action the system executes — flagging loan applications likely to default.\n• Experience (E): The historical data the algorithm learns from — 5 years of past loan applications with verified outcomes.\n• Performance (P): The quantitative evaluation metric — recall on next quarter's new applications."
    },
    {
      id: "A2",
      number: 2,
      session: "S2",
      difficulty: "medium",
      type: "applied",
      question: "A column satisfaction takes the values Low, Medium, High. You write OrdinalEncoder().fit(X_train[[\"satisfaction\"]]) without any other arguments and feed the codes to a linear model. What happens, and what is the fix?",
      options: [
        "sklearn detects the natural order, so Low = 0, Medium = 1, High = 2 and nothing needs fixing.",
        "The categories are sorted alphabetically (High = 0, Low = 1, Medium = 2), so the real order is scrambled; pass categories=[[\"Low\", \"Medium\", \"High\"]] to the encoder.",
        "OrdinalEncoder cannot handle strings, so one-hot encoding is the only option.",
        "The codes change randomly every time fit is called, so you must set random_state."
      ],
      correctIndex: 1, // Option B
      explanation: "By default, scikit-learn's OrdinalEncoder sorts string unique values lexicographically (alphabetical order). For ['Low', 'Medium', 'High'], the alphabetical order is High ('H') -> Low ('L') -> Medium ('M'), mapping High=0, Low=1, Medium=2. This corrupts the monotonic order since High is treated as smaller than Low! To preserve natural ordinality, you must pass explicit ordering: categories=[['Low', 'Medium', 'High']]."
    },
    {
      id: "A3",
      number: 3,
      session: "S2",
      difficulty: "medium",
      type: "applied",
      question: "You forecast daily sales from 3 years of data. A teammate uses train_test_split with shuffle=True and adds the feature 'average sales over a 7-day window centred on the day' (it uses the 3 days before and the 3 days after). Test RMSE looks excellent, but the model does badly once deployed. What is the most likely cause and fix?",
      options: [
        "The model underfits; add polynomial features.",
        "RMSE is the wrong metric; report R² instead.",
        "The learning rate is too high; lower it and retrain.",
        "Temporal leakage: the random split and the centred window let the model see future values. Split by time (train on earlier dates, test on later dates) and only build features from the past."
      ],
      correctIndex: 3, // Option D
      explanation: "This problem exhibits two forms of temporal data leakage:\n1. shuffle=True shuffles future timestamps into the training set and past timestamps into the test set.\n2. A centred 7-day rolling window uses sales from t+1, t+2, and t+3 to predict at day t. In real-world deployment, day t+1 hasn't occurred yet! Fix: Use chronological train-test split (train on past, test on future) and strictly trailing/lag rolling windows."
    },
    {
      id: "A4",
      number: 4,
      session: "S3",
      difficulty: "easy",
      type: "numerical",
      question: "True values y = [3, 5, 8, 10] and predictions ŷ = [4, 5, 6, 13]. Using MAE = (1/n) Σ |ŷᵢ - yᵢ| and RMSE = √((1/n) Σ (ŷᵢ - yᵢ)²), which pair is correct?",
      options: [
        "MAE = 1.50, RMSE ≈ 1.87",
        "MAE = 1.50, RMSE = 3.50",
        "MAE = 0.50, RMSE ≈ 1.87",
        "MAE = 3.50, RMSE = 1.50"
      ],
      correctIndex: 0, // Option A
      explanation: "Calculate errors (ŷᵢ - yᵢ):\n• i=1: |4 - 3| = 1, (1)² = 1\n• i=2: |5 - 5| = 0, (0)² = 0\n• i=3: |6 - 8| = 2, (-2)² = 4\n• i=4: |13 - 10| = 3, (3)² = 9\n\nMAE = (1 + 0 + 2 + 3) / 4 = 6 / 4 = 1.50\nMSE = (1 + 0 + 4 + 9) / 4 = 14 / 4 = 3.50\nRMSE = √(3.50) ≈ 1.8708... ≈ 1.87\nNotice that RMSE ≥ MAE always holds (RMSE penalizes the larger error of 3 more heavily)."
    },
    {
      id: "A5",
      number: 5,
      session: "S3",
      difficulty: "medium",
      type: "conceptual",
      question: "Your design matrix contains both height_cm and height_inches (height_inches = height_cm / 2.54). You solve the normal equation θ = (XᵀX)⁻¹ Xᵀy. What goes wrong?",
      options: [
        "Nothing; more features always make the closed form more accurate.",
        "The normal equation only works with a single feature.",
        "The two columns are perfectly collinear, so XᵀX is singular (not invertible). Drop one of the columns, or use a pseudoinverse or Ridge.",
        "The closed form diverges unless the features are scaled first."
      ],
      correctIndex: 2, // Option C
      explanation: "Because height_inches is an exact scalar multiple of height_cm, the columns of X are linearly dependent. Hence, the Gram matrix XᵀX is rank-deficient with determinant = 0 (singular), meaning its inverse (XᵀX)⁻¹ does not exist. Remedies include dropping one duplicate column, adding an L2 Ridge penalty (XᵀX + λI is always invertible), or computing the Moore-Penrose pseudoinverse."
    },
    {
      id: "A6",
      number: 6,
      session: "S4",
      difficulty: "medium",
      type: "applied",
      question: "After fitting OLS, the residuals-vs-fitted plot shows a clear U shape: residuals are positive at both ends and negative in the middle, with roughly constant spread. Which assumption is in trouble, and what is a sensible first remedy?",
      options: [
        "Equal variance; log-transform the target.",
        "Linearity; add a transformed or polynomial term (for example x²) for the feature driving the curve, then re-check the residuals.",
        "Independence; shuffle the rows and refit.",
        "Normality; delete the points with the largest residuals."
      ],
      correctIndex: 1, // Option B
      explanation: "A standard OLS diagnostic checks the residuals vs fitted values plot. Ideally, residuals should be randomly distributed in a horizontal band centered around zero. A systematic parabolic U-shape indicates that the true relationship between X and y is non-linear (violating the Linearity assumption). The standard remedy is to include quadratic or polynomial terms (e.g. x²) or log/power transforms to capture the curvature."
    },
    {
      id: "A7",
      number: 7,
      session: "S5",
      difficulty: "medium",
      type: "numerical",
      question: "You minimise J(w) = (w - 3)² with gradient descent, starting from w = 0 with learning rate η = 0.1. The derivative is dJ/dw = 2(w - 3). What is w after two updates?",
      options: [
        "0.60",
        "1.08",
        "1.20",
        "3.00"
      ],
      correctIndex: 1, // Option B
      explanation: "Gradient descent update rule: wₖ₊₁ = wₖ - η * (dJ/dw).\n• Step 0: w₀ = 0.\n  Gradient g₀ = 2(0 - 3) = -6.\n  w₁ = 0 - 0.1 * (-6) = 0 + 0.6 = 0.60.\n• Step 1: w₁ = 0.60.\n  Gradient g₁ = 2(0.60 - 3) = 2(-2.4) = -4.80.\n  w₂ = 0.60 - 0.1 * (-4.80) = 0.60 + 0.48 = 1.08."
    },
    {
      id: "A8",
      number: 8,
      session: "S6",
      difficulty: "medium",
      type: "applied",
      question: "You fit polynomial regression of different degrees and record: degree 1: train MSE 38.2, validation MSE 40.1; degree 3: train 11.6, validation 13.0; degree 6: train 9.8, validation 12.4; degree 12: train 1.9, validation 55.7. Which degree should you pick?",
      options: [
        "Degree 12, because it has the lowest training MSE.",
        "Degree 1, because the simplest model is always best.",
        "Degree 3, because its train and validation MSE are closest to each other.",
        "Degree 6, because it has the lowest validation MSE; degree 12 overfits (high variance) and degree 1 underfits (high bias)."
      ],
      correctIndex: 3, // Option D
      explanation: "Model selection must prioritize performance on unseen/validation data. Degree 6 achieves the lowest validation MSE (12.4). Degree 12 exhibits severe overfitting (high variance) — train error is tiny (1.9) but validation error explodes (55.7). Degree 1 exhibits underfitting (high bias, 40.1 val MSE)."
    },
    {
      id: "A9",
      number: 9,
      session: "S7",
      difficulty: "medium",
      type: "conceptual",
      question: "On standardised features you increase the Ridge penalty alpha (λ) from 0.001 to 1000. Which statement is typically true?",
      options: [
        "Training MSE keeps falling and the weights grow larger.",
        "Most weights become exactly zero, just as with Lasso.",
        "Training MSE rises as the weights are shrunk toward 0; a very large alpha underfits.",
        "Alpha has no effect once the features are standardised."
      ],
      correctIndex: 2, // Option C
      explanation: "Ridge regression minimizes J(w) = MSE + α Σ wⱼ². As α increases, the loss heavily penalizes large weights, forcing them closer to 0 (shrinkage). This restricts model flexibility, which reduces variance but increases bias, causing training MSE to rise. At very large α (e.g. 1000), the model underfits. Note: Ridge shrinks weights asymptotically toward 0, but unlike Lasso (L1), it does not set them to exact zero."
    },
    {
      id: "A10",
      number: 10,
      session: "S7",
      difficulty: "medium",
      type: "conceptual",
      question: "Why should you scale features (fit the scaler on the training set) before Ridge, Lasso or Elastic Net?",
      options: [
        "The penalty acts on weight sizes, and weight sizes depend on each feature's units. Without scaling, a feature in large units gets a tiny weight and is hardly penalised, while a feature in small units is penalised heavily.",
        "Scaling makes the MSE convex; without it Ridge has many local minima.",
        "sklearn's Ridge raises an error when features are not scaled.",
        "Scaling removes the need to choose alpha with cross-validation."
      ],
      correctIndex: 0, // Option A
      explanation: "Regularization adds a penalty term like λ Σ wⱼ² or λ Σ |wⱼ|. If feature X₁ is measured in centimeters (e.g. 180) and X₂ in meters (e.g. 1.8), w₂ must be 100 times larger than w₁ to produce the same impact on y. Consequently, w₂² is penalized 10,000 times more severely simply due to measurement units! Scaling gives all features zero mean and unit variance so weights are penalized fairly."
    },
    {
      id: "A11",
      number: 11,
      session: "S8",
      difficulty: "easy",
      type: "numerical",
      question: "A logistic regression model has score z = wᵀx + w₀ with w = (2, -1) and w₀ = -1. For x = (1.5, 1), what are z, p̂ = σ(z) = 1 / (1 + e⁻ᶻ), and the predicted class with threshold 0.5?",
      options: [
        "z = 1, p̂ ≈ 0.27, predict 0",
        "z = 3, p̂ ≈ 0.95, predict 1",
        "z = -1, p̂ ≈ 0.27, predict 0",
        "z = 1, p̂ ≈ 0.73, predict 1"
      ],
      correctIndex: 3, // Option D
      explanation: "Calculate linear score z:\nz = (2)(1.5) + (-1)(1) + (-1) = 3 - 1 - 1 = 1.\nApply sigmoid σ(z):\np̂ = 1 / (1 + e⁻¹) = 1 / (1 + 0.367879) = 1 / 1.367879 ≈ 0.7311 ≈ 0.73.\nSince p̂ = 0.73 ≥ 0.5 (threshold), the predicted class is 1."
    },
    {
      id: "A12",
      number: 12,
      session: "S8",
      difficulty: "medium",
      type: "applied",
      question: "An email spam filter moves suspected spam to a junk folder. Losing a genuine email to junk is very costly for users; letting a little spam reach the inbox is only mildly annoying. Treating spam as the positive class, which metric should you prioritise, and which way should you move the decision threshold?",
      options: [
        "Precision; raise the threshold so that only very confident spam is moved.",
        "Recall; lower the threshold so that more spam is caught.",
        "Accuracy; keep the threshold fixed at 0.5.",
        "Recall; raise the threshold."
      ],
      correctIndex: 0, // Option A
      explanation: "In spam detection where spam = positive:\n• False Positive (FP) = genuine email sent to junk (disastrous for user).\n• False Negative (FN) = spam arrives in inbox (minor inconvenience).\nPrecision = TP / (TP + FP). To minimize False Positives, we maximize Precision. We achieve this by raising the classification threshold (e.g. from 0.5 to 0.85) so the model only marks an email as spam when it is exceedingly confident."
    },
    {
      id: "A13",
      number: 13,
      session: "S8",
      difficulty: "medium",
      type: "numerical",
      question: "For one example with true label y = 1, which predicted probability p̂ gives the largest log-loss ℓ = -(y log p̂ + (1 - y) log(1 - p̂))?",
      options: [
        "p̂ = 0.99",
        "p̂ = 0.60",
        "p̂ = 0.50",
        "p̂ = 0.05"
      ],
      correctIndex: 3, // Option D
      explanation: "When true label y = 1, the binary cross-entropy loss simplifies to ℓ = -ln(p̂).\n• p̂ = 0.99: ℓ = -ln(0.99) ≈ 0.010\n• p̂ = 0.60: ℓ = -ln(0.60) ≈ 0.511\n• p̂ = 0.50: ℓ = -ln(0.50) ≈ 0.693\n• p̂ = 0.05: ℓ = -ln(0.05) ≈ 2.996 (largest!)\nLog-loss heavily penalizes predictions that are confident and wrong."
    },
    {
      id: "A14",
      number: 14,
      session: "S9",
      difficulty: "easy",
      type: "numerical",
      question: "k-NN regression with k = 2 and Euclidean distance. Training points (x₁, x₂) → y: (1, 1) → 10, (2, 4) → 18, (4, 2) → 14, (5, 5) → 26, (7, 1) → 20. What is the prediction for the query (3, 3)?",
      options: [
        "17.60",
        "22.00",
        "16.00",
        "19.33"
      ],
      correctIndex: 2, // Option C
      explanation: "Compute squared Euclidean distance d² = (x₁ - 3)² + (x₂ - 3)² to query (3, 3):\n• (1, 1): (1-3)² + (1-3)² = 4 + 4 = 8\n• (2, 4): (2-3)² + (4-3)² = 1 + 1 = 2 (Nearest)\n• (4, 2): (4-3)² + (2-3)² = 1 + 1 = 2 (Nearest)\n• (5, 5): (5-3)² + (5-3)² = 4 + 4 = 8\n• (7, 1): (7-3)² + (1-3)² = 16 + 4 = 20\n\nThe k=2 nearest neighbors are (2, 4) with y=18 and (4, 2) with y=14.\nPrediction = (18 + 14) / 2 = 32 / 2 = 16.00."
    },
    {
      id: "A15",
      number: 15,
      session: "S10",
      difficulty: "easy",
      type: "numerical",
      question: "Which decision-tree node has Gini impurity 0.32, using Gini = 1 - Σ p_c²?",
      options: [
        "9 samples of class A and 1 of class B",
        "8 samples of class A and 2 of class B",
        "5 samples of class A and 5 of class B",
        "10 samples of class A and 0 of class B"
      ],
      correctIndex: 1, // Option B
      explanation: "Formula: Gini = 1 - (p_A² + p_B²).\n• Option A (9A, 1B): p_A=0.9, p_B=0.1 → Gini = 1 - (0.81 + 0.01) = 0.18.\n• Option B (8A, 2B): p_A=0.8, p_B=0.2 → Gini = 1 - (0.64 + 0.04) = 1 - 0.68 = 0.32 (Exact match!)\n• Option C (5A, 5B): p_A=0.5, p_B=0.5 → Gini = 1 - (0.25 + 0.25) = 0.50.\n• Option D (10A, 0B): Pure node → Gini = 0.00."
    },
    {
      id: "A16",
      number: 16,
      session: "S11",
      difficulty: "medium",
      type: "applied",
      question: "A decision tree is fitted on loan data where loan_purpose was one-hot encoded into 4 columns. feature_importances_ gives: purpose_auto 0.06, purpose_education 0.04, purpose_home 0.03, purpose_personal 0.01, and credit_score 0.10. Which statement is correct?",
      options: [
        "Importance is reported per dummy column. Summing the dummies gives 0.14 for loan_purpose as a whole, which is more than credit_score's 0.10 in this fitted tree.",
        "loan_purpose is unimportant because every one of its dummies is below credit_score.",
        "Importances are like logistic regression coefficients, so their signs show the direction of the effect.",
        "With one-hot encoding the dummies of one category must all have equal importance."
      ],
      correctIndex: 0, // Option A
      explanation: "In scikit-learn decision trees, feature importance represents total Gini impurity reduction attributed to splits on each input column. One-hot encoding fragments the categorical variable's total predictive power across separate dummy columns. Summing the dummy importances (0.06 + 0.04 + 0.03 + 0.01 = 0.14) gives the true aggregate importance of loan_purpose, which exceeds credit_score (0.10)."
    },
    {
      id: "A17",
      number: 17,
      session: "S12",
      difficulty: "medium",
      type: "conceptual",
      question: "Bagging (bootstrap aggregating) usually gives the biggest test-set improvement when the base model is:",
      options: [
        "A decision stump (max_depth = 1), because bagging mainly removes bias.",
        "A linear regression with no features.",
        "A deep, unpruned decision tree, because it has low bias but high variance, and averaging many such trees reduces the variance.",
        "Any model; bagging improves all models by the same amount."
      ],
      correctIndex: 2, // Option C
      explanation: "Bagging works by creating bootstrap datasets and averaging predictions from multiple models. Mathematically, averaging independent estimators reduces variance by a factor of M while preserving individual bias: Var(mean) ≈ Var(individual)/M. Deep unpruned decision trees have very low bias (they fit training data almost perfectly) but high variance. Bagging eliminates their variance, yielding dramatic test-set gains (the foundational principle of Random Forests)."
    },
    {
      id: "A18",
      number: 18,
      session: "S13",
      difficulty: "medium",
      type: "applied",
      question: "A gradient boosting model with learning_rate = 1.0, n_estimators = 2000 and max_depth = 6 reaches 100% training accuracy, but its test accuracy is lower than the same model with n_estimators = 200. What is the most sensible next step?",
      options: [
        "Raise the learning rate further so that it converges faster.",
        "Replace boosting with bagging of 2000 stumps.",
        "Remove the test set and report training accuracy.",
        "It is overfitting: use a smaller learning rate, shallower trees (max_depth around 2 to 4), and choose the number of trees with a validation set or early stopping."
      ],
      correctIndex: 3, // Option D
      explanation: "Unlike Random Forests (which resist overfitting as trees are added), Gradient Boosting fits successive trees to residual pseudo-errors. Combining a large learning rate (1.0), deep base trees (depth 6), and 2000 estimators leads to extreme overfitting. Best practices in boosting: use a shrinkage learning rate (e.g. 0.05 to 0.1), shallow weak learners (depth 2 to 4), and select n_estimators using cross-validation or early stopping."
    },
    {
      id: "A19",
      number: 19,
      session: "S14",
      difficulty: "medium",
      type: "conceptual",
      question: "You run KMeans(n_clusters=4, init=\"random\", n_init=1) on the same data five times, changing only random_state. The final inertia values are 812, 795, 1640, 803 and 2210. What best explains this, and what is the standard fix?",
      options: [
        "The data changes between runs; fix it by calling fit only once.",
        "KMeans only converges to a local minimum that depends on the starting centroids. Use init=\"k-means++\" (spread-out seeds) and n_init > 1, keeping the run with the lowest inertia.",
        "Inertia is random noise; report the average of the five values.",
        "The runs with higher inertia show that k is too small, so k should be increased until all runs agree."
      ],
      correctIndex: 1, // Option B
      explanation: "The standard Lloyd's algorithm for KMeans is an iterative heuristic guaranteed only to converge to a local minimum, which strongly depends on initial centroid placement. When centroids are initialized randomly (init='random', n_init=1), poor seeds result in sub-optimal cluster configurations (high inertias 1640 and 2210). The standard fix is k-means++ initialization (which spaces initial seeds far apart probabilistically) and n_init > 1 (running multiple restarts and retaining the minimum inertia run)."
    },
    {
      id: "A20",
      number: 20,
      session: "S15",
      difficulty: "medium",
      type: "numerical",
      question: "Two standardised columns have correlation r = 0.5. PCA is run on these two columns. What share of the total variance does PC1 explain?",
      options: [
        "75%",
        "50%",
        "25%",
        "100%"
      ],
      correctIndex: 0, // Option A
      explanation: "For two standardised variables (unit variance), the 2x2 covariance/correlation matrix is:\nC = [[1, r], [r, 1]] = [[1, 0.5], [0.5, 1]].\nTotal variance = trace(C) = 1 + 1 = 2.0.\nThe eigenvalues solve det(C - λI) = (1 - λ)² - r² = 0:\n(1 - λ) = ±r → λ₁ = 1 + r = 1.5, and λ₂ = 1 - r = 0.5.\nShare of total variance explained by PC1 = λ₁ / (λ₁ + λ₂) = 1.5 / 2.0 = 0.75 = 75%."
    }
  ],

  // ==================== SECTION B: 15 FILL IN THE BLANKS ====================
  sectionB: [
    {
      id: "B1",
      number: 1,
      session: "S1",
      difficulty: "easy",
      type: "conceptual",
      text: "Predicting a house's sale price in rupees is a [blank_1] task, while predicting whether a customer will churn (Yes/No) is a [blank_2] task.",
      blanks: [
        { id: "b1_1", label: "Blank 1", answers: ["regression", "continuous", "regression task"], hint: "Predicting a real continuous number" },
        { id: "b1_2", label: "Blank 2", answers: ["classification", "binary classification", "categorical"], hint: "Predicting a discrete category/label" }
      ],
      explanation: "• Continuous target (house price in rupees) = Regression task.\n• Discrete categorical target with finite outcomes (Yes/No churn) = Classification (specifically binary classification) task."
    },
    {
      id: "B2",
      number: 2,
      session: "S2",
      difficulty: "easy",
      type: "conceptual",
      text: "T-shirt size (S, M, L, XL) is a(n) [blank_1] categorical feature and is usually encoded with [blank_2] (with the order given explicitly). Payment method (UPI, card, cash) is a(n) [blank_3] feature and is usually encoded with [blank_4].",
      blanks: [
        { id: "b2_1", label: "Blank 1", answers: ["ordinal"], hint: "Has a natural ranking/ordering" },
        { id: "b2_2", label: "Blank 2", answers: ["OrdinalEncoder", "ordinal encoding", "Ordinal Encoder"], hint: "scikit-learn transformer preserving order" },
        { id: "b2_3", label: "Blank 3", answers: ["nominal"], hint: "No inherent ranking among categories" },
        { id: "b2_4", label: "Blank 4", answers: ["OneHotEncoder", "one-hot encoding", "one hot encoding", "One Hot Encoder"], hint: "Creates binary dummy columns" }
      ],
      explanation: "• Ordinal data possesses an intrinsic natural hierarchy (S < M < L < XL), represented via OrdinalEncoder.\n• Nominal data lacks any natural order (UPI, card, cash are unordered categories), represented via OneHotEncoder to prevent artificial distance assumptions."
    },
    {
      id: "B3",
      number: 3,
      session: "S2",
      difficulty: "easy",
      type: "applied",
      text: "For a skewed numeric feature with outliers, fill missing values with the [blank_1] (mean / median), computed on the [blank_2] set only and then reused for the test set.",
      blanks: [
        { id: "b3_1", label: "Blank 1", answers: ["median"], hint: "Robust measure of central tendency" },
        { id: "b3_2", label: "Blank 2", answers: ["train", "training", "train set", "training set"], hint: "Fit statistics here to prevent data leakage" }
      ],
      explanation: "The median is robust to extreme outliers and heavy skewness (unlike the mean, which is pulled by extreme values). To prevent data leakage, imputation parameters must be computed strictly on the training set and then applied to transform both train and test sets."
    },
    {
      id: "B4",
      number: 4,
      session: "S3",
      difficulty: "medium",
      type: "numerical",
      text: "A model predicts weekly sales (in thousands of units) for four stores. True values y = [2, 4, 9, 13] and predictions ŷ = [3, 6, 8, 11]. Using R² = 1 - (Σ(ŷᵢ - yᵢ)²) / (Σ(ȳ - yᵢ)²), R² = [blank_1] (3 decimals).",
      blanks: [
        { id: "b4_1", label: "R² (3 decimals)", answers: ["0.865", ".865"], hint: "Calculate ȳ, TSS, and RSS first" }
      ],
      explanation: "Step-by-step:\n• ȳ = (2 + 4 + 9 + 13) / 4 = 28 / 4 = 7.0\n• Total Sum of Squares (TSS) = Σ (yᵢ - ȳ)²:\n  (2-7)² = 25\n  (4-7)² = 9\n  (9-7)² = 4\n  (13-7)² = 36\n  TSS = 25 + 9 + 4 + 36 = 74\n• Residual Sum of Squares (RSS) = Σ (ŷᵢ - yᵢ)²:\n  (3-2)² = 1\n  (6-4)² = 4\n  (8-9)² = 1\n  (11-13)² = 4\n  RSS = 1 + 4 + 1 + 4 = 10\n• R² = 1 - (RSS / TSS) = 1 - (10 / 74) = 1 - 0.135135... = 0.864864... ≈ 0.865."
    },
    {
      id: "B5",
      number: 5,
      session: "S4",
      difficulty: "easy",
      type: "numerical",
      text: "Regressing feature j on all the other features gives Rⱼ² = 0.8. Its variance inflation factor VIFⱼ = 1 / (1 - Rⱼ²) = [blank_1], which is at the edge of the usual rule of thumb (investigate when VIF > 5 to 10).",
      blanks: [
        { id: "b5_1", label: "VIF", answers: ["5", "5.0", "5.00"], hint: "Compute 1 / (1 - 0.8)" }
      ],
      explanation: "VIFⱼ = 1 / (1 - Rⱼ²) = 1 / (1 - 0.8) = 1 / 0.2 = 5. A VIF value exceeding 5 to 10 indicates that 80% to 90% of feature j's variance is collinear with other regressors, inflating parameter variance."
    },
    {
      id: "B6",
      number: 6,
      session: "S5",
      difficulty: "medium",
      type: "numerical",
      text: "Model ŷ = w · x (no intercept) with MSE loss J(w) = (1/n) Σ (wxᵢ - yᵢ)², so dJ/dw = (2/n) Σ (wxᵢ - yᵢ)xᵢ. Data: (x, y) = (1, 2) and (2, 4). Starting at w = 0 with η = 0.05, the gradient is [blank_1] and w after one update is [blank_2].",
      blanks: [
        { id: "b6_1", label: "Gradient dJ/dw", answers: ["-10", "-10.0"], hint: "Evaluate dJ/dw at w = 0" },
        { id: "b6_2", label: "w after 1 update", answers: ["0.5", "0.50", "+0.5"], hint: "w₁ = w₀ - η * gradient" }
      ],
      explanation: "Here n = 2 points: (1, 2) and (2, 4).\nAt w = 0:\n• i=1: (0*1 - 2)*1 = -2\n• i=2: (0*2 - 4)*2 = -4*2 = -8\n• Sum = -2 + (-8) = -10\n• Gradient dJ/dw = (2 / 2) * (-10) = -10.\nUpdate rule:\nw₁ = w₀ - η * (dJ/dw) = 0 - 0.05 * (-10) = +0.5."
    },
    {
      id: "B7",
      number: 7,
      session: "S6",
      difficulty: "medium",
      type: "numerical",
      text: "A polynomial model fitted on n = 21 training points has p = 5 feature columns (after PolynomialFeatures) and training R² = 0.80. Adjusted R² = 1 - (1 - R²) * (n - 1) / (n - p - 1) = [blank_1] (3 decimals).",
      blanks: [
        { id: "b7_1", label: "Adjusted R² (3 decimals)", answers: ["0.733", ".733"], hint: "Plug in n=21, p=5, R²=0.80" }
      ],
      explanation: "Given n = 21, p = 5, R² = 0.80:\n• n - 1 = 20\n• n - p - 1 = 21 - 5 - 1 = 15\n• (n - 1) / (n - p - 1) = 20 / 15 = 4 / 3 ≈ 1.3333...\n• 1 - R² = 1 - 0.80 = 0.20\n• Adjusted R² = 1 - 0.20 * (4 / 3) = 1 - 0.266667 = 0.73333... ≈ 0.733."
    },
    {
      id: "B8",
      number: 8,
      session: "S7",
      difficulty: "easy",
      type: "numerical",
      text: "Weights w = (2, -1, 0, 3) and λ = 0.5. The Lasso penalty λ Σⱼ |wⱼ| = [blank_1] and the Ridge penalty λ Σⱼ wⱼ² = [blank_2].",
      blanks: [
        { id: "b8_1", label: "Lasso penalty", answers: ["3", "3.0"], hint: "0.5 * (|2| + |-1| + |0| + |3|)" },
        { id: "b8_2", label: "Ridge penalty", answers: ["7", "7.0"], hint: "0.5 * (2² + (-1)² + 0² + 3²)" }
      ],
      explanation: "• L1 (Lasso): Σ |wⱼ| = |2| + |-1| + |0| + |3| = 2 + 1 + 0 + 3 = 6. Penalty = 0.5 * 6 = 3.0.\n• L2 (Ridge): Σ wⱼ² = 2² + (-1)² + 0² + 3² = 4 + 1 + 0 + 9 = 14. Penalty = 0.5 * 14 = 7.0."
    },
    {
      id: "B9",
      number: 9,
      session: "S8",
      difficulty: "easy",
      type: "numerical",
      text: "A classifier has TP = 45, FP = 15, FN = 5. Precision = [blank_1], recall = [blank_2] and F1 = [blank_3] (3 decimals).",
      blanks: [
        { id: "b9_1", label: "Precision", answers: ["0.75", "0.750", "75%"], hint: "TP / (TP + FP)" },
        { id: "b9_2", label: "Recall", answers: ["0.9", "0.90", "0.900", "90%"], hint: "TP / (TP + FN)" },
        { id: "b9_3", label: "F1 Score (3 decimals)", answers: ["0.818", ".818"], hint: "2 * (P * R) / (P + R)" }
      ],
      explanation: "• Precision = TP / (TP + FP) = 45 / (45 + 15) = 45 / 60 = 0.75.\n• Recall = TP / (TP + FN) = 45 / (45 + 5) = 45 / 50 = 0.90.\n• F1 = 2 * (Precision * Recall) / (Precision + Recall) = 2 * 0.75 * 0.90 / (0.75 + 0.90) = 1.35 / 1.65 = 9 / 11 ≈ 0.81818... ≈ 0.818."
    },
    {
      id: "B10",
      number: 10,
      session: "S8",
      difficulty: "medium",
      type: "numerical",
      text: "A logistic regression model outputs p̂ = 0.8 for a customer. The odds p / (1 - p) = [blank_1] and the log-odds (natural log) = [blank_2], which equals the linear score z = wᵀx + w₀.",
      blanks: [
        { id: "b10_1", label: "Odds", answers: ["4", "4.0"], hint: "0.8 / (1 - 0.8)" },
        { id: "b10_2", label: "Log-odds (3 decimals)", answers: ["1.386", "ln(4)", "ln 4", "1.39"], hint: "ln(4)" }
      ],
      explanation: "• Odds = p / (1 - p) = 0.8 / (1 - 0.8) = 0.8 / 0.2 = 4.\n• Log-odds (logit) = ln(Odds) = ln(4) ≈ 1.38629... ≈ 1.386.\nRecall that in logistic regression, ln(p / (1-p)) is directly equal to the linear combination wᵀx + w₀."
    },
    {
      id: "B11",
      number: 11,
      session: "S9",
      difficulty: "easy",
      type: "numerical",
      text: "For the points (2, -1) and (8, 7), the Euclidean distance is [blank_1] and the Manhattan distance is [blank_2].",
      blanks: [
        { id: "b11_1", label: "Euclidean distance", answers: ["10", "10.0"], hint: "√((8-2)² + (7-(-1))²)" },
        { id: "b11_2", label: "Manhattan distance", answers: ["14", "14.0"], hint: "|8-2| + |7-(-1)|" }
      ],
      explanation: "Differences: Δx = 8 - 2 = 6, Δy = 7 - (-1) = 8.\n• Euclidean (L2) distance = √(6² + 8²) = √(36 + 64) = √100 = 10.\n• Manhattan (L1) distance = |6| + |8| = 6 + 8 = 14."
    },
    {
      id: "B12",
      number: 12,
      session: "S10",
      difficulty: "medium",
      type: "numerical",
      text: "A parent node has 5 samples of class A and 5 of class B (Gini 0.5). A split sends 4 A and 0 B to the left and 1 A and 5 B to the right. The weighted child Gini is [blank_1] and the Gini gain is [blank_2] (3 decimals).",
      blanks: [
        { id: "b12_1", label: "Weighted child Gini", answers: ["0.167", ".167", "0.1667", "1/6"], hint: "(4/10)*Gini_left + (6/10)*Gini_right" },
        { id: "b12_2", label: "Gini gain", answers: ["0.333", ".333", "0.3333", "1/3"], hint: "Gini_parent - weighted_child_Gini" }
      ],
      explanation: "Total samples = 10.\n• Left node: 4 samples (4 A, 0 B) → Pure node: Gini_L = 1 - (1² + 0²) = 0.\n• Right node: 6 samples (1 A, 5 B) → p_A = 1/6, p_B = 5/6.\n  Gini_R = 1 - ((1/6)² + (5/6)²) = 1 - (1/36 + 25/36) = 10/36 = 5/18 ≈ 0.2778.\n• Weighted child Gini = (4/10)*0 + (6/10)*(10/36) = 6/36 = 1/6 ≈ 0.166667... ≈ 0.167.\n• Gini gain = Gini_parent - weighted_child_Gini = 0.5 - (1/6) = (3/6) - (1/6) = 2/6 = 1/3 ≈ 0.33333... ≈ 0.333."
    },
    {
      id: "B13",
      number: 13,
      session: "S12",
      difficulty: "easy",
      type: "numerical",
      text: "A RandomForestClassifier with max_features=\"sqrt\" is trained on 36 features. At each split it considers [blank_1] randomly chosen features.",
      blanks: [
        { id: "b13_1", label: "Number of features", answers: ["6", "6.0"], hint: "√36" }
      ],
      explanation: "When max_features='sqrt', the number of candidate features randomly sampled at each candidate split is ⌊√p⌋. For p = 36 features: √36 = 6."
    },
    {
      id: "B14",
      number: 14,
      session: "S14",
      difficulty: "easy",
      type: "numerical",
      text: "For a point i, the mean distance to the other points in its own cluster is a(i) = 1.2 and the mean distance to the points of the nearest other cluster is b(i) = 3.0. Its silhouette s(i) = (b - a) / max(a, b) = [blank_1].",
      blanks: [
        { id: "b14_1", label: "Silhouette score", answers: ["0.6", "0.60"], hint: "(3.0 - 1.2) / max(1.2, 3.0)" }
      ],
      explanation: "Given a(i) = 1.2, b(i) = 3.0:\n• b(i) - a(i) = 3.0 - 1.2 = 1.8.\n• max(a(i), b(i)) = max(1.2, 3.0) = 3.0.\n• Silhouette s(i) = 1.8 / 3.0 = 0.60.\nA score of 0.6 indicates strong, compact cluster membership well separated from neighbors."
    },
    {
      id: "B15",
      number: 15,
      session: "S15",
      difficulty: "medium",
      type: "numerical",
      text: "1,000 images have 100 pixel columns each (100,000 numbers). PCA keeps k = 10 components. To store the compressed data you keep 10 numbers per image, the 10 components (100 numbers each) and the mean image (100 numbers): [blank_1] numbers in total, a compression ratio of about [blank_2] x.",
      blanks: [
        { id: "b15_1", label: "Total numbers stored", answers: ["11100", "11,100"], hint: "1000*10 + 10*100 + 100" },
        { id: "b15_2", label: "Compression ratio", answers: ["9", "9x", "9.0", "9.01", "9.01x"], hint: "100,000 / 11,100" }
      ],
      explanation: "Total storage breakdown:\n• Transformed projections: 1,000 images × 10 principal coordinates = 10,000 numbers.\n• Principal component vectors (eigenvectors): 10 components × 100 pixel weights = 1,000 numbers.\n• Feature means: 1 mean image vector = 100 numbers.\n• Total = 10,000 + 1,000 + 100 = 11,100 numbers.\n• Compression ratio = 100,000 / 11,100 = 9.009... ≈ 9x (or ~9.01x)."
    }
  ],

  // ==================== SECTION C: 8 CODING CHALLENGES ====================
  sectionC: [
    {
      id: "C1",
      number: 1,
      title: "Regression metrics from scratch",
      session: "S3",
      difficulty: "easy",
      prompt: `Write regression_metrics(y_true, y_pred) using numpy only (no sklearn.metrics inside the function). It returns a dict with keys "mae", "rmse" and "r2", each rounded to 4 decimals:

MAE = (1/n) Σ |ŷᵢ - yᵢ|
RMSE = √((1/n) Σ (ŷᵢ - yᵢ)²)
R² = 1 - (Σ (ŷᵢ - yᵢ)²) / (Σ (ȳ - yᵢ)²)

Test it on house prices (in lakhs):
y_true = [250, 310, 180, 420, 365, 295]
y_pred = [265, 300, 200, 390, 370, 310]

Then confirm your numbers match sklearn's mean_absolute_error, mean_squared_error and r2_score. In one line, explain why RMSE ≥ MAE here.`,
      starterCode: `import numpy as np

def regression_metrics(y_true, y_pred):
    """
    Returns dict with keys: 'mae', 'rmse', 'r2', rounded to 4 decimals.
    Uses numpy only, no sklearn inside.
    """
    y_true = np.asarray(y_true, dtype=float)
    y_pred = np.asarray(y_pred, dtype=float)
    
    # TODO: compute MAE
    mae = 0.0
    
    # TODO: compute RMSE
    rmse = 0.0
    
    # TODO: compute R²
    r2 = 0.0
    
    return {
        "mae": round(float(mae), 4),
        "rmse": round(float(rmse), 4),
        "r2": round(float(r2), 4)
    }

# Test data
y_true = [250, 310, 180, 420, 365, 295]
y_pred = [265, 300, 200, 390, 370, 310]

metrics = regression_metrics(y_true, y_pred)
print("Computed Metrics:", metrics)
`,
      solutionCode: `import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def regression_metrics(y_true, y_pred):
    y_true = np.asarray(y_true, dtype=float)
    y_pred = np.asarray(y_pred, dtype=float)
    
    # 1. Mean Absolute Error
    mae = np.mean(np.abs(y_pred - y_true))
    
    # 2. Root Mean Squared Error
    rmse = np.sqrt(np.mean((y_pred - y_true) ** 2))
    
    # 3. Coefficient of Determination R²
    ss_res = np.sum((y_pred - y_true) ** 2)
    ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
    r2 = 1.0 - (ss_res / ss_tot)
    
    return {
        "mae": round(float(mae), 4),
        "rmse": round(float(rmse), 4),
        "r2": round(float(r2), 4)
    }

# Verification
y_true = [250, 310, 180, 420, 365, 295]
y_pred = [265, 300, 200, 390, 370, 310]
res = regression_metrics(y_true, y_pred)
print("Manual implementation:", res)

# sklearn check
sk_mae = round(mean_absolute_error(y_true, y_pred), 4)
sk_rmse = round(np.sqrt(mean_squared_error(y_true, y_pred)), 4)
sk_r2 = round(r2_score(y_true, y_pred), 4)
print(f"sklearn match: MAE={sk_mae == res['mae']}, RMSE={sk_rmse == res['rmse']}, R2={sk_r2 == res['r2']}")
print("Why RMSE >= MAE: By Cauchy-Schwarz / Jensen's inequality, sqrt(E[e^2]) >= E[|e|] since variance of absolute error Var(|e|) = E[e^2] - (E[|e|])^2 >= 0.")
`,
      expectedOutput: `Computed Metrics: {'mae': 15.8333, 'rmse': 17.6777, 'r2': 0.9473}`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("15.8333") && userCodeOutput.includes("17.6777") && userCodeOutput.includes("0.9473");
      }
    },
    {
      id: "C2",
      number: 2,
      title: "Sigmoid, thresholds and log-loss",
      session: "S8",
      difficulty: "easy",
      prompt: `Implement, with numpy only:
1. sigmoid(z) = 1 / (1 + e⁻ᶻ)
2. predict_proba_manual(X, w, b) that returns p̂ = σ(Xw + b)
3. predict_label(p, threshold=0.5) that returns 1 when p̂ ≥ threshold and 0 otherwise
4. log_loss_manual(y, p) = -(1/n) Σ [yᵢ log p̂ᵢ + (1 - yᵢ) log(1 - p̂ᵢ)] (clip p̂ to [10⁻¹⁵, 1 - 10⁻¹⁵])

Use:
X = [[0.5, 1.2], [1.5, -0.3], [-1.0, 0.8], [2.0, 1.0], [0.0, 0.0]]
w = [1.2, -0.7]
b = -0.2
y = [0, 1, 0, 1, 1]

Print p̂ (4 decimals), the labels at threshold 0.5 and at 0.3, and the log-loss.
Compare log-loss with sklearn.metrics.log_loss.
Which example changes label when threshold drops to 0.3, and does that help recall?`,
      starterCode: `import numpy as np

def sigmoid(z):
    # TODO: implement sigmoid
    return np.zeros_like(z)

def predict_proba_manual(X, w, b):
    # TODO: compute z = Xw + b, return sigmoid(z)
    return np.zeros(len(X))

def predict_label(p, threshold=0.5):
    # TODO: return 1 if p >= threshold else 0
    return np.zeros_like(p, dtype=int)

def log_loss_manual(y, p):
    # TODO: clip p to [1e-15, 1 - 1e-15], compute cross-entropy
    return 0.0

X = [[0.5, 1.2], [1.5, -0.3], [-1.0, 0.8], [2.0, 1.0], [0.0, 0.0]]
w = [1.2, -0.7]
b = -0.2
y = [0, 1, 0, 1, 1]

p = predict_proba_manual(X, w, b)
print("p (probs):", np.round(p, 4))
print("Labels at 0.5:", predict_label(p, 0.5))
print("Labels at 0.3:", predict_label(p, 0.3))
print("Log Loss:", round(log_loss_manual(y, p), 4))
`,
      solutionCode: `import numpy as np
from sklearn.metrics import log_loss

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

def predict_proba_manual(X, w, b):
    X = np.asarray(X)
    w = np.asarray(w)
    z = np.dot(X, w) + b
    return sigmoid(z)

def predict_label(p, threshold=0.5):
    return (np.asarray(p) >= threshold).astype(int)

def log_loss_manual(y, p):
    y = np.asarray(y, dtype=float)
    p = np.asarray(p, dtype=float)
    p = np.clip(p, 1e-15, 1.0 - 1e-15)
    return float(-np.mean(y * np.log(p) + (1.0 - y) * np.log(1.0 - p)))

X = [[0.5, 1.2], [1.5, -0.3], [-1.0, 0.8], [2.0, 1.0], [0.0, 0.0]]
w = [1.2, -0.7]
b = -0.2
y = [0, 1, 0, 1, 1]

p = predict_proba_manual(X, w, b)
labels_5 = predict_label(p, 0.5)
labels_3 = predict_label(p, 0.3)
loss = log_loss_manual(y, p)

print("p (probs):", np.round(p, 4))
print("Labels at 0.5:", labels_5)
print("Labels at 0.3:", labels_3)
print("Log Loss:", round(loss, 4))
print("sklearn log_loss match:", round(log_loss(y, p), 4) == round(loss, 4))
print("Recall analysis: Example 4 (y=1, p=0.4502) flips from 0 to 1, eliminating a False Negative and increasing Recall from 2/3 (66.7%) to 3/3 (100%). Example 0 also flips (0->1), which is a False Positive.")
`,
      expectedOutput: `p: [0.3917, 0.8594, 0.1235, 0.8176, 0.4502]
labels 0.5: [0, 1, 0, 1, 0]
labels 0.3: [1, 1, 0, 1, 1]
log-loss: 0.3560`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("0.3917") && userCodeOutput.includes("0.356");
      }
    },
    {
      id: "C3",
      number: 3,
      title: "Mixed-type preprocessing Pipeline for used-car prices",
      session: "S2 + S3",
      difficulty: "medium",
      prompt: `The given generator creates 500 rows with:
- numeric: age_years, km_driven (with missing values)
- ordinal: condition (Fair < Good < Excellent), owner (1st < 2nd < 3rd+)
- nominal: fuel (Petrol, Diesel, CNG)
- regression target: price_lakh

Tasks:
(a) Build ColumnTransformer:
    numeric -> SimpleImputer(strategy="mean")
    ordinal -> OrdinalEncoder(categories=[["Fair", "Good", "Excellent"], ["1st", "2nd", "3rd+"]])
    nominal -> OneHotEncoder(drop="first")
(b) Put in Pipeline with LinearRegression()
(c) Split train_test_split(test_size=0.2, random_state=0), fit on train only. Print number of preprocessed columns, test MAE and test R².
(d) Refit Pipeline with plain OrdinalEncoder() (no categories). Print categories learned and new test MAE. Which column is hurt and why?
(e) Predict price of a 4-year-old Diesel car with 45,000 km, condition Good, 1st owner.`,
      starterCode: `import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

def make_car_data(n=500, seed=3):
    rng = np.random.default_rng(seed)
    age = rng.integers(1, 13, size=n).astype(float)
    km = (age * rng.normal(11000, 3000, size=n)).clip(2000).round(-2)
    cond = rng.choice(["Fair", "Good", "Excellent"], size=n, p=[0.3, 0.45, 0.25])
    owner = rng.choice(["1st", "2nd", "3rd+"], size=n, p=[0.6, 0.3, 0.1])
    fuel = rng.choice(["Petrol", "Diesel", "CNG"], size=n, p=[0.5, 0.35, 0.15])
    cond_n = pd.Series(cond).map({"Fair": 0, "Good": 1, "Excellent": 2}).to_numpy()
    owner_n = pd.Series(owner).map({"1st": 0, "2nd": 1, "3rd+": 2}).to_numpy()
    fuel_d = pd.Series(fuel).map({"Petrol": 0.0, "Diesel": 0.8, "CNG": -0.6}).to_numpy()
    price = (11 - 0.55 * age - 0.00002 * km + 1.3 * cond_n - 0.6 * owner_n + fuel_d + rng.normal(0, 0.6, size=n)).clip(0.8)
    df = pd.DataFrame({"age_years": age, "km_driven": km, "condition": cond, "owner": owner, "fuel": fuel, "price_lakh": price.round(2)})
    df.loc[rng.choice(n, 25, replace=False), "km_driven"] = np.nan
    df.loc[rng.choice(n, 10, replace=False), "age_years"] = np.nan
    return df

cars = make_car_data()
X = cars.drop(columns="price_lakh")
y = cars["price_lakh"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

# TODO: (a) & (b) Create ColumnTransformer and Pipeline
# TODO: (c) Fit and evaluate test MAE and R²
# TODO: (d) Plain OrdinalEncoder comparison
# TODO: (e) Predict query car
`,
      solutionCode: `import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Data generation
def make_car_data(n=500, seed=3):
    rng = np.random.default_rng(seed)
    age = rng.integers(1, 13, size=n).astype(float)
    km = (age * rng.normal(11000, 3000, size=n)).clip(2000).round(-2)
    cond = rng.choice(["Fair", "Good", "Excellent"], size=n, p=[0.3, 0.45, 0.25])
    owner = rng.choice(["1st", "2nd", "3rd+"], size=n, p=[0.6, 0.3, 0.1])
    fuel = rng.choice(["Petrol", "Diesel", "CNG"], size=n, p=[0.5, 0.35, 0.15])
    cond_n = pd.Series(cond).map({"Fair": 0, "Good": 1, "Excellent": 2}).to_numpy()
    owner_n = pd.Series(owner).map({"1st": 0, "2nd": 1, "3rd+": 2}).to_numpy()
    fuel_d = pd.Series(fuel).map({"Petrol": 0.0, "Diesel": 0.8, "CNG": -0.6}).to_numpy()
    price = (11 - 0.55 * age - 0.00002 * km + 1.3 * cond_n - 0.6 * owner_n + fuel_d + rng.normal(0, 0.6, size=n)).clip(0.8)
    df = pd.DataFrame({"age_years": age, "km_driven": km, "condition": cond, "owner": owner, "fuel": fuel, "price_lakh": price.round(2)})
    df.loc[rng.choice(n, 25, replace=False), "km_driven"] = np.nan
    df.loc[rng.choice(n, 10, replace=False), "age_years"] = np.nan
    return df

cars = make_car_data()
X = cars.drop(columns="price_lakh")
y = cars["price_lakh"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

# (a) ColumnTransformer
ct = ColumnTransformer([
    ('num', SimpleImputer(strategy='mean'), ['age_years', 'km_driven']),
    ('ord', OrdinalEncoder(categories=[['Fair', 'Good', 'Excellent'], ['1st', '2nd', '3rd+']]), ['condition', 'owner']),
    ('nom', OneHotEncoder(drop='first'), ['fuel'])
])

# (b) Pipeline
pipe = Pipeline([('prep', ct), ('model', LinearRegression())])

# (c) Fit and evaluate
pipe.fit(X_tr, y_tr)
preds = pipe.predict(X_te)
num_cols = ct.transform(X_tr).shape[1]
test_mae = mean_absolute_error(y_te, preds)
test_r2 = r2_score(y_te, preds)

print(f"(c) Preprocessed columns: {num_cols}")
print(f"(c) Test MAE: {test_mae:.4f}")
print(f"(c) Test R²: {test_r2:.4f}")

# (d) Plain OrdinalEncoder
ct_plain = ColumnTransformer([
    ('num', SimpleImputer(strategy='mean'), ['age_years', 'km_driven']),
    ('ord', OrdinalEncoder(), ['condition', 'owner']),
    ('nom', OneHotEncoder(drop='first'), ['fuel'])
])
pipe_plain = Pipeline([('prep', ct_plain), ('model', LinearRegression())])
pipe_plain.fit(X_tr, y_tr)
preds_plain = pipe_plain.predict(X_te)
print(f"(d) Plain Ordinal categories: {ct_plain.named_transformers_['ord'].categories_}")
print(f"(d) Plain Test MAE: {mean_absolute_error(y_te, preds_plain):.4f}")
print("(d) Explanation: 'condition' is corrupted because alphabetical sort assigns Excellent=0, Fair=1, Good=2. 'owner' is accidentally unaffected because '1st' < '2nd' < '3rd+' matches alphabetical order.")

# (e) Prediction for query car
query_car = pd.DataFrame([{
    'age_years': 4.0,
    'km_driven': 45000.0,
    'condition': 'Good',
    'owner': '1st',
    'fuel': 'Diesel'
}])
pred_price = pipe.predict(query_car)[0]
print(f"(e) Predicted price for 4-year-old Diesel: {pred_price:.2f} lakhs")
`,
      expectedOutput: `Preprocessed columns: 6
Test MAE: 0.5654
Test R²: 0.9215
Predicted price: ~10.04 lakhs`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("0.565") || userCodeOutput.includes("0.57") || userCodeOutput.includes("10.04");
      }
    },
    {
      id: "C4",
      number: 4,
      title: "Pick the polynomial degree with cross-validated MAE",
      session: "S6 + S7",
      difficulty: "medium",
      prompt: `The cell generates 60 noisy points from y = 4 e^(-x²/2) + 0.8x + noise and splits 75/25 (random_state=42).

(a) Write poly_lr(d) returning Pipeline([PolynomialFeatures(degree=d, include_bias=False), StandardScaler(), LinearRegression()]).
(b) For d = 1 to 12, compute training MAE and 4-fold CV MAE on train with KFold(n_splits=4, shuffle=True, random_state=1) and cross_val_score(..., scoring="neg_mean_absolute_error"). Show a table.
(c) Pick the degree with lowest CV MAE, refit on full training set, report test MAE once.
(d) In bias-variance terms, explain how train MAE and CV MAE behave as degree grows, and what to add to the pipeline to control high-degree models.`,
      starterCode: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(5)
x = rng.uniform(-3, 3, 60)
y_curve = 4 * np.exp(-x ** 2 / 2) + 0.8 * x + rng.normal(0, 0.4, 60)
X_curve = x.reshape(-1, 1)
X_tr4, X_te4, y_tr4, y_te4 = train_test_split(X_curve, y_curve, test_size=0.25, random_state=42)

# TODO: (a) poly_lr(d)
# TODO: (b) Loop d = 1 to 12, compute train MAE and CV MAE
# TODO: (c) Fit best degree and report test MAE
`,
      solutionCode: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(5)
x = rng.uniform(-3, 3, 60)
y_curve = 4 * np.exp(-x ** 2 / 2) + 0.8 * x + rng.normal(0, 0.4, 60)
X_curve = x.reshape(-1, 1)
X_tr4, X_te4, y_tr4, y_te4 = train_test_split(X_curve, y_curve, test_size=0.25, random_state=42)

# (a) Pipeline factory
def poly_lr(d):
    return Pipeline([
        ('poly', PolynomialFeatures(degree=d, include_bias=False)),
        ('scaler', StandardScaler()),
        ('lr', LinearRegression())
    ])

# (b) Cross-validation loop
cv = KFold(n_splits=4, shuffle=True, random_state=1)
results = []
print(f"{'Degree':<8} {'Train MAE':<12} {'CV MAE':<12}")
print("-" * 32)
for d in range(1, 13):
    model = poly_lr(d)
    model.fit(X_tr4, y_tr4)
    tr_mae = mean_absolute_error(y_tr4, model.predict(X_tr4))
    cv_scores = cross_val_score(poly_lr(d), X_tr4, y_tr4, cv=cv, scoring='neg_mean_absolute_error')
    cv_mae = -cv_scores.mean()
    results.append((d, tr_mae, cv_mae))
    print(f"{d:<8} {tr_mae:<12.4f} {cv_mae:<12.4f}")

# (c) Pick best degree
best_d = min(results, key=lambda x: x[2])[0]
best_model = poly_lr(best_d).fit(X_tr4, y_tr4)
test_mae = mean_absolute_error(y_te4, best_model.predict(X_te4))
print(f"Best Degree: {best_d} with Test MAE: {test_mae:.4f}")

# (d) Bias-variance explanation:
print("Bias-variance: As degree grows, training MAE decreases monotonically (lower bias). CV MAE drops until degree 6 then shoots up due to high variance (overfitting).")
print("Remedy: Replace LinearRegression() with Ridge(alpha=...) to regularize high-degree coefficients.")
`,
      expectedOutput: `Best Degree: 6
Test MAE: 0.3522`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("Best Degree: 6") || userCodeOutput.includes("0.3522") || userCodeOutput.includes("0.2701");
      }
    },
    {
      id: "C5",
      number: 5,
      title: "k-NN from scratch and choosing k",
      session: "S9",
      difficulty: "medium",
      prompt: `(a) Write knn_predict(X_train, y_train, X_query, k) with Euclidean distance and majority vote (np.bincount(...).argmax(), ties go to smaller label). Numpy/loops only, no sklearn inside.
(b) On wine dataset (load_wine) with train_test_split(test_size=0.3, stratify=y, random_state=42), standardise with StandardScaler fit on train. Compute test accuracy for k=5 and check it matches KNeighborsClassifier(n_neighbors=5).
Report train and test accuracy for k=1 and k=25. Why is train accuracy for k=1 exactly 1.0, and why is it not the best choice?
(c) Choose k from [1, 3, 5, 7, 9, 11, 13, 15] using 5-fold StratifiedKFold(shuffle=True, random_state=42) on train with Pipeline([StandardScaler(), KNeighborsClassifier(k)]). Ties pick smallest k. Report test accuracy of chosen k, and describe bias-variance at small vs large k.`,
      starterCode: `import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

def knn_predict(X_train, y_train, X_query, k):
    # TODO: compute Euclidean distance, find k-nearest, take majority vote
    return np.zeros(len(X_query), dtype=int)

X_wine, y_wine = load_wine(return_X_y=True)
X_tr5, X_te5, y_tr5, y_te5 = train_test_split(X_wine, y_wine, test_size=0.3, stratify=y_wine, random_state=42)

# TODO: (b) Scale and test k=5, k=1, k=25
# TODO: (c) 5-fold Stratified CV to select best k
`,
      solutionCode: `import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

# (a) Manual k-NN
def knn_predict(X_train, y_train, X_query, k):
    X_train = np.asarray(X_train)
    y_train = np.asarray(y_train)
    X_query = np.asarray(X_query)
    preds = []
    for q in X_query:
        dists = np.sqrt(np.sum((X_train - q) ** 2, axis=1))
        # Stable sort preserves index order for ties
        nearest_idx = np.argsort(dists, kind='mergesort')[:k]
        nearest_labels = y_train[nearest_idx]
        counts = np.bincount(nearest_labels)
        preds.append(np.argmax(counts))
    return np.array(preds)

# (b) Dataset and scaling
X_wine, y_wine = load_wine(return_X_y=True)
X_tr5, X_te5, y_tr5, y_te5 = train_test_split(X_wine, y_wine, test_size=0.3, stratify=y_wine, random_state=42)

scaler = StandardScaler().fit(X_tr5)
X_tr5_s = scaler.transform(X_tr5)
X_te5_s = scaler.transform(X_te5)

# Check k=5
my_pred_5 = knn_predict(X_tr5_s, y_tr5, X_te5_s, 5)
sk_pred_5 = KNeighborsClassifier(n_neighbors=5).fit(X_tr5_s, y_tr5).predict(X_te5_s)
print(f"k=5 test acc: Manual={accuracy_score(y_te5, my_pred_5):.4f}, Sklearn={accuracy_score(y_te5, sk_pred_5):.4f}")

# Compare k=1 and k=25
for k in [1, 25]:
    tr_acc = accuracy_score(y_tr5, knn_predict(X_tr5_s, y_tr5, X_tr5_s, k))
    te_acc = accuracy_score(y_te5, knn_predict(X_tr5_s, y_tr5, X_te5_s, k))
    print(f"k={k}: train acc = {tr_acc:.4f}, test acc = {te_acc:.4f}")
print("Why k=1 train acc is 1.0: Each train point is its own nearest neighbor (dist 0), perfectly memorizing training data. But it has high variance and overfits to noise.")

# (c) 5-fold Stratified CV for best k
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
candidate_k = [1, 3, 5, 7, 9, 11, 13, 15]
cv_scores = {}
for k in candidate_k:
    pipe = Pipeline([('scaler', StandardScaler()), ('knn', KNeighborsClassifier(n_neighbors=k))])
    cv_scores[k] = cross_val_score(pipe, X_tr5, y_tr5, cv=skf).mean()
    print(f"k={k} CV accuracy: {cv_scores[k]:.4f}")

best_k = min([k for k, score in cv_scores.items() if score == max(cv_scores.values())])
chosen_pipe = Pipeline([('scaler', StandardScaler()), ('knn', KNeighborsClassifier(n_neighbors=best_k))]).fit(X_tr5, y_tr5)
print(f"Chosen best k: {best_k} with Test accuracy: {chosen_pipe.score(X_te5, y_te5):.4f}")
print("Bias-variance: Small k has high variance/low bias (sensitive to local noise). Large k has high bias/low variance (oversmoothed, dominated by majority class).")
`,
      expectedOutput: `k=5 test acc: 0.9444
Chosen best k: 5 with Test acc: 0.9444`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("0.9444") || userCodeOutput.includes("best k: 5");
      }
    },
    {
      id: "C6",
      number: 6,
      title: "Decision tree depth, pruning and feature importance",
      session: "S10 + S11",
      difficulty: "medium",
      prompt: `Use load_breast_cancer with train_test_split(test_size=0.25, stratify=y, random_state=42). Always pass random_state=42 to DecisionTreeClassifier.

(a) For max_depth in [1, 2, 3, 4, 5, 6, 8, None], build a table with train accuracy, 5-fold CV accuracy on train (StratifiedKFold(5, shuffle=True, random_state=42)) and test accuracy.
(b) Choose depth with best CV accuracy and print its top 5 feature_importances_ with feature names.
(c) Fit fully grown trees with ccp_alpha in [0, 0.005, 0.01, 0.02] and print number of leaves, train accuracy and test accuracy.
(d) What does the depth table show about overfitting, and what does increasing ccp_alpha do?`,
      starterCode: `import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

cancer = load_breast_cancer()
X_bc, y_bc = cancer.data, cancer.target
X_tr6, X_te6, y_tr6, y_te6 = train_test_split(X_bc, y_bc, test_size=0.25, stratify=y_bc, random_state=42)

# TODO: (a) Depth table for [1, 2, 3, 4, 5, 6, 8, None]
# TODO: (b) Best depth top 5 feature importances
# TODO: (c) Cost-complexity pruning with ccp_alpha
`,
      solutionCode: `import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

cancer = load_breast_cancer()
X_bc, y_bc = cancer.data, cancer.target
X_tr6, X_te6, y_tr6, y_te6 = train_test_split(X_bc, y_bc, test_size=0.25, stratify=y_bc, random_state=42)

# (a) Depth evaluation table
depths = [1, 2, 3, 4, 5, 6, 8, None]
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
best_cv = -1
best_depth = None

print(f"{'Depth':<8} {'Train Acc':<12} {'CV Acc':<12} {'Test Acc':<12}")
print("-" * 44)
for d in depths:
    clf = DecisionTreeClassifier(max_depth=d, random_state=42)
    clf.fit(X_tr6, y_tr6)
    tr_acc = accuracy_score(y_tr6, clf.predict(X_tr6))
    cv_acc = cross_val_score(DecisionTreeClassifier(max_depth=d, random_state=42), X_tr6, y_tr6, cv=cv).mean()
    te_acc = accuracy_score(y_te6, clf.predict(X_te6))
    if cv_acc > best_cv:
        best_cv = cv_acc
        best_depth = d
    d_str = str(d) if d is not None else "None"
    print(f"{d_str:<8} {tr_acc:<12.4f} {cv_acc:<12.4f} {te_acc:<12.4f}")

# (b) Best depth model and top 5 feature importances
best_clf = DecisionTreeClassifier(max_depth=best_depth, random_state=42).fit(X_tr6, y_tr6)
print(f"\nBest CV Depth: {best_depth} (CV Acc: {best_cv:.4f})")
top5_idx = np.argsort(best_clf.feature_importances_)[::-1][:5]
print("Top 5 Features by Importance:")
for idx in top5_idx:
    print(f"  {cancer.feature_names[idx]}: {best_clf.feature_importances_[idx]:.4f}")

# (c) Post-pruning with ccp_alpha
print("\nCost-Complexity Pruning (ccp_alpha):")
for alpha in [0, 0.005, 0.01, 0.02]:
    clf_p = DecisionTreeClassifier(ccp_alpha=alpha, random_state=42).fit(X_tr6, y_tr6)
    n_leaves = clf_p.get_n_leaves()
    tr_a = accuracy_score(y_tr6, clf_p.predict(X_tr6))
    te_a = accuracy_score(y_te6, clf_p.predict(X_te6))
    print(f"ccp_alpha={alpha:<6}: leaves={n_leaves:<3} train_acc={tr_a:.4f} test_acc={te_a:.4f}")

print("\nTakeaways: Unconstrained depth reaches 100% train accuracy but CV accuracy peaks at depth 3 and degrades (overfitting). Increasing ccp_alpha prunes weak subtrees, reducing leaves and boosting generalization.")
`,
      expectedOutput: `Best CV Depth: 3 (CV Acc: 0.9390)
Top feature: worst radius (~0.7579)`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("0.939") && userCodeOutput.includes("worst radius");
      }
    },
    {
      id: "C7",
      number: 7,
      title: "Imbalanced classification: compare models, confusion matrices and class weights",
      session: "S8 + S12 + S13",
      difficulty: "exam level",
      prompt: `The cell generates an imbalanced dataset (~8.6% positive) and splits into train (60%), validation (20%), and test (20%).

(a) Print test accuracy of a baseline model that always predicts 0.
(b) Fit 3 models on train:
    - Pipeline([StandardScaler(), LogisticRegression(max_iter=1000)])
    - RandomForestClassifier(n_estimators=200, random_state=42)
    - GradientBoostingClassifier(random_state=42)
    For each, report validation ROC AUC and test metrics at threshold 0.5: accuracy, precision, recall, F1, ROC AUC.
(c) Fit a 4th model: LogisticRegression pipeline with class_weight="balanced". Print test confusion matrices (TN, FP, FN, TP) for plain and balanced models, plus precision, recall, ROC AUC.
(d) Explain why class_weight="balanced" shifts recall/precision while ROC AUC hardly moves. Which model has best validation ROC AUC? Why is accuracy misleading?`,
      starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

X7, y7 = make_classification(n_samples=3000, n_features=12, n_informative=6, n_redundant=2,
                             weights=[0.92], flip_y=0.02, class_sep=1.5, random_state=11)
X_tmp, X_te7, y_tmp, y_te7 = train_test_split(X7, y7, test_size=0.2, stratify=y7, random_state=42)
X_tr7, X_va7, y_tr7, y_va7 = train_test_split(X_tmp, y_tmp, test_size=0.25, stratify=y_tmp, random_state=42)

# TODO: (a) Zero baseline accuracy
# TODO: (b) Fit 3 models and evaluate val ROC AUC and test metrics
# TODO: (c) Balanced Logistic Regression & confusion matrices
`,
      solutionCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

X7, y7 = make_classification(n_samples=3000, n_features=12, n_informative=6, n_redundant=2,
                             weights=[0.92], flip_y=0.02, class_sep=1.5, random_state=11)
X_tmp, X_te7, y_tmp, y_te7 = train_test_split(X7, y7, test_size=0.2, stratify=y7, random_state=42)
X_tr7, X_va7, y_tr7, y_va7 = train_test_split(X_tmp, y_tmp, test_size=0.25, stratify=y_tmp, random_state=42)

# (a) Zero baseline
zero_acc = accuracy_score(y_te7, np.zeros_like(y_te7))
print(f"(a) All-zero baseline test accuracy: {zero_acc:.4f} ({zero_acc*100:.1f}%)")

# (b) Model comparison
models = {
    'LogisticRegression': Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression(max_iter=1000))]),
    'RandomForest': RandomForestClassifier(n_estimators=200, random_state=42),
    'GradientBoosting': GradientBoostingClassifier(random_state=42)
}

print("\n(b) Model Benchmarks:")
for name, m in models.items():
    m.fit(X_tr7, y_tr7)
    val_probs = m.predict_proba(X_va7)[:, 1]
    val_auc = roc_auc_score(y_va7, val_probs)
    
    test_probs = m.predict_proba(X_te7)[:, 1]
    test_preds = (test_probs >= 0.5).astype(int)
    print(f"--- {name} ---")
    print(f"  Val ROC AUC: {val_auc:.4f}")
    print(f"  Test: Acc={accuracy_score(y_te7, test_preds):.4f}, Prec={precision_score(y_te7, test_preds):.4f}, Rec={recall_score(y_te7, test_preds):.4f}, F1={f1_score(y_te7, test_preds):.4f}, AUC={roc_auc_score(y_te7, test_probs):.4f}")

# (c) Plain vs Balanced Logistic Regression
lr_plain = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression(max_iter=1000))]).fit(X_tr7, y_tr7)
lr_bal = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression(max_iter=1000, class_weight='balanced'))]).fit(X_tr7, y_tr7)

for label, m in [('Plain LR', lr_plain), ('Balanced LR', lr_bal)]:
    probs = m.predict_proba(X_te7)[:, 1]
    preds = (probs >= 0.5).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_te7, preds).ravel()
    print(f"\n{label} Confusion Matrix: TN={tn}, FP={fp}, FN={fn}, TP={tp}")
    print(f"  Precision: {precision_score(y_te7, preds):.4f}, Recall: {recall_score(y_te7, preds):.4f}, ROC AUC: {roc_auc_score(y_te7, probs):.4f}")

print("\n(d) Key Insights:")
print("1. class_weight='balanced' heavily penalizes false negatives during loss calculation, effectively shifting the operating decision threshold downward. Because ROC AUC measures ranking quality across ALL thresholds, it remains invariant (~0.95).")
print("2. RandomForest has the best validation ROC AUC (~0.9481).")
print("3. Accuracy is a misleading headline metric because an all-zero baseline achieves 91.33% accuracy while failing to detect a single actual fraud/positive instance!")
`,
      expectedOutput: `Baseline test accuracy: 0.9133
RandomForest Val AUC: ~0.9481
Balanced LR Recall: ~0.9231`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("0.9133") && (userCodeOutput.includes("0.948") || userCodeOutput.includes("0.9231"));
      }
    },
    {
      id: "C8",
      number: 8,
      title: "PCA and KMeans on the wine data",
      session: "S14 + S15",
      difficulty: "exam level",
      prompt: `Use load_wine (13 numeric features). Treat as unlabelled; true classes are used only at the end to evaluate cluster quality.

(a) Standardise features, fit PCA() and print explained variance ratio of PC1 to PC3 and cumulative ratio. How many components keep ≥ 95% variance? Confirm with PCA(n_components=0.95).
(b) On standardised data, run KMeans(n_clusters=k, n_init=10, random_state=42) for k=2 to 7. Print inertia and silhouette_score. Which k does silhouette prefer, and why can inertia alone not choose k?
(c) Build Pipeline([StandardScaler(), PCA(n_components=2), KMeans(n_clusters=3, n_init=10, random_state=42)]), fit on raw features, compare clusters with true classes using adjusted_rand_score and pd.crosstab.
(d) Run same KMeans (k=3) on all 13 standardised features (no PCA); report adjusted Rand index and silhouette score. Also report silhouette of (c) clusters in 2-D PCA space. Did 2-D PCA lose agreement with true classes? Why can the two silhouette values not be compared directly?`,
      starterCode: `import numpy as np
import pandas as pd
from sklearn.datasets import load_wine
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, adjusted_rand_score
from sklearn.pipeline import Pipeline

X_w8, y_w8 = load_wine(return_X_y=True)

# TODO: (a) PCA explained variance ratios
# TODO: (b) KMeans k=2 to 7 silhouette & inertia
# TODO: (c) 2-D PCA + KMeans(3) pipeline & ARI
# TODO: (d) Full 13-D KMeans(3) vs 2-D PCA comparison
`,
      solutionCode: `import numpy as np
import pandas as pd
from sklearn.datasets import load_wine
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, adjusted_rand_score
from sklearn.pipeline import Pipeline

X_w8, y_w8 = load_wine(return_X_y=True)

# (a) Standardise and PCA
scaler = StandardScaler()
X_s = scaler.fit_transform(X_w8)
pca = PCA().fit(X_s)
var_ratios = pca.explained_variance_ratio_
cum_var = np.cumsum(var_ratios)

print("(a) PCA Variance Analysis:")
print(f"  PC1 to PC3 ratios: {np.round(var_ratios[:3], 4)}")
print(f"  PC1 to PC3 cumulative: {np.round(cum_var[:3], 4)}")
pca_95 = PCA(n_components=0.95).fit(X_s)
print(f"  Components for ≥95% variance: {pca_95.n_components_}")

# (b) KMeans k=2 to 7
print("\n(b) KMeans k=2 to 7 on 13 features:")
sil_scores = {}
for k in range(2, 8):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X_s)
    sil = silhouette_score(X_s, km.labels_)
    sil_scores[k] = sil
    print(f"  k={k}: Inertia={km.inertia_:.2f}, Silhouette={sil:.4f}")

best_k = max(sil_scores, key=sil_scores.get)
print(f"  Best k by silhouette: {best_k}")
print("  Why inertia alone cannot choose k: Inertia is strictly non-increasing with k (reaching 0 when k=n). Silhouette balances cohesion and separation.")

# (c) Pipeline: StandardScaler -> PCA(2) -> KMeans(3)
pipe_c = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=2)),
    ('km', KMeans(n_clusters=3, n_init=10, random_state=42))
])
pipe_c.fit(X_w8)
clusters_c = pipe_c.steps[2][1].labels_
ari_c = adjusted_rand_score(y_w8, clusters_c)
print(f"\n(c) 2-D PCA + KMeans(3) ARI: {ari_c:.4f}")
print("Contingency Table (True vs Cluster):")
print(pd.crosstab(y_w8, clusters_c, rownames=['True Class'], colnames=['Cluster']))

# (d) Full 13-D vs 2-D comparison
km_13 = KMeans(n_clusters=3, n_init=10, random_state=42).fit(X_s)
ari_13 = adjusted_rand_score(y_w8, km_13.labels_)
sil_13 = silhouette_score(X_s, km_13.labels_)

# Silhouette in 2D space
X_2d = pipe_c.steps[1][1].transform(pipe_c.steps[0][1].transform(X_w8))
sil_2d = silhouette_score(X_2d, clusters_c)

print(f"\n(d) Full 13-D KMeans(3) ARI: {ari_13:.4f}, Silhouette in 13-D: {sil_13:.4f}")
print(f"    2-D PCA Clusters Silhouette in 2-D: {sil_2d:.4f}")
print("Did 2-D PCA lose agreement? No! ARI is virtually identical (0.8951 vs 0.8975) despite discarding 45% of variance, proving the first 2 principal components capture the primary cluster structure.")
print("Why silhouette values cannot be compared directly: Silhouette distances depend on Euclidean dimension. In lower dimensions, inter-point distances are more concentrated, inflating silhouette scores.")
`,
      expectedOutput: `PC1-3 cum variance: [0.362, 0.5541, 0.6653]
Components for 95%: 10
Best k: 3
2-D PCA ARI: 0.8951 vs 13-D ARI: 0.8975`,
      testCheck: (userCodeOutput) => {
        return userCodeOutput.includes("0.8951") || userCodeOutput.includes("10") || userCodeOutput.includes("0.362");
      }
    }
  ],

  // Formula Cheat Sheet Data for instant reference
  formulas: [
    {
      title: "Regression Error Metrics",
      session: "S3",
      items: [
        { name: "MAE (Mean Absolute Error)", formula: "\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^{n} |\\hat{y}_i - y_i|", desc: "Linear penalty, robust to outliers, same units as target." },
        { name: "RMSE (Root Mean Squared Error)", formula: "\\text{RMSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2}", desc: "Quadratic penalty, sensitive to large errors; always RMSE >= MAE." },
        { name: "R² (Coefficient of Determination)", formula: "R^2 = 1 - \\frac{\\sum (\\hat{y}_i - y_i)^2}{\\sum (y_i - \\bar{y})^2} = 1 - \\frac{\\text{RSS}}{\\text{TSS}}", desc: "Proportion of target variance explained by model (1.0 = perfect)." },
        { name: "Adjusted R²", formula: "R^2_{\\text{adj}} = 1 - (1 - R^2) \\frac{n - 1}{n - p - 1}", desc: "Penalizes model complexity (p features) to prevent false inflation." }
      ]
    },
    {
      title: "Closed Form & Optimization",
      session: "S3 & S5",
      items: [
        { name: "Normal Equation", formula: "\\theta = (X^T X)^{-1} X^T y", desc: "Analytical OLS solution. Singular (non-invertible) if columns are collinear." },
        { name: "Gradient Descent Update", formula: "w_{k+1} = w_k - \\eta \\nabla J(w_k)", desc: "Iterative step opposite the gradient scaled by learning rate η." }
      ]
    },
    {
      title: "Regularization",
      session: "S7",
      items: [
        { name: "Lasso (L1) Objective", formula: "J(w) = \\text{MSE} + \\lambda \\sum_{j=1}^p |w_j|", desc: "Sparse weights; drives uninformative features to exact zero." },
        { name: "Ridge (L2) Objective", formula: "J(w) = \\text{MSE} + \\lambda \\sum_{j=1}^p w_j^2", desc: "Shrinks weights towards zero; handles multicollinearity." },
        { name: "Variance Inflation Factor (VIF)", formula: "\\text{VIF}_j = \\frac{1}{1 - R_j^2}", desc: "Quantifies multicollinearity of feature j. VIF > 5-10 indicates severe trouble." }
      ]
    },
    {
      title: "Classification & Logistic Regression",
      session: "S8",
      items: [
        { name: "Sigmoid Activation", formula: "\\sigma(z) = \\frac{1}{1 + e^{-z}}", desc: "Maps linear score z = w^T x + b to probability interval (0, 1)." },
        { name: "Odds & Log-Odds (Logit)", formula: "\\text{Odds} = \\frac{p}{1-p}, \\quad \\ln(\\text{Odds}) = z = w^T x + b", desc: "Log-odds is linear in inputs." },
        { name: "Binary Cross-Entropy (Log Loss)", formula: "\\ell = -\\frac{1}{n} \\sum_{i=1}^n [y_i \\ln(\\hat{p}_i) + (1 - y_i) \\ln(1 - \\hat{p}_i)]", desc: "Asymptotically infinite penalty for confident wrong predictions." },
        { name: "Precision, Recall, F1", formula: "\\text{Prec} = \\frac{\\text{TP}}{\\text{TP}+\\text{FP}}, \\; \\text{Rec} = \\frac{\\text{TP}}{\\text{TP}+\\text{FN}}, \\; F_1 = \\frac{2PR}{P+R}", desc: "Precision: confidence in positive calls; Recall: coverage of real positives." }
      ]
    },
    {
      title: "Tree Impurity & Clustering",
      session: "S10 & S14",
      items: [
        { name: "Gini Impurity", formula: "\\text{Gini} = 1 - \\sum_{c} p_c^2", desc: "0 for pure node, 0.5 for balanced binary split." },
        { name: "Gini Gain (Information Gain)", formula: "\\Delta = \\text{Gini}_{\\text{parent}} - \\sum \\frac{N_{\\text{child}}}{N} \\text{Gini}_{\\text{child}}", desc: "Criterion for selecting greedy tree splits." },
        { name: "Silhouette Coefficient", formula: "s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}", desc: "a = intra-cluster distance, b = nearest-cluster distance. Ranges [-1, 1]." }
      ]
    }
  ]
};
