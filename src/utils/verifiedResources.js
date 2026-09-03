// src/utils/verifiedResources.js
// Curated, authoritative, 100% verified working documentation & interactive links

export const VERIFIED_RESOURCE_DATABASE = [
  // Python Core
  {
    id: 'python',
    matchRegex: /\b(python|python3|pip|pytest|pep8|list comprehension|dunder|gil)\b/i,
    resources: [
      { title: 'Official Python 3 Documentation & Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'Documentation', source: 'Python.org' },
      { title: 'Real Python In-Depth Tutorials', url: 'https://realpython.com/', type: 'Tutorial', source: 'Real Python' },
      { title: 'Python Standard Library Reference', url: 'https://docs.python.org/3/library/', type: 'Documentation', source: 'Python.org' },
    ],
  },
  // NumPy & SciPy
  {
    id: 'numpy',
    matchRegex: /\b(numpy|ndarray|broadcasting|vectorization|matrix multiplication)\b/i,
    resources: [
      { title: 'NumPy User Guide & Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', type: 'Documentation', source: 'NumPy.org' },
      { title: '100 NumPy Exercises with Solutions', url: 'https://github.com/rougier/numpy-100', type: 'Practice', source: 'GitHub' },
    ],
  },
  // Pandas
  {
    id: 'pandas',
    matchRegex: /\b(pandas|dataframe|dataframes|series|groupby|read_csv)\b/i,
    resources: [
      { title: 'Pandas Official User Guide', url: 'https://pandas.pydata.org/docs/user_guide/index.html', type: 'Documentation', source: 'Pandas PyData' },
      { title: '10 Minutes to Pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', type: 'Quickstart', source: 'Pandas Docs' },
    ],
  },
  // Matplotlib & Seaborn
  {
    id: 'visualization',
    matchRegex: /\b(matplotlib|seaborn|pyplot|data visualization|plotting|eda)\b/i,
    resources: [
      { title: 'Matplotlib Pyplot Guide', url: 'https://matplotlib.org/stable/tutorials/pyplot.html', type: 'Documentation', source: 'Matplotlib.org' },
      { title: 'Seaborn Official Gallery & Tutorial', url: 'https://seaborn.pydata.org/tutorial.html', type: 'Tutorial', source: 'Seaborn PyData' },
    ],
  },
  // Scikit-Learn
  {
    id: 'sklearn',
    matchRegex: /\b(scikit-learn|sklearn|logistic regression|random forest|decision tree|gradient boosting|xgboost|svm|k-means|clustering|pca)\b/i,
    resources: [
      { title: 'Scikit-Learn Machine Learning Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'Documentation', source: 'Scikit-Learn' },
      { title: 'Machine Learning Cheatsheet', url: 'https://ml-cheatsheet.readthedocs.io/en/latest/', type: 'Cheatsheet', source: 'ML Cheatsheet' },
    ],
  },
  // PyTorch & Deep Learning
  {
    id: 'pytorch',
    matchRegex: /\b(pytorch|torch|neural network|deep learning|backpropagation|autograd|tensor|cnn|convolutional|rnn|lstm)\b/i,
    resources: [
      { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', type: 'Documentation', source: 'PyTorch.org' },
      { title: 'Deep Learning with PyTorch: 60min Blitz', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'Tutorial', source: 'PyTorch.org' },
      { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/', type: 'Course', source: 'Fast.ai' },
    ],
  },
  // Hugging Face & LLMs
  {
    id: 'transformers',
    matchRegex: /\b(transformer|transformers|hugging face|huggingface|bert|gpt|llm|tokenization|self-attention)\b/i,
    resources: [
      { title: 'Hugging Face Transformers Docs', url: 'https://huggingface.co/docs/transformers/index', type: 'Documentation', source: 'Hugging Face' },
      { title: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'Visual Guide', source: 'GitHub' },
      { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/', type: 'Interactive Course', source: 'Hugging Face' },
    ],
  },
  // LangChain & RAG
  {
    id: 'langchain',
    matchRegex: /\b(langchain|rag|vector database|chromadb|pinecone|embeddings|prompt engineering)\b/i,
    resources: [
      { title: 'LangChain Documentation', url: 'https://python.langchain.com/docs/get_started/introduction', type: 'Documentation', source: 'LangChain' },
      { title: 'Pinecone Vector Search Architecture', url: 'https://www.pinecone.io/learn/vector-database/', type: 'Guide', source: 'Pinecone' },
    ],
  },

  // DSA & Computer Science
  {
    id: 'dsa_basics',
    matchRegex: /\b(binary search|sliding window|two pointer|linked list|stack|queue)\b/i,
    resources: [
      { title: 'LeetCode Problem Archive', url: 'https://leetcode.com/problemset/all/', type: 'Practice', source: 'LeetCode' },
      { title: 'VisuAlgo Algorithm Visualizer', url: 'https://visualgo.net/en', type: 'Interactive', source: 'VisuAlgo' },
      { title: 'NeetCode Structured Roadmap', url: 'https://neetcode.io/roadmap', type: 'Roadmap', source: 'NeetCode' },
    ],
  },
  {
    id: 'dsa_advanced',
    matchRegex: /\b(binary tree|bst|graph|dijkstra|dynamic programming|backtracking|trie|topological sort)\b/i,
    resources: [
      { title: 'VisuAlgo Graph & Tree Visualizer', url: 'https://visualgo.net/en/graphds', type: 'Interactive', source: 'VisuAlgo' },
      { title: 'GeeksforGeeks Complete DSA Portal', url: 'https://www.geeksforgeeks.org/data-structures/', type: 'Documentation', source: 'GeeksforGeeks' },
      { title: 'MIT 6.006 Algorithms Lectures', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', type: 'Academic', source: 'MIT OCW' },
    ],
  },

  // React & Frontend
  {
    id: 'react',
    matchRegex: /\b(react|reactjs|jsx|react hooks|useeffect|usestate|usememo|usecontext)\b/i,
    resources: [
      { title: 'Official React Documentation', url: 'https://react.dev/learn', type: 'Documentation', source: 'React.dev' },
      { title: 'React Hooks Reference', url: 'https://react.dev/reference/react', type: 'Documentation', source: 'React.dev' },
    ],
  },
  // Next.js
  {
    id: 'nextjs',
    matchRegex: /\b(next\.?js|app router|server components|ssg|ssr)\b/i,
    resources: [
      { title: 'Next.js App Router Documentation', url: 'https://nextjs.org/docs', type: 'Documentation', source: 'Nextjs.org' },
      { title: 'Next.js Learn Interactive', url: 'https://nextjs.org/learn', type: 'Interactive', source: 'Vercel' },
    ],
  },
  // JavaScript
  {
    id: 'javascript',
    matchRegex: /\b(javascript|es6|ecmascript|event loop|prototypes|closures|promises)\b/i,
    resources: [
      { title: 'MDN Web Docs: JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', type: 'Documentation', source: 'Mozilla MDN' },
      { title: 'The Modern JavaScript Tutorial', url: 'https://javascript.info/', type: 'Tutorial', source: 'JavaScript.info' },
    ],
  },
  // TypeScript (STRICT: only when typescript is explicitly targeted)
  {
    id: 'typescript',
    matchRegex: /\b(typescript|tsc|tsconfig|typescript generics|interface typing)\b/i,
    resources: [
      { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'Documentation', source: 'TypeScript' },
      { title: 'TypeScript Playground (Live REPL)', url: 'https://www.typescriptlang.org/play', type: 'Playground', source: 'TypeScript' },
    ],
  },
  // Tailwind CSS
  {
    id: 'tailwind',
    matchRegex: /\b(tailwind|tailwindcss|utility classes|css flexbox|css grid)\b/i,
    resources: [
      { title: 'Tailwind CSS Documentation & Cheat Sheet', url: 'https://tailwindcss.com/docs', type: 'Documentation', source: 'Tailwind CSS' },
      { title: 'MDN Web Docs: CSS Layouts', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout', type: 'Guide', source: 'Mozilla MDN' },
    ],
  },

  // Node.js & Backend
  {
    id: 'nodejs',
    matchRegex: /\b(node\.?js|express\.?js|npm package|rest api|middleware|http server)\b/i,
    resources: [
      { title: 'Node.js Official Documentation', url: 'https://nodejs.org/docs/latest/api/', type: 'Documentation', source: 'Node.js' },
      { title: 'Express.js Framework Starter Guide', url: 'https://expressjs.com/en/starter/installing.html', type: 'Documentation', source: 'Express.js' },
    ],
  },
  // SQL & Databases
  {
    id: 'sql',
    matchRegex: /\b(sql|postgres|postgresql|mysql|sqlite|database index|acid transaction|relational db)\b/i,
    resources: [
      { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/current/', type: 'Documentation', source: 'PostgreSQL' },
      { title: 'SQLBolt Interactive Lessons', url: 'https://sqlbolt.com/', type: 'Interactive', source: 'SQLBolt' },
      { title: 'Use The Index, Luke (SQL Indexing)', url: 'https://use-the-index-luke.com/', type: 'Guide', source: 'Database Guide' },
    ],
  },
  // MongoDB
  {
    id: 'mongodb',
    matchRegex: /\b(mongodb|nosql|mongoose|aggregation pipeline)\b/i,
    resources: [
      { title: 'MongoDB Official Documentation', url: 'https://www.mongodb.com/docs/manual/', type: 'Documentation', source: 'MongoDB' },
    ],
  },
  // System Design
  {
    id: 'system_design',
    matchRegex: /\b(system design|microservices|redis cache|load balancer|kafka|message broker|sharding)\b/i,
    resources: [
      { title: 'The System Design Primer by Donne Martin', url: 'https://github.com/donnemartin/system-design-primer', type: 'Architecture', source: 'GitHub' },
      { title: 'Redis Documentation', url: 'https://redis.io/docs/', type: 'Documentation', source: 'Redis.io' },
    ],
  },

  // Docker & Containers
  {
    id: 'docker',
    matchRegex: /\b(docker|dockerfile|docker compose|containerization|container image)\b/i,
    resources: [
      { title: 'Docker Official Documentation', url: 'https://docs.docker.com/get-started/', type: 'Documentation', source: 'Docker.com' },
      { title: 'Play with Docker Interactive Lab', url: 'https://labs.play-with-docker.com/', type: 'Interactive', source: 'Docker' },
    ],
  },
  // Kubernetes
  {
    id: 'kubernetes',
    matchRegex: /\b(kubernetes|k8s|kubectl|ingress controller|helm chart)\b/i,
    resources: [
      { title: 'Kubernetes Official Tutorials', url: 'https://kubernetes.io/docs/tutorials/', type: 'Documentation', source: 'Kubernetes.io' },
    ],
  },
  // AWS Cloud
  {
    id: 'aws',
    matchRegex: /\b(aws|amazon web services|s3 bucket|ec2 instance|aws lambda|iam policy)\b/i,
    resources: [
      { title: 'AWS Cloud Documentation', url: 'https://docs.aws.amazon.com/', type: 'Documentation', source: 'Amazon AWS' },
      { title: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/', type: 'Architecture', source: 'Amazon AWS' },
    ],
  },
  // Git
  {
    id: 'git',
    matchRegex: /\b(git|github|version control|git rebase|git branch|pull request)\b/i,
    resources: [
      { title: 'Pro Git Book (Free Full Textbook)', url: 'https://git-scm.com/book/en/v2', type: 'Book', source: 'Git SCM' },
      { title: 'Learn Git Branching (Visual Game)', url: 'https://learngitbranching.js.org/', type: 'Interactive', source: 'LearnGit' },
    ],
  },

  // SAP Ecosystem
  {
    id: 'sap',
    matchRegex: /\b(sap|abap|cds views|odata|sap fiori|s4hana|s\/4hana|sap btp|sap rap|sap cap)\b/i,
    resources: [
      { title: 'SAP Help Portal & Documentation', url: 'https://help.sap.com/', type: 'Documentation', source: 'SAP Help' },
      { title: 'SAP Community Developer Learning Hub', url: 'https://community.sap.com/', type: 'Community', source: 'SAP Community' },
      { title: 'SAP Fiori Design Guidelines', url: 'https://experience.sap.com/fiori-design-web/', type: 'Design & Tech', source: 'SAP Experience' },
      { title: 'SAP Cloud Application Programming Model (CAP)', url: 'https://cap.cloud.sap/docs/', type: 'Documentation', source: 'SAP CAP' },
    ],
  },
];

/**
 * Returns a list of strictly verified working resources for a given topic or subtopic title.
 */
export function getVerifiedResources(title = '', description = '', category = '', customResources = []) {
  const query = `${title} ${description} ${category}`;
  const matched = [];

  for (const entry of VERIFIED_RESOURCE_DATABASE) {
    if (entry.matchRegex.test(query)) {
      entry.resources.forEach((r) => {
        if (!matched.some((m) => m.url === r.url)) {
          matched.push(r);
        }
      });
    }
  }

  // Merge any user-added custom resources on top
  const combined = [
    ...(customResources || []).map((r) => ({ ...r, source: r.source || 'My Resource' })),
    ...matched,
  ];

  return combined;
}
