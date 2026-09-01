// scripts/curriculum/levels_10_to_19.js
// Levels L10 through L19 of the updated AI/ML Engineer Master Curriculum

import { createTopic } from './helpers.js';

export const levels10to19 = [
  // ----------------------------------------------------
  // L10 — SQL + DATABASES
  // ----------------------------------------------------
  {
    id: 'l10',
    order: 10,
    title: 'L10 — SQL, Relational Databases & SQLAlchemy ORM',
    description: 'Relational data modeling, SQL queries (SELECT, WHERE, GROUP BY, HAVING), JOINs (INNER, LEFT, RIGHT, FULL, CROSS), subqueries, CTEs, Window Functions (ROW_NUMBER, RANK, LEAD, LAG), ACID transactions, indexing strategies (B-Tree), query execution plans, PostgreSQL, SQLite, and SQLAlchemy ORM.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 35,
    color: 'blue',
    subjects: [
      {
        id: 'l10-s1-sql-fundamentals-and-joins',
        order: 1,
        title: 'SQL Queries, Aggregations & Multi-Table Joins',
        description: 'Writing robust SQL: filtering, sorting, aggregations, GROUP BY with HAVING, and joining multiple relational tables.',
        topics: [
          createTopic({
            id: 'sql-select-groupby-joins',
            order: 1,
            title: 'SQL Fundamentals: SELECT, GROUP BY & Table JOINs',
            description: 'SQL query execution order, SELECT, WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions (COUNT, SUM, AVG, MIN, MAX), and JOIN types (INNER, LEFT, RIGHT, FULL, CROSS).',
            priority: 'core',
            estimatedHours: 6,
            tags: ['sql', 'database', 'joins', 'queries'],
            subtopics: [
              'SQL logical query execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT',
              'Filtering with WHERE: operators (=, !=, IN, BETWEEN, LIKE, IS NULL) and boolean logic',
              'Aggregation and GROUP BY: grouping rows and filtering aggregated groups with HAVING (vs WHERE)',
              'Relational JOINs: INNER JOIN (matching rows), LEFT JOIN (all left rows + matching right)',
              'RIGHT JOIN, FULL OUTER JOIN (all rows from both tables), and CROSS JOIN (Cartesian product)',
              'Multi-table joins and table aliases for clean relational queries'
            ]
          })
        ]
      },
      {
        id: 'l10-s2-advanced-sql-and-window-functions',
        order: 2,
        title: 'Advanced SQL: Subqueries, CTEs & Window Functions',
        description: 'Common Table Expressions (WITH clause), correlated subqueries, and analytical Window Functions (OVER, PARTITION BY, ORDER BY, ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG).',
        topics: [
          createTopic({
            id: 'sql-ctes-and-window-functions',
            order: 1,
            title: 'Subqueries, Common Table Expressions (CTEs) & Window Functions',
            description: 'Writing complex analytical SQL: modularizing queries with CTEs (`WITH cte AS (...)`), correlated subqueries, and analytical window calculations over partitions.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['sql', 'window-functions', 'cte', 'analytics'],
            learningObjectives: [
              'Write modular readable SQL queries using Common Table Expressions (CTEs)',
              'Differentiate and apply ranking window functions: ROW_NUMBER, RANK, and DENSE_RANK',
              'Calculate running totals, moving averages, and period-over-period differences using LEAD and LAG'
            ],
            subtopics: [
              'Subqueries in WHERE, FROM, and SELECT clauses vs performance implications',
              'Common Table Expressions (CTEs) with `WITH ... AS (...)` for readable, modular query structures',
              'Window Functions syntax: `FUNCTION() OVER (PARTITION BY col ORDER BY sort_col ROWS BETWEEN ...)`',
              'Ranking functions: `ROW_NUMBER()` (unique sequential), `RANK()` (skips ranks on ties), `DENSE_RANK()` (no skips)',
              'Positional window functions: `LEAD(col, 1)` (next row value) and `LAG(col, 1)` (previous row value) for time-series deltas',
              'Aggregate window functions: calculating cumulative running totals (`SUM(amount) OVER (ORDER BY date)`) without collapsing rows'
            ],
            practice: [
              { title: 'Top-N Performers per Category with Window Functions', description: 'Write an analytical SQL query computing top 3 highest spending customers per region and period-over-period growth using CTEs and DENSE_RANK.' }
            ],
            debugging: [
              { title: 'Debug GROUP BY vs Window Function Syntax Error', description: 'Fix an invalid query attempting to use non-aggregated columns with GROUP BY instead of proper PARTITION BY windowing.', errorType: 'syntax' }
            ],
            assessments: [
              { question: 'Explain the difference between `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()` when evaluating tied scores: [100, 90, 90, 80].' }
            ]
          })
        ]
      },
      {
        id: 'l10-s3-database-design-and-sqlalchemy',
        order: 3,
        title: 'Database Architecture, Indexing (B-Tree), Transactions & ORM',
        description: 'Primary/Foreign keys, normalization (1NF-3NF), B-Tree indexes, EXPLAIN query plans, ACID transaction isolation, and SQLAlchemy 2.0 ORM.',
        topics: [
          createTopic({
            id: 'db-indexing-acid-sqlalchemy-orm',
            order: 1,
            title: 'Indexing, ACID Transactions & SQLAlchemy 2.0 ORM',
            description: 'Relational database performance: primary keys, foreign key constraints, B-Tree indexes, composite indexes, EXPLAIN ANALYZE, ACID transactions (Atomicity, Consistency, Isolation, Durability), and declarative SQLAlchemy 2.0 models.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['database', 'indexing', 'acid', 'sqlalchemy', 'orm'],
            subtopics: [
              'Relational schema design: Primary Keys, Foreign Keys, Unique constraints, and Normalization (1NF, 2NF, 3NF)',
              'Database Indexes: B-Tree index structure, when to index (filtering, joining, sorting), composite index column ordering',
              'Inspecting query execution plans using `EXPLAIN ANALYZE`: identifying sequential table scans vs index scans',
              'ACID Transactions: Atomicity (all or nothing), Consistency, Isolation (dirty reads, phantom reads), Durability (WAL)',
              'Transaction control: `BEGIN`, `COMMIT`, `ROLLBACK`, and savepoints',
              'SQLAlchemy 2.0 declarative models (`DeclarativeBase`, `Mapped`, `mapped_column`, `relationship`)',
              'Executing queries with `session.execute(select(User).where(...))` and handling relationship loading (lazy vs eager joinedload)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L11 — JAVASCRIPT
  // ----------------------------------------------------
  {
    id: 'l11',
    order: 11,
    title: 'L11 — JavaScript for Engineers (Beginner to Advanced)',
    description: 'JavaScript language foundations: variables (let, const, var), data types, truthy/falsy, lexical scope, hoisting, closures, arrow functions, this keyword, prototypes, classes, array methods (map, filter, reduce), destructuring, Promises, async/await, the Event Loop (call stack, microtasks, macrotasks), DOM APIs, Fetch API, and NPM.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 35,
    color: 'amber',
    subjects: [
      {
        id: 'l11-s1-js-fundamentals',
        order: 1,
        title: 'JavaScript Fundamentals, Scope & Functions',
        description: 'Variables (let/const/var), primitive types, type coercion (== vs ===), truthy/falsy, lexical scope, hoisting, closures, and arrow functions.',
        topics: [
          createTopic({
            id: 'js-variables-types-scope-closures',
            order: 1,
            title: 'Variables, Types, Scope, Hoisting & Closures',
            description: 'JavaScript execution model: let vs const vs var, primitive types (string, number, boolean, null, undefined, symbol, bigint), strict equality (`===`), block scope vs function scope, variable hoisting, and lexical closures.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['javascript', 'scope', 'closures', 'hoisting', 'variables'],
            subtopics: [
              'Variable declarations: `const` (block-scoped immutable binding), `let` (block-scoped reassignable), and `var` (function-scoped hoisted)',
              'Primitive types vs Reference types (Objects, Arrays, Functions) in memory',
              'Strict equality (`===` no type conversion) vs Loose equality (`==` implicit type coercion)',
              'Truthy and Falsy values (0, "", null, undefined, NaN, false) and boolean logic (`??` nullish coalescing vs `||`)',
              'Hoisting mechanics: variable declarations and function declarations during compilation phase (Temporal Dead Zone for let/const)',
              'Lexical Scope and Closures: inner functions retaining access to outer enclosing variables after outer return',
              'Arrow functions (`() => {}`): concise syntax, implicit return, and lexical `this` binding'
            ]
          }),
          createTopic({
            id: 'js-objects-arrays-destructuring',
            order: 2,
            title: 'Objects, Arrays, Array Methods (map/filter/reduce) & Destructuring',
            description: 'Working with data structures: Object properties, Arrays, higher-order methods (map, filter, reduce, find, some, every, sort), destructuring assignment, and spread/rest operators.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['javascript', 'objects', 'arrays', 'array-methods', 'destructuring'],
            subtopics: [
              'Object literals, dot notation (`obj.prop`), bracket notation (`obj[key]`), and optional chaining (`obj?.nested?.prop`)',
              'Object static methods: `Object.keys()`, `Object.values()`, `Object.entries()`, `Object.assign()`',
              'Array higher-order transformation methods: `.map()`, `.filter()`, `.reduce()`, `.find()`, `.findIndex()`, `.some()`, `.every()`',
              'Array mutating methods vs non-mutating methods (`.toSorted()`, `.toReversed()` in modern JS)',
              'Destructuring assignment for objects (`const { id, name, ...rest } = user`) and arrays (`const [first, second] = arr`)',
              'Spread operator (`...`) for shallow copying objects/arrays and Rest parameters in functions'
            ]
          })
        ]
      },
      {
        id: 'l11-s2-async-js-and-event-loop',
        order: 2,
        title: 'Asynchronous JavaScript & The Event Loop',
        description: 'Single-threaded JavaScript runtime, Call Stack, Web APIs, Callback Queue (Macrotasks), Microtask Queue (Promises), Promises, async/await, and Fetch API.',
        topics: [
          createTopic({
            id: 'js-event-loop-promises-async-await',
            order: 1,
            title: 'The Event Loop, Microtasks, Promises & async/await',
            description: 'Mastering JavaScript asynchronous execution: the Call Stack, Web APIs, Microtask Queue vs Macrotask Queue, Promise states (pending, fulfilled, rejected), `Promise.all()`, `Promise.allSettled()`, `async`/`await`, and the Fetch API.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['javascript', 'async', 'promises', 'event-loop', 'fetch'],
            learningObjectives: [
              'Explain the exact execution order of synchronous code, microtasks (Promise.then), and macrotasks (setTimeout)',
              'Create, chain, and error-handle Promises using .then() / .catch() / .finally()',
              'Write clean asynchronous code with async/await and try/catch blocks',
              'Fetch data from REST APIs using the native Fetch API with response parsing and error handling'
            ],
            subtopics: [
              'Single-threaded JavaScript execution and the Call Stack',
              'The Event Loop mechanism: Call Stack -> Microtask Queue (Promises, queueMicrotask) -> Macrotask Queue (setTimeout, setInterval, I/O)',
              'Anatomy of a Promise: Pending, Fulfilled, Rejected states and `new Promise((resolve, reject) => ...)`',
              'Promise combinators: `Promise.all()` (fails fast), `Promise.allSettled()` (waits for all), `Promise.race()`, `Promise.any()`',
              'Writing asynchronous code with `async`/`await` and robust `try / catch / finally` error handling',
              'The `fetch()` API: sending HTTP requests, parsing JSON with `await response.json()`, and checking `response.ok`'
            ],
            practice: [
              { title: 'Concurrent Data Fetcher with Rate Limiting', description: 'Write an async JavaScript function that fetches a list of URLs with a maximum concurrency limit of 3 using Promises and Promise.allSettled.' }
            ],
            debugging: [
              { title: 'Debug Unhandled Promise Rejection & Floating Async Call', description: 'Diagnose why an async error crashed a background Node process because an un-awaited Promise rejection was not caught.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'Given code containing `console.log(1)`, `setTimeout(() => console.log(2), 0)`, and `Promise.resolve().then(() => console.log(3))`, explain the exact console output order and why.' }
            ]
          })
        ]
      },
      {
        id: 'l11-s3-dom-and-npm',
        order: 3,
        title: 'DOM Manipulation, Browser APIs & NPM Ecosystem',
        description: 'DOM selection (querySelector), event listeners, event bubbling/delegation, localStorage, Browser DevTools, and NPM package management.',
        topics: [
          createTopic({
            id: 'js-dom-events-storage-npm',
            order: 1,
            title: 'DOM APIs, Event Delegation, Web Storage & NPM',
            description: 'Interacting with the browser: document.querySelector, addEventListener, event bubbling, event.preventDefault(), localStorage vs sessionStorage, package.json, and npm scripts.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['javascript', 'dom', 'events', 'npm', 'browser'],
            subtopics: [
              'Selecting DOM elements with `document.querySelector()` and `document.querySelectorAll()`',
              'Manipulating DOM: `.textContent`, `.innerHTML`, `.classList.add/remove/toggle`, creating elements (`document.createElement()`)',
              'Event handling: `addEventListener("click", handler)`, Event object, `event.preventDefault()`, and `event.stopPropagation()`',
              'Event bubbling and Event Delegation (attaching single listener to parent element)',
              'Web Storage APIs: `localStorage` (persistent) vs `sessionStorage` (tab lifetime) with JSON serialization',
              'NPM and `package.json`: dependencies, devDependencies, scripts, and semantic versioning (`^1.2.0` vs `~1.2.0`)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L12 — NODE.JS
  // ----------------------------------------------------
  {
    id: 'l12',
    order: 12,
    title: 'L12 — Node.js & Server-Side JavaScript',
    description: 'Node.js runtime, V8 engine, CommonJS vs ES Modules, core modules (fs, path, process, events, streams, buffers, http), and building backend web servers with Express and Fastify.',
    estimatedDuration: '1-2 weeks',
    estimatedHours: 25,
    color: 'teal',
    subjects: [
      {
        id: 'l12-s1-node-runtime-and-core-modules',
        order: 1,
        title: 'Node.js Architecture & Core Built-in Modules',
        description: 'V8 engine, libuv event loop, module systems (CommonJS require vs ESM import), filesystem operations (fs/promises), path, and streams.',
        topics: [
          createTopic({
            id: 'node-runtime-modules-fs-streams',
            order: 1,
            title: 'Node Runtime, CommonJS vs ESM, fs & Streams',
            description: 'Node.js architecture: V8 JavaScript engine, libuv C++ asynchronous I/O layer, `require` vs `import`, `fs/promises` file operations, and chunked Stream processing (`fs.createReadStream`).',
            priority: 'core',
            estimatedHours: 6,
            tags: ['nodejs', 'backend', 'streams', 'fs', 'modules'],
            subtopics: [
              'Node.js architecture: V8 engine, libuv event loop, thread pool for file/DNS I/O, and non-blocking asynchronous execution',
              'Module systems: CommonJS (`module.exports = ...; const x = require(...)`) vs ES Modules (`export default ...; import x from ...`)',
              'Working with files: `fs/promises` (`readFile`, `writeFile`, `mkdir`), file paths with `path.join()` and `path.resolve()`',
              'The `process` global: `process.env`, `process.argv`, `process.cwd()`, `process.exit()`, and `process.on("SIGINT")`',
              'Node.js Streams & Buffers: Readable, Writable, Transform streams, and piping data (`readStream.pipe(writeStream)`) for memory efficiency'
            ]
          })
        ]
      },
      {
        id: 'l12-s2-node-web-frameworks',
        order: 2,
        title: 'Backend Web Servers: Express vs Fastify',
        description: 'Building HTTP servers, routing, middleware pipeline, error handling, input validation, and architectural comparison of Express vs Fastify.',
        topics: [
          createTopic({
            id: 'node-express-fastify-apis',
            order: 1,
            title: 'Building APIs with Express & Fastify (Comparison & Architecture)',
            description: 'Developing backend APIs: Express middleware pattern (`(req, res, next)`), routing, error middleware, Fastify high-performance JSON schema compilation, and framework comparison.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['nodejs', 'express', 'fastify', 'backend', 'api'],
            subtopics: [
              'Creating HTTP server with Express: `app.get()`, `app.post()`, request params (`req.params`), query strings (`req.query`), JSON body (`req.body`)',
              'The Express Middleware pipeline: sequential processing, authentication middleware, CORS, logging, and `next()`',
              'Centralized error handling middleware in Express with `(err, req, res, next)`',
              'Fastify architecture: high-performance HTTP server using JSON schema compilation (Ajv) and zero-overhead serialization',
              'Express vs Fastify Comparison: Express (ubiquitous, massive ecosystem, callback/promise middleware) vs Fastify (blazing fast, built-in schema validation, modern TypeScript support, async native)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L13 — DSA
  // ----------------------------------------------------
  {
    id: 'l13',
    order: 13,
    title: 'L13 — Data Structures & Algorithms (DSA)',
    description: 'Big-O time and space complexity, Arrays, Strings, Hash Maps/Sets, Linked Lists, Stacks, Queues, Binary Search, Two Pointers, Sliding Window, Trees (BST, Traversals, Heaps), Graphs (BFS, DFS, Topological Sort), and Dynamic Programming.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'purple',
    subjects: [
      {
        id: 'l13-s1-dsa-complexity-and-linear-structures',
        order: 1,
        title: 'Big-O Complexity & Core Linear Data Structures',
        description: 'Time and space complexity analysis, Arrays, Hash Tables, Two Pointers, Sliding Window, Prefix Sum, Linked Lists, Stacks, and Queues.',
        topics: [
          createTopic({
            id: 'dsa-big-o-arrays-hashmaps-pointers',
            order: 1,
            title: 'Big-O Complexity, Hash Maps, Two Pointers & Sliding Window',
            description: 'Asymptotic notation (O(1), O(log n), O(n), O(n log n), O(n^2)), Hash Map O(1) lookups, Two Pointers technique, and Sliding Window for contiguous subarray/substring problems.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['dsa', 'big-o', 'algorithms', 'two-pointers', 'sliding-window'],
            subtopics: [
              'Big-O notation: Upper bound analysis, best/average/worst case, and Space Complexity (auxiliary memory)',
              'Hash Table mechanics: hash functions, collision resolution (chaining vs open addressing), O(1) average lookup/insert',
              'Two Pointers technique: converging pointers (sorted arrays, two-sum), fast & slow pointers (cycle detection)',
              'Sliding Window pattern: fixed-size window (max sum of size k) vs variable-size window (longest substring without repeating characters)',
              'Prefix Sum pattern: O(1) range sum queries after O(n) precomputation',
              'Stacks (LIFO, monotonic stacks) and Queues (FIFO, deque) for parenthesis validation and sliding window max'
            ]
          })
        ]
      },
      {
        id: 'l13-s2-dsa-searching-sorting-trees-graphs-dp',
        order: 2,
        title: 'Searching, Trees, Graphs & Dynamic Programming',
        description: 'Binary Search, Binary Search Trees (BST), Tree Traversals, Heaps/Priority Queues, Graph BFS/DFS, Topological Sort, and Dynamic Programming.',
        topics: [
          createTopic({
            id: 'dsa-binary-search-trees-graphs-dp',
            order: 1,
            title: 'Binary Search, Trees, Graphs (BFS/DFS) & Dynamic Programming',
            description: 'O(log n) Binary Search, Binary Search Trees, BFS/DFS tree and graph traversals, Priority Queues / Heaps, and Dynamic Programming (Memoization vs Tabulation).',
            priority: 'core',
            estimatedHours: 12,
            tags: ['dsa', 'binary-search', 'trees', 'graphs', 'dp'],
            subtopics: [
              'Binary Search: search space reduction, boundary conditions (`left <= right`), searching on answers',
              'Binary Trees & BST: tree properties, traversals (Preorder, Inorder, Postorder, Level Order / BFS)',
              'Heaps and Priority Queues: Min-Heap, Max-Heap, `heapq` in Python, finding Top-K frequent elements',
              'Graphs: Adjacency list representation, Breadth-First Search (BFS for shortest path), Depth-First Search (DFS for connectivity/cycle detection)',
              'Topological Sorting (Kahn\'s algorithm / DFS) for dependency resolution DAGs',
              'Dynamic Programming (DP): Overlapping subproblems, Optimal substructure, Top-Down Memoization (recursion + cache) vs Bottom-Up Tabulation'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L14 — MATHEMATICS FOR ML
  // ----------------------------------------------------
  {
    id: 'l14',
    order: 14,
    title: 'L14 — Mathematics for Machine Learning & AI',
    description: 'Linear algebra (vectors, matrices, dot products, matrix multiplication, determinants, inverses, eigenvalues/eigenvectors), multivariable calculus (derivatives, partial derivatives, gradients, chain rule, gradient descent), probability theory (Bayes theorem, random variables), and statistics.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 35,
    color: 'indigo',
    subjects: [
      {
        id: 'l14-s1-linear-algebra',
        order: 1,
        title: 'Linear Algebra for Machine Learning',
        description: 'Vectors, vector spaces, dot products, cosine similarity, matrices, matrix multiplication, transposition, determinants, inverses, eigenvalues, and eigenvectors.',
        topics: [
          createTopic({
            id: 'math-linear-algebra-vectors-matrices',
            order: 1,
            title: 'Vectors, Matrix Multiplication, Dot Products & Eigenvalues',
            description: 'Vector spaces, geometric intuition of dot product and cosine similarity, matrix multiplication mechanics ($A \\times B$), determinants, matrix inversion, and Eigenvalues/Eigenvectors for dimensionality reduction (PCA).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['math', 'linear-algebra', 'matrices', 'vectors', 'eigenvalues'],
            subtopics: [
              'Vectors: geometric representation, vector addition, scalar multiplication, L1 norm (Manhattan) and L2 norm (Euclidean length)',
              'Dot product ($u \\cdot v = \\sum u_i v_i = ||u|| ||v|| \\cos\\theta$) and Cosine Similarity in high-dimensional embedding spaces',
              'Matrices: dimensions ($m \\times n$), linear transformations, stretching, rotating, and scaling coordinate spaces',
              'Matrix multiplication rules: inner dimension match ($m \\times k$ with $k \\times n = m \\times n$) and non-commutativity ($AB \\neq BA$)',
              'Transpose ($A^T$), Identity matrix ($I$), Determinant ($\det(A)$), and Matrix Inverse ($A^{-1}$ where $AA^{-1} = I$)',
              'Eigenvalues ($\lambda$) and Eigenvectors ($v$) satisfying $Av = \lambda v$: finding principal axes of transformation for PCA'
            ]
          })
        ]
      },
      {
        id: 'l14-s2-calculus-and-probability',
        order: 2,
        title: 'Multivariable Calculus, Optimization & Probability',
        description: 'Derivatives, partial derivatives, gradients, the multivariable Chain Rule, Gradient Descent optimization, probability distributions, and Bayes Theorem.',
        topics: [
          createTopic({
            id: 'math-calculus-gradients-probability-bayes',
            order: 1,
            title: 'Calculus (Gradients, Chain Rule) & Probability (Bayes Theorem)',
            description: 'Calculus fundamentals for backpropagation: partial derivatives ($\\frac{\\partial f}{\\partial x}$), the Gradient vector ($\\nabla f$), the Chain Rule, Gradient Descent optimization updates, probability rules, and Bayes Theorem ($P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['math', 'calculus', 'gradients', 'probability', 'bayes'],
            subtopics: [
              'Derivatives as rate of change and slope of tangent line',
              'Partial derivatives: holding other variables constant while differentiating with respect to target parameter',
              'The Gradient vector ($\\nabla f$): pointing in direction of steepest ascent on the loss surface',
              'The Multivariable Chain Rule: propagating gradients through composite functions (foundation of backpropagation)',
              'Gradient Descent optimization update rule: $\\theta_{new} = \\theta_{old} - \\alpha \\nabla L(\\theta)$ where $\\alpha$ is learning rate',
              'Probability fundamentals: sample space, independent vs mutually exclusive events, conditional probability $P(A|B)$',
              'Bayes\' Theorem: Prior probability $P(A)$, Likelihood $P(B|A)$, Marginal probability $P(B)$, and Posterior probability $P(A|B)$',
              'Probability distributions: Discrete (Bernoulli, Binomial) vs Continuous (Uniform, Gaussian / Normal distribution), Mean ($\mu$), and Variance ($\sigma^2$)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L15 — MACHINE LEARNING
  // ----------------------------------------------------
  {
    id: 'l15',
    order: 15,
    title: 'L15 — Classical Machine Learning & Scikit-Learn',
    description: 'Supervised vs unsupervised learning, data preprocessing (encoding, scaling, imputation), feature engineering, Regression (Linear, Polynomial, Ridge, Lasso), Classification (Logistic, KNN, Naive Bayes, Decision Trees, Random Forest, SVM, Gradient Boosting, XGBoost), Unsupervised (K-Means, PCA), Evaluation metrics (Confusion Matrix, Precision, Recall, F1, ROC-AUC, RMSE), Cross-Validation, Hyperparameter tuning, and SHAP model interpretability.',
    estimatedDuration: '4-5 weeks',
    estimatedHours: 55,
    color: 'green',
    subjects: [
      {
        id: 'l15-s1-ml-fundamentals-and-preprocessing',
        order: 1,
        title: 'ML Fundamentals, Data Preprocessing & Feature Engineering',
        description: 'Features, labels, train/val/test splits, overfitting vs underfitting, bias-variance trade-off, data leakage prevention, encoding, scaling, and imputation.',
        topics: [
          createTopic({
            id: 'ml-fundamentals-and-bias-variance',
            order: 1,
            title: 'ML Concepts: Features, Labels, Overfitting & Bias-Variance Tradeoff',
            description: 'Core ML terminology: features ($X$), target labels ($y$), training vs validation vs test sets, generalization, overfitting (high variance) vs underfitting (high bias), and preventing data leakage.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['machine-learning', 'fundamentals', 'bias-variance', 'overfitting'],
            subtopics: [
              'Supervised learning (labeled data) vs Unsupervised learning (unlabeled structure discovery) vs Reinforcement learning',
              'Features ($X$ matrix), Target labels ($y$ vector), samples, and model parameters vs hyperparameters',
              'Train / Validation / Test dataset partitioning and stratified sampling',
              'Overfitting (memorizing noise, high variance, low training loss with high validation loss)',
              'Underfitting (model too simplistic, high bias, high training and validation loss)',
              'The Bias-Variance Tradeoff: finding the optimal model complexity balance',
              'Data Leakage: accidental inclusion of target information or test set statistics during training preprocessing'
            ]
          }),
          createTopic({
            id: 'ml-preprocessing-scaling-encoding',
            order: 2,
            title: 'Data Preprocessing, Scaling, Categorical Encoding & Imputation',
            description: 'Data transformation with Scikit-Learn: StandardScaler, MinMaxScaler, RobustScaler, OneHotEncoder, OrdinalEncoder, SimpleImputer, and Scikit-Learn Pipelines.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['preprocessing', 'scikit-learn', 'feature-engineering', 'scaling'],
            subtopics: [
              'Missing value imputation: mean, median, most frequent, and KNN imputation (`SimpleImputer`, `KNNImputer`)',
              'Categorical encoding: Nominal data with `OneHotEncoder(handle_unknown="ignore")` vs Ordinal data with `OrdinalEncoder`',
              'Feature scaling: `StandardScaler` (zero mean, unit variance), `MinMaxScaler` (bounded [0, 1]), `RobustScaler` (median & IQR, outlier resistant)',
              'Fitting on training data ONLY (`scaler.fit_transform(X_train)`) and transforming test data (`scaler.transform(X_test)`) to prevent data leakage',
              'Building unified end-to-end transformation pipelines with `sklearn.compose.ColumnTransformer` and `sklearn.pipeline.Pipeline`'
            ]
          })
        ]
      },
      {
        id: 'l15-s2-regression-and-classification-algorithms',
        order: 2,
        title: 'Supervised Learning: Regression & Classification Algorithms',
        description: 'Linear Regression (OLS), Regularization (Ridge L2, Lasso L1), Logistic Regression, K-Nearest Neighbors, Naive Bayes, Decision Trees, Support Vector Machines (SVM), and Ensemble Methods (Random Forest, Gradient Boosting, XGBoost).',
        topics: [
          createTopic({
            id: 'ml-regression-linear-ridge-lasso',
            order: 1,
            title: 'Regression: Linear Regression, OLS, Ridge (L2) & Lasso (L1)',
            description: 'Continuous target prediction: Ordinary Least Squares (OLS) objective, assumptions of linear regression, multicollinearity, L2 Ridge regularization ($||w||_2^2$), L1 Lasso regularization ($||w||_1$ for feature selection), and evaluation (MAE, MSE, RMSE, $R^2$).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['regression', 'linear-regression', 'ridge', 'lasso', 'regularization'],
            subtopics: [
              'Linear Regression mathematical formulation: $\\hat{y} = w_1 x_1 + w_2 x_2 + ... + w_n x_n + b$',
              'Ordinary Least Squares (OLS) loss function: Residual Sum of Squares (RSS)',
              'Assumptions of Linear Regression: Linearity, Homoscedasticity, Normality of residuals, and Independence',
              'Multicollinearity among features and variance inflation',
              'Ridge Regression (L2 Regularization): adding penalty $\\alpha \\sum w_i^2$ shrinking coefficients to prevent overfitting',
              'Lasso Regression (L1 Regularization): adding penalty $\\alpha \\sum |w_i|$ driving non-essential coefficients strictly to zero (sparse feature selection)',
              'Regression Evaluation Metrics: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and Coefficient of Determination ($R^2$ score)'
            ]
          }),
          createTopic({
            id: 'ml-classification-logistic-trees-forest-xgboost',
            order: 2,
            title: 'Classification: Logistic Regression, Trees, Random Forest & XGBoost',
            description: 'Discrete class prediction: Logistic Regression (Sigmoid, Cross-Entropy / Log Loss), Decision Trees (Gini impurity, Entropy), Random Forest bagging ensemble, and Gradient Boosted Decision Trees (GBDT / XGBoost).',
            priority: 'core',
            estimatedHours: 10,
            tags: ['classification', 'logistic-regression', 'decision-trees', 'random-forest', 'xgboost', 'ensembles'],
            learningObjectives: [
              'Explain how Logistic Regression maps linear outputs to probabilities using the Sigmoid function',
              'Understand decision tree splitting criteria: Gini Impurity vs Information Gain (Entropy)',
              'Differentiate Bagging (Random Forest bootstrap aggregation) from Boosting (XGBoost sequential error correction)',
              'Train and evaluate Random Forest and XGBoost classifiers with Scikit-Learn and XGBoost libraries'
            ],
            subtopics: [
              'Logistic Regression: Sigmoid activation function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$, odds ratio, and Binary Cross-Entropy (Log Loss)',
              'Decision Trees: recursive binary splitting, Gini Impurity, Entropy / Information Gain, tree depth, and stopping criteria',
              'Ensemble Learning Paradigm: combining weak learners into a strong predictive model',
              'Random Forest (Bagging): Bootstrap aggregating (sampling with replacement) and random feature subset selection reducing variance',
              'Gradient Boosting (Boosting): Sequential ensemble where each subsequent tree fits on the pseudo-residuals / errors of previous trees',
              'XGBoost (Extreme Gradient Boosting): second-order Taylor expansion gradients, regularization term, and efficient histogram splitting'
            ],
            practice: [
              { title: 'Customer Churn Prediction with Random Forest & XGBoost', description: 'Build an end-to-end tabular classification pipeline comparing Logistic Regression, Random Forest, and XGBoost with ROC-AUC evaluation.' }
            ],
            debugging: [
              { title: 'Debug Severe Overfitting on Small Tabular Dataset', description: 'Diagnose why a Decision Tree achieved 100% training accuracy but 52% test accuracy, and tune max_depth, min_samples_leaf, and regularization.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Compare Random Forest and Gradient Boosted Trees (XGBoost) in terms of parallel training capability, sensitivity to overfitting, and error reduction mechanism (variance reduction vs bias reduction).' }
            ]
          })
        ]
      },
      {
        id: 'l15-s3-unsupervised-and-evaluation',
        order: 3,
        title: 'Unsupervised Learning, Model Evaluation & Interpretability',
        description: 'K-Means clustering, PCA dimensionality reduction, Confusion Matrix, Precision, Recall, F1 Score, ROC-AUC, Cross-Validation, Hyperparameter Tuning (Grid/Random Search), and SHAP feature importance.',
        topics: [
          createTopic({
            id: 'ml-evaluation-metrics-and-tuning',
            order: 1,
            title: 'Evaluation Metrics (Precision/Recall/ROC-AUC), K-Fold CV & Hyperparameter Tuning',
            description: 'Comprehensive model assessment: Confusion Matrix (TP, FP, TN, FN), Precision vs Recall tradeoff, F1 Score, ROC curve, PR-AUC for imbalanced datasets, Stratified K-Fold Cross-Validation, and GridSearchCV / RandomizedSearchCV.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['evaluation', 'metrics', 'roc-auc', 'cross-validation', 'hyperparameter-tuning'],
            subtopics: [
              'Confusion Matrix: True Positives (TP), False Positives (FP / Type I Error), True Negatives (TN), False Negatives (FN / Type II Error)',
              'Accuracy ($\\frac{TP+TN}{Total}$) and why Accuracy is dangerously misleading on imbalanced datasets (e.g. 99% fraud detection failure)',
              'Precision ($\\frac{TP}{TP+FP}$ - quality of positive predictions) vs Recall ($\\frac{TP}{TP+FN}$ - quantity of actual positives found)',
              'F1 Score (harmonic mean of Precision and Recall) and $F_\\beta$ score',
              'Receiver Operating Characteristic (ROC) curve, False Positive Rate vs True Positive Rate, and ROC-AUC score',
              'Precision-Recall (PR) Curve and PR-AUC score for severe class imbalance',
              'Stratified K-Fold Cross-Validation for robust performance estimation across k validation splits',
              'Hyperparameter optimization: `GridSearchCV` (exhaustive search) vs `RandomizedSearchCV` (efficient probability distribution sampling)'
            ]
          }),
          createTopic({
            id: 'ml-unsupervised-kmeans-pca-shap',
            order: 2,
            title: 'Unsupervised Learning (K-Means, PCA) & Model Interpretability (SHAP)',
            description: 'K-Means clustering, centroid updates, Elbow method, Principal Component Analysis (PCA) for dimensional compression, feature importance, and SHAP (SHapley Additive exPlanations) values.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['unsupervised', 'kmeans', 'pca', 'shap', 'interpretability'],
            subtopics: [
              'K-Means clustering algorithm: random centroid initialization, assignment step, update step, convergence, and K-Means++ initialization',
              'Choosing optimal number of clusters ($k$) using the Elbow method (inertia / sum of squared errors) and Silhouette Score',
              'Principal Component Analysis (PCA): projecting high-dimensional data onto orthogonal principal axes of maximum variance',
              'Explained variance ratio and dimensionality reduction for data visualization and feature space compression',
              'Model Interpretability: Gini feature importance vs Permutation feature importance',
              'SHAP (SHapley Additive exPlanations): game-theoretic approach explaining individual feature contributions for any black-box model'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L16 — DEEP LEARNING
  // ----------------------------------------------------
  {
    id: 'l16',
    order: 16,
    title: 'L16 — Deep Learning & PyTorch Framework',
    description: 'Neural network fundamentals, Perceptron, multi-layer perceptrons (MLP), activation functions (ReLU, GELU, Sigmoid, Softmax), loss functions (MSE, CrossEntropy), backpropagation, gradient descent optimizers (SGD, Adam, AdamW), learning rate schedules, regularization (Dropout, Batch Normalization), and PyTorch (Tensors, Datasets, DataLoaders, custom training loops, GPU/CUDA acceleration).',
    estimatedDuration: '4-5 weeks',
    estimatedHours: 50,
    color: 'purple',
    subjects: [
      {
        id: 'l16-s1-neural-network-foundations',
        order: 1,
        title: 'Neural Network Architecture & Backpropagation Mechanics',
        description: 'Artificial neurons, activation functions, forward propagation, loss computation, the backpropagation algorithm, and gradient descent optimization.',
        topics: [
          createTopic({
            id: 'dl-perceptron-activations-backprop',
            order: 1,
            title: 'Neurons, Activation Functions, Loss & Backpropagation',
            description: 'Mathematical foundations of Deep Learning: Perceptron model ($z = Wx + b$), non-linear activation functions (Sigmoid, Tanh, ReLU, Leaky ReLU, GELU), forward pass, Cross-Entropy loss, computational graphs, and backward pass gradient calculation via the Chain Rule.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['deep-learning', 'neural-networks', 'backpropagation', 'activations'],
            subtopics: [
              'The artificial neuron: inputs, weights ($W$), bias ($b$), linear combination ($z = \sum w_i x_i + b$), and non-linear activation $\sigma(z)$',
              'Why non-linear activation functions are mandatory (stacking linear layers without non-linearities collapses to a single linear model)',
              'Activation functions: Sigmoid (vanishing gradient problem), Tanh (zero-centered), ReLU (computational efficiency, dying ReLU), Leaky ReLU, GELU (Gaussian Error Linear Unit used in LLMs)',
              'Loss functions: Mean Squared Error (MSE for regression) vs Categorical Cross-Entropy loss (with Softmax for multi-class classification)',
              'Forward propagation pass: computing layer-by-layer activations $a^{[l]} = g(W^{[l]} a^{[l-1]} + b^{[l]})$',
              'Computational Graphs and automatic differentiation: calculating partial derivatives of loss with respect to all weights ($\\frac{\\partial L}{\\partial W^{[l]}}$) via the Chain Rule',
              'Vanishing and Exploding Gradient problems and weight initialization strategies (Xavier / He initialization)'
            ]
          }),
          createTopic({
            id: 'dl-optimizers-regularization-training-tricks',
            order: 2,
            title: 'Optimizers (SGD, Adam, AdamW), Dropout & Batch Normalization',
            description: 'Training dynamics: Stochastic Gradient Descent (SGD with momentum), RMSProp, Adam, AdamW (weight decay decoupled), learning rate scheduling, Dropout regularization, and Batch Normalization.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['deep-learning', 'optimizers', 'adam', 'dropout', 'batchnorm'],
            subtopics: [
              'Batch Gradient Descent vs Stochastic Gradient Descent (SGD) vs Mini-Batch Gradient Descent',
              'SGD with Momentum: accumulating velocity vector in gradient directions to dampen oscillations',
              'Adaptive learning rate optimizers: RMSProp (scaling by moving average of squared gradients) and Adam (combining Momentum + RMSProp)',
              'AdamW: decouples $L_2$ weight decay regularization from gradient updates (standard in modern Transformer training)',
              'Learning rate schedules: Step decay, Exponential decay, Cosine Annealing with Warmup',
              'Regularization in Deep Learning: $L_2$ Weight Decay, Dropout (randomly zeroing neurons during training to prevent co-adaptation)',
              'Batch Normalization (BatchNorm) vs Layer Normalization (LayerNorm - standard in NLP and Transformers)'
            ]
          })
        ]
      },
      {
        id: 'l16-s2-pytorch-framework-mastery',
        order: 2,
        title: 'PyTorch Framework, Tensors & Custom Training Loops',
        description: 'PyTorch Tensors, Autograd, nn.Module, Dataset, DataLoader, GPU CUDA device management, and writing modular PyTorch training and validation loops.',
        topics: [
          createTopic({
            id: 'pytorch-tensors-autograd-nnmodule',
            order: 1,
            title: 'PyTorch Tensors, Autograd & Building Models with nn.Module',
            description: 'Hands-on PyTorch engineering: Tensor operations, GPU acceleration with CUDA/MPS (`tensor.to(device)`), `requires_grad=True`, `loss.backward()`, defining neural network architectures subclassing `nn.Module`, and `nn.Sequential`.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['pytorch', 'tensors', 'autograd', 'nn-module'],
            subtopics: [
              'PyTorch Tensors: creating tensors, shapes, reshaping with `.view()` and `.reshape()`, slicing, and NumPy interoperability',
              'Hardware acceleration: detecting and moving tensors to CUDA GPU or Apple Silicon MPS (`device = torch.device("cuda" if torch.cuda.is_available() else "cpu")`)',
              'PyTorch Autograd engine: tracking computational graph with `requires_grad=True`, computing gradients with `loss.backward()`, and disabling tracking with `torch.no_grad()`',
              'Defining neural networks with `torch.nn.Module`: implementing `__init__()` defining layers (`nn.Linear`, `nn.ReLU`, `nn.Dropout`) and `forward(self, x)` pass',
              'Loss functions (`nn.CrossEntropyLoss`, `nn.MSELoss`) and Optimizers (`torch.optim.AdamW(model.parameters(), lr=1e-3)`)'
            ]
          }),
          createTopic({
            id: 'pytorch-datasets-dataloaders-training-loops',
            order: 2,
            title: 'PyTorch Datasets, DataLoaders & Production Training Loops',
            description: 'Data ingestion and training pipeline: subclassing `torch.utils.data.Dataset` (`__len__`, `__getitem__`), batching with `DataLoader` (`batch_size`, `shuffle`, `num_workers`), full training and validation loop with checkpointing.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['pytorch', 'dataloader', 'training-loop', 'gpu'],
            learningObjectives: [
              'Create custom PyTorch Dataset classes for image, tabular, or text datasets',
              'Configure high-throughput multi-worker DataLoaders with batching and shuffling',
              'Write professional training and validation loops with model.train() and model.eval() modes',
              'Save and load model checkpoints using torch.save and torch.load'
            ],
            subtopics: [
              'Custom Dataset class implementation: overriding `__init__`, `__len__`, and `__getitem__(self, idx)` returning `(features, target)` tensors',
              'Configuring `DataLoader`: `batch_size`, `shuffle=True`, `num_workers` for parallel multiprocessing data loading, and `pin_memory=True`',
              'Anatomy of a complete PyTorch training epoch:',
              '1. `model.train()`',
              '2. Loop over batches: `optimizer.zero_grad()`, `outputs = model(inputs)`, `loss = criterion(outputs, labels)`, `loss.backward()`, `optimizer.step()`',
              'Anatomy of validation epoch: `model.eval()`, `with torch.no_grad():`, compute validation metrics',
              'Saving and loading model state dict checkpoints (`torch.save(model.state_dict(), "model.pt")`)',
              'Early stopping and learning rate scheduler step integration'
            ],
            practice: [
              { title: 'Build a Multi-Layer Perceptron (MLP) Classifier in PyTorch', description: 'Implement a custom Dataset, 3-layer MLP with BatchNorm and Dropout, and full training/validation loop with early stopping on a complex classification dataset.' }
            ],
            debugging: [
              { title: 'Debug Forgetting optimizer.zero_grad() Gradient Accumulation Bug', description: 'Diagnose why model training loss diverged because gradients from previous batches accumulated across iterations.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Why is `optimizer.zero_grad()` required at the beginning of each training step in PyTorch, and what happens if you omit it?' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L17 — TRANSFORMERS
  // ----------------------------------------------------
  {
    id: 'l17',
    order: 17,
    title: 'L17 — Transformer Architecture & Self-Attention Mechanics',
    description: 'Sequence-to-sequence limitations, the Self-Attention mechanism, Query-Key-Value (Q, K, V) formulation, Scaled Dot-Product Attention, Multi-Head Attention, Positional Encoding, Encoder and Decoder blocks, Layer Normalization, Residual Connections, Byte-Pair Encoding (BPE) tokenization, and pretraining vs fine-tuning.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'rose',
    subjects: [
      {
        id: 'l17-s1-attention-and-transformer-architecture',
        order: 1,
        title: 'Attention Mechanism & The Transformer Block',
        description: 'From RNN limitations to Attention Is All You Need: Query-Key-Value matrices, scaled dot-product attention scores, multi-head attention, positional encoding, and layer normalization.',
        topics: [
          createTopic({
            id: 'transformer-attention-mechanism-qkv',
            order: 1,
            title: 'Scaled Dot-Product Attention & Query, Key, Value (Q, K, V) Matrices',
            description: 'Detailed mathematical breakdown of Self-Attention: projecting input embeddings into Queries ($Q$), Keys ($K$), and Values ($V$), computing raw dot-product attention scores ($QK^T$), scaling by $\\sqrt{d_k}$, Softmax normalization, and weighted value aggregation $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['transformers', 'attention', 'qkv', 'deep-learning', 'nlp'],
            learningObjectives: [
              'Explain the intuitive roles of Queries, Keys, and Values in self-attention',
              'Derive the mathematical formula for Scaled Dot-Product Attention step-by-step',
              'Understand why the scaling factor 1 / sqrt(d_k) prevents vanishing gradients in Softmax',
              'Implement scaled dot-product attention from scratch in pure PyTorch matrix operations'
            ],
            subtopics: [
              'Limitations of recurrent models (RNNs/LSTMs): sequential processing bottleneck, inability to parallelize across tokens, and vanishing context over long sequences',
              'Intuition of Attention: allowing every token in a sequence to attend to every other token with dynamic context-dependent weights',
              'Linear projections: converting input token embeddings $X$ into Query ($Q = XW_Q$), Key ($K = XW_K$), and Value ($V = XW_V$) representation matrices',
              'Computing attention score matrix: raw dot-product similarity $S = QK^T$ measuring relevance of each key to each query',
              'Why divide by $\\sqrt{d_k}$? For large embedding dimensions, dot products grow large, pushing Softmax into regions with near-zero gradients',
              'Softmax normalization: converting scaled attention logits into a probability distribution over sequence tokens',
              'Weighted value summation: multiplying attention weight probabilities by Value matrix $V$',
              'Causal Attention Masking (in Decoder/Autoregressive models): setting upper-triangular future token attention weights to $-\\infty$ before Softmax'
            ],
            practice: [
              { title: 'Implement Scaled Dot-Product Attention from Scratch', description: 'Write a clean PyTorch module implementing `ScaledDotProductAttention` with optional causal masking in vectorized tensor matrix math.' }
            ],
            debugging: [
              { title: 'Debug Shape Mismatch in Batch Matrix Multiplication (BMM) Attention', description: 'Diagnose and fix dimension mismatch when calculating `torch.matmul(Q, K.transpose(-2, -1))` across batch and multi-head dimensions.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'In self-attention, what is the role of the Query, Key, and Value matrices? How does the formula `softmax(QK^T / sqrt(d_k)) V` produce context-aware embeddings?' }
            ]
          }),
          createTopic({
            id: 'transformer-multi-head-positional-encoding',
            order: 2,
            title: 'Multi-Head Attention, Positional Encoding & Full Transformer Block',
            description: 'Multi-Head Attention (MHA) splitting into parallel subspaces, sinusoidal and learned Positional Encodings (RoPE / ALiBi), Pre-LN vs Post-LN Layer Normalization, Residual Connections, and Feed-Forward Networks (FFN).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['transformers', 'multi-head-attention', 'positional-encoding', 'layer-norm'],
            subtopics: [
              'Multi-Head Attention (MHA): splitting embeddings into $h$ parallel attention heads allowing the model to simultaneously attend to information from different representation subspaces',
              'Concatenating head outputs and projecting with output matrix $W_O$',
              'Why Positional Encoding is required: self-attention is permutation-invariant and has no inherent concept of token order',
              'Positional Encoding strategies: Sinusoidal (sine/cosine frequencies), Learned absolute positional embeddings, and modern Rotary Positional Embedding (RoPE) / ALiBi',
              'Feed-Forward Network (FFN): position-wise two-layer MLP with expansion dimension (typically $4 \\times d_{model}$) and activation (GELU / SwiGLU)',
              'Residual skip connections ($x + \\text{Sublayer}(x)$) enabling gradient flow through deep stacks',
              'Layer Normalization: Pre-LayerNorm (standard in modern LLMs for stable training) vs original Post-LayerNorm',
              'Encoder-only models (BERT) vs Decoder-only models (GPT, Llama) vs Encoder-Decoder models (T5)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L18 — LLM FUNDAMENTALS
  // ----------------------------------------------------
  {
    id: 'l18',
    order: 18,
    title: 'L18 — Large Language Model (LLM) Fundamentals',
    description: 'LLM architecture (Decoder-only autoregressive), tokenization (Byte-Pair Encoding, WordPiece), parameters scale, context window limits, next-token prediction loss, pre-training datasets, instruction tuning, Supervised Fine-Tuning (SFT), Reinforcement Learning from Human Feedback (RLHF), Direct Preference Optimization (DPO), sampling parameters (temperature, top-k, top-p), hallucinations, and open vs closed weight model families.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 35,
    color: 'indigo',
    subjects: [
      {
        id: 'l18-s1-llm-architecture-and-tokenization',
        order: 1,
        title: 'Decoder Architecture, Tokenization & Next-Token Prediction',
        description: 'How modern LLMs work: Causal autoregressive generation, Byte-Pair Encoding (BPE), vocabulary size, token-to-word ratios, context window mechanisms, and cross-entropy loss over vocabulary logits.',
        topics: [
          createTopic({
            id: 'llm-tokenization-and-autoregressive-generation',
            order: 1,
            title: 'Tokenization (BPE/tiktoken), Autoregressive Generation & Logits',
            description: 'Understanding LLM inputs and outputs: Subword tokenization (Byte-Pair Encoding, tiktoken), token IDs, embedding lookup, autoregressive next-token probability distribution generation, and Softmax logits over vocabulary.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['llm', 'tokenization', 'bpe', 'logits', 'autoregressive'],
            subtopics: [
              'Subword tokenization: Byte-Pair Encoding (BPE) algorithm merging frequent character pairs to balance vocabulary size vs sequence length',
              'Tokenization tools: OpenAI `tiktoken`, HuggingFace `tokenizers`, and SentencePiece',
              'Token-to-word ratio (~0.75 words per token in English, higher in non-English languages) and cost/latency implications',
              'Embedding matrix lookup: mapping integer token IDs ($[0, \\text{vocab\\_size}-1]$) to continuous vectors ($d_{model}$)',
              'Autoregressive next-token prediction: generating token $t_{i+1}$ given context $t_1, ..., t_i$ in a loop until end-of-sequence (`<|endoftext|>`) token is produced',
              'Output Logits: unnormalized scores over vocabulary of size $V$, converted to probabilities via Softmax: $P(w_i) = \\frac{e^{z_i / T}}{\\sum e^{z_j / T}}$',
              'KV Caching (Key-Value Cache): caching previous token K and V projections to avoid quadratic redundant recomputation during generation'
            ]
          }),
          createTopic({
            id: 'llm-sampling-temperature-topk-topp',
            order: 2,
            title: 'Inference Sampling: Temperature, Top-K, Top-P (Nucleus) & Repetition Penalty',
            description: 'Controlling generation creativity and determinism: Greedy decoding, temperature scaling ($T$), Top-K filtering, Top-P (Nucleus) cumulative probability sampling, and frequency/presence penalties.',
            priority: 'core',
            estimatedHours: 5,
            tags: ['llm', 'sampling', 'temperature', 'top-p', 'inference'],
            subtopics: [
              'Greedy decoding ($T=0$): selecting the single token with highest probability (argmax) — deterministic, good for code/math/factual tasks',
              'Temperature scaling ($T$): dividing logits by $T$ before Softmax. $T < 1.0$ sharpens distribution (conservative, focused), $T > 1.0$ flattens distribution (creative, diverse, hallucination-prone)',
              'Top-K sampling: restricting selection to only the top $K$ most probable tokens, filtering out long-tail improbable tokens',
              'Top-P (Nucleus) sampling: dynamically choosing smallest subset of tokens whose cumulative probability exceeds threshold $P$ (e.g., $P=0.9$)',
              'Frequency and Presence penalties: penalizing logits of tokens that have already appeared in output to reduce repetitive loops',
              'Stop sequences: specifying character strings triggering immediate generation halt'
            ]
          })
        ]
      },
      {
        id: 'l18-s2-llm-training-lifecycle-and-alignment',
        order: 2,
        title: 'LLM Training Lifecycle: Pretraining, SFT, RLHF & DPO',
        description: 'The 3-stage LLM training lifecycle: Self-supervised pretraining on trillions of tokens, Supervised Fine-Tuning (SFT) for instruction following, and Alignment via RLHF (Reward Model + PPO) or DPO (Direct Preference Optimization).',
        topics: [
          createTopic({
            id: 'llm-pretraining-sft-rlhf-dpo-alignment',
            order: 1,
            title: 'Pretraining, SFT, RLHF, DPO & Model Families (Open vs Closed)',
            description: 'How raw base models become helpful assistants: Web-scale pretraining, curated Supervised Fine-Tuning (SFT) datasets, ChatML template formats, RLHF with PPO vs Direct Preference Optimization (DPO), and comparing open-weight models (Llama, DeepSeek, Mistral) vs closed API models (GPT-4, Claude, Gemini).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['llm', 'pretraining', 'sft', 'rlhf', 'dpo', 'alignment'],
            subtopics: [
              'Stage 1: Pre-training (Base Models) on trillions of tokens (Common Crawl, GitHub, Wikipedia, Books) learning world knowledge and grammar via next-token prediction',
              'Stage 2: Supervised Fine-Tuning (SFT / Instruction Tuning) on curated prompt-response pairs teaching the model conversational format and task execution',
              'Chat markup formats (ChatML, `<|im_start|>system...`, Llama prompt templates) structuring conversation history into single context string',
              'Stage 3: Preference Alignment (RLHF - Reinforcement Learning from Human Feedback): training a Reward Model on human preference comparisons (chosen vs rejected) and optimizing policy via PPO',
              'Direct Preference Optimization (DPO): mathematically optimizing policy directly on paired preference data without a separate reward model',
              'Model evaluation benchmarks: MMLU, GSM8k, HumanEval, Chatbot Arena Elo',
              'Open-weight models (Llama 3, DeepSeek-V3/R1, Mistral, Qwen) vs Proprietary closed API models (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L19 — PROMPT ENGINEERING
  // ----------------------------------------------------
  {
    id: 'l19',
    order: 19,
    title: 'L19 — Prompt Engineering & Context Architecture',
    description: 'Prompt anatomy (System, Developer, User, Context, Constraints), Role Prompting, Zero-Shot, Few-Shot In-Context Learning, Chain-of-Thought (CoT), Task Decomposition, Prompt Chaining, Structured Output Schemas, iterative prompt debugging (Bad Prompt -> Analyze -> Rewrite -> Test -> Compare -> Improve), and Prompt Injection mitigation.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 25,
    color: 'amber',
    subjects: [
      {
        id: 'l19-s1-prompt-structures-and-techniques',
        order: 1,
        title: 'Prompt Architecture, Few-Shot & Chain-of-Thought',
        description: 'System instructions, delimiters, role assignment, few-shot demonstration exemplars, Chain-of-Thought reasoning, and output schema constraints.',
        topics: [
          createTopic({
            id: 'prompt-engineering-structure-fewshot-cot',
            order: 1,
            title: 'Prompt Architecture, Few-Shot Demonstrations & Chain-of-Thought',
            description: 'Designing production-grade prompts: clear role definitions, structural delimiters (XML tags, Markdown), clear task instructions, few-shot input-output exemplars, and Chain-of-Thought (CoT) reasoning for complex multi-step reasoning.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['prompt-engineering', 'few-shot', 'chain-of-thought', 'llm'],
            learningObjectives: [
              'Structure prompts using clear delimiters (XML tags, Markdown headers) to separate instructions from untrusted data',
              'Curate diverse few-shot exemplars to anchor output style, formatting, and edge case handling',
              'Trigger Chain-of-Thought (CoT) step-by-step reasoning for logic, math, and extraction tasks',
              'Enforce strict negative constraints and error fallback instructions in prompts'
            ],
            subtopics: [
              'Anatomy of a production prompt: Persona/Role, Objective, Context/Grounding data, Instructions, Constraints, Input Data, Output Format',
              'Using structured delimiters (e.g. `<context>...</context>`, `### Instructions`) to clearly separate system directives from user input',
              'Zero-Shot prompting vs Few-Shot In-Context Learning (providing 3-5 diverse input/output examples to guide complex formatting)',
              'Few-Shot best practices: balancing example variety, edge case demonstrations, and preventing example bias',
              'Chain-of-Thought (CoT) prompting: instructing the model to output intermediate reasoning steps before arriving at final answer (`<thinking>...</thinking>`)',
              'Self-Consistency CoT: sampling multiple reasoning paths and aggregating majority consensus',
              'Task decomposition: breaking massive multi-step requests into a sequence of focused, chainable prompts'
            ],
            practice: [
              { title: 'Prompt Refactoring: Transforming Ambiguous Prompts to Production Grade', description: 'Take 4 poorly written, hallucination-prone business prompts and refactor them with system roles, XML delimiters, few-shot examples, and strict JSON output schemas.' }
            ],
            debugging: [
              { title: 'Debug Hallucinated Negative Constraint Violation', description: 'Diagnose why an LLM ignored a negative constraint ("Do not include personal opinions") and rewrite with positive framing and explicit verification check.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Why does Chain-of-Thought (CoT) prompting significantly improve accuracy on mathematical and logical reasoning tasks compared to direct answering?' }
            ]
          }),
          createTopic({
            id: 'prompt-debugging-iteration-and-security',
            order: 2,
            title: 'Iterative Prompt Debugging & Prompt Injection Defense',
            description: 'The 6-step prompt optimization lifecycle (Bad Prompt -> Analyze -> Rewrite -> Test -> Compare -> Improve), ambiguity reduction, and defending against Direct and Indirect Prompt Injections.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['prompt-engineering', 'prompt-debugging', 'security', 'prompt-injection'],
            subtopics: [
              'The 6-step systematic prompt improvement loop: Baseline Evaluation -> Failure Analysis -> Prompt Revision -> Test against Evaluation Set -> Metric Comparison -> Deployment',
              'Ambiguity reduction: replacing vague adjectives ("be professional") with explicit behavioral rules and forbidden words list',
              'Context Engineering: managing position of critical instructions (mitigating the "Lost in the Middle" phenomenon)',
              'Direct Prompt Injection (Jailbreaking): user attempts to override system prompt (`"Ignore previous instructions and do X"`)',
              'Indirect Prompt Injection: malicious instructions embedded inside external web pages, emails, or PDF documents processed by the LLM',
              'Defensive strategies: strict delimiter separation, XML framing, post-processing validation, and secondary security guardrail models'
            ]
          })
        ]
      }
    ]
  }
];
