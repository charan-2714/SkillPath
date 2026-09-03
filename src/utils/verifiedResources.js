// src/utils/verifiedResources.js
// 100% verified direct working learning resources (W3Schools, GeeksforGeeks, and Official Documentation)

export const TOPIC_RESOURCE_RULES = [
  // 1. Conditionals, Loops, Range, Control Flow
  {
    id: 'control_flow',
    matchRegex: /\b(conditionals?|if\s*else|loops?|while\s*loop|for\s*loop|loop\s*else|range|break|continue|pass)\b/i,
    resources: [
      { title: 'W3Schools Python If...Else & Conditionals', url: 'https://www.w3schools.com/python/python_conditions.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python For Loops & Range Function', url: 'https://www.w3schools.com/python/python_for_loops.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python While Loops', url: 'https://www.w3schools.com/python/python_while_loops.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python If Else Statements', url: 'https://www.geeksforgeeks.org/python-if-else-statements/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Loops in Python (For, While, Nested)', url: 'https://www.geeksforgeeks.org/loops-in-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 2. Python Variables, Data Types & Operators
  {
    id: 'variables_datatypes',
    matchRegex: /\b(variables?|data\s*types?|operators?|type\s*casting|booleans?|numbers?|integers?|floats?)\b/i,
    resources: [
      { title: 'W3Schools Python Variables Tutorial', url: 'https://www.w3schools.com/python/python_variables.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Data Types Reference', url: 'https://www.w3schools.com/python/python_datatypes.asp', type: 'Reference', source: 'W3Schools' },
      { title: 'W3Schools Python Operators Guide', url: 'https://www.w3schools.com/python/python_operators.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Variables & Data Types', url: 'https://www.geeksforgeeks.org/python-variables/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Python Operators in Depth', url: 'https://www.geeksforgeeks.org/python-operators/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 3. Python Strings & Slicing
  {
    id: 'strings',
    matchRegex: /\b(strings?|string\s*methods?|string\s*slicing|f-strings?|formatting)\b/i,
    resources: [
      { title: 'W3Schools Python Strings Tutorial', url: 'https://www.w3schools.com/python/python_strings.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python String Methods Reference', url: 'https://www.w3schools.com/python/python_strings_methods.asp', type: 'Reference', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python String Operations & Slicing', url: 'https://www.geeksforgeeks.org/python-strings/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 4. Python Lists & List Comprehension
  {
    id: 'lists_comprehension',
    matchRegex: /\b(lists?|list\s*comprehension|list\s*methods?|indexing|slicing)\b/i,
    resources: [
      { title: 'W3Schools Python Lists Complete Guide', url: 'https://www.w3schools.com/python/python_lists.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python List Comprehension', url: 'https://www.w3schools.com/python/python_lists_comprehension.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Lists & Operations', url: 'https://www.geeksforgeeks.org/python-lists/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Python List Comprehension Guide', url: 'https://www.geeksforgeeks.org/python-list-comprehension/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 5. Python Tuples, Sets, Dictionaries
  {
    id: 'tuples_sets_dicts',
    matchRegex: /\b(tuples?|sets?|dictionar(y|ies)|hash\s*maps?|key-value)\b/i,
    resources: [
      { title: 'W3Schools Python Dictionaries Tutorial', url: 'https://www.w3schools.com/python/python_dictionaries.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Sets Tutorial', url: 'https://www.w3schools.com/python/python_sets.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Tuples Tutorial', url: 'https://www.w3schools.com/python/python_tuples.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Dictionary Methods', url: 'https://www.geeksforgeeks.org/python-dictionary/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Python Sets & Operations', url: 'https://www.geeksforgeeks.org/sets-in-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 6. Python Functions, Lambda, Args & Kwargs
  {
    id: 'functions_lambda',
    matchRegex: /\b(functions?|lambda|args|kwargs|return\s*values?|parameters?|arguments?|scope)\b/i,
    resources: [
      { title: 'W3Schools Python Functions Tutorial', url: 'https://www.w3schools.com/python/python_functions.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Lambda Functions', url: 'https://www.w3schools.com/python/python_lambda.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Scope (Global vs Local)', url: 'https://www.w3schools.com/python/python_scope.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Functions in Depth', url: 'https://www.geeksforgeeks.org/python-functions/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks *args and **kwargs in Python', url: 'https://www.geeksforgeeks.org/args-kwargs-python/', type: 'Guide', source: 'GeeksforGeeks' },
    ],
  },

  // 7. Decorators, Generators & Iterators
  {
    id: 'decorators_generators',
    matchRegex: /\b(decorators?|generators?|iterators?|yield|dunder|magic\s*methods?)\b/i,
    resources: [
      { title: 'GeeksforGeeks Decorators in Python (Mastery)', url: 'https://www.geeksforgeeks.org/decorators-in-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Generators & Yield in Python', url: 'https://www.geeksforgeeks.org/generators-in-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'W3Schools Python Iterators & __iter__()', url: 'https://www.w3schools.com/python/python_iterators.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Dunder/Magic Methods in Python', url: 'https://www.geeksforgeeks.org/dunder-magic-methods-python/', type: 'Guide', source: 'GeeksforGeeks' },
    ],
  },

  // 8. OOP, Classes, Inheritance & Polymorphism
  {
    id: 'oop_classes',
    matchRegex: /\b(oop|classes?|objects?|inheritance|polymorphism|encapsulation|abstraction|methods?|constructors?|__init__)\b/i,
    resources: [
      { title: 'W3Schools Python Classes and Objects', url: 'https://www.w3schools.com/python/python_classes.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Inheritance Tutorial', url: 'https://www.w3schools.com/python/python_inheritance.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python Polymorphism Tutorial', url: 'https://www.w3schools.com/python/python_polymorphism.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python OOPs Concepts (Complete Guide)', url: 'https://www.geeksforgeeks.org/python-oops-concepts/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Inheritance in Python', url: 'https://www.geeksforgeeks.org/inheritance-in-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 9. File Handling & File I/O
  {
    id: 'file_handling',
    matchRegex: /\b(file\s*handling|file\s*i\/o|read\s*file|write\s*file|context\s*managers?|with\s*open)\b/i,
    resources: [
      { title: 'W3Schools Python File Handling Tutorial', url: 'https://www.w3schools.com/python/python_file_handling.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python File Open & Read', url: 'https://www.w3schools.com/python/python_file_open.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python File Write & Create', url: 'https://www.w3schools.com/python/python_file_write.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks File Handling in Python', url: 'https://www.geeksforgeeks.org/file-handling-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 10. Exception & Error Handling
  {
    id: 'exception_handling',
    matchRegex: /\b(exceptions?|try\s*except|error\s*handling|finally|raise\s*exception)\b/i,
    resources: [
      { title: 'W3Schools Python Try...Except & Exception Handling', url: 'https://www.w3schools.com/python/python_try_except.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Exception Handling Guide', url: 'https://www.geeksforgeeks.org/python-exception-handling/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks User Defined Custom Exceptions in Python', url: 'https://www.geeksforgeeks.org/user-defined-exceptions-python-with-examples/', type: 'Guide', source: 'GeeksforGeeks' },
    ],
  },

  // 11. RegEx & Pattern Matching
  {
    id: 'regex',
    matchRegex: /\b(regex|regular\s*expressions?|pattern\s*matching|re\s*module)\b/i,
    resources: [
      { title: 'W3Schools Python RegEx Tutorial', url: 'https://www.w3schools.com/python/python_regex.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python RegEx Tutorial with Examples', url: 'https://www.geeksforgeeks.org/python-regex/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 12. Modules, Packages, Virtual Envs & PIP
  {
    id: 'modules_packages',
    matchRegex: /\b(modules?|packages?|pip\b|virtualenv|venv|requirements\.txt)\b/i,
    resources: [
      { title: 'W3Schools Python Modules Tutorial', url: 'https://www.w3schools.com/python/python_modules.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Python PIP Package Manager', url: 'https://www.w3schools.com/python/python_pip.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Modules & Imports', url: 'https://www.geeksforgeeks.org/python-modules/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Python Virtual Environment Setup', url: 'https://www.geeksforgeeks.org/python-virtual-environment/', type: 'Guide', source: 'GeeksforGeeks' },
    ],
  },

  // 13. Concurrency, Asyncio & Multithreading
  {
    id: 'concurrency',
    matchRegex: /\b(asyncio|async\/await|multithreading|multiprocessing|concurrency|threading|gil)\b/i,
    resources: [
      { title: 'GeeksforGeeks Asyncio in Python Guide', url: 'https://www.geeksforgeeks.org/asyncio-in-python/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Multithreading in Python', url: 'https://www.geeksforgeeks.org/multithreading-python-set-1/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Multiprocessing in Python', url: 'https://www.geeksforgeeks.org/multiprocessing-python-set-1/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Real Python Async IO in Python Guide', url: 'https://realpython.com/async-io-python/', type: 'Guide', source: 'Real Python' },
    ],
  },

  // 14. Git, GitHub & Version Control
  {
    id: 'git',
    matchRegex: /\b(git|github|gitlab|version\s*control|git\s*rebase|git\s*branch|git\s*merge|git\s*commit|git\s*stash|git\s*log|pull\s*request|working\s*tree|commit\s*graph|repository)\b/i,
    resources: [
      { title: 'W3Schools Git & GitHub Complete Tutorial', url: 'https://www.w3schools.com/git/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Git Branching & Merging Guide', url: 'https://www.w3schools.com/git/git_branch.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Git Tutorial & Cheat Sheet', url: 'https://www.geeksforgeeks.org/git-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Pro Git Book (Official Git-SCM Reference)', url: 'https://git-scm.com/book/en/v2', type: 'Documentation', source: 'Git SCM' },
    ],
  },

  // 15. Docker, Kubernetes & Containerization
  {
    id: 'devops_containers',
    matchRegex: /\b(docker|dockerfile|docker\s*compose|kubernetes|k8s|kubectl|containerization|container\s*image|helm\s*chart|pod|ingress)\b/i,
    resources: [
      { title: 'GeeksforGeeks Docker Tutorial for Beginners', url: 'https://www.geeksforgeeks.org/docker-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Kubernetes Complete Guide', url: 'https://www.geeksforgeeks.org/kubernetes-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Docker Official Get-Started Guide', url: 'https://docs.docker.com/get-started/', type: 'Documentation', source: 'Docker.com' },
      { title: 'Kubernetes Official Interactive Tutorials', url: 'https://kubernetes.io/docs/tutorials/', type: 'Documentation', source: 'Kubernetes.io' },
    ],
  },

  // 16. LangChain, RAG & Agentic AI
  {
    id: 'langchain_ai',
    matchRegex: /\b(langchain|langgraph|autogen|rag\b|retrieval\s*augmented|vector\s*database|chromadb|pinecone|embeddings|prompt\s*engineering|agentic\s*ai)\b/i,
    resources: [
      { title: 'LangChain Official Framework Documentation', url: 'https://python.langchain.com/docs/get_started/introduction', type: 'Documentation', source: 'LangChain' },
      { title: 'GeeksforGeeks LangChain Framework Tutorial', url: 'https://www.geeksforgeeks.org/langchain-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Pinecone Vector Database Architecture Guide', url: 'https://www.pinecone.io/learn/vector-database/', type: 'Guide', source: 'Pinecone' },
    ],
  },

  // 17. Transformers, LLMs & Hugging Face
  {
    id: 'transformers_llms',
    matchRegex: /\b(transformer|transformers|hugging\s*face|huggingface|bert\b|gpt\b|llm\b|tokenization|self-attention|genai)\b/i,
    resources: [
      { title: 'Hugging Face Transformers Official Documentation', url: 'https://huggingface.co/docs/transformers/index', type: 'Documentation', source: 'Hugging Face' },
      { title: 'GeeksforGeeks NLP & Transformers Architecture', url: 'https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'Visual Guide', source: 'Illustrated AI' },
    ],
  },

  // 18. PyTorch & Deep Learning
  {
    id: 'pytorch',
    matchRegex: /\b(pytorch|torch\b|neural\s*network|deep\s*learning|backpropagation|autograd|tensor\b|cnn\b|convolutional|rnn\b|lstm\b)\b/i,
    resources: [
      { title: 'GeeksforGeeks PyTorch Tutorial (Deep Learning)', url: 'https://www.geeksforgeeks.org/getting-started-with-pytorch/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'PyTorch Official 60min Blitz & Tutorials', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'Documentation', source: 'PyTorch.org' },
      { title: 'GeeksforGeeks Deep Learning Overview', url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 19. Scikit-Learn & Classical Machine Learning
  {
    id: 'sklearn',
    matchRegex: /\b(scikit-learn|sklearn|logistic\s*regression|random\s*forest|decision\s*tree|gradient\s*boosting|xgboost|svm\b|k-means|pca\b|machine\s*learning)\b/i,
    resources: [
      { title: 'W3Schools Machine Learning with Python', url: 'https://www.w3schools.com/python/python_ml_getting_started.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Machine Learning Tutorial', url: 'https://www.geeksforgeeks.org/machine-learning/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Scikit-Learn Official User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'Documentation', source: 'Scikit-Learn' },
    ],
  },

  // 20. Pandas & NumPy Data Science
  {
    id: 'pandas_numpy',
    matchRegex: /\b(pandas|dataframe|dataframes|series\b|groupby|read_csv|numpy|ndarray|broadcasting|vectorization|matplotlib|seaborn)\b/i,
    resources: [
      { title: 'W3Schools Pandas Tutorial with Live Code', url: 'https://www.w3schools.com/python/pandas/default.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools NumPy Tutorial for Beginners', url: 'https://www.w3schools.com/python/numpy/default.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools Matplotlib Tutorial with Plots', url: 'https://www.w3schools.com/python/matplotlib_intro.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Pandas Tutorial for Data Science', url: 'https://www.geeksforgeeks.org/pandas-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks NumPy Tutorial with Examples', url: 'https://www.geeksforgeeks.org/numpy-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 21. General Python Programming
  {
    id: 'python_general',
    matchRegex: /\b(python|python3|pytest|pep8|scripting|automation)\b/i,
    resources: [
      { title: 'W3Schools Python Tutorial (Full Course)', url: 'https://www.w3schools.com/python/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Programming Language Portal', url: 'https://www.geeksforgeeks.org/python-programming-language/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Official Python 3 Documentation & Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'Documentation', source: 'Python.org' },
    ],
  },

  // 22. SQL & Relational Databases
  {
    id: 'sql_db',
    matchRegex: /\b(sql\b|postgres|postgresql|mysql|sqlite|database\s*schema|sql\s*join|acid\s*transaction|rdbms|relational\s*database)\b/i,
    resources: [
      { title: 'W3Schools SQL Tutorial with Live Editor', url: 'https://www.w3schools.com/sql/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools SQL Joins Explained', url: 'https://www.w3schools.com/sql/sql_join.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks SQL Tutorial (Beginner to Advanced)', url: 'https://www.geeksforgeeks.org/sql-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/current/', type: 'Documentation', source: 'PostgreSQL' },
    ],
  },

  // 23. React & Modern Frontend
  {
    id: 'react_frontend',
    matchRegex: /\b(react\b|reactjs|jsx\b|react\s*hooks|useeffect|usestate|usememo|usecontext|next\.?js)\b/i,
    resources: [
      { title: 'W3Schools React Tutorial with Live Examples', url: 'https://www.w3schools.com/react/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools React Hooks Guide', url: 'https://www.w3schools.com/react/react_hooks.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks ReactJS Complete Guide', url: 'https://www.geeksforgeeks.org/reactjs-tutorials/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'React Official Documentation (react.dev)', url: 'https://react.dev/learn', type: 'Documentation', source: 'React.dev' },
    ],
  },

  // 24. JavaScript, HTML & CSS
  {
    id: 'web_core',
    matchRegex: /\b(javascript|es6|ecmascript|html5?|css3?|flexbox|css\s*grid|tailwind|tailwindcss|dom\s*manipulation)\b/i,
    resources: [
      { title: 'W3Schools JavaScript Tutorial', url: 'https://www.w3schools.com/js/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools CSS Layouts (Flexbox & Grid)', url: 'https://www.w3schools.com/css/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks JavaScript Tutorial', url: 'https://www.geeksforgeeks.org/javascript/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 25. Node.js & Backend
  {
    id: 'nodejs',
    matchRegex: /\b(node\.?js|express\.?js|rest\s*api|middleware|http\s*server|npm\s*package)\b/i,
    resources: [
      { title: 'W3Schools Node.js Tutorial', url: 'https://www.w3schools.com/nodejs/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Node.js Tutorial', url: 'https://www.geeksforgeeks.org/nodejs/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Express.js Framework Starter Guide', url: 'https://expressjs.com/en/starter/installing.html', type: 'Documentation', source: 'Express.js' },
    ],
  },

  // 26. Data Structures & Algorithms (STRICT: ONLY FOR ACTUAL DSA TOPICS)
  {
    id: 'dsa_core',
    matchRegex: /\b(dsa\b|leetcode|binary\s*search\s*tree|sliding\s*window\s*pattern|two\s*pointers?\s*pattern|monotonic\s*stack|linked\s*list\s*node|depth\s*first\s*search|breadth\s*first\s*search|dynamic\s*programming|dijkstra|disjoint\s*set|trie\s*node|topological\s*sort|tree\s*traversal|graph\s*traversal)\b/i,
    resources: [
      { title: 'GeeksforGeeks Data Structures & Algorithms Portal', url: 'https://www.geeksforgeeks.org/data-structures/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'W3Schools Data Structures and Algorithms (DSA)', url: 'https://www.w3schools.com/dsa/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'LeetCode Problem Solving Platform', url: 'https://leetcode.com/problemset/all/', type: 'Practice', source: 'LeetCode' },
      { title: 'VisuAlgo Interactive Algorithm Visualizer', url: 'https://visualgo.net/en', type: 'Interactive', source: 'VisuAlgo' },
    ],
  },

  // 27. Aptitude & Placement
  {
    id: 'aptitude',
    matchRegex: /\b(quantitative\s*aptitude|logical\s*reasoning|syllogism|verbal\s*ability|placement\s*prep)\b/i,
    resources: [
      { title: 'GeeksforGeeks Quantitative Aptitude Portal', url: 'https://www.geeksforgeeks.org/quantitative-aptitude-maths/', type: 'Practice', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Logical Reasoning Preparation', url: 'https://www.geeksforgeeks.org/logical-reasoning/', type: 'Practice', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Campus Placement Preparation', url: 'https://www.geeksforgeeks.org/placement-preparation-course/', type: 'Roadmap', source: 'GeeksforGeeks' },
    ],
  },

  // 28. SAP Ecosystem
  {
    id: 'sap',
    matchRegex: /\b(sap\b|abap|cds\s*views|odata|sap\s*fiori|s4hana|s\/4hana|sap\s*btp|sap\s*rap|sap\s*cap)\b/i,
    resources: [
      { title: 'SAP Help Portal & Official Documentation', url: 'https://help.sap.com/', type: 'Documentation', source: 'SAP Help' },
      { title: 'SAP Community Developer Learning Hub', url: 'https://community.sap.com/', type: 'Community', source: 'SAP Community' },
      { title: 'SAP Fiori Design Guidelines & Tech Specs', url: 'https://experience.sap.com/fiori-design-web/', type: 'Design & Tech', source: 'SAP Experience' },
      { title: 'SAP Cloud Application Programming Model (CAP)', url: 'https://cap.cloud.sap/docs/', type: 'Documentation', source: 'SAP CAP' },
    ],
  },
];

/**
 * Returns strictly domain-isolated, topic-tailored verified working resources.
 */
export function getVerifiedResources(title = '', description = '', category = '', customResources = []) {
  const query = `${title} ${description} ${category}`.toLowerCase();
  const matched = [];

  // Match the single most specific topic/concept rule (first match wins)
  for (const entry of TOPIC_RESOURCE_RULES) {
    if (entry.matchRegex.test(query)) {
      entry.resources.forEach((r) => {
        if (!matched.some((m) => m.url === r.url)) {
          matched.push(r);
        }
      });
      break; // Stop at first specific match to prevent domain overlap!
    }
  }

  // Fallback high-quality direct portals if nothing matched
  if (matched.length === 0) {
    matched.push(
      {
        title: 'GeeksforGeeks Computer Science & Programming Tutorials',
        url: 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/',
        type: 'Tutorial',
        source: 'GeeksforGeeks',
      },
      {
        title: 'W3Schools Online Web & Programming Tutorials',
        url: 'https://www.w3schools.com/',
        type: 'Tutorial',
        source: 'W3Schools',
      },
      {
        title: 'DevDocs Universal Fast Developer Documentation',
        url: 'https://devdocs.io/',
        type: 'Documentation',
        source: 'DevDocs',
      }
    );
  }

  // Sanitize custom resources by filtering out legacy generic placeholder URLs
  const sanitizedCustom = (customResources || []).filter((r) => {
    if (!r) return false;
    const url = (r.url || '').trim().toLowerCase();
    const isGenericPlaceholder =
      url === 'https://docs.python.org/3/' ||
      url === 'https://docs.python.org/3' ||
      url === 'https://docs.python.org' ||
      url === 'https://docs.python.org/' ||
      url === 'https://example.com' ||
      url === 'https://example.com/' ||
      url.includes('google.com/search?q=site:w3schools.com') ||
      url.includes('geeksforgeeks.org/search/?q=');
    return !isGenericPlaceholder;
  });

  // Merge genuine user-added custom resources or uploads on top
  const combined = [
    ...sanitizedCustom.map((r) => ({
      ...r,
      source: r.source || (r.isFileUpload ? 'Uploaded File' : 'My Resource'),
    })),
    ...matched,
  ];

  return combined;
}
