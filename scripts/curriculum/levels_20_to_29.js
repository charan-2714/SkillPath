// scripts/curriculum/levels_20_to_29.js
// Levels L20 through L29 of the updated AI/ML Engineer Master Curriculum

import { createTopic } from './helpers.js';

export const levels20to29 = [
  // ----------------------------------------------------
  // L20 — LLM APIS + STRUCTURED OUTPUT
  // ----------------------------------------------------
  {
    id: 'l20',
    order: 20,
    title: 'L20 — LLM APIs, SDKs & Structured Output Validation',
    description: 'Interacting with LLMs programmatically: OpenAI, Anthropic, and Google Gemini SDKs, token counting with tiktoken, cost calculation, streaming responses via Server-Sent Events (SSE), rate limit handling with exponential backoff, JSON Mode, strict schema validation using Pydantic and Instructor, and model fallback chains.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 30,
    color: 'green',
    subjects: [
      {
        id: 'l20-s1-llm-sdks-and-streaming',
        order: 1,
        title: 'LLM SDKs, Streaming (SSE) & Resilience',
        description: 'Connecting to OpenAI, Anthropic, and Gemini SDKs, handling authentication, streaming token chunks in real-time, token usage telemetry, and robust error recovery.',
        topics: [
          createTopic({
            id: 'llm-sdks-streaming-and-rate-limits',
            order: 1,
            title: 'OpenAI/Anthropic/Gemini SDKs, Streaming & Rate-Limit Resilience',
            description: 'Programmatic LLM integration: initializing clients with API keys, calling chat completion endpoints, streaming responses via Server-Sent Events (`stream=True`), token tracking with `tiktoken`, calculating API costs, and handling rate limits (HTTP 429) with exponential backoff and jitter.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['llm-apis', 'openai', 'anthropic', 'streaming', 'rate-limits'],
            subtopics: [
              'Installing and configuring official SDKs: `openai`, `anthropic`, `google-genai` with secure environment variables',
              'Chat completion request parameters: `model`, `messages` (system, user, assistant), `temperature`, `max_tokens`, `seed` for reproducibility',
              'Real-time token streaming with `stream=True`: consuming async generators and streaming tokens to frontends via Server-Sent Events (SSE)',
              'Accurate token counting with `tiktoken` (cl100k_base / o200k_base) and estimating cost per 1M input/output tokens',
              'Handling API errors: AuthenticationError (401), RateLimitError (429), ContextLengthExceededError, and ServerError (500/503)',
              'Implementing resilient API wrappers using `tenacity` with exponential backoff, max retries, and jitter',
              'Model Fallback Chains: automatically falling back to alternative models or providers when primary provider experiences downtime'
            ]
          })
        ]
      },
      {
        id: 'l20-s2-structured-outputs-and-pydantic',
        order: 2,
        title: 'Structured Output, JSON Schemas & Pydantic Validation',
        description: 'Constraining LLM outputs to guaranteed JSON schemas: native JSON Mode, Structured Outputs with Pydantic models, type validation, and the Instructor library.',
        topics: [
          createTopic({
            id: 'llm-structured-outputs-pydantic-instructor',
            order: 1,
            title: 'Structured Outputs: JSON Schemas, Pydantic & Instructor',
            description: 'Guaranteed structured data generation: `response_format={"type": "json_object"}`, OpenAI Strict Structured Outputs with `response_format=PydanticModel`, Pydantic validation errors, automated retry corrections, and the `instructor` library.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['structured-outputs', 'pydantic', 'instructor', 'json-schema'],
            learningObjectives: [
              'Define complex nested Pydantic models with Field descriptions to guide LLM extraction',
              'Use OpenAI Strict Structured Outputs to guarantee 100% schema compliance at generation time',
              'Integrate the Instructor library for automated self-healing validation retries on invalid outputs',
              'Extract complex entity relations from unstructured text into strongly-typed objects'
            ],
            subtopics: [
              'The challenge of unstructured text generation: why string parsing and regex fail in production pipelines',
              'Basic JSON Mode (`response_format={"type": "json_object"}`) vs Strict Structured Outputs',
              'OpenAI Strict Structured Outputs: grammar-constrained sampling guaranteeing adherence to JSON Schema at the token logit level',
              'Defining target schemas with Pydantic `BaseModel`, `Field(description="...")`, and validation constraints',
              'The `instructor` library (`instructor.from_openai(client)`): seamlessly patching clients to return Pydantic instances with `response_model=Model`',
              'Self-healing and automatic validation retries: when Pydantic raises `ValidationError`, feeding validation error back to LLM for instant correction',
              'Extracting complex relational data: lists of entities, nested objects, and confidence scores'
            ],
            practice: [
              { title: 'Automated Invoice & Receipt Information Extractor', description: 'Build an API service that ingests messy text receipts, extracts structured line items, taxes, totals, and merchant metadata into validated Pydantic models using Instructor with automated retry on validation failure.' }
            ],
            debugging: [
              { title: 'Debug Pydantic ValidationError on Missing Optional Nested Field', description: 'Diagnose why an extraction pipeline crashed when LLM returned null for an optional field and refactor schema using `Optional[T] = None`.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'How do OpenAI Strict Structured Outputs enforce schema adherence under the hood compared to prompting the model to "Return only valid JSON"?' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L21 — EMBEDDINGS + VECTOR DATABASES
  // ----------------------------------------------------
  {
    id: 'l21',
    order: 21,
    title: 'L21 — Vector Embeddings & Vector Databases',
    description: 'High-dimensional embedding representations, embedding models (OpenAI text-embedding-3, HuggingFace BGE, Cohere), distance metrics (Cosine Similarity, Dot Product, Euclidean Distance), chunking strategies, Approximate Nearest Neighbor (ANN) index algorithms (HNSW, IVF), Vector Databases (FAISS, ChromaDB, Pinecone, Qdrant, Milvus), metadata filtering, and Hybrid Search with Reranking.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'cyan',
    subjects: [
      {
        id: 'l21-s1-embeddings-and-similarity-metrics',
        order: 1,
        title: 'Embedding Models & High-Dimensional Geometry',
        description: 'How text is transformed into dense vector representations, embedding model benchmarks (MTEB), dimensionality, cosine similarity vs dot product vs euclidean distance, and token length limits.',
        topics: [
          createTopic({
            id: 'embeddings-models-similarity-metrics',
            order: 1,
            title: 'Vector Embeddings, Embedding Models & Similarity Distance Metrics',
            description: 'Semantic vector space fundamentals: embedding vectors, dense representation vs sparse bag-of-words, MTEB leaderboards, Cosine Similarity, Dot Product, Euclidean Distance ($L_2$), and embedding normalization.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['embeddings', 'vectors', 'similarity', 'cosine-similarity', 'nlp'],
            subtopics: [
              'Concept of dense vector embeddings: mapping words, sentences, and documents into high-dimensional geometric space ($d=1536$ or $d=3072$) where semantic proximity reflects conceptual similarity',
              'Sparse representations (TF-IDF, BM25 - keyword overlap) vs Dense representations (semantic meaning)',
              'Embedding models: OpenAI `text-embedding-3-small/large`, HuggingFace `BAAI/bge-large-en-v1.5`, `sentence-transformers`, and Cohere embed',
              'The Massive Text Embedding Benchmark (MTEB) for comparing retrieval, classification, and clustering performance',
              'Distance and Similarity metrics:',
              '1. Cosine Similarity: $\\cos(\\theta) = \\frac{u \\cdot v}{||u|| ||v||}$ (measures vector angle, invariant to document length, range $[-1, 1]$)',
              '2. Dot Product ($u \\cdot v$): equivalent to Cosine Similarity when vectors are $L_2$-normalized to unit length',
              '3. Euclidean Distance ($L_2$ norm): $\\sqrt{\\sum(u_i - v_i)^2}$ (measures straight-line distance)',
              'Embedding normalization ($v_{norm} = \\frac{v}{||v||_2}$) allowing ultra-fast dot product calculations during vector search'
            ]
          })
        ]
      },
      {
        id: 'l21-s2-vector-indexes-and-databases',
        order: 2,
        title: 'Vector Databases, HNSW Indexing & Hybrid Search',
        description: 'Approximate Nearest Neighbor (ANN) search algorithms, HNSW graph index, IVF partitioning, local vector stores (FAISS, ChromaDB), cloud vector databases (Pinecone, Qdrant), metadata filtering, and Hybrid Search (BM25 + Dense Vectors) with Rerankers.',
        topics: [
          createTopic({
            id: 'vector-indexes-hnsw-chroma-pinecone',
            order: 1,
            title: 'Vector Indexing (HNSW, IVF), Vector Stores (FAISS, Chroma, Pinecone) & Metadata Filtering',
            description: 'Scaling vector search from brute-force $O(N)$ exact search to sub-millisecond Approximate Nearest Neighbor (ANN) queries: Hierarchical Navigable Small World (HNSW) graph index, Inverted File Index (IVF), local vector databases (ChromaDB, FAISS), cloud managed stores (Pinecone, Qdrant), and payload metadata filtering.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['vector-databases', 'hnsw', 'chromadb', 'pinecone', 'faiss', 'ann'],
            subtopics: [
              'The scalability problem: Exact k-Nearest Neighbors (k-NN) requires comparing query vector against every stored vector ($O(N \\times d)$), collapsing at millions of vectors',
              'Approximate Nearest Neighbor (ANN) trade-off: sacrificing <1% accuracy for 1000x faster sub-millisecond lookups',
              'Hierarchical Navigable Small World (HNSW) algorithm: multi-layer skip-list graph connecting vectors for logarithmic $O(\\log N)$ search traversal',
              'Inverted File Index (IVF): clustering vector space with Voronoi cells and searching only nearest centroid partitions',
              'Local in-memory & file-based vector stores: Meta `FAISS` and `ChromaDB` for development and local pipelines',
              'Production vector databases: `Pinecone`, `Qdrant`, `Milvus`, `pgvector` (PostgreSQL extension)',
              'Metadata filtering (pre-filtering vs post-filtering): filtering vector results by `user_id`, `created_at`, `category`, and `access_control` tags'
            ]
          }),
          createTopic({
            id: 'hybrid-search-and-reranking',
            order: 2,
            title: 'Hybrid Search (Dense + Sparse / BM25) & Cross-Encoder Reranking',
            description: 'Overcoming semantic search limitations: why dense embeddings fail on exact keywords/acronyms/part numbers, combining Dense Semantic Vectors with Sparse BM25 via Reciprocal Rank Fusion (RRF), and precision two-stage retrieval with Cross-Encoder Rerankers (Cohere Rerank / BGE-Reranker).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['hybrid-search', 'bm25', 'reranking', 'cross-encoders', 'rrf'],
            learningObjectives: [
              'Explain why dense vector search struggles with rare keywords, part numbers, and exact acronyms',
              'Implement BM25 sparse keyword search alongside dense embedding search',
              'Fuse sparse and dense results using Reciprocal Rank Fusion (RRF)',
              'Apply a secondary Cross-Encoder reranker to dramatically improve top-k retrieval precision'
            ],
            subtopics: [
              'Failure modes of pure semantic vector search: failure on specific alphanumeric codes (e.g. "SKU-98432-A"), rare technical jargon, and keyword-sensitive lookups',
              'BM25 (Best Matching 25) sparse keyword retrieval algorithm: term frequency, inverse document frequency, and document length normalization',
              'Hybrid Search architecture: executing parallel Dense Semantic Search + Sparse BM25 Search across the corpus',
              'Reciprocal Rank Fusion (RRF): combining ranked lists without needing normalized score calibration ($RRF\\_Score(d) = \\sum \\frac{1}{k + r(d)}$)',
              'Two-Stage Retrieval Pipeline:',
              'Stage 1 (Bi-Encoder / Dense+Sparse): retrieve top 50-100 candidates with high recall in milliseconds',
              'Stage 2 (Cross-Encoder / Reranker): pass `(query, document)` pairs simultaneously through full attention layers of Cross-Encoder model (Cohere Rerank, BGE-Reranker-Large) to produce precise relevance scores and select top 5 chunks'
            ],
            practice: [
              { title: 'Build a Production Hybrid Search Engine with Reciprocal Rank Fusion & Reranking', description: 'Implement a two-stage hybrid search engine querying both BM25 and ChromaDB embeddings, combining results with RRF, and reranking with a cross-encoder model.' }
            ],
            debugging: [
              { title: 'Debug Vector Search Returning High Semantic Match with Zero Keyword Overlap', description: 'Diagnose why a user query for a specific error code ("ERR_CONN_REFUSED_503") returned generic connection guides instead of the exact error doc, and fix with hybrid search.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'What is the fundamental architectural difference between a Bi-Encoder (used for fast vector indexing) and a Cross-Encoder (used for reranking)? Why can\'t we use Cross-Encoders for initial database indexing?' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L22 — RAG (RETRIEVAL-AUGMENTED GENERATION)
  // ----------------------------------------------------
  {
    id: 'l22',
    order: 22,
    title: 'L22 — Retrieval-Augmented Generation (RAG)',
    description: 'End-to-end RAG architecture: document ingestion, parsing (PDF, DOCX, HTML, Markdown), chunking strategies (fixed-size, recursive character, semantic chunking, chunk overlap), indexing, context construction, prompt grounding, citation generation, Advanced RAG (Query Rewriting, Multi-Query Expansion, Hypothetical Document Embeddings / HyDE, Parent-Child / Small-to-Big Retrieval, Contextual Retrieval), RAG failure modes, and automated evaluation with Ragas (Faithfulness, Answer Relevance, Context Precision, Context Recall).',
    estimatedDuration: '4-5 weeks',
    estimatedHours: 50,
    color: 'blue',
    subjects: [
      {
        id: 'l22-s1-rag-architecture-and-chunking',
        order: 1,
        title: 'Core RAG Pipeline: Ingestion, Chunking & Grounding',
        description: 'The 3-stage RAG lifecycle (Ingestion -> Retrieval -> Generation), document loaders, recursive chunking with overlap, semantic chunking, and strict prompt grounding with citations.',
        topics: [
          createTopic({
            id: 'rag-ingestion-chunking-and-grounding',
            order: 1,
            title: 'RAG Pipeline: Parsing, Chunking Strategies & Grounded Generation with Citations',
            description: 'Building production RAG from scratch: Document parsing (PDFs, Markdown), chunking algorithms (RecursiveCharacterTextSplitter, chunk size vs chunk overlap trade-offs, token-aware chunking), metadata tagging, assembling retrieved chunks into context, and generating hallucination-free answers with verifiable source citations.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['rag', 'chunking', 'retrieval', 'grounding', 'citations', 'llm'],
            learningObjectives: [
              'Design an automated document ingestion pipeline supporting PDFs, Markdown, and text',
              'Select optimal chunk sizes and chunk overlaps based on domain and embedding model limits',
              'Construct context-augmented prompts that strictly constrain LLMs to retrieved knowledge',
              'Extract and format inline citations and source document references'
            ],
            subtopics: [
              'Why RAG is essential: overcoming LLM knowledge cutoff, mitigating hallucinations, integrating private enterprise data, and providing verifiable audit trails',
              'Document ingestion & parsing: extracting clean text, tables, and headers from PDFs (`pypdf`, `pymupdf`, `unstructured`), HTML, and Markdown',
              'Chunking Strategies and Trade-offs:',
              '1. Fixed-character chunking: simple but splits sentences mid-thought',
              '2. Recursive Character Text Splitting: splitting hierarchically on paragraphs (`\\n\\n`), lines (`\\n`), sentences (`.`), and words (` `)',
              '3. Token-aware chunking: respecting embedding model token limits (e.g. 512 or 8192 tokens)',
              '4. Semantic chunking: splitting dynamically based on embedding cosine similarity drops between consecutive sentences',
              'Chunk overlap (e.g. 500 token chunk with 50 token overlap) preventing loss of context across chunk boundaries',
              'Metadata enrichment: tagging chunks with `source_file`, `page_number`, `author`, `creation_date`, `header_path`',
              'Context Window Assembly: formatting retrieved chunks with delimiters and document IDs (`<doc id="1" title="...">...</doc>`)',
              'Grounded Prompting: system instructions commanding the model to answer SOLELY based on provided context and cite document IDs (`[Doc 1, p. 4]`)'
            ],
            practice: [
              { title: 'End-to-End Enterprise RAG Pipeline for Technical Documentation', description: 'Build a complete RAG application ingesting software documentation PDFs, chunking recursively with overlap, storing in ChromaDB, retrieving relevant context on queries, and generating answers with strict inline citations.' }
            ],
            debugging: [
              { title: 'Debug Context Window Overflow & Lost In The Middle Retrieval', description: 'Diagnose why an LLM failed to answer a question because retrieved chunks were stuffed in arbitrary order exceeding token budget and burying key facts in the middle.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'What are the trade-offs of choosing a very small chunk size (e.g. 100 tokens) vs a very large chunk size (e.g. 1500 tokens) in a RAG pipeline regarding retrieval precision vs context richness?' }
            ]
          })
        ]
      },
      {
        id: 'l22-s2-advanced-rag-patterns',
        order: 2,
        title: 'Advanced RAG Techniques & Query Transformations',
        description: 'Solving complex retrieval failures: Query Rewriting, Multi-Query Expansion, Hypothetical Document Embeddings (HyDE), Parent-Child / Small-to-Big Retrieval, and Contextual Retrieval.',
        topics: [
          createTopic({
            id: 'advanced-rag-query-expansion-hyde-parent-child',
            order: 1,
            title: 'Advanced RAG: Query Rewriting, HyDE & Parent-Child (Small-to-Big) Retrieval',
            description: 'Advanced retrieval architectures: converting vague user queries into optimal search queries with LLM Query Rewriting, generating multiple perspectives via Multi-Query Expansion, Hypothetical Document Embeddings (HyDE), Parent-Child / Small-to-Big retrieval (indexing small chunks for precision while feeding large parent chunks to LLM for context), and Anthropic Contextual Retrieval.',
            priority: 'core',
            estimatedHours: 12,
            tags: ['advanced-rag', 'query-rewriting', 'hyde', 'parent-child', 'contextual-retrieval'],
            subtopics: [
              'Failure modes of Naive RAG: vague user queries, mismatched query-document vocabulary, fragmented context chunks, and redundant retrieval',
              'Query Rewriting & De-contextualization: resolving conversational pronouns ("What did he say about that?") into standalone search queries using conversation history',
              'Multi-Query Expansion: using LLM to generate 3-5 alternative query phrasings and retrieving the union of vector results with RRF deduplication',
              'Hypothetical Document Embeddings (HyDE): instructing an LLM to generate a hypothetical answer first, embedding the hypothetical answer, and using its embedding to search for real documents with similar semantic vector profiles',
              'Parent-Child / Small-to-Big Retrieval:',
              '1. Split document into small 100-token child chunks for highly granular embedding search',
              '2. Associate each child chunk with its larger 1000-token parent section/document in a Key-Value docstore',
              '3. On query match against child chunk, retrieve and pass the full parent chunk to the LLM context',
              'Anthropic Contextual Retrieval: prepending a short 50-token LLM-generated contextual summary to every chunk before embedding to preserve global document context'
            ]
          })
        ]
      },
      {
        id: 'l22-s3-rag-evaluation-and-metrics',
        order: 3,
        title: 'RAG Evaluation & Quality Metrics (Ragas)',
        description: 'Evaluating RAG pipelines objectively: The RAG Triad, synthetic test dataset generation, Faithfulness, Answer Relevance, Context Precision, and Context Recall using Ragas and TruLens.',
        topics: [
          createTopic({
            id: 'rag-evaluation-ragas-metrics',
            order: 1,
            title: 'RAG Evaluation Frameworks: The RAG Triad & Ragas Metrics',
            description: 'Automated quantitative evaluation of RAG systems without manual labeling: generating synthetic evaluation datasets, evaluating retrieval quality (Context Precision, Context Recall) and generation quality (Faithfulness, Answer Relevance) using the `ragas` library.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['rag-evaluation', 'ragas', 'faithfulness', 'context-precision', 'metrics'],
            subtopics: [
              'The RAG Triad evaluation paradigm: Context Relevance -> Groundedness / Faithfulness -> Answer Relevance',
              'The 4 Core Ragas Metrics:',
              '1. Faithfulness (0-1): Ratio of claims in generated answer that can be strictly deduced from retrieved context (measures hallucinations)',
              '2. Answer Relevance (0-1): How directly the generated answer addresses the user query (penalizes evasive or verbose non-answers)',
              '3. Context Precision (0-1): Whether all ground-truth relevant chunks are ranked at top positions of the retrieved context',
              '4. Context Recall (0-1): Whether all information required to answer the question was successfully retrieved from the database',
              'Synthetic test data generation with Ragas: creating question-ground-truth pairs across various reasoning types (simple, reasoning, multi-context)',
              'Continuous RAG evaluation in CI/CD pipelines to catch regression during embedding model or chunking parameter changes'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L23 — TOOL / FUNCTION CALLING
  // ----------------------------------------------------
  {
    id: 'l23',
    order: 23,
    title: 'L23 — Function Calling & Tool Execution',
    description: 'LLM Function Calling / Tool Calling: JSON Schema tool definitions, parameter descriptions, multi-tool selection, parameter validation, executing tools in code, feeding tool results back to LLM, parallel tool execution, error handling and automated retry, and human-in-the-loop approval workflows.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 30,
    color: 'violet',
    subjects: [
      {
        id: 'l23-s1-tool-calling-fundamentals',
        order: 1,
        title: 'Tool Definition Schemas & Execution Loop',
        description: 'JSON Schema tool formatting, passing tools to LLM APIs, handling `tool_calls` responses, executing functions safely in Python, and returning tool messages.',
        topics: [
          createTopic({
            id: 'function-calling-schemas-and-execution-loop',
            order: 1,
            title: 'Function Calling Mechanics, Tool Schemas & The Execution Loop',
            description: 'Mastering LLM Tool Calling: defining tool interfaces with JSON Schema (`name`, `description`, `parameters`), passing tools via `tools=[...]`, parsing `response.choices[0].message.tool_calls`, executing local Python functions dynamically, returning `role: "tool"` messages with `tool_call_id`, and generating the final synthesized response.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['function-calling', 'tools', 'json-schema', 'llm-apis'],
            learningObjectives: [
              'Write clear JSON Schema tool definitions with detailed parameter descriptions',
              'Implement the complete 4-step Function Calling loop in Python without third-party frameworks',
              'Handle parallel tool calls returned by the model simultaneously',
              'Feed execution errors back into the conversation for automatic LLM self-correction'
            ],
            subtopics: [
              'How Function Calling works: the LLM does NOT execute code directly; it acts as a structured planner returning function names and arguments in JSON',
              'Defining tools using JSON Schema: specifying parameter types (string, number, array, object), enums, and required properties',
              'Writing high-signal tool descriptions: guiding the LLM on WHEN and WHY to call each tool',
              'The Complete 4-Step Function Calling Loop:',
              '1. Client sends user query + `tools` list to LLM',
              '2. LLM returns `tool_calls` array with function names and JSON argument strings (`finish_reason: "tool_calls"`)',
              '3. Client parses arguments, executes matching local Python functions, and captures results',
              '4. Client appends assistant tool_calls message + tool response messages (`role: "tool", tool_call_id: "...", content: "..."`) and calls LLM again for final synthesized answer',
              'Parallel Tool Calling: handling multiple simultaneous tool requests in a single turn (e.g. fetching weather for 3 cities concurrently)',
              'Error handling: when function execution fails or arguments fail validation, returning the error message in the tool response allowing the LLM to self-correct'
            ],
            practice: [
              { title: 'Multi-Tool Database & Weather Assistant from Scratch', description: 'Build a complete Python application that provides an LLM with tools to query a local SQLite database and fetch live weather via API, executing tools in a multi-turn loop.' }
            ],
            debugging: [
              { title: 'Debug Malformed Tool Response Message Sequence', description: 'Fix an API crash caused by sending a tool response message without including the preceding assistant message containing `tool_calls`.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'Describe the complete step-by-step lifecycle of a Function Call between client and LLM API, including message roles and IDs.' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L24 — AGENTIC AI
  // ----------------------------------------------------
  {
    id: 'l24',
    order: 24,
    title: 'L24 — Agentic AI & Autonomous Architectures',
    description: 'Autonomous AI Agents: the Agent Loop (Observation -> Reasoning -> Planning -> Action / ReAct), state and memory management, task decomposition, reflection and error recovery loops, single-agent vs multi-agent patterns (Supervisor, Router, Planner-Executor, Hierarchical Teams), human-in-the-loop approval checkpoints, and building an autonomous agent in pure Python from scratch.',
    estimatedDuration: '4-5 weeks',
    estimatedHours: 50,
    color: 'emerald',
    subjects: [
      {
        id: 'l24-s1-agent-architectures-and-react',
        order: 1,
        title: 'Agent Loops, ReAct Pattern & State Management',
        description: 'The fundamental agent control loop, the ReAct (Reasoning + Acting) pattern, managing conversational state and scratchpad memory, and stopping criteria.',
        topics: [
          createTopic({
            id: 'agentic-ai-react-loop-and-state',
            order: 1,
            title: 'The ReAct Pattern, Agent Execution Loops & State Management',
            description: 'Engineering autonomous agents: the ReAct paradigm (Thought -> Action -> Action Input -> Observation -> Thought), implementing dynamic while-loops with termination bounds (max iterations), maintaining execution scratchpads, and managing short-term vs long-term memory.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['agentic-ai', 'agents', 'react-pattern', 'state-management'],
            learningObjectives: [
              'Explain the ReAct (Reasoning + Acting) execution pattern and why interleaved reasoning improves task success',
              'Build an autonomous agent execution loop in pure Python from scratch without external frameworks',
              'Implement safeguards: max iterations, loop detection, timeout bounds, and token budgets',
              'Manage agent state, tool execution history, and memory across multiple iterative steps'
            ],
            subtopics: [
              'What defines an Agent: an LLM equipped with tools, memory, and a dynamic control loop that decides its own sequence of actions until a goal is achieved',
              'The ReAct (Reason + Act) Pattern: alternating between generating reasoning thoughts and executing tool actions to solve multi-step problems',
              'Anatomy of a Pure Python Agent Loop:',
              '1. State Initialization: conversation history + system prompt + goal',
              '2. While loop with `max_iterations = 10` safeguard',
              '3. LLM call with available tools',
              '4. If model returns direct answer -> terminate and return answer',
              '5. If model returns tool call -> execute tool, append observation to state, and repeat loop',
              'Memory systems: Short-term Working Memory (scratchpad in context window) vs Long-term Episodic Memory (vector store recall)',
              'Failure modes: infinite tool calling loops, repetitive hallucinated actions, and context window exhaustion'
            ],
            practice: [
              { title: 'Build a Pure Python Autonomous Research Agent from Scratch', description: 'Build an autonomous agent with zero framework dependencies that takes a complex user research topic, searches multiple web queries, reads articles, takes notes in memory, and writes a synthesized report.' }
            ],
            debugging: [
              { title: 'Debug Infinite Action Loop in Autonomous Agent', description: 'Diagnose why an agent got stuck calling the same failing tool repeatedly with identical parameters, and implement a loop detection and failure recovery circuit breaker.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'How does an autonomous agent differ from a standard chain or static workflow? What mechanisms are required to ensure an agent does not run into an infinite loop?' }
            ]
          })
        ]
      },
      {
        id: 'l24-s2-multi-agent-architectures',
        order: 2,
        title: 'Multi-Agent Collaboration, Planning & Human-in-the-Loop',
        description: 'Multi-agent coordination patterns: Supervisor / Coordinator pattern, Router pattern, Planner-Executor pattern, hierarchical worker teams, agent-to-agent communication, and Human-in-the-Loop approvals for high-stakes actions.',
        topics: [
          createTopic({
            id: 'multi-agent-patterns-supervisor-human-in-the-loop',
            order: 1,
            title: 'Multi-Agent Patterns: Supervisor, Planner-Executor & Human-in-the-Loop',
            description: 'Scaling to multi-agent systems: task decomposition with a Planner agent, routing tasks to specialized Worker agents (Coder, Critic, Researcher, Verifier), Supervisor coordination, self-correction via Critic/Reflector agents, and human approval gates for critical actions (database writes, emails, financial transactions).',
            priority: 'core',
            estimatedHours: 10,
            tags: ['multi-agent', 'supervisor', 'planning', 'human-in-the-loop', 'collaboration'],
            subtopics: [
              'Why Multi-Agent Systems: specialized prompts with focused toolsets outperform single monolithic agents with 50 tools (reduced context clutter, lower confusion)',
              'The Supervisor / Orchestrator Pattern: a central coordinator agent inspects state and dynamically routes subtasks to specialized worker agents',
              'The Planner-Executor Pattern: a Planner agent creates a structured checklist of sub-goals; an Executor agent works through items sequentially, revising the plan dynamically upon failures',
              'The Generator-Critic (Reflection) Pattern: one agent generates content (code/essay); a separate Critic agent reviews against standards; generator refines based on critique',
              'Agent Communication protocols: shared state dictionaries vs message-passing queues',
              'Human-in-the-Loop (HITL) Architecture: pausing agent execution graph before executing destructive or high-stakes tools, waiting for human approval / parameter modification via UI, and resuming execution'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L25 — LANGCHAIN + LANGGRAPH
  // ----------------------------------------------------
  {
    id: 'l25',
    order: 25,
    title: 'L25 — LangChain & LangGraph Frameworks',
    description: 'LangChain Expression Language (LCEL), runnables, prompts, output parsers, retrievers, tools, chains, LangGraph state machines, StateGraph, nodes, edges, conditional edges, cyclic workflows, checkpoints, time-travel debugging, and building production multi-agent graphs.',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'teal',
    subjects: [
      {
        id: 'l25-s1-langchain-lcel',
        order: 1,
        title: 'LangChain Core & LangChain Expression Language (LCEL)',
        description: 'Understanding LCEL runnables (`prompt | model | parser`), piping, streaming, async batching, and standardizing components.',
        topics: [
          createTopic({
            id: 'langchain-lcel-chains-runnables',
            order: 1,
            title: 'LangChain Expression Language (LCEL), Runnables & Chains',
            description: 'Modern LangChain: `ChatPromptTemplate`, `ChatOpenAI` / `ChatAnthropic`, `StrOutputParser`, `JsonOutputParser`, composing pipelines with the pipe operator (`|`), `RunnablePassthrough`, `RunnableParallel`, and unified `.invoke()`, `.stream()`, `.batch()`, and `.ainvoke()` methods.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['langchain', 'lcel', 'chains', 'runnables'],
            subtopics: [
              'What LangChain provides: standardized abstractions across LLM providers, prompt templates, output parsers, and retrieval connectors',
              'LangChain Expression Language (LCEL): declarative composition of runnables using the pipe operator (`chain = prompt | model | parser`)',
              'The Runnable interface: built-in support for `.invoke()` (sync), `.ainvoke()` (async), `.batch()` (parallel), `.stream()` (token streaming)',
              'Data transformation with `RunnablePassthrough` (passing inputs forward) and `RunnableParallel` (executing parallel sub-chains)',
              'Output Parsers: `StrOutputParser`, `PydanticOutputParser`, and handling streaming parsed JSON chunks'
            ]
          })
        ]
      },
      {
        id: 'l25-s2-langgraph-state-machines',
        order: 2,
        title: 'LangGraph: Cyclical Multi-Agent Graphs & Checkpointing',
        description: 'Building controllable, cyclical stateful agent workflows with LangGraph: TypedDict State, StateGraph, nodes, normal edges, conditional routing edges, cyclical loops, persistence checkpointers, and time-travel debugging.',
        topics: [
          createTopic({
            id: 'langgraph-state-nodes-conditional-edges-persistence',
            order: 1,
            title: 'LangGraph: StateGraph, Nodes, Conditional Edges & Checkpointers',
            description: 'Engineering cyclic agent workflows with LangGraph: defining typed state dictionaries, creating action nodes (functions modifying state), routing with conditional edges (`add_conditional_edges`), managing cyclical iteration loops, integrating `MemorySaver` / `PostgresSaver` checkpointers for persistent conversation threads, and human-in-the-loop `interrupt_before`.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['langgraph', 'agents', 'state-machine', 'checkpoints', 'workflows'],
            learningObjectives: [
              'Model complex agent workflows as stateful directed graphs with cycles using LangGraph',
              'Define typed State schemas with reducer functions (e.g. operator.add for message accumulation)',
              'Implement conditional routing edges directing workflow based on tool call decisions',
              'Persist agent state across sessions using Checkpointers and implement human-in-the-loop interrupts'
            ],
            subtopics: [
              'Why LangGraph: standard DAG (Directed Acyclic Graph) pipeline frameworks cannot handle true agent loops, recursion, branching, or human approval interruptions',
              'Core LangGraph Concepts:',
              '1. State: centralized typed dictionary (e.g. `TypedDict`) shared and modified by all graph nodes',
              '2. Reducers: specifying how node outputs update state (e.g. `messages: Annotated[list, operator.add]`)',
              '3. Nodes: standard Python functions `node(state: State) -> dict` returning state updates',
              '4. Edges: Direct edges (`add_edge("nodeA", "nodeB")`) and Conditional edges (`add_conditional_edges("router", route_fn, {"tools": "tool_node", "end": END})`)',
              'Building a ReAct Agent Graph: `agent_node` -> conditional edge checking for tool_calls -> `tool_node` -> back to `agent_node` (cycle)',
              'Persistence and Checkpointing: using `MemorySaver` or `PostgresSaver` with `thread_id` to persist conversation history and state across process restarts',
              'Human-in-the-loop with `interrupt_before=["dangerous_tool_node"]`: inspecting graph state, modifying parameters, and resuming execution with `Command(resume=...)`'
            ],
            practice: [
              { title: 'Production Multi-Agent Customer Support Graph in LangGraph', description: 'Build a LangGraph state machine featuring a Classifier Router, Billing Agent with tools, Technical Support Agent with RAG, Supervisor quality checker, and human approval interrupt on refunds.' }
            ],
            debugging: [
              { title: 'Debug Infinite State Update Overwrite in LangGraph Reducer', description: 'Diagnose why messages array was overwritten instead of appended because the State definition lacked `Annotated[list, add_messages]` reducer.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Explain how LangGraph represents cyclical agent execution compared to linear DAG pipelines. What is the role of the State Reducer?' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L26 — MCP (MODEL CONTEXT PROTOCOL)
  // ----------------------------------------------------
  {
    id: 'l26',
    order: 26,
    title: 'L26 — Model Context Protocol (MCP)',
    description: 'Anthropic\'s open standard for connecting AI models to external tools and data: Host-Client-Server architecture, standard transports (stdio, SSE / HTTP), JSON-RPC 2.0 protocol, MCP Primitives (Tools, Resources, Prompts), building custom Python MCP servers with FastMCP, exposing database/filesystem tools, MCP client integration (Claude Desktop, Cursor, Custom SDK Clients), and security isolation.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 30,
    color: 'rose',
    subjects: [
      {
        id: 'l26-s1-mcp-architecture-and-protocol',
        order: 1,
        title: 'MCP Architecture, Transports & JSON-RPC Protocol',
        description: 'The Model Context Protocol standard: Host (Claude Desktop/IDE) -> MCP Client -> MCP Servers, JSON-RPC 2.0 communication over stdio and SSE transports, capabilities negotiation, and tool discovery.',
        topics: [
          createTopic({
            id: 'mcp-architecture-transports-jsonrpc',
            order: 1,
            title: 'MCP Architecture: Host, Client, Server, Transports (stdio/SSE) & JSON-RPC',
            description: 'Deep dive into Model Context Protocol: why a standardized protocol replaces proprietary plugin ecosystems, Host application responsibilities, Client-Server architecture, stdio transport (process spawning) vs SSE transport (remote HTTP), capabilities handshake, and JSON-RPC 2.0 request/response specifications.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['mcp', 'protocol', 'json-rpc', 'stdio', 'anthropic'],
            subtopics: [
              'The M×N integration problem: why every AI application having custom tool integration creates massive fragmentation, and how MCP creates a universal standard',
              'MCP Triad Architecture:',
              '1. MCP Host: the user-facing AI application (Claude Desktop, Cursor, custom AI app) managing LLM interactions and security permissions',
              '2. MCP Client: internal protocol client in the host application maintaining 1:1 connection to an MCP server',
              '3. MCP Server: lightweight server program exposing specific tools, resources, and prompt templates to clients',
              'Standard Transports: Standard Input/Output (`stdio` - local process communication) and Server-Sent Events (`SSE` / HTTP - remote distributed servers)',
              'Protocol Lifecycle: Initialization handshake (`initialize`), capabilities exchange (`tools`, `resources`, `prompts`), ping/heartbeats, and clean shutdown',
              'JSON-RPC 2.0 messages: `tools/list` (discovering tool schemas), `tools/call` (invoking a tool with arguments), and error handling'
            ]
          })
        ]
      },
      {
        id: 'l26-s2-building-mcp-servers',
        order: 2,
        title: 'Building Custom MCP Servers with Python (FastMCP)',
        description: 'Developing, testing, and deploying custom MCP servers in Python using the official `mcp` SDK and FastMCP: creating tools, exposing dynamic and static resources, defining prompt templates, and connecting to Claude Desktop / Cursor.',
        topics: [
          createTopic({
            id: 'mcp-building-servers-fastmcp-tools-resources',
            order: 1,
            title: 'Building Custom Python MCP Servers (FastMCP, Tools, Resources & Prompts)',
            description: 'Hands-on MCP server engineering: writing servers using `mcp.server.fastmcp.FastMCP`, creating tools with `@mcp.tool()`, exposing live files and database schemas with `@mcp.resource()`, creating reusable prompt workflows with `@mcp.prompt()`, testing with the MCP Inspector UI, and configuring `claude_desktop_config.json`.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['mcp', 'fastmcp', 'python', 'tools', 'resources', 'claude-desktop'],
            learningObjectives: [
              'Explain the 3 core MCP primitives: Tools (executable actions), Resources (context data), and Prompts (reusable templates)',
              'Build a custom Python MCP server from scratch using FastMCP exposing custom tools and database resources',
              'Test and debug MCP server communication using the interactive MCP Inspector CLI tool',
              'Deploy and configure the custom MCP server inside Claude Desktop and modern AI IDEs'
            ],
            subtopics: [
              'The 3 Core MCP Server Primitives:',
              '1. Tools: functions with input schemas that models can invoke to take actions (`@mcp.tool()`)',
              '2. Resources: read-only data (file contents, database records, API logs, system metrics) that provide context to models (`@mcp.resource("schema://{id}")`)',
              '3. Prompts: pre-defined reusable prompt templates with arguments that guide user interactions (`@mcp.prompt()`)',
              'Building a custom Python MCP server using FastMCP (`from mcp.server.fastmcp import FastMCP`)',
              'Type safety and automated schema generation: FastMCP automatically converts Python type hints and docstrings into JSON Schema definitions',
              'Interactive debugging using the MCP Inspector tool (`npx @modelcontextprotocol/inspector uv run server.py`)',
              'Configuring host applications: editing `claude_desktop_config.json` to register local stdio servers with environment variables and paths',
              'Security and Access Control: principle of least privilege, input sanitization, and preventing unauthorized filesystem/database access'
            ],
            practice: [
              { title: 'Build a Custom SQLite Database & Analytics MCP Server in Python', description: 'Create an MCP server using FastMCP exposing tools to inspect database schemas, execute read-only queries with validation, and resources exposing live system logs, then configure and test inside Claude Desktop.' }
            ],
            debugging: [
              { title: 'Debug MCP Server stdio Pollution Crash', description: 'Diagnose why an MCP client crashed on initialization because an unexpected `print()` statement in the Python server corrupted the JSON-RPC stdio stream (fix with stderr logging).', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'Compare MCP Tools vs MCP Resources. When would you expose data as a Resource vs exposing a Tool to fetch that data?' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L27 — ADVANCED AI + MULTIMODAL
  // ----------------------------------------------------
  {
    id: 'l27',
    order: 27,
    title: 'L27 — Multimodal AI & Advanced Frontiers',
    description: 'Multimodal foundation models: Vision-Language Models (VLMs like GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro), image understanding, document OCR and chart intelligence, speech-to-text with Whisper, text-to-speech, multimodal prompt engineering, Multimodal RAG (ColPali / image embeddings), and evaluating open multimodal models.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 25,
    color: 'purple',
    subjects: [
      {
        id: 'l27-s1-vision-language-models-and-ocr',
        order: 1,
        title: 'Vision-Language Models (VLMs) & Multimodal RAG',
        description: 'Processing images, charts, and diagrams with VLMs, base64 encoding vs URLs, image resolution tokens, OCR extraction, and Multimodal RAG with vision embeddings.',
        topics: [
          createTopic({
            id: 'vlm-image-understanding-multimodal-rag',
            order: 1,
            title: 'Vision-Language Models (VLMs), Document Intelligence & Multimodal RAG',
            description: 'Multimodal AI systems: passing images to LLM APIs (base64 data URLs), token cost of image tiles/resolutions, extracting tabular and chart data from document screenshots, visual question answering, and Multimodal RAG using Vision models.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['multimodal', 'vlm', 'vision', 'ocr', 'multimodal-rag'],
            subtopics: [
              'Vision-Language Model (VLM) architecture: image encoders (ViT - Vision Transformer) projecting visual patch tokens into shared multimodal embedding space',
              'Sending images via API: image URLs vs Base64 encoded data (`data:image/jpeg;base64,...`) and detail parameters (low vs high resolution tiling)',
              'Document Intelligence & Visual OCR: extracting complex financial tables, infographics, diagrams, and handwritten notes where traditional text OCR fails',
              'Spatial reasoning and bounding box detection with VLMs',
              'Audio processing: high-accuracy transcription with OpenAI Whisper (timestamps, speaker diarization) and Text-to-Speech (TTS)',
              'Multimodal RAG: embedding PDF pages as images, retrieving visual pages, and answering queries directly with Vision models (ColPali vision-retrieval)'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L28 — LLM EVALUATION + OBSERVABILITY
  // ----------------------------------------------------
  {
    id: 'l28',
    order: 28,
    title: 'L28 — LLM Evaluation, Tracing & Production Observability',
    description: 'Systematic evaluation and monitoring of AI applications: creating golden evaluation benchmark datasets, LLM-as-a-Judge methodology, judge bias mitigation (position bias, verbosity bias), tracing multi-step chains with LangSmith / OpenTelemetry / Phoenix, tracking token latency (TTFT - Time To First Token, TPS - Tokens Per Second), cost monitoring, and regression testing in CI.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 30,
    color: 'indigo',
    subjects: [
      {
        id: 'l28-s1-llm-evaluation-and-judge',
        order: 1,
        title: 'LLM-as-a-Judge & Benchmark Evaluation Datasets',
        description: 'Creating high-quality golden evaluation datasets, using strong models as automated judges, scoring rubrics, and mitigating judge biases.',
        topics: [
          createTopic({
            id: 'llm-as-a-judge-evaluation-methodology',
            order: 1,
            title: 'LLM-as-a-Judge: Rubrics, Pairwise vs Direct Scoring & Bias Mitigation',
            description: 'Automating quality evaluation: defining explicit scoring rubrics, single-answer grading vs pairwise comparison (A vs B), mitigating judge biases (position bias, self-enhancement bias, verbosity bias), and measuring agreement correlation with human expert raters.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['evaluation', 'llm-as-a-judge', 'benchmarks', 'quality'],
            subtopics: [
              'The evaluation bottleneck: why unit tests cannot evaluate subjective generative text quality, and why human evaluation is too slow/expensive for daily CI',
              'Golden Evaluation Datasets: curating representative test sets (100-500 diverse examples covering edge cases, adversarial inputs, and core tasks)',
              'Single-Answer Grading: providing an LLM judge with input, generated output, reference answer, and strict 1-5 rubric criteria',
              'Pairwise Comparison (A vs B): evaluating which model response is better for automated A/B testing and RLHF preference labeling',
              'Known LLM Judge Biases and Mitigation Techniques:',
              '1. Position Bias: tendency to favor the first presented answer (mitigate by swapping order and averaging)',
              '2. Verbosity Bias: tendency to score longer answers higher (mitigate by explicit length-neutral instructions)',
              '3. Self-Enhancement Bias: favoring outputs from models of the same family',
              'Calculating Cohen\'s Kappa correlation between automated judge scores and human expert ratings'
            ]
          })
        ]
      },
      {
        id: 'l28-s2-llm-observability-and-tracing',
        order: 2,
        title: 'Distributed Tracing, Latency Telemetry & Observability (LangSmith)',
        description: 'Instrumenting AI pipelines: distributed tracing of agent tool calls, tracking Time To First Token (TTFT), tracking tokens per second (TPS), cost attribution per user/feature, and OpenTelemetry instrumentation.',
        topics: [
          createTopic({
            id: 'llm-tracing-observability-langsmith-opentelemetry',
            order: 1,
            title: 'AI Observability: Distributed Tracing (LangSmith / OpenTelemetry) & Latency Telemetry',
            description: 'Production observability: capturing end-to-end execution traces of complex multi-agent RAG pipelines, recording exact prompts, model parameters, retrieved chunks, tool arguments, token counts, and calculating latency metrics (TTFT, total duration).',
            priority: 'core',
            estimatedHours: 6,
            tags: ['observability', 'tracing', 'langsmith', 'opentelemetry', 'telemetry'],
            subtopics: [
              'Why standard APM (Application Performance Monitoring) tools fail for AI: AI applications need full prompt/response capture, token usage tracking, and multi-step agent hierarchy tracing',
              'Distributed Tracing: breaking complex requests into Spans (Retrieval span, Rerank span, LLM Generation span, Tool Execution span)',
              'Observability platforms: `LangSmith`, `Arize Phoenix`, `Langfuse`, and open `OpenTelemetry` AI instrumentation standards',
              'Critical AI Latency Telemetry Metrics: Time To First Token (TTFT - perceived responsiveness), Inter-Token Latency, Tokens Per Second (TPS), and Total Request Duration',
              'Cost attribution: tagging traces with `user_id`, `project_id`, `environment`, and calculating aggregate token spend across models',
              'Debugging production failures: using trace IDs to inspect exact prompt payloads and model outputs on user-reported bugs'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L29 — AI SECURITY
  // ----------------------------------------------------
  {
    id: 'l29',
    order: 29,
    title: 'L29 — AI Security, Guardrails & Governance',
    description: 'Securing AI applications against the OWASP Top 10 for LLMs: Direct and Indirect Prompt Injections, Jailbreaking, Training Data Poisoning, PII and Secret Redaction, Sandboxing tool execution environments (Docker/E2B), Output Guardrails (NeMo Guardrails, Llama Guard), and AI Governance.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 25,
    color: 'rose',
    subjects: [
      {
        id: 'l29-s1-llm-vulnerabilities-and-guardrails',
        order: 1,
        title: 'OWASP Top 10 for LLMs, Injection & Guardrails',
        description: 'Vulnerability analysis: Prompt Injections, Data Leakage, Insecure Output Handling, Excessive Agency, PII anonymization, and implementing defensive Guardrails.',
        topics: [
          createTopic({
            id: 'ai-security-owasp-injections-guardrails',
            order: 1,
            title: 'OWASP Top 10 for LLMs: Injections, PII Redaction & Guardrails',
            description: 'Hardening LLM systems: defending against Direct Jailbreaks and Indirect Prompt Injections (hidden in untrusted documents/webpages), PII detection and redaction (Microsoft Presidio), sandboxing tool execution environments, and integrating input/output safety classifiers (Llama Guard, NeMo Guardrails).',
            priority: 'core',
            estimatedHours: 8,
            tags: ['ai-security', 'owasp', 'prompt-injection', 'guardrails', 'pii'],
            learningObjectives: [
              'Identify and mitigate Direct and Indirect Prompt Injection attack vectors in LLM pipelines',
              'Implement automated PII and API secret scrubbing on user inputs before model ingestion',
              'Isolate agent tool execution inside sandboxed ephemeral container environments',
              'Deploy input and output safety guardrails to prevent toxic, unsafe, or hallucinated outputs'
            ],
            subtopics: [
              'The OWASP Top 10 for Large Language Model Applications (LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM06 Excessive Agency, etc.)',
              'Direct Prompt Injection (Jailbreaking): roleplay exploits, base64 obfuscation, hypothetical scenario framing attempting to bypass safety filters',
              'Indirect Prompt Injection: zero-click attacks where malicious text embedded in a third-party webpage or email hijacks an autonomous agent reading that page',
              'PII (Personally Identifiable Information) Redaction: detecting and masking Social Security Numbers, credit cards, emails, and API keys with `Microsoft Presidio` before sending to external LLM APIs',
              'Preventing Tool Abuse & Excessive Agency: never granting agents unrestricted shell/filesystem/database write access without strict schema constraints and human approval gates',
              'Secure Sandboxing: executing untrusted LLM-generated code inside isolated microVMs or ephemeral Docker containers (e.g. `E2B`, `Modal`, `Firecracker`)',
              'Output Guardrails: using safety classifiers (Meta `Llama Guard`) to verify responses for policy compliance before presenting to users'
            ],
            practice: [
              { title: 'Build a Secure LLM Gateway with PII Redaction & Prompt Injection Firewall', description: 'Create an API proxy that intercepts user prompts, scrubs PII via Presidio, screens for adversarial injection attempts using heuristic checks and guard models, and sanitizes outgoing responses.' }
            ],
            debugging: [
              { title: 'Debug Agent Exfiltration Vulnerability via Indirect Web Injection', description: 'Analyze an agent that read an external webpage containing a hidden prompt instructing it to send user private notes to an attacker endpoint, and implement strict tool argument whitelisting.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'Explain what an Indirect Prompt Injection is and provide an example of how an autonomous email-summarizing agent could be exploited by an incoming email.' }
            ]
          })
        ]
      }
    ]
  }
];
