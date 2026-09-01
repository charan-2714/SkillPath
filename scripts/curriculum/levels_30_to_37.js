// scripts/curriculum/levels_30_to_37.js
// Levels L30 through L37 of the updated AI/ML Engineer Master Curriculum (Featuring L34 AI-Powered Automation)

import { createTopic } from './helpers.js';

export const levels30to37 = [
  // ----------------------------------------------------
  // L30 — DOCKER + CI/CD
  // ----------------------------------------------------
  {
    id: 'l30',
    order: 30,
    title: 'L30 — Docker Containerization & CI/CD Pipelines',
    description: 'Containerization principles: Images vs Containers, multi-stage Dockerfiles, build cache optimization, layers, volume mounts, port bindings, environment variables, multi-container orchestration with Docker Compose (FastAPI, PostgreSQL, Redis, ChromaDB), and automated GitHub Actions CI/CD workflows for testing and deployment.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 30,
    color: 'blue',
    subjects: [
      {
        id: 'l30-s1-docker-fundamentals',
        order: 1,
        title: 'Docker Architecture, Multi-Stage Builds & Docker Compose',
        description: 'Building lean production container images, Dockerfile instructions, layer caching, volume data persistence, and orchestrating full-stack AI services with Docker Compose.',
        topics: [
          createTopic({
            id: 'docker-dockerfiles-multistage-compose',
            order: 1,
            title: 'Dockerfiles, Multi-Stage Builds, Layer Caching & Docker Compose',
            description: 'Containerizing Python/AI applications: base images (`python:3.11-slim`), `WORKDIR`, `COPY`, `RUN`, `CMD` vs `ENTRYPOINT`, multi-stage Dockerfiles shrinking image sizes by 80%, layer cache ordering, `.dockerignore`, and orchestrating multi-container services with `docker-compose.yml`.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['docker', 'containers', 'docker-compose', 'devops'],
            subtopics: [
              'Virtual Machines (heavy, full guest OS) vs Docker Containers (lightweight, shared host kernel, isolated namespaces & cgroups)',
              'Docker core architecture: Docker Daemon, Docker CLI, Images (immutable blueprints), Containers (running instances)',
              'Writing efficient Dockerfiles: `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV`, `EXPOSE`, `ENTRYPOINT`, `CMD`',
              'Docker Layer Caching optimization: copying `requirements.txt` / `pyproject.toml` and installing dependencies BEFORE copying application code to avoid invalidating cache on every code edit',
              'Multi-Stage Dockerfile builds: compiling build dependencies in a builder stage and copying only compiled artifacts to a minimal runtime stage (reducing 2GB images to 150MB)',
              'Data persistence with Docker Named Volumes vs Bind Mounts for local development',
              'Orchestrating multi-service AI stacks using `docker-compose.yml`: defining API, PostgreSQL database, Redis cache, and ChromaDB vector store with networking and healthchecks'
            ]
          })
        ]
      },
      {
        id: 'l30-s2-github-actions-cicd',
        order: 2,
        title: 'GitHub Actions CI/CD Automation & Registry Deployment',
        description: 'Automated Continuous Integration and Continuous Deployment: writing workflow YAMLs, running automated Pytest test suites on pull requests, linting with ruff, building and pushing Docker images to registries (GHCR / Docker Hub), and automated deployment triggers.',
        topics: [
          createTopic({
            id: 'github-actions-ci-cd-pipelines',
            order: 1,
            title: 'GitHub Actions: CI Test Automation, Docker Image Publishing & CD',
            description: 'Building automated CI/CD pipelines with GitHub Actions: `.github/workflows/ci.yml`, triggers (`on: [push, pull_request]`), matrix builds across Python versions, caching pip dependencies, running Pytest with coverage thresholds, and building/pushing Docker images to GitHub Container Registry (GHCR).',
            priority: 'core',
            estimatedHours: 6,
            tags: ['cicd', 'github-actions', 'automation', 'devops'],
            subtopics: [
              'CI/CD principles: Continuous Integration (automated testing on every commit) and Continuous Deployment (automated shipping to production)',
              'Anatomy of a GitHub Actions workflow: Triggers (`push`, `pull_request`), Jobs, Runners (`ubuntu-latest`), Steps, and Actions (`actions/checkout`, `actions/setup-python`)',
              'Secret management: storing API keys and deployment credentials in GitHub Repository Secrets and injecting as environment variables',
              'Automated quality gate workflow: Linting (Ruff), Type checking (Mypy), and Unit/Integration testing (Pytest with code coverage badge)',
              'Docker build and push workflow using `docker/build-push-action` with automated semantic version tagging to GHCR / Docker Hub'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L31 — CLOUD
  // ----------------------------------------------------
  {
    id: 'l31',
    order: 31,
    title: 'L31 — Cloud Infrastructure & Deployment (AWS / GCP)',
    description: 'Transferable cloud architecture for AI engineers: Compute (Virtual Machines, Serverless Functions, Container Runners like AWS ECS / GCP Cloud Run), Object Storage (S3 / GCS), IAM roles and least-privilege permissions, Managed Databases, Secrets Management, VPC networking basics, autoscaling, and AI infrastructure cost management.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 25,
    color: 'cyan',
    subjects: [
      {
        id: 'l31-s1-cloud-core-services',
        order: 1,
        title: 'Compute, Object Storage (S3/GCS), IAM & Secrets',
        description: 'Core cloud primitives: VM instances (EC2/Compute Engine), serverless container runners (Cloud Run / ECS Fargate), object storage for model weights/documents (S3/GCS), IAM security, and secret managers.',
        topics: [
          createTopic({
            id: 'cloud-compute-s3-iam-secrets',
            order: 1,
            title: 'Cloud Architecture: Compute (Cloud Run/ECS), S3/GCS Object Storage, IAM & Secrets',
            description: 'Deploying AI applications to the cloud: Serverless container deployment with AWS ECS / GCP Cloud Run (auto-scaling to zero), storing massive datasets and vector backups in S3 / GCS, IAM roles and least privilege, and managing API keys in AWS Secrets Manager / GCP Secret Manager.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['cloud', 'aws', 'gcp', 's3', 'iam', 'cloud-run'],
            subtopics: [
              'Cloud service models: IaaS (Infrastructure as a Service - VMs) vs PaaS (Platform as a Service) vs Serverless Container Runners (GCP Cloud Run, AWS ECS Fargate)',
              'Deploying containerized FastAPI backends to Serverless Container services with automatic HTTPS and traffic autoscaling',
              'Object Storage (AWS S3 / GCP Cloud Storage): storing un-structured PDF corpora, training datasets, and model checkpoint artifacts with presigned URLs for secure temporary access',
              'Identity & Access Management (IAM): Users, Roles, Service Accounts, and the Principle of Least Privilege (never using root keys)',
              'Cloud Secrets Management: storing database credentials and OpenAI/Anthropic API keys securely in Secret Manager instead of hardcoding in images',
              'Cost Management and FinOps for AI: setting budget alerts, monitoring GPU VM hourly burn rates, and terminating idle compute instances'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L32 — SYSTEM DESIGN
  // ----------------------------------------------------
  {
    id: 'l32',
    order: 32,
    title: 'L32 — Distributed System Design & AI System Architecture',
    description: 'System design fundamentals: Functional vs Non-Functional requirements, scalability, High Availability (HA), caching strategies (Redis Cache-Aside), asynchronous task queues (Celery, Kafka, RabbitMQ), database sharding and replication, Monolith vs Microservices, and AI System Design (LLM model serving at scale, vLLM inference engines, semantic caching, vector search throughput, GPU clusters, and fallback architectures).',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'purple',
    subjects: [
      {
        id: 'l32-s1-traditional-system-design',
        order: 1,
        title: 'Distributed Systems: Caching, Queues & Scalability',
        description: 'Horizontal vs vertical scaling, Load Balancers, Redis caching patterns, Message Queues for asynchronous background processing, and database replication.',
        topics: [
          createTopic({
            id: 'system-design-scalability-caching-queues',
            order: 1,
            title: 'Scalability, Load Balancing, Redis Caching & Message Queues',
            description: 'Designing high-scale distributed backends: Stateless web tiers behind Load Balancers, Redis caching strategies (Cache-Aside, Write-Through, TTL, eviction policies), Message Queues (Celery, Redis Streams, Kafka) for decoupled asynchronous background job execution, and database read replicas.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['system-design', 'scalability', 'redis', 'caching', 'message-queues'],
            subtopics: [
              'Defining System Requirements: Functional Requirements (user capabilities) vs Non-Functional Requirements (Latency < 200ms, 99.99% Availability, Throughput 10k QPS)',
              'Scaling Dimensions: Vertical scaling (bigger machine) vs Horizontal scaling (multiple stateless worker instances behind a Load Balancer)',
              'Caching Architectures with Redis: Cache-Aside pattern, Cache Invalidation strategies, TTL expiration, and Thundering Herd mitigation',
              'Asynchronous Task Queues: offloading heavy jobs (document parsing, embeddings generation, model inference) to background worker queues using Celery / Redis Queue',
              'Message Brokers: Pub/Sub patterns, message persistence, at-least-once delivery, and dead-letter queues (DLQ)',
              'Database Scaling: Read Replicas for read-heavy workloads and horizontal partitioning / sharding'
            ]
          })
        ]
      },
      {
        id: 'l32-s2-ai-system-design',
        order: 2,
        title: 'AI System Design: High-Throughput LLM Serving & Architecture',
        description: 'Architecting large-scale AI platforms: LLM inference engines (vLLM continuous batching), vector search clustering, semantic caching, model routing, and graceful degradation.',
        topics: [
          createTopic({
            id: 'ai-system-design-llm-serving-vector-scale',
            order: 1,
            title: 'AI System Design: High-Throughput LLM Serving, vLLM & Semantic Caching',
            description: 'End-to-end architecture of production AI platforms: high-throughput open-model serving using vLLM (PagedAttention, continuous iteration batching), Semantic Caching (GPTCache) slashing token costs by 40%, multi-tier model routing (Tier 1 cheap classifier -> Tier 2 high-power reasoning model), and fallback architectures for 99.99% uptime.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['ai-system-design', 'vllm', 'pagedattention', 'semantic-caching', 'architecture'],
            learningObjectives: [
              'Design end-to-end scalable architectures for enterprise AI and RAG applications',
              'Explain how vLLM and PagedAttention optimize GPU memory and achieve 10x higher serving throughput',
              'Implement Semantic Caching to intercept identical or similar queries and serve instant responses',
              'Design resilient model routing cascades with fallback redundancy across cloud providers'
            ],
            subtopics: [
              'The Unique Challenges of AI System Design: massive GPU memory footprints, long generation latencies (seconds vs milliseconds), high token API costs, and non-deterministic outputs',
              'High-Throughput Open Model Serving with `vLLM`:',
              '1. PagedAttention: managing Key-Value (KV) cache memory like virtual memory pages, eliminating fragmentation and enabling 4-10x higher concurrency',
              '2. Continuous Batching: dynamically inserting new requests into running inference iterations rather than waiting for full batch completion',
              'Semantic Caching Architecture (e.g. `GPTCache`): embedding incoming user queries, performing vector lookup in cache; if cosine similarity > 0.95, return cached answer instantly (0 token cost, 10ms latency)',
              'Model Cascades & Intelligent Query Routing: using a lightweight $0.0001 fast model (e.g. GPT-4o-mini / Haiku) to handle 80% of simple requests, escalating to heavy reasoning models (o1 / Claude 3.5 Sonnet) only for complex analytical queries',
              'Vector Database Sharding and Horizontal Clustering for billion-vector corpora',
              'Graceful Degradation and Failover: if primary LLM API times out, automatically route request to secondary provider or cached fallback'
            ],
            practice: [
              { title: 'System Design Blueprint: Design a Multimodal Enterprise AI Assistant at 50,000 DAU', description: 'Create a comprehensive technical architecture diagram and design document covering user ingress, API gateway, semantic caching, vector search cluster, model routing cascade, and async processing workers.' }
            ],
            assessments: [
              { question: 'Walk through how PagedAttention in vLLM solves GPU memory waste in the KV Cache and why continuous batching outperforms traditional static batching.' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L33 — PRODUCTION AI ENGINEERING
  // ----------------------------------------------------
  {
    id: 'l33',
    order: 33,
    title: 'L33 — Production AI Engineering & Reliability',
    description: 'Operating AI systems in production: Token cost optimization, latency optimization (streaming, prompt caching, speculative decoding), rate limit management, background processing pipelines, continuous online evaluation, prompt versioning, and managing RAG and Agent lifecycles.',
    estimatedDuration: '2-3 weeks',
    estimatedHours: 25,
    color: 'emerald',
    subjects: [
      {
        id: 'l33-s1-cost-latency-optimization',
        order: 1,
        title: 'Cost & Latency Optimization (Prompt Caching & Streaming)',
        description: 'Reducing AI operational costs and response latency: Provider prompt caching (Anthropic Prompt Caching), speculative decoding, semantic caching, and streaming UX.',
        topics: [
          createTopic({
            id: 'production-ai-cost-latency-prompt-caching',
            order: 1,
            title: 'Production Optimization: Prompt Caching, Speculative Decoding & Cost Engineering',
            description: 'Production AI efficiency engineering: leveraging Anthropic / OpenAI Prompt Caching (saving up to 90% cost on static context), speculative decoding for 2x faster token generation, client streaming UX, rate limit backoffs, and token budget enforcement.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['production-ai', 'prompt-caching', 'optimization', 'latency', 'cost'],
            subtopics: [
              'Token economics: analyzing cost per user session, calculating ROI on token optimizations, and setting hard tenant budget limits',
              'Prompt Caching (Anthropic / OpenAI): structuring prompts so massive static contexts (system instructions, document libraries, schemas) are placed at the beginning of the prompt to hit provider KV cache (reducing input token costs by 90% and latency by 80%)',
              'Speculative Decoding: using a small fast draft model to speculate multiple tokens and verifying them in parallel with the large target model',
              'Managing API Rate Limits in production: centralizing API calls through a token-bucket rate limiter queue across distributed microservices',
              'Streaming UX best practices: instant Time To First Token (TTFT), handling network disconnects during generation, and client-side Markdown rendering'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L34 — AI-POWERED AUTOMATION (NEW CORE LEVEL)
  // ----------------------------------------------------
  {
    id: 'l34',
    order: 34,
    title: 'L34 — AI-Powered Automation & Intelligent Workflows',
    description: 'Bridging Python Automation Developer foundations with AI Engineering: calling LLM APIs from automation scripts, intelligent input classification, structured data extraction with schemas, document OCR & understanding, AI-assisted browser workflows (Playwright + Vision/LLM), autonomous tool-calling automation, RAG-augmented automation, automated report generation, human-in-the-loop approvals, and AI-driven automated error recovery.',
    estimatedDuration: '4-5 weeks',
    estimatedHours: 50,
    color: 'teal',
    subjects: [
      {
        id: 'l34-s1-llm-data-and-document-automation',
        order: 1,
        title: 'LLM-Driven Data Extraction, Document Intelligence & Classification',
        description: 'Transforming traditional deterministic automation scripts into intelligent decision engines: structured data extraction from messy inputs, document processing, and input routing.',
        topics: [
          createTopic({
            id: 'ai-automation-structured-extraction-and-classification',
            order: 1,
            title: 'LLM-Powered Data Extraction, Input Classification & Document Processing',
            description: 'Integrating LLMs into automation pipelines: moving from brittle regex/rules to semantic LLM classification, extracting structured Pydantic objects from unstructured PDFs/emails/receipts, document OCR processing with Vision models, and automating executive report synthesis.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['ai-automation', 'data-extraction', 'document-ai', 'pydantic', 'python'],
            learningObjectives: [
              'Contrast Traditional Automation (Input -> Rules -> Script -> Output) vs AI-Powered Automation (Input -> LLM -> Decision -> Tool -> Validation -> Output)',
              'Use LLM APIs inside Python scripts to classify, route, and validate high-variety incoming automation data',
              'Extract complex structured relational data from multi-page PDFs and invoices into validated Pydantic schemas',
              'Generate automated data analysis summaries and executive reports using LLMs'
            ],
            subtopics: [
              'The Evolution of Automation: Traditional deterministic automation (Input -> Hardcoded Rules -> Script -> Output) breaks on layout changes; AI-powered automation (Input -> LLM Semantic Reasoning -> Tool Execution -> Validation -> Output) is resilient to variance',
              'Calling LLM APIs directly inside Python automation scripts (OpenAI, Anthropic, Gemini, local Ollama)',
              'Intelligent Input Classification & Routing: categorizing incoming emails, customer requests, or support tickets to trigger specific downstream automation subroutines',
              'Structured Data Extraction: using Instructor and Pydantic schemas to transform unstructured text, emails, and PDFs into strictly-typed database records',
              'Document Intelligence & Processing: combining Python document parsing (`pymupdf`, `pypdf`) with multimodal Vision models to extract complex tables, receipts, and scans',
              'Automated Report Synthesis: aggregating tabular metrics from Pandas and prompting LLMs to generate formatted Markdown/HTML analytical insights'
            ],
            practice: [
              { title: 'Build an Automated Invoice Ingestion & ERP Sync Pipeline with LLM Extraction', description: 'Create a Python automation script that monitors an inbox/folder, parses incoming PDF invoices with LLM vision/text extraction into Pydantic models, and posts validated data to a backend REST API.' }
            ],
            debugging: [
              { title: 'Debug Unstructured LLM Output Breaking Downstream API Schema', description: 'Diagnose why an LLM returned extra conversational text around a JSON payload in an automation script, and resolve using Instructor strict Pydantic enforcement.', errorType: 'runtime' }
            ],
            assessments: [
              { question: 'Explain the fundamental difference in resilience between traditional rule-based data extraction (regex/string slicing) and LLM-powered schema extraction when data formats change frequently.' }
            ]
          })
        ]
      },
      {
        id: 'l34-s2-browser-agents-tool-calling-recovery',
        order: 2,
        title: 'Browser Agents, Tool Orchestration & AI Error Recovery',
        description: 'Autonomous tool execution in automation: AI-driven browser navigation (Playwright + LLMs), RAG-augmented automation, Model Context Protocol (MCP) in workflows, human-in-the-loop gates, and self-healing automation recovery.',
        topics: [
          createTopic({
            id: 'ai-automation-browser-agents-and-self-healing',
            order: 1,
            title: 'AI Browser Agents (Playwright + LLMs), Tool Calling & Self-Healing Workflows',
            description: 'State-of-the-art intelligent automation: autonomous Browser Agents using Playwright + Vision/DOM to navigate dynamic portals, Tool/Function Calling for automation tasks, RAG-augmented decision making, MCP integration, Human-in-the-Loop approval checkpoints for irreversible actions, and AI-driven automated error diagnosis & self-healing.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['ai-automation', 'browser-agents', 'playwright', 'tools', 'self-healing', 'mcp'],
            learningObjectives: [
              'Combine Playwright browser automation with LLM vision and reasoning to build autonomous browser agents',
              'Use Function Calling and Model Context Protocol (MCP) to connect AI models directly to automation scripts',
              'Incorporate Contextual RAG knowledge bases into automation pipelines for decision support',
              'Implement automated error diagnosis where LLMs analyze script failure traces, DOM snapshots, and recover gracefully',
              'Design Human-in-the-Loop approval gates for high-stakes automated tasks (financial, data deletion)'
            ],
            subtopics: [
              'AI-Assisted Browser Workflows & Browser Agents: feeding accessibility trees / DOM snapshots and screenshots to multimodal models, allowing the agent to decide next Playwright actions dynamically',
              'Autonomous Tool Calling in Automation: providing LLMs with Python functions (database query, email send, API post, file write) as callable tools',
              'RAG-Augmented Automation: querying internal company policy and technical documentation via vector search before executing automated decisions',
              'Connecting Model Context Protocol (MCP) servers to automation scripts for standardized tool access',
              'Human-in-the-Loop (HITL) Workflow Architecture: pausing automation before destructive actions (sending emails, modifying databases, making payments) for human confirmation',
              'AI-Driven Self-Healing and Error Recovery: when a Playwright locator or API call fails, passing the error traceback + DOM snapshot to an LLM to diagnose root cause and execute an alternate recovery path'
            ],
            practice: [
              { title: 'Build an Autonomous Web Research & Data Extraction Browser Agent (Playwright + LLM)', description: 'Build an intelligent agent that takes a high-level goal, navigates web portals via Playwright, uses LLM vision to locate elements and extract data, handles unexpected popups dynamically, and writes results to disk.' }
            ],
            debugging: [
              { title: 'Debug Flaky Web Element Shift with AI Fallback Locator Recovery', description: 'Implement an intelligent fallback handler where a failed Playwright locator triggers an LLM DOM inspection to find the new matching element selector dynamically.', errorType: 'logic' }
            ],
            assessments: [
              { question: 'How do autonomous Browser Agents combine Playwright locators with LLM reasoning to navigate websites where page layouts change without notice?' }
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L35 — PROJECTS (13 PRODUCTION PORTFOLIO PROJECTS)
  // ----------------------------------------------------
  {
    id: 'l35',
    order: 35,
    title: 'L35 — Capstone Engineering Portfolio Projects',
    description: '13 progressive, production-grade portfolio projects demonstrating full-stack automation engineering, testing, containerization, and state-of-the-art AI capabilities across automation, backend APIs, browser testing, classical ML, deep learning, Enterprise RAG, Autonomous Agents, Custom MCP Servers, and AI-Powered Automation.',
    estimatedDuration: '6-8 weeks',
    estimatedHours: 80,
    color: 'indigo',
    subjects: [
      {
        id: 'l35-s1-portfolio-projects',
        order: 1,
        title: '13 Progressive Portfolio Projects (Automation to AI Engineering)',
        description: 'Complete hands-on portfolio projects with production architecture, test suites, Docker containerization, and interview walkthrough scripts.',
        topics: [
          createTopic({
            id: 'project-1-python-automation',
            order: 1,
            title: 'Project 1: Resilient File & System Automation Engine (CLI)',
            description: 'Build a Python CLI automation tool using pathlib, subprocess, and shutil that parses multi-format logs, aggregates statistics with Pandas, and generates automated PDF/HTML reports with structured logging and error recovery.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['project', 'python', 'automation', 'cli'],
            subtopics: [
              'Architecture & Requirements: CLI interface with argparse/typer, file traversal with pathlib, error logging, and resilient subprocess execution',
              'Implementation: writing modular ETL pipelines, data validation, and graceful exception recovery',
              'Automated Testing: Pytest unit tests with mocked filesystem',
              'Packaging & Dockerization: multi-stage Dockerfile and README documentation'
            ]
          }),
          createTopic({
            id: 'project-2-fastapi-backend',
            order: 2,
            title: 'Project 2: Production REST API with FastAPI, SQLAlchemy & JWT',
            description: 'Develop a complete RESTful backend with user authentication (bcrypt + JWT), role-based access control, PostgreSQL persistence via SQLAlchemy 2.0 ORM, Pydantic validation schemas, and automated Pytest test suite with TestClient.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['project', 'fastapi', 'backend', 'postgresql', 'jwt'],
            subtopics: [
              'Architecture: Layered architecture (Routers, Services, Repositories, Models, Schemas)',
              'Authentication & Security: OAuth2 Password Bearer flow, JWT issuance and verification middleware',
              'Database & Migrations: PostgreSQL schema design and Alembic migration scripts',
              'Containerization & CI: Docker Compose (App + Postgres) and GitHub Actions CI workflow'
            ]
          }),
          createTopic({
            id: 'project-3-playwright-automation-tool',
            order: 3,
            title: 'Project 3: Playwright Browser Automation & Data Extraction Tool (POM)',
            description: 'Build a robust browser automation tool using Playwright Python, Page Object Model (POM), storage state authentication persistence, file downloads, and trace viewer debugging.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['project', 'playwright', 'browser-automation', 'pom'],
            subtopics: [
              'Page Object Model design: encapsulating UI components and locators into reusable page classes',
              'Auth state optimization: saving authenticated session cookies to bypass login screens in automation runs',
              'Handling dynamic elements, iframes, multi-tabs, and automatic file download verification'
            ]
          }),
          createTopic({
            id: 'project-4-web-scraping-pipeline',
            order: 4,
            title: 'Project 4: Web Scraping & Tabular Data Extraction Pipeline (BS4 + Pandas)',
            description: 'Build an automated web data pipeline using requests and BeautifulSoup4 to crawl paginated technical catalog websites, extract nested tables and metadata, clean data with Pandas, and export to SQLite.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['project', 'scraping', 'beautifulsoup', 'pandas', 'pipeline'],
            subtopics: [
              'HTTP session management, polite rate-limiting, and User-Agent rotation',
              'HTML parsing, CSS selector extraction, handling missing table cells, and URL normalization',
              'Data transformation and SQL storage with Pandas and SQLite'
            ]
          }),
          createTopic({
            id: 'project-5-tabular-ml-xgboost',
            order: 5,
            title: 'Project 5: Tabular Machine Learning Pipeline & Model Serving (XGBoost)',
            description: 'End-to-end classical ML application: exploratory data analysis, Scikit-Learn ColumnTransformer preprocessing, training Random Forest & XGBoost classifiers, hyperparameter tuning with GridSearchCV, SHAP interpretability, and wrapping model in a FastAPI inference endpoint.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['project', 'machine-learning', 'xgboost', 'scikit-learn', 'shap'],
            subtopics: [
              'Data wrangling: handling class imbalance, encoding, scaling, and preventing data leakage',
              'Model selection & evaluation: Stratified K-Fold CV, ROC-AUC and PR-AUC metric analysis',
              'Explainability: generating global and local SHAP feature importance explanations for predictions',
              'Serving: serializing pipeline with joblib and deploying as a real-time FastAPI scoring microservice'
            ]
          }),
          createTopic({
            id: 'project-6-pytorch-deep-learning',
            order: 6,
            title: 'Project 6: PyTorch Deep Learning Classifier with Custom Training Loop',
            description: 'Build a complete deep learning application in PyTorch: custom Dataset and DataLoader pipeline, neural network with BatchNorm and Dropout, custom training loop with AdamW, learning rate scheduling, validation checkpointing, and GPU acceleration.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['project', 'deep-learning', 'pytorch', 'neural-networks'],
            subtopics: [
              'Dataset engineering: tensor transformations, normalization, and multi-worker batch loading',
              'Model architecture: subclassing nn.Module and designing layer forward passes',
              'Training dynamics: loss curves monitoring, early stopping, and saving best model weights'
            ]
          }),
          createTopic({
            id: 'project-7-enterprise-rag-citations',
            order: 7,
            title: 'Project 7: Enterprise RAG System with Citations & Hybrid Search (Capstone)',
            description: 'Build a production-grade Retrieval-Augmented Generation application: PDF parsing, recursive chunking with overlap, ChromaDB vector indexing, BM25 + Dense Hybrid Search with Reciprocal Rank Fusion, Cohere cross-encoder reranking, streaming grounded generation with exact page citations, and automated evaluation with Ragas.',
            priority: 'core',
            estimatedHours: 12,
            tags: ['project', 'rag', 'hybrid-search', 'citations', 'ragas', 'chromadb'],
            subtopics: [
              'Ingestion & Chunking: PDF document extraction, metadata tagging, and vector database indexing',
              'Two-Stage Retrieval: BM25 keyword search + dense embeddings fused with RRF, followed by cross-encoder reranking',
              'Grounded Generation: prompt engineering with strict constraints and inline citation formatting (`[Source: File, p. 12]`)',
              'Evaluation: calculating Faithfulness, Answer Relevance, Context Precision, and Context Recall scores using Ragas'
            ]
          }),
          createTopic({
            id: 'project-8-function-calling-engine',
            order: 8,
            title: 'Project 8: Autonomous Multi-Tool Function-Calling Engine',
            description: 'Build an autonomous tool-calling system from scratch in Python: JSON Schema tool definitions, executing local database/API functions in an iterative while-loop, handling parallel tool calls, and error recovery.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['project', 'function-calling', 'tools', 'llm-apis', 'python'],
            subtopics: [
              'Defining tool schemas and parameter validation in Python',
              'Executing tool calls dynamically and feeding formatted tool result messages back to LLM',
              'Handling multi-step execution loops and automated error correction'
            ]
          }),
          createTopic({
            id: 'project-9-autonomous-agent-langgraph',
            order: 9,
            title: 'Project 9: Multi-Agent Autonomous Research System with LangGraph (Capstone)',
            description: 'Develop an autonomous multi-agent system using LangGraph: Supervisor routing agent, Web Search agent with tools, Document Analysis agent, Synthesizer agent, persistent checkpointers, and human-in-the-loop approval on final report publishing.',
            priority: 'core',
            estimatedHours: 12,
            tags: ['project', 'langgraph', 'multi-agent', 'agents', 'human-in-the-loop'],
            subtopics: [
              'Graph architecture: defining typed State schema, reducer functions, specialized worker nodes, and conditional edges',
              'Tool integrations: web search, document reading, and note-taking tools',
              'Persistence & Human approval: thread checkpointing and interrupt_before triggers for human review'
            ]
          }),
          createTopic({
            id: 'project-10-custom-mcp-server',
            order: 10,
            title: 'Project 10: Custom Production Model Context Protocol (MCP) Server',
            description: 'Build a production-quality MCP server in Python using FastMCP: exposing database query tools with SQL sanitization, live system log resources, and pre-built prompt workflows, integrated and verified inside Claude Desktop.',
            priority: 'core',
            estimatedHours: 8,
            tags: ['project', 'mcp', 'fastmcp', 'tools', 'resources'],
            subtopics: [
              'Protocol implementation: defining MCP tools, resources, and prompt templates with strict type annotations',
              'Security: input validation, read-only constraints, and preventing prompt injection via tool arguments',
              'Integration: configuring `claude_desktop_config.json`, running with uv, and debugging with MCP Inspector'
            ]
          }),
          createTopic({
            id: 'project-11-ai-powered-browser-agent',
            order: 11,
            title: 'Project 11: AI-Powered Browser & Document Automation Agent (Capstone)',
            description: 'Build an intelligent automation agent combining Playwright browser control, LLM tool calling, and document processing to autonomously log into web portals, extract complex reports, parse invoices with vision, and synchronize data to a database.',
            priority: 'core',
            estimatedHours: 12,
            tags: ['project', 'ai-automation', 'playwright', 'browser-agent', 'document-ai'],
            subtopics: [
              'Combining Playwright browser automation with LLM reasoning and multimodal vision',
              'Intelligent document parsing and ERP synchronization',
              'Self-healing automation recovery when page locators shift'
            ]
          }),
          createTopic({
            id: 'project-12-production-ai-platform',
            order: 12,
            title: 'Project 12: Production Scalable AI Web Platform with Observability',
            description: 'Full-stack AI platform: FastAPI backend, SSE token streaming, Anthropic Prompt Caching, Semantic Caching with Redis, LangSmith distributed tracing, and Docker Compose orchestration.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['project', 'production-ai', 'fastapi', 'caching', 'observability', 'docker'],
            subtopics: [
              'Streaming API architecture with real-time markdown frontend rendering',
              'Prompt Caching and Semantic Caching optimization',
              'End-to-end distributed tracing and token cost monitoring'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L36 — INTERVIEW PREPARATION
  // ----------------------------------------------------
  {
    id: 'l36',
    order: 36,
    title: 'L36 — AI/ML & Automation Engineer Technical & System Design Interview Prep',
    description: 'Comprehensive technical interview preparation for Automation Developers transitioning to AI/ML & AI Engineering roles: core conceptual drill-downs (Python, Automation, Playwright, APIs, SQL, DSA, ML, DL, Transformers, LLMs, RAG, Tool Calling, Agents, MCP, System Design), live coding problems, AI System Design mock interviews, debugging scenarios under pressure, and behavioral interview mastery using the STAR framework (no QA-heavy testing theory).',
    estimatedDuration: '3-4 weeks',
    estimatedHours: 40,
    color: 'emerald',
    subjects: [
      {
        id: 'l36-s1-technical-interview-drills',
        order: 1,
        title: 'Technical Concepts, Automation & Architectural Comparisons (A vs B)',
        description: 'High-frequency interview questions and trade-off analyses across Python, Python Automation, Playwright, APIs, SQL, DSA, Machine Learning, Deep Learning, Transformers, LLMs, RAG, and Agents.',
        topics: [
          createTopic({
            id: 'interview-core-technical-comparisons',
            order: 1,
            title: 'High-Frequency AI/ML & Automation Interview Questions & "Compare A vs B" Trade-Offs',
            description: 'Mastering high-stakes technical explanations: explaining complex concepts clearly without AI, defending architectural trade-offs, and answering common interview deep-dive questions across Python, Automation, APIs, Playwright, ML, LLMs, RAG, and Agents.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['interview', 'trade-offs', 'comparisons', 'technical-prep', 'automation'],
            subtopics: [
              'Python & Automation Deep Dives: GIL mechanics, generators vs lists, decorators under the hood, mutability gotchas, subprocess safety, exponential backoff with jitter',
              'Playwright Deep Dives: Playwright architecture (WebSocket vs HTTP), auto-waiting vs explicit waits, auth state reuse, network interception, Playwright vs Selenium',
              'SQL & DB Deep Dives: Indexing structures (B-Tree vs Hash), ACID properties, Window functions vs GROUP BY',
              'Classical ML Comparisons: Random Forest vs XGBoost, L1 Lasso vs L2 Ridge regularization, Precision vs Recall tradeoffs',
              'Deep Learning Deep Dives: Vanishing gradients, AdamW vs SGD, BatchNorm vs LayerNorm, Backpropagation derivation',
              'LLM & Transformer Deep Dives: Scaled Dot-Product Attention derivation, why QKV projections exist, SFT vs RLHF vs DPO, Tokenization mechanics',
              'RAG & Agent Deep Dives: Bi-Encoder vs Cross-Encoder, Hybrid Search vs Dense Search, ReAct loop vs static chains, MCP architecture, Traditional Automation vs AI-Powered Automation'
            ]
          }),
          createTopic({
            id: 'interview-ai-system-design-and-behavioral',
            order: 2,
            title: 'AI System Design Interviews & STAR Behavioral Framework',
            description: 'Structuring AI system design interviews (Clarify -> High-Level Design -> Deep Dive -> Scale & Bottlenecks) and framing impactful behavioral answers using the Situation, Task, Action, Result (STAR) technique.',
            priority: 'core',
            estimatedHours: 10,
            tags: ['interview', 'system-design', 'behavioral', 'star-method'],
            subtopics: [
              'System Design Framework: 1. Scope functional/non-functional requirements, 2. Data flow & API design, 3. High-level component diagram, 4. Detailed component deep dive, 5. Scalability, latency, and failure handling',
              'Mock AI System Design questions: "Design an Enterprise Copilot with RAG", "Design a High-Throughput LLM Inference Gateway", "Design an Autonomous Web Automation Agent"',
              'Behavioral Interview Mastery (STAR Method): framing compelling stories on technical disagreements, debugging severe production outages, overcoming project roadblocks, and transitioning from Automation to AI Engineering'
            ]
          })
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // L37 — TECHNOLOGY RADAR
  // ----------------------------------------------------
  {
    id: 'l37',
    order: 37,
    title: 'L37 — Technology Radar & Continuous AI Evolution',
    description: 'Structured methodology to continuously evaluate emerging AI models, agent frameworks, protocols, developer tools, vector databases, and evaluation platforms. Categorizing technologies into Watch, Explore, Learning, Production Relevant, and Deprecated.',
    estimatedDuration: 'Ongoing',
    estimatedHours: 15,
    color: 'slate',
    subjects: [
      {
        id: 'l37-s1-tech-radar-framework',
        order: 1,
        title: 'Technology Radar Framework & Evaluated AI Landscape',
        description: 'How to evaluate new AI papers and open-source tools systematically, assessing production readiness, and maintaining an up-to-date radar.',
        topics: [
          createTopic({
            id: 'tech-radar-landscape-and-evaluation-criteria',
            order: 1,
            title: 'AI Technology Radar: Production Relevant, Explore & Deprecated Landscape',
            description: 'Structured categorization of the modern AI engineering ecosystem across 5 status tiers (Production Relevant, Learning, Explore, Watch, Deprecated) to stay focused on high-ROI skills without getting overwhelmed by hype.',
            priority: 'core',
            estimatedHours: 6,
            tags: ['tech-radar', 'ai-landscape', 'trends', 'evaluation'],
            subtopics: [
              'The 5 Technology Radar Statuses: 1. Production Relevant (industry standard, use today), 2. Learning (high ROI, master now), 3. Explore (promising, build POCs), 4. Watch (early research, monitor developments), 5. Deprecated (avoid for new projects)',
              'Production Relevant: FastAPI, Pytest, Docker, PostgreSQL, PyTorch, LangGraph, ChromaDB/Pinecone, OpenAI/Claude SDKs, Pydantic, Instructor, Ragas, Playwright',
              'Learning: Model Context Protocol (MCP), vLLM / Ollama local serving, Hybrid Search (BM25 + Dense), Cross-Encoder Rerankers, Direct Preference Optimization (DPO), AI-Powered Automation',
              'Explore: Multimodal RAG (ColPali), DeepSeek-R1 reasoning models, Local SLMs on device, Ephemeral agent sandboxes (E2B)',
              'Watch: Self-evolving autonomous architectures, Quantum ML, Fully automated software engineering agent clusters',
              'Deprecated: Legacy Selenium for modern web automation, pure Keyword-only search for semantic knowledge bases, brittle regex parsing for LLM outputs'
            ]
          })
        ]
      }
    ]
  }
];
