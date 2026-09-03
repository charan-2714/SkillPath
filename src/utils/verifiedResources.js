// src/utils/verifiedResources.js
// Precision domain-isolated verified learning resources (W3Schools, GeeksforGeeks, and Official Documentation)

export const DOMAIN_RESOURCE_MAP = [
  // 1. Git & Version Control (HIGHEST PRIORITY FOR GIT TOPICS)
  {
    id: 'git',
    matchRegex: /\b(git|github|gitlab|version\s*control|git\s*rebase|git\s*branch|git\s*merge|git\s*commit|git\s*stash|git\s*log|pull\s*request|working\s*tree|commit\s*graph|repository)\b/i,
    resources: [
      { title: 'W3Schools Git & GitHub Complete Tutorial', url: 'https://www.w3schools.com/git/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Git Tutorial & Cheat Sheet', url: 'https://www.geeksforgeeks.org/git-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Pro Git Book (Official Git-SCM Reference)', url: 'https://git-scm.com/book/en/v2', type: 'Documentation', source: 'Git SCM' },
    ],
  },

  // 2. Docker, Kubernetes & Containerization
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

  // 3. LangChain, RAG & Agentic AI
  {
    id: 'langchain_ai',
    matchRegex: /\b(langchain|langgraph|autogen|rag\b|retrieval\s*augmented|vector\s*database|chromadb|pinecone|embeddings|prompt\s*engineering|agentic\s*ai)\b/i,
    resources: [
      { title: 'LangChain Official Framework Documentation', url: 'https://python.langchain.com/docs/get_started/introduction', type: 'Documentation', source: 'LangChain' },
      { title: 'GeeksforGeeks LangChain Framework Tutorial', url: 'https://www.geeksforgeeks.org/langchain-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Pinecone Vector Database Architecture Guide', url: 'https://www.pinecone.io/learn/vector-database/', type: 'Guide', source: 'Pinecone' },
    ],
  },

  // 4. Transformers, LLMs & Hugging Face
  {
    id: 'transformers_llms',
    matchRegex: /\b(transformer|transformers|hugging\s*face|huggingface|bert\b|gpt\b|llm\b|tokenization|self-attention|genai)\b/i,
    resources: [
      { title: 'Hugging Face Transformers Official Documentation', url: 'https://huggingface.co/docs/transformers/index', type: 'Documentation', source: 'Hugging Face' },
      { title: 'GeeksforGeeks NLP & Transformers Architecture', url: 'https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'Visual Guide', source: 'Illustrated AI' },
    ],
  },

  // 5. PyTorch & Deep Learning
  {
    id: 'pytorch',
    matchRegex: /\b(pytorch|torch\b|neural\s*network|deep\s*learning|backpropagation|autograd|tensor\b|cnn\b|convolutional|rnn\b|lstm\b)\b/i,
    resources: [
      { title: 'GeeksforGeeks PyTorch Tutorial (Deep Learning)', url: 'https://www.geeksforgeeks.org/getting-started-with-pytorch/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'PyTorch Official 60min Blitz & Tutorials', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'Documentation', source: 'PyTorch.org' },
      { title: 'GeeksforGeeks Deep Learning Overview', url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 6. Scikit-Learn & Classical Machine Learning
  {
    id: 'sklearn',
    matchRegex: /\b(scikit-learn|sklearn|logistic\s*regression|random\s*forest|decision\s*tree|gradient\s*boosting|xgboost|svm\b|k-means|pca\b|machine\s*learning)\b/i,
    resources: [
      { title: 'W3Schools Machine Learning with Python', url: 'https://www.w3schools.com/python/python_ml_getting_started.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Machine Learning Tutorial', url: 'https://www.geeksforgeeks.org/machine-learning/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Scikit-Learn Official User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'Documentation', source: 'Scikit-Learn' },
    ],
  },

  // 7. Pandas & NumPy Data Science
  {
    id: 'pandas_numpy',
    matchRegex: /\b(pandas|dataframe|dataframes|series\b|groupby|read_csv|numpy|ndarray|broadcasting|vectorization|matplotlib|seaborn)\b/i,
    resources: [
      { title: 'W3Schools Pandas Tutorial with Live Code', url: 'https://www.w3schools.com/python/pandas/default.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools NumPy Tutorial for Beginners', url: 'https://www.w3schools.com/python/numpy/default.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Pandas Tutorial for Data Science', url: 'https://www.geeksforgeeks.org/pandas-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks NumPy Tutorial with Examples', url: 'https://www.geeksforgeeks.org/numpy-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 8. Python Language & Core Syntax
  {
    id: 'python_core',
    matchRegex: /\b(python|python3|pip\b|pytest|pep8|list\s*comprehension|dunder|generator|decorator)\b/i,
    resources: [
      { title: 'W3Schools Python Tutorial (Full Course)', url: 'https://www.w3schools.com/python/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python Programming Language Portal', url: 'https://www.geeksforgeeks.org/python-programming-language/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'W3Schools Python Functions & Classes Guide', url: 'https://www.w3schools.com/python/python_functions.asp', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Python OOPs Concepts Guide', url: 'https://www.geeksforgeeks.org/python-oops-concepts/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 9. SQL & Relational Databases
  {
    id: 'sql_db',
    matchRegex: /\b(sql\b|postgres|postgresql|mysql|sqlite|database\s*schema|sql\s*join|acid\s*transaction|rdbms|relational\s*database)\b/i,
    resources: [
      { title: 'W3Schools SQL Tutorial with Live Editor', url: 'https://www.w3schools.com/sql/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks SQL Tutorial (Beginner to Advanced)', url: 'https://www.geeksforgeeks.org/sql-tutorial/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/current/', type: 'Documentation', source: 'PostgreSQL' },
    ],
  },

  // 10. React & Modern Frontend
  {
    id: 'react_frontend',
    matchRegex: /\b(react\b|reactjs|jsx\b|react\s*hooks|useeffect|usestate|usememo|usecontext|next\.?js)\b/i,
    resources: [
      { title: 'W3Schools React Tutorial with Live Examples', url: 'https://www.w3schools.com/react/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks ReactJS Complete Guide', url: 'https://www.geeksforgeeks.org/reactjs-tutorials/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'React Official Documentation (react.dev)', url: 'https://react.dev/learn', type: 'Documentation', source: 'React.dev' },
    ],
  },

  // 11. JavaScript, HTML & CSS
  {
    id: 'web_core',
    matchRegex: /\b(javascript|es6|ecmascript|html5?|css3?|flexbox|css\s*grid|tailwind|tailwindcss|dom\s*manipulation)\b/i,
    resources: [
      { title: 'W3Schools JavaScript Tutorial', url: 'https://www.w3schools.com/js/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'W3Schools CSS Layouts (Flexbox & Grid)', url: 'https://www.w3schools.com/css/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks JavaScript Tutorial', url: 'https://www.geeksforgeeks.org/javascript/', type: 'Tutorial', source: 'GeeksforGeeks' },
    ],
  },

  // 12. Node.js & Backend
  {
    id: 'nodejs',
    matchRegex: /\b(node\.?js|express\.?js|rest\s*api|middleware|http\s*server|npm\s*package)\b/i,
    resources: [
      { title: 'W3Schools Node.js Tutorial', url: 'https://www.w3schools.com/nodejs/', type: 'Tutorial', source: 'W3Schools' },
      { title: 'GeeksforGeeks Node.js Tutorial', url: 'https://www.geeksforgeeks.org/nodejs/', type: 'Tutorial', source: 'GeeksforGeeks' },
      { title: 'Express.js Framework Starter Guide', url: 'https://expressjs.com/en/starter/installing.html', type: 'Documentation', source: 'Express.js' },
    ],
  },

  // 13. Data Structures & Algorithms (STRICT: ONLY FOR ACTUAL DSA TOPICS)
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

  // 14. Aptitude & Placement
  {
    id: 'aptitude',
    matchRegex: /\b(quantitative\s*aptitude|logical\s*reasoning|syllogism|verbal\s*ability|placement\s*prep)\b/i,
    resources: [
      { title: 'GeeksforGeeks Quantitative Aptitude Portal', url: 'https://www.geeksforgeeks.org/quantitative-aptitude-maths/', type: 'Practice', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Logical Reasoning Preparation', url: 'https://www.geeksforgeeks.org/logical-reasoning/', type: 'Practice', source: 'GeeksforGeeks' },
      { title: 'GeeksforGeeks Campus Placement Preparation', url: 'https://www.geeksforgeeks.org/placement-preparation-course/', type: 'Roadmap', source: 'GeeksforGeeks' },
    ],
  },

  // 15. SAP Ecosystem
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
  const query = `${title} ${description} ${category}`;
  const matched = [];

  // Match ONLY the single most relevant primary domain rule (first match wins to prevent cross-domain pollution)
  for (const entry of DOMAIN_RESOURCE_MAP) {
    if (entry.matchRegex.test(query)) {
      entry.resources.forEach((r) => {
        if (!matched.some((m) => m.url === r.url)) {
          matched.push(r);
        }
      });
      break; // STRICT: Break immediately on first specific domain match!
    }
  }

  // If nothing matched, generate direct topic-targeted GeeksforGeeks and W3Schools links
  if (matched.length === 0 && title.trim()) {
    const cleanTitle = title.replace(/[^\w\s]/g, ' ').trim();
    matched.push(
      {
        title: `GeeksforGeeks Guide: ${title}`,
        url: `https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(cleanTitle)}`,
        type: 'Tutorial',
        source: 'GeeksforGeeks',
      },
      {
        title: `W3Schools Tutorial: ${title}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(`site:w3schools.com ${cleanTitle}`)}`,
        type: 'Tutorial',
        source: 'W3Schools',
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
      url === 'https://example.com/';
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
