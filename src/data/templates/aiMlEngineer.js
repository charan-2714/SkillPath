// src/data/templates/aiMlEngineer.js
// Built-in template for AI/ML Engineer (L0 to L37 curriculum)

export const aiMlEngineerTemplate = {
  id: 'template-aiml-engineer',
  name: 'AI/ML Engineer Roadmap',
  description: 'A comprehensive, structured roadmap from engineering fundamentals to advanced LLMs, RAG, AI agents, and production AI engineering.',
  goal: 'Career Switch / AI Mastery',
  category: 'Technology',
  difficulty: 'All Levels',
  trackingModel: 'skill-development',
  skillDimensions: [
    { id: 'understanding', name: 'Understanding', maxScore: 5 },
    { id: 'implementation', name: 'Implementation', maxScore: 5 },
    { id: 'debugging', name: 'Debugging', maxScore: 5 },
    { id: 'practice', name: 'Practice', maxScore: 5 },
    { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
  ],
  enableAIDependency: true,
  levels: [
    {
      id: 'L0',
      title: 'Engineering Foundation',
      description: 'Core developer environment, terminal fluency, version control, and computing basics.',
      order: 0,
      color: 'slate',
      subjects: [
        {
          id: 'L0-S1',
          title: 'Development Environment & Shell',
          order: 1,
          topics: [
            {
              id: 'L0-T1',
              title: 'Terminal & Unix Commands',
              description: 'Command line fluency, file manipulation, pipelines, and bash scripting.',
              priority: 'core',
              tags: ['cli', 'bash', 'terminal'],
              learningItems: [
                { id: 'l0-t1-1', title: 'Navigate filesystem using cd, ls, pwd, mkdir' },
                { id: 'l0-t1-2', title: 'File manipulation with cp, mv, rm, touch, cat, less' },
                { id: 'l0-t1-3', title: 'Use pipes (|), redirections (>, >>), and grep' },
                { id: 'l0-t1-4', title: 'Understand environment variables and PATH' },
              ],
              practice: [
                { id: 'p-l0-1', title: 'Log Analyzer Script', description: 'Write a bash script to filter and count error lines from a log file.', difficulty: 'easy', type: 'hands-on' },
              ],
              assessments: [
                { id: 'a-l0-1', question: 'How do Unix standard input, output, and error streams interact with redirection operators?', difficulty: 'medium', type: 'interview' },
              ],
              resources: [
                { id: 'r-l0-1', title: 'Linux Command Line Cheat Sheet', url: 'https://explainshell.com/', type: 'Documentation' },
              ],
            },
            {
              id: 'L0-T2',
              title: 'Git Version Control',
              description: 'Branching strategies, merge conflicts, rebasing, and GitHub workflow.',
              priority: 'core',
              tags: ['git', 'version-control'],
              learningItems: [
                { id: 'l0-t2-1', title: 'Core Git commands: init, clone, add, commit, status, log' },
                { id: 'l0-t2-2', title: 'Branching, merging, and resolving merge conflicts' },
                { id: 'l0-t2-3', title: 'Interactive rebase and stash workflows' },
              ],
              practice: [
                { id: 'p-l0-2', title: 'Git Conflict Resolution', description: 'Simulate and resolve a 3-way merge conflict on a test branch.', difficulty: 'medium', type: 'exercise' },
              ],
              assessments: [
                { id: 'a-l0-2', question: 'What is the difference between git merge and git rebase?', difficulty: 'medium', type: 'interview' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'L1',
      title: 'Python Mastery',
      description: 'Advanced Python programming: OOP, closures, decorators, generators, asyncio, and typing.',
      order: 1,
      color: 'indigo',
      subjects: [
        {
          id: 'L1-S1',
          title: 'Advanced Language Features',
          order: 1,
          topics: [
            {
              id: 'L1-T1',
              title: 'Decorators & Closures',
              description: 'Higher-order functions, closures, parameterised decorators, and functools.wraps.',
              priority: 'core',
              tags: ['python', 'decorators', 'functional'],
              learningItems: [
                { id: 'l1-t1-1', title: 'Functions as first-class objects and lexical scoping' },
                { id: 'l1-t1-2', title: 'Implement basic function execution time logger' },
                { id: 'l1-t1-3', title: 'Create parameterised decorator with configurable retry logic' },
                { id: 'l1-t1-4', title: 'Preserve metadata using functools.wraps' },
              ],
              practice: [
                { id: 'p-l1-1', title: 'Rate Limiter Decorator', description: 'Write a decorator @rate_limit(max_per_sec=5) with error handling.', difficulty: 'medium', type: 'coding-challenge' },
                { id: 'p-l1-2', title: 'LRU Cache from Scratch', description: 'Build an @lru_cache decorator without importing functools.', difficulty: 'hard', type: 'coding-challenge' },
              ],
              assessments: [
                { id: 'a-l1-1', question: 'Explain how Python closures work and why decorators depend on them.', difficulty: 'medium', type: 'interview' },
                { id: 'a-l1-2', question: 'What does functools.wraps do and why should you always use it?', difficulty: 'easy', type: 'interview' },
              ],
              resources: [
                { id: 'r-l1-1', title: 'Real Python: Primer on Decorators', url: 'https://realpython.com/primer-on-python-decorators/', type: 'Article' },
              ],
            },
            {
              id: 'L1-T2',
              title: 'Generators & Iterators',
              description: 'Lazy evaluation, generator expressions, yield from, and memory optimization.',
              priority: 'core',
              tags: ['python', 'generators'],
              learningItems: [
                { id: 'l1-t2-1', title: 'Iterator protocol: __iter__ and __next__' },
                { id: 'l1-t2-2', title: 'Generator functions and yield keyword' },
                { id: 'l1-t2-3', title: 'Stream large CSV files without high memory footprint' },
              ],
              practice: [
                { id: 'p-l1-3', title: 'Chunked File Streamer', description: 'Write a generator to read 10GB log files line-by-line in batches.', difficulty: 'medium', type: 'exercise' },
              ],
            },
            {
              id: 'L1-T3',
              title: 'Asynchronous Programming (asyncio)',
              description: 'Event loop, coroutines, Tasks, Futures, and async HTTP requests with aiohttp.',
              priority: 'core',
              tags: ['python', 'async', 'concurrency'],
              learningItems: [
                { id: 'l1-t3-1', title: 'Understand synchronous vs asynchronous execution' },
                { id: 'l1-t3-2', title: 'Use async/await syntax and asyncio.gather' },
                { id: 'l1-t3-3', title: 'Handle concurrent async HTTP requests and rate limits' },
              ],
              practice: [
                { id: 'p-l1-4', title: 'Async URL Scraper', description: 'Concurrently fetch 50 URLs with a concurrency limit of 5.', difficulty: 'hard', type: 'coding-challenge' },
              ],
              assessments: [
                { id: 'a-l1-3', question: 'Explain the difference between threading, multiprocessing, and asyncio in Python.', difficulty: 'hard', type: 'interview' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'L2',
      title: 'Git + GitHub Collaboration',
      description: 'Production Git workflows, code reviews, PR templates, and CI hooks.',
      order: 2,
      color: 'violet',
      subjects: [
        {
          id: 'L2-S1',
          title: 'Team Git Workflows',
          order: 1,
          topics: [
            { id: 'L2-T1', title: 'Trunk-Based vs GitFlow', description: 'Comparing branching strategies for agile and ML deployments.', priority: 'important', tags: ['git', 'devops'] },
            { id: 'L2-T2', title: 'Pre-Commit Hooks & Linting', description: 'Automating code checks with flake8, black, isort, and pre-commit.', priority: 'important', tags: ['git', 'automation'] },
          ],
        },
      ],
    },
    {
      id: 'L3',
      title: 'Linux + CLI for Data & ML',
      description: 'System resource monitoring, process management, SSH, tmux, and GPU monitoring.',
      order: 3,
      color: 'blue',
      subjects: [
        {
          id: 'L3-S1',
          title: 'Server Management',
          order: 1,
          topics: [
            { id: 'L3-T1', title: 'Process & Memory Inspection', description: 'Using top, htop, ps, kill, and nvidia-smi for ML jobs.', priority: 'core', tags: ['linux', 'ops'] },
            { id: 'L3-T2', title: 'SSH & Remote Execution', description: 'SSH keys, port forwarding, tmux sessions, and scp/rsync.', priority: 'core', tags: ['linux', 'ssh'] },
          ],
        },
      ],
    },
    {
      id: 'L4',
      title: 'Web & HTTP Fundamentals',
      description: 'HTTP/HTTPS methods, headers, status codes, cookies, sessions, and REST principles.',
      order: 4,
      color: 'cyan',
      subjects: [
        {
          id: 'L4-S1',
          title: 'Networking & Protocols',
          order: 1,
          topics: [
            { id: 'L4-T1', title: 'HTTP Methods & Status Codes', description: 'Deep dive into 2xx, 3xx, 4xx, 5xx status codes and idempotency.', priority: 'core', tags: ['http', 'web'] },
            { id: 'L4-T2', title: 'REST API Architecture', description: 'Statelessness, resource naming, pagination, and error responses.', priority: 'core', tags: ['rest', 'api'] },
          ],
        },
      ],
    },
    {
      id: 'L5',
      title: 'APIs & Backend with FastAPI',
      description: 'Building high-performance REST APIs with FastAPI, Pydantic, and dependency injection.',
      order: 5,
      color: 'teal',
      subjects: [
        {
          id: 'L5-S1',
          title: 'FastAPI Production Framework',
          order: 1,
          topics: [
            {
              id: 'L5-T1',
              title: 'Pydantic Data Validation',
              description: 'Type annotations, BaseModel, custom validators, and serialization.',
              priority: 'core',
              tags: ['fastapi', 'pydantic'],
              learningItems: [
                { id: 'l5-t1-1', title: 'Define request/response schemas with Pydantic' },
                { id: 'l5-t1-2', title: 'Implement field validators and custom error handling' },
              ],
            },
            {
              id: 'L5-T2',
              title: 'FastAPI Dependency Injection',
              description: 'Reusable dependencies, authentication middleware, and database sessions.',
              priority: 'core',
              tags: ['fastapi', 'backend'],
            },
          ],
        },
      ],
    },
    {
      id: 'L6',
      title: 'Python Automation & Scripting',
      description: 'Automating tasks, background workers, scheduled cron jobs, and file processing.',
      order: 6,
      color: 'emerald',
      subjects: [
        {
          id: 'L6-S1',
          title: 'Automation Tools',
          order: 1,
          topics: [
            { id: 'L6-T1', title: 'CLI Tools with Click & Typer', description: 'Building intuitive CLI tools with arguments, flags, and color output.', priority: 'important', tags: ['python', 'cli'] },
          ],
        },
      ],
    },
    {
      id: 'L7',
      title: 'Playwright & Browser Automation',
      description: 'Modern end-to-end browser testing and web scraping with Playwright Python.',
      order: 7,
      color: 'green',
      subjects: [
        {
          id: 'L7-S1',
          title: 'Headless Browser Automation',
          order: 1,
          topics: [
            { id: 'L7-T1', title: 'Playwright Locators & Selectors', description: 'Robust auto-waiting locators, CSS/XPath, and assertions.', priority: 'core', tags: ['playwright', 'testing'] },
            { id: 'L7-T2', title: 'Page Object Model (POM)', description: 'Designing maintainable and reusable automation architecture.', priority: 'important', tags: ['playwright', 'pom'] },
          ],
        },
      ],
    },
    {
      id: 'L8',
      title: 'HTML & Web Scraping',
      description: 'Parsing HTML with BeautifulSoup, requests, handling dynamic SPAs and rate limiting.',
      order: 8,
      color: 'lime',
      subjects: [
        {
          id: 'L8-S1',
          title: 'Web Data Extraction',
          order: 1,
          topics: [
            { id: 'L8-T1', title: 'BeautifulSoup4 & lxml', description: 'Navigating the DOM tree, extracting structured tables and text.', priority: 'important', tags: ['scraping', 'html'] },
          ],
        },
      ],
    },
    {
      id: 'L9',
      title: 'Pandas & Data Processing',
      description: 'DataFrames, series, vectorised operations, aggregation, merging, and cleaning.',
      order: 9,
      color: 'amber',
      subjects: [
        {
          id: 'L9-S1',
          title: 'Data Wrangling',
          order: 1,
          topics: [
            {
              id: 'L9-T1',
              title: 'Data Cleaning & Transformation',
              description: 'Handling missing values, duplicate records, outliers, and data types.',
              priority: 'core',
              tags: ['pandas', 'data'],
              learningItems: [
                { id: 'l9-t1-1', title: 'Impute or drop missing data (fillna, dropna)' },
                { id: 'l9-t1-2', title: 'GroupBy aggregations and pivot tables' },
                { id: 'l9-t1-3', title: 'Merge, join, and concatenate multiple datasets' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'L10',
      title: 'Testing & Pytest',
      description: 'Unit testing, fixtures, parameterization, mocking, and coverage reports.',
      order: 10,
      color: 'orange',
      subjects: [
        {
          id: 'L10-S1',
          title: 'Quality Engineering',
          order: 1,
          topics: [
            { id: 'L10-T1', title: 'Pytest Fixtures & Mocks', description: 'Setting up clean test environments and mocking external APIs.', priority: 'core', tags: ['testing', 'pytest'] },
          ],
        },
      ],
    },
    {
      id: 'L11',
      title: 'SQL & Database Systems',
      description: 'Relational data modeling, complex queries, joins, indexes, and transactions.',
      order: 11,
      color: 'rose',
      subjects: [
        {
          id: 'L11-S1',
          title: 'Relational Databases',
          order: 1,
          topics: [
            { id: 'L11-T1', title: 'Advanced SQL Queries', description: 'Window functions, CTEs, subqueries, and indexing strategies.', priority: 'core', tags: ['sql', 'database'] },
          ],
        },
      ],
    },
    {
      id: 'L12',
      title: 'JavaScript Fundamentals',
      description: 'ES6+ syntax, asynchronous JS, Promises, closures, and DOM manipulation.',
      order: 12,
      color: 'yellow',
      subjects: [
        {
          id: 'L12-S1',
          title: 'Modern JavaScript',
          order: 1,
          topics: [
            { id: 'L12-T1', title: 'Async JS & Event Loop', description: 'Microtasks, macrotasks, Promises, and async/await.', priority: 'important', tags: ['javascript', 'async'] },
          ],
        },
      ],
    },
    {
      id: 'L13',
      title: 'Node.js & Tooling',
      description: 'Node runtime, npm ecosystem, package management, and basic server creation.',
      order: 13,
      color: 'emerald',
      subjects: [
        {
          id: 'L13-S1',
          title: 'Node Runtime',
          order: 1,
          topics: [
            { id: 'L13-T1', title: 'Node Streams & Buffer', description: 'Working with binary data and high-volume streams.', priority: 'optional', tags: ['nodejs'] },
          ],
        },
      ],
    },
    {
      id: 'L14',
      title: 'Data Structures & Algorithms (DSA)',
      description: 'Arrays, hash maps, trees, graphs, dynamic programming, and Big-O analysis.',
      order: 14,
      color: 'purple',
      subjects: [
        {
          id: 'L14-S1',
          title: 'Core Algorithms',
          order: 1,
          topics: [
            { id: 'L14-T1', title: 'Hash Tables & Two Pointers', description: 'O(1) lookups, sliding window, and two-pointer techniques.', priority: 'core', tags: ['dsa', 'algorithms'] },
            { id: 'L14-T2', title: 'Trees & Graph Traversal', description: 'BFS, DFS, binary search trees, and Dijkstra algorithm.', priority: 'core', tags: ['dsa', 'graphs'] },
          ],
        },
      ],
    },
    {
      id: 'L15',
      title: 'Mathematics for Machine Learning',
      description: 'Linear algebra (matrices, eigenvalues), calculus (gradients), and probability/statistics.',
      order: 15,
      color: 'indigo',
      subjects: [
        {
          id: 'L15-S1',
          title: 'Applied Math',
          order: 1,
          topics: [
            { id: 'L15-T1', title: 'Linear Algebra for ML', description: 'Vectors, dot products, matrix multiplication, and vector spaces.', priority: 'core', tags: ['math', 'linear-algebra'] },
            { id: 'L15-T2', title: 'Multivariate Calculus & Gradients', description: 'Partial derivatives, chain rule, and gradient descent intuition.', priority: 'core', tags: ['math', 'calculus'] },
          ],
        },
      ],
    },
    {
      id: 'L16',
      title: 'Machine Learning Fundamentals',
      description: 'Supervised & unsupervised learning: regression, trees, SVMs, clustering, Scikit-Learn.',
      order: 16,
      color: 'blue',
      subjects: [
        {
          id: 'L16-S1',
          title: 'Classical Machine Learning',
          order: 1,
          topics: [
            {
              id: 'L16-T1',
              title: 'Linear & Logistic Regression',
              description: 'Cost functions, gradient descent, classification metrics, ROC-AUC.',
              priority: 'core',
              tags: ['ml', 'regression'],
            },
            {
              id: 'L16-T2',
              title: 'Tree-Based Models (XGBoost, LightGBM)',
              description: 'Decision trees, Random Forests, Gradient Boosted Trees, and feature importance.',
              priority: 'core',
              tags: ['ml', 'xgboost'],
            },
          ],
        },
      ],
    },
    {
      id: 'L17',
      title: 'Deep Learning & Neural Networks',
      description: 'Feedforward networks, backpropagation, activation functions, PyTorch, and optimization.',
      order: 17,
      color: 'violet',
      subjects: [
        {
          id: 'L17-S1',
          title: 'Deep Neural Networks',
          order: 1,
          topics: [
            {
              id: 'L17-T1',
              title: 'PyTorch Tensors & Autograd',
              description: 'Building custom layers, forward/backward passes, and custom loss functions.',
              priority: 'core',
              tags: ['deep-learning', 'pytorch'],
            },
          ],
        },
      ],
    },
    {
      id: 'L18',
      title: 'Transformer Architecture',
      description: 'Self-attention mechanism, Multi-head attention, Positional encodings, and BERT/GPT.',
      order: 18,
      color: 'purple',
      subjects: [
        {
          id: 'L18-S1',
          title: 'Attention & Transformers',
          order: 1,
          topics: [
            { id: 'L18-T1', title: 'Self-Attention from Scratch', description: 'Query, Key, Value computation, scaled dot-product attention.', priority: 'core', tags: ['transformers', 'attention'] },
          ],
        },
      ],
    },
    {
      id: 'L19',
      title: 'LLM Fundamentals',
      description: 'Pre-training, fine-tuning (RLHF/DPO), context windows, tokenization (BPE), and scaling laws.',
      order: 19,
      color: 'orange',
      subjects: [
        {
          id: 'L19-S1',
          title: 'Large Language Models',
          order: 1,
          topics: [
            { id: 'L19-T1', title: 'Tokenization & Context Limits', description: 'Byte Pair Encoding, tiktoken, subword tokenization, and KV caching.', priority: 'core', tags: ['llms', 'tokenization'] },
          ],
        },
      ],
    },
    {
      id: 'L20',
      title: 'Prompt Engineering & In-Context Learning',
      description: 'Few-shot, Chain-of-Thought, ReAct prompting, system prompts, and prompt security.',
      order: 20,
      color: 'amber',
      subjects: [
        {
          id: 'L20-S1',
          title: 'Prompt Systems',
          order: 1,
          topics: [
            { id: 'L20-T1', title: 'Chain-of-Thought & Reasoning Prompts', description: 'Step-by-step reasoning, self-consistency, and scratchpads.', priority: 'core', tags: ['prompt-engineering'] },
          ],
        },
      ],
    },
    {
      id: 'L21',
      title: 'LLM APIs & Structured Output',
      description: 'OpenAI/Anthropic/Gemini APIs, JSON mode, Instructor, Pydantic structured outputs.',
      order: 21,
      color: 'teal',
      subjects: [
        {
          id: 'L21-S1',
          title: 'API Integration',
          order: 1,
          topics: [
            { id: 'L21-T1', title: 'Structured Output with Pydantic & Instructor', description: 'Reliable typed JSON schemas from LLM generations.', priority: 'core', tags: ['llms', 'structured-output'] },
          ],
        },
      ],
    },
    {
      id: 'L22',
      title: 'Embeddings & Vector Databases',
      description: 'Dense embeddings, cosine similarity, ChromaDB, Pinecone, Qdrant, and HNSW indexing.',
      order: 22,
      color: 'cyan',
      subjects: [
        {
          id: 'L22-S1',
          title: 'Vector Search',
          order: 1,
          topics: [
            { id: 'L22-T1', title: 'Vector Indexing (HNSW & IVFFlat)', description: 'Approximate nearest neighbor search algorithms and trade-offs.', priority: 'core', tags: ['embeddings', 'vectordb'] },
          ],
        },
      ],
    },
    {
      id: 'L23',
      title: 'Retrieval-Augmented Generation (RAG)',
      description: 'Document ingestion, chunking strategies, hybrid search, reranking, and citation.',
      order: 23,
      color: 'indigo',
      subjects: [
        {
          id: 'L23-S1',
          title: 'Production RAG Systems',
          order: 1,
          topics: [
            {
              id: 'L23-T1',
              title: 'Advanced Chunking & Hybrid Search',
              description: 'Semantic chunking, parent document retriever, BM25 + dense fusion with Cohere reranker.',
              priority: 'core',
              tags: ['rag', 'search'],
            },
          ],
        },
      ],
    },
    {
      id: 'L24',
      title: 'Tool & Function Calling',
      description: 'OpenAI function calling, tool definitions, multi-tool execution, and error handling.',
      order: 24,
      color: 'blue',
      subjects: [
        {
          id: 'L24-S1',
          title: 'Tool Integration',
          order: 1,
          topics: [
            { id: 'L24-T1', title: 'Schema Definition & Execution Loop', description: 'Defining JSON schema for tools and executing deterministic code loops.', priority: 'core', tags: ['tools', 'agents'] },
          ],
        },
      ],
    },
    {
      id: 'L25',
      title: 'Agentic AI Architecture',
      description: 'Autonomous agents, planning, reflection, tool use, memory, and multi-agent coordination.',
      order: 25,
      color: 'violet',
      subjects: [
        {
          id: 'L25-S1',
          title: 'Autonomous Agents',
          order: 1,
          topics: [
            {
              id: 'L25-T1',
              title: 'ReAct & Plan-and-Solve Loops',
              description: 'Implementing autonomous reasoning loops with state machine transitions.',
              priority: 'core',
              tags: ['agents', 'autonomous'],
            },
          ],
        },
      ],
    },
    {
      id: 'L26',
      title: 'LangChain & LangGraph',
      description: 'Building graph-based stateful multi-agent workflows with LangGraph and checkpoints.',
      order: 26,
      color: 'purple',
      subjects: [
        {
          id: 'L26-S1',
          title: 'Stateful Agent Graphs',
          order: 1,
          topics: [
            { id: 'L26-T1', title: 'LangGraph State Graphs & Reducers', description: 'Creating cyclical workflows with human-in-the-loop approvals.', priority: 'core', tags: ['langgraph', 'agents'] },
          ],
        },
      ],
    },
    {
      id: 'L27',
      title: 'Model Context Protocol (MCP)',
      description: 'Anthropic Model Context Protocol: building MCP servers, tools, resources, and clients.',
      order: 27,
      color: 'rose',
      subjects: [
        {
          id: 'L27-S1',
          title: 'MCP Development',
          order: 1,
          topics: [
            { id: 'L27-T1', title: 'Building Python MCP Servers', description: 'Exposing tools, dynamic resources, and prompts over stdio and SSE.', priority: 'core', tags: ['mcp', 'tools'] },
          ],
        },
      ],
    },
    {
      id: 'L28',
      title: 'Advanced AI & Multimodal',
      description: 'Vision-language models, audio transcription (Whisper), and image generation pipelines.',
      order: 28,
      color: 'pink',
      subjects: [
        {
          id: 'L28-S1',
          title: 'Multimodal Systems',
          order: 1,
          topics: [
            { id: 'L28-T1', title: 'Vision LLMs (GPT-4o, Claude 3.5 Sonnet)', description: 'Document OCR, diagram understanding, and visual question answering.', priority: 'important', tags: ['vision', 'multimodal'] },
          ],
        },
      ],
    },
    {
      id: 'L29',
      title: 'LLM Evaluation & Observability',
      description: 'Ragas, LangSmith, TruLens, hallucination metrics, latency, and token cost tracking.',
      order: 29,
      color: 'orange',
      subjects: [
        {
          id: 'L29-S1',
          title: 'Evaluation Frameworks',
          order: 1,
          topics: [
            { id: 'L29-T1', title: 'RAG Triad & Ragas Metrics', description: 'Context relevance, groundedness, and answer relevance evaluation.', priority: 'core', tags: ['evaluation', 'rag'] },
          ],
        },
      ],
    },
    {
      id: 'L30',
      title: 'AI Security & Guardrails',
      description: 'Prompt injection defense, jailbreaks, NeMo Guardrails, PII redaction, and output safety.',
      order: 30,
      color: 'red',
      subjects: [
        {
          id: 'L30-S1',
          title: 'Safety & Defenses',
          order: 1,
          topics: [
            { id: 'L30-T1', title: 'Prompt Injection & Jailbreak Defense', description: 'Defensive prompt sandwiching, input classifiers, and output filters.', priority: 'core', tags: ['security', 'guardrails'] },
          ],
        },
      ],
    },
    {
      id: 'L31',
      title: 'Docker & CI/CD for AI Systems',
      description: 'Containerizing ML services, multi-stage builds, GPU Docker, and GitHub Actions.',
      order: 31,
      color: 'blue',
      subjects: [
        {
          id: 'L31-S1',
          title: 'Containers & Pipelines',
          order: 1,
          topics: [
            { id: 'L31-T1', title: 'Dockerizing FastAPI + PyTorch Apps', description: 'Optimizing container size, caching layers, and CUDA support.', priority: 'core', tags: ['docker', 'devops'] },
          ],
        },
      ],
    },
    {
      id: 'L32',
      title: 'Cloud Deployment (AWS / GCP)',
      description: 'Serverless functions, AWS Lambda, ECS, Cloud Run, S3, and API Gateway.',
      order: 32,
      color: 'cyan',
      subjects: [
        {
          id: 'L32-S1',
          title: 'Cloud Infrastructure',
          order: 1,
          topics: [
            { id: 'L32-T1', title: 'Deploying Microservices on Cloud Run', description: 'Containerized serverless deployment with autoscaling and custom domains.', priority: 'core', tags: ['cloud', 'gcp'] },
          ],
        },
      ],
    },
    {
      id: 'L33',
      title: 'System Design for AI / ML',
      description: 'Designing scalable RAG systems, real-time caching, rate limiting, and vector databases.',
      order: 33,
      color: 'teal',
      subjects: [
        {
          id: 'L33-S1',
          title: 'Architecture & Scaling',
          order: 1,
          topics: [
            { id: 'L33-T1', title: 'High-Throughput RAG Architecture', description: 'Asynchronous ingestion, streaming responses, Redis caching, and vector sharding.', priority: 'core', tags: ['system-design', 'architecture'] },
          ],
        },
      ],
    },
    {
      id: 'L34',
      title: 'Production AI Engineering',
      description: 'SLA management, fallback strategies, model routing, caching (GPTCache), and rate limiting.',
      order: 34,
      color: 'emerald',
      subjects: [
        {
          id: 'L34-S1',
          title: 'Production Reliability',
          order: 1,
          topics: [
            { id: 'L34-T1', title: 'Semantic Caching & Model Fallbacks', description: 'Saving 60%+ costs using semantic caching and multi-provider failover.', priority: 'core', tags: ['production', 'caching'] },
          ],
        },
      ],
    },
    {
      id: 'L35',
      title: 'Portfolio Projects',
      description: 'Building end-to-end production AI applications that stand out on GitHub and resumes.',
      order: 35,
      color: 'indigo',
      subjects: [
        {
          id: 'L35-S1',
          title: 'Full-Scale Capstone Projects',
          order: 1,
          topics: [
            { id: 'L35-T1', title: 'Enterprise Document RAG with Citations', description: 'Multi-modal document parser, hybrid vector search, and audit trail.', priority: 'core', tags: ['projects', 'rag'] },
            { id: 'L35-T2', title: 'Autonomous Research & Coding Agent', description: 'Multi-tool agent with persistent memory and code execution sandbox.', priority: 'core', tags: ['projects', 'agents'] },
          ],
        },
      ],
    },
    {
      id: 'L36',
      title: 'Interview Preparation',
      description: 'Coding interviews, ML theory, LLM system design, behavioral questions, and resume polish.',
      order: 36,
      color: 'purple',
      subjects: [
        {
          id: 'L36-S1',
          title: 'Technical Interview Mastery',
          order: 1,
          topics: [
            { id: 'L36-T1', title: 'AI System Design Mock Interviews', description: 'Practicing 45-minute architectural walkthroughs for AI systems.', priority: 'core', tags: ['interviews', 'system-design'] },
          ],
        },
      ],
    },
    {
      id: 'L37',
      title: 'Technology Radar & Continuous Learning',
      description: 'Staying current with arXiv papers, frontier models, open-weights (DeepSeek, Llama), and tools.',
      order: 37,
      color: 'slate',
      subjects: [
        {
          id: 'L37-S1',
          title: 'Frontier AI Research',
          order: 1,
          topics: [
            { id: 'L37-T1', title: 'Reading & Implementing Research Papers', description: 'Fast reading methodology for arXiv papers and extracting pseudocode.', priority: 'important', tags: ['research', 'papers'] },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'RAG Document Search Engine',
      description: 'A production-grade Retrieval-Augmented Generation service with hybrid search and reranking.',
      goal: 'Demonstrate vector search, chunking, and evaluation expertise',
      technologies: ['FastAPI', 'ChromaDB', 'OpenAI', 'Cohere', 'Docker'],
      status: 'in-progress',
      progress: 65,
      startDate: '2025-01-10',
      targetDate: '2025-03-01',
      githubUrl: 'https://github.com/example/rag-search-engine',
      skillsDemonstrated: ['RAG', 'Vector DB', 'FastAPI', 'Docker'],
      checklist: [
        { id: 'c1', title: 'Document parsing pipeline', completed: true },
        { id: 'c2', title: 'Hybrid search (BM25 + Dense)', completed: true },
        { id: 'c3', title: 'Reranker integration', completed: true },
        { id: 'c4', title: 'Ragas evaluation test suite', completed: false },
        { id: 'c5', title: 'Docker container & deployment', completed: false },
      ],
    },
    {
      id: 'proj-2',
      name: 'Autonomous Research AI Agent',
      description: 'Multi-tool reasoning agent using LangGraph with state persistence and web scraping.',
      goal: 'Demonstrate agentic workflows, function calling, and state machines',
      technologies: ['Python', 'LangGraph', 'Playwright', 'Tavily API'],
      status: 'planning',
      progress: 20,
      skillsDemonstrated: ['LangGraph', 'Agents', 'Playwright', 'Tool Calling'],
      checklist: [
        { id: 'c1', title: 'Define agent state schema', completed: true },
        { id: 'c2', title: 'Tool execution sandbox', completed: false },
        { id: 'c3', title: 'Human-in-the-loop checkpointing', completed: false },
      ],
    },
  ],
};
