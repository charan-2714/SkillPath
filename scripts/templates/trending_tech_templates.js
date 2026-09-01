// scripts/templates/trending_tech_templates.js
// Comprehensive Curriculum Definitions for Trending & Core Software / Cloud / AI Engineering Templates

import { buildLevel, buildSubject, buildTopic, buildTemplate } from './template_helpers.js';

// ============================================================================
// 1. PYTHON AUTOMATION DEVELOPER
// ============================================================================
export function generatePythonAutomationTemplate() {
  return buildTemplate({
    id: 'python-automation-developer',
    name: 'Python Automation Developer',
    title: 'Python Automation Developer',
    category: 'Automation & Quality',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-8 months',
    estimatedHours: 350,
    targetRoles: ['Python Automation Engineer', 'SDET', 'Test Automation Architect', 'Automation Solutions Developer'],
    prerequisites: ['Basic Python programming syntax'],
    technologies: ['Python 3.12+', 'Pytest', 'Playwright', 'Selenium', 'Requests / HTTPX', 'CI/CD GitHub Actions', 'Docker', 'Automation Architecture'],
    description: 'Master enterprise test automation and scripting with Python. Advanced language features (decorators, generators, async), Pytest framework mastery, Playwright browser automation, API automation, CI/CD execution, test data management, and the bridge to AI-assisted automation.',
    levels: [
      buildLevel({
        id: 'pyauto-l0',
        order: 0,
        title: 'Level 0 — Advanced Python for Automation Engineers',
        description: 'Advanced Python idioms: Decorators, context managers, generators, custom exceptions, typing, and async execution.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'pyauto-l0-s1',
            title: 'Advanced Python Mechanics',
            topics: [
              buildTopic({
                id: 'pyauto-l0-t1',
                title: 'Decorators, Context Managers & Generators',
                description: 'Write custom decorators for retries, timing, logging, and context managers for resource handling.',
                subtopics: [
                  'Function & Class Decorators (@retry, @timing, @log_step)',
                  'Custom Context Managers with contextlib and __enter__/__exit__',
                  'Generators, yield from, and Memory-Efficient Stream Processing',
                  'Type Hinting & Static Analysis with MyPy / Pydantic V2',
                  'Asyncio Fundamentals: Event Loops, coroutines, tasks, and concurrency',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'pyauto-l1',
        order: 1,
        title: 'Level 1 — Pytest Enterprise Testing Framework',
        description: 'Pytest mastery: Fixtures (scopes, autouse, teardown), parameterization, marks, plugins, and custom hooks.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'pyauto-l1-s1',
            title: 'Pytest Architecture & Test Suites',
            topics: [
              buildTopic({
                id: 'pyauto-l1-t1',
                title: 'Fixtures, Parameterization & Custom Pytest Plugins',
                description: 'Build enterprise test architectures using dependency-injected fixtures and conftest.py hierarchies.',
                subtopics: [
                  'Fixture Scopes (function, class, module, package, session) and yield Teardowns',
                  'Dynamic Parameterization with @pytest.mark.parametrize and pytest_generate_tests',
                  'conftest.py Hook Functions (pytest_runtest_makereport, pytest_collection_modifyitems)',
                  'Custom Marks, Test Filtering, and Parallel Execution with pytest-xdist',
                  'Generating Enterprise HTML & Allure Test Reports with Screenshots on Failure',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'pyauto-l2',
        order: 2,
        title: 'Level 2 — Web & Browser Automation with Playwright',
        description: 'Modern end-to-end browser automation: Playwright async API, locators, auto-waiting, network mocking, and Page Object Model (POM).',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'pyauto-l2-s1',
            title: 'Playwright Framework Architecture',
            topics: [
              buildTopic({
                id: 'pyauto-l2-t1',
                title: 'Playwright Locators, Auto-Waiting & Page Object Model',
                description: 'Create resilient, flaky-free UI tests using Playwright semantic locators and clean Page Object architectures.',
                subtopics: [
                  'Playwright Architecture: Chromium, Firefox, WebKit under Single Protocol',
                  'Resilient User-Facing Locators (getByRole, getByText, getByTestId)',
                  'Built-in Auto-Waiting & Eliminating Explicit/Hardcoded Sleep Anti-Patterns',
                  'Network Interception: Mocking API Responses, Header Modification & Throttling',
                  'Page Object Model (POM) & Component Object Pattern Architecture',
                  'Trace Viewer, Video Recording & Debugging Failed CI Runs with Playwright Inspector',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'pyauto-l3',
        order: 3,
        title: 'Level 3 — API Automation & Contract Testing',
        description: 'REST & GraphQL test automation with Requests / HTTPX, JSON schema validation, auth workflows, and performance checks.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'pyauto-l3-s1',
            title: 'API Testing Frameworks & Schema Validation',
            topics: [
              buildTopic({
                id: 'pyauto-l3-t1',
                title: 'REST/GraphQL Automation with HTTPX & Pydantic',
                description: 'Build fast, type-safe API automation suites with schema validation and auth token reuse.',
                subtopics: [
                  'HTTP Client Wrapper: Logging, Retries, Custom Headers, Cookie Jar',
                  'Pydantic Model Validation for Response Payloads & Contract Testing',
                  'Automating Complex OAuth2, JWT, and Session-Based Auth Flows',
                  'Data-Driven API Testing with CSV/JSON/Database Fixtures',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'pyauto-l4',
        order: 4,
        title: 'Level 4 — CI/CD Pipelines & Dockerized Test Execution',
        description: 'Automated test execution in GitHub Actions / GitLab CI, containerization with Docker, and cloud grids.',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 'pyauto-l4-s1',
            title: 'Test Infrastructure & CI/CD',
            topics: [
              buildTopic({
                id: 'pyauto-l4-t1',
                title: 'GitHub Actions Workflows, Docker Containers & Test Sharding',
                description: 'Run distributed parallel test suites on ephemeral containers on every pull request.',
                subtopics: [
                  'Dockerizing Python & Playwright Environments (playwright-python Docker Images)',
                  'GitHub Actions CI/CD Matrix Execution and Test Sharding for Fast Feedback',
                  'Uploading Artifacts: Test Logs, Allure HTML Reports & Failure Screenshots',
                  'Slack & Teams Webhook Integration for Instant Test Failure Alerts',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ============================================================================
// 2. AGENTIC AI & GENAI ENGINEER
// ============================================================================
export function generateAgenticAiTemplate() {
  return buildTemplate({
    id: 'agentic-ai-engineer',
    name: 'Agentic AI & GenAI Engineer',
    title: 'Agentic AI & GenAI Engineer',
    category: 'AI & Machine Learning',
    status: 'Emerging',
    difficulty: 'Advanced',
    estimatedDuration: '6-9 months',
    estimatedHours: 400,
    targetRoles: ['Agentic AI Engineer', 'GenAI Solutions Architect', 'LLM Application Developer', 'Autonomous Agent Engineer'],
    prerequisites: ['Python programming mastery', 'Basic understanding of LLMs & API integration'],
    technologies: ['LangGraph', 'Model Context Protocol (MCP)', 'Tool Calling', 'Multi-Agent Swarms', 'RAG', 'Vector Databases', 'vLLM / Ollama', 'DSPy', 'LlamaIndex'],
    description: 'State-of-the-art engineering curriculum for autonomous AI agents and GenAI systems. Model Context Protocol (MCP), LangGraph cyclical state graphs, deterministic tool calling, multi-agent collaboration swarms, local LLM serving (Ollama/vLLM), structured outputs, semantic memory, and agent evaluation.',
    levels: [
      buildLevel({
        id: 'agent-l0',
        order: 0,
        title: 'Level 0 — LLM Foundations, Structured Outputs & Function Calling',
        description: 'Transformer mechanics, tokenization, context windows, deterministic JSON outputs (Pydantic / Instructor), and function calling.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'agent-l0-s1',
            title: 'LLM Mechanics & Deterministic Outputs',
            topics: [
              buildTopic({
                id: 'agent-l0-t1',
                title: 'Structured Outputs, Tool Calling & Context Windows',
                description: 'Master tool calling schemas, system prompt engineering, and deterministic structured extraction.',
                subtopics: [
                  'Transformer Architecture Recap: Attention Mechanism, Token Limits & KV Cache',
                  'OpenAI / Anthropic Function Calling Protocol & Tool Definition Schemas',
                  'Guaranteed JSON Outputs with Pydantic & Instructor Library',
                  'Few-Shot Prompting, Chain-of-Thought (CoT), ReAct (Reasoning + Acting) Framework',
                  'Handling Tool Errors, Re-prompts & Argument Correction Loops',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'agent-l1',
        order: 1,
        title: 'Level 1 — Model Context Protocol (MCP) Architecture',
        description: 'Standardized agent-to-tool protocol: MCP client/server architecture, transports (stdio/SSE), resources, tools, and prompts.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'agent-l1-s1',
            title: 'Model Context Protocol (MCP) Standards',
            topics: [
              buildTopic({
                id: 'agent-l1-t1',
                title: 'Building Custom MCP Servers & Tool Transports',
                description: 'Author secure, production-grade MCP servers exposing enterprise APIs, databases, and filesystem tools to LLMs.',
                subtopics: [
                  'Model Context Protocol (MCP) Specification & Architecture (Anthropic Open Standard)',
                  'MCP Core Primitives: Resources (Read-Only Data), Tools (Executable Actions), Prompts (Templates)',
                  'Transports: Stdio (Local Process Execution) vs Server-Sent Events (SSE / HTTP Remote)',
                  'Authoring MCP Servers in Python (FastMCP) and TypeScript',
                  'Securing MCP Tools: Sandboxing, Human-in-the-Loop Confirmation & Access Control',
                  'Connecting MCP Servers to Claude Desktop, Cursor, and Custom Agent Runtimes',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'agent-l2',
        order: 2,
        title: 'Level 2 — Cyclical Agentic Workflows with LangGraph',
        description: 'Stateful agent architecture: StateGraph, Nodes, Edges, Conditional Routing, Memory Checkpointing, and Human-in-the-Loop.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'agent-l2-s1',
            title: 'LangGraph State Graphs & Control Flow',
            topics: [
              buildTopic({
                id: 'agent-l2-t1',
                title: 'StateGraph, Checkpointing & Conditional Edges',
                description: 'Build robust, non-linear cyclical agent graphs with persistent memory and review gates.',
                subtopics: [
                  'LangGraph Core Concepts: State, Nodes, Edges, Entry/Finish Points',
                  'Typed State Management with TypedDict / Pydantic and Reducers',
                  'Conditional Routing & Decision Nodes (e.g. should_continue based on tool calls)',
                  'Memory Checkpointing with SQLite / Postgres for Thread Persistence & Time Travel',
                  'Human-in-the-Loop (HITL): Breakpoints, Approval Gates & State Modification',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'agent-l3',
        order: 3,
        title: 'Level 3 — Multi-Agent Systems & Swarm Architectures',
        description: 'Hierarchical supervisor agents, peer-to-peer swarms, role specialization, consensus mechanisms, and subagent delegation.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'agent-l3-s1',
            title: 'Multi-Agent Collaboration Patterns',
            topics: [
              buildTopic({
                id: 'agent-l3-t1',
                title: 'Hierarchical Supervisors & Swarm Delegation',
                description: 'Coordinate specialized worker agents (Coder, Researcher, Critic, Tester) under supervisor orchestration.',
                subtopics: [
                  'Multi-Agent Architectures: Supervisor Pattern, Network / Swarm Pattern, Sequential Chain',
                  'Designing Specialized Agent Personas with Scoped Tools and System Prompts',
                  'Inter-Agent Communication Protocols, Structured Message Passing & Handoffs',
                  'Resolving Agent Deadlocks, Infinite Loops & Maximum Iteration Guards',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'agent-l4',
        order: 4,
        title: 'Level 4 — Local LLM Serving, Agent Evaluation & Guardrails',
        description: 'Self-hosted inference (Ollama, vLLM, SGLang), RAG Triad evaluation (Ragas, TruLens), guardrails (NeMo, Guardrails AI), and telemetry.',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 'agent-l4-s1',
            title: 'Inference, Guardrails & Evaluation',
            topics: [
              buildTopic({
                id: 'agent-l4-t1',
                title: 'vLLM Serving, Agent Telemetry (LangSmith) & Evaluation',
                description: 'Serve high-throughput local models and evaluate agent accuracy, trajectory efficiency, and safety guardrails.',
                subtopics: [
                  'Local LLM Serving with vLLM & Ollama: PagedAttention, Continuous Batching, Quantization (AWQ/GPTQ)',
                  'Safety Guardrails with NeMo Guardrails / Llama-Guard for Input/Output Filtering',
                  'Observability & Trace Tracking with LangSmith / OpenTelemetry (Traces, Latency, Token Costs)',
                  'Automated Agent Evaluation: Success Rate, Tool Selection Accuracy, Hallucination Benchmarks',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ============================================================================
// 3. MLOPS ENGINEER
// ============================================================================
export function generateMlOpsTemplate() {
  return buildTemplate({
    id: 'mlops-engineer',
    name: 'MLOps Engineer',
    title: 'MLOps Engineer',
    category: 'AI & Machine Learning',
    status: 'Growing',
    difficulty: 'Advanced',
    estimatedDuration: '6-8 months',
    estimatedHours: 360,
    targetRoles: ['MLOps Engineer', 'Machine Learning Platform Engineer', 'AI Infrastructure Lead'],
    prerequisites: ['Python mastery', 'Machine Learning fundamentals', 'Docker basics'],
    technologies: ['MLflow', 'DVC', 'Kubeflow', 'Triton Inference Server', 'FastAPI', 'Prometheus', 'Evidently AI', 'Docker', 'Kubernetes'],
    description: 'Production machine learning lifecycle engineering. Data & model versioning (DVC), experiment tracking (MLflow), automated training pipelines (Kubeflow Pipelines), high-throughput model serving (Triton / TorchServe / FastAPI), model registries, and drift detection (Evidently AI).',
    levels: [
      buildLevel({
        id: 'mlops-l0',
        order: 0,
        title: 'Level 0 — Model Versioning, Experiment Tracking & Artifacts',
        description: 'Experiment logging with MLflow, dataset/pipeline versioning with DVC, and model registry governance.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'mlops-l0-s1',
            title: 'Experiment Tracking & Model Registries',
            topics: [
              buildTopic({
                id: 'mlops-l0-t1',
                title: 'MLflow & DVC for Reproducible ML',
                description: 'Track hyperparameters, metrics, and artifacts, and version multi-gigabyte datasets with DVC and cloud storage.',
                subtopics: [
                  'MLflow Tracking Server: Parameters, Metrics, Artifacts, Run Tagging',
                  'MLflow Model Registry: Staging, Production, Archival Lifecycles & Model Signatures',
                  'Data Version Control (DVC): Tracking Large Datasets with Git & S3/GCS Remotes',
                  'DVC Pipelines (dvc.yaml): Reproducible Data Prep, Feature Extraction, and Training DAGs',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'mlops-l1',
        order: 1,
        title: 'Level 1 — Production Model Serving & High-Throughput Inference',
        description: 'FastAPI microservices, NVIDIA Triton Inference Server, ONNX Runtime optimization, and batch serving.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'mlops-l1-s1',
            title: 'Inference Engines & Model Serving',
            topics: [
              buildTopic({
                id: 'mlops-l1-t1',
                title: 'Triton Inference Server, ONNX Runtime & FastAPI',
                description: 'Deploy low-latency, high-concurrency model serving endpoints with dynamic batching and GPU acceleration.',
                subtopics: [
                  'Containerized FastAPI Model Serving with Asynchronous Worker Pools',
                  'ONNX Model Conversion & Graph Optimization for Fast CPU/GPU Inference',
                  'NVIDIA Triton Inference Server: Multi-Model Concurrency, Dynamic Batching, Model Ensembles',
                  'TorchServe & TensorRT Deployment for Deep Learning Models',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'mlops-l2',
        order: 2,
        title: 'Level 2 — ML Pipelines, Kubernetes & Drift Monitoring',
        description: 'Orchestrating Kubeflow Pipelines, CI/CD for ML (CT - Continuous Training), data drift, and concept drift detection.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'mlops-l2-s1',
            title: 'Continuous Training & Drift Monitoring',
            topics: [
              buildTopic({
                id: 'mlops-l2-t1',
                title: 'Kubeflow Pipelines & Evidently AI Drift Monitoring',
                description: 'Automate retrain triggers, monitor production data distributions, and detect model degradation.',
                subtopics: [
                  'Kubeflow Pipelines (KFP) on Kubernetes: Containerized Pipeline Steps & Artifact Passing',
                  'Continuous Training (CT) Triggers on Data Drift or Scheduled Retraining',
                  'Detecting Data Drift & Concept Drift with Evidently AI / Evidently Cloud',
                  'Prometheus & Grafana Dashboards for Inference Latency, GPU Utilization & Prediction Distributions',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ============================================================================
// 4. DEVOPS & PLATFORM ENGINEER
// ============================================================================
export function generateDevopsPlatformTemplate() {
  return buildTemplate({
    id: 'devops-platform-engineer',
    name: 'DevOps & Platform Engineer',
    title: 'DevOps & Platform Engineer',
    category: 'Cloud & DevOps',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '7-9 months',
    estimatedHours: 420,
    targetRoles: ['DevOps Engineer', 'Platform Engineer', 'Site Reliability Engineer (SRE)', 'Cloud Infrastructure Engineer'],
    prerequisites: ['Linux fundamentals', 'Basic networking understanding'],
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'Helm', 'GitHub Actions', 'ArgoCD (GitOps)', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Linux'],
    description: 'Master enterprise cloud infrastructure, container orchestration, Infrastructure as Code (IaC), GitOps, and site reliability engineering. Linux internals, Docker, Kubernetes clusters, Helm, Terraform, GitOps with ArgoCD, CI/CD automation, and full-stack observability.',
    levels: [
      buildLevel({
        id: 'devops-l0',
        order: 0,
        title: 'Level 0 — Linux Internals, Networking & Shell Automation',
        description: 'Linux process models, memory, cgroups, namespaces, systemd, TCP/IP, DNS, SSL/TLS, and Bash scripting.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'devops-l0-s1',
            title: 'Linux Systems & Networking',
            topics: [
              buildTopic({
                id: 'devops-l0-t1',
                title: 'Linux Kernel Mechanics, cgroups & Networking Diagnostics',
                description: 'Master operating system internals and network troubleshooting tools (tcpdump, ss, curl, dig).',
                subtopics: [
                  'Linux Namespaces, Control Groups (cgroups v2) & Container Foundations',
                  'Process Management, Signals (SIGTERM/SIGKILL), systemd Service Units',
                  'Networking Foundations: TCP 3-Way Handshake, DNS Resolution, TLS Handshake, IPTables/NFTables',
                  'Robust Shell Scripting: Error Handling (set -euo pipefail), Arguments, Traps',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'devops-l1',
        order: 1,
        title: 'Level 1 — Docker & Containerization Best Practices',
        description: 'Multi-stage builds, non-root users, minimal base images (Alpine/Distroless), layer caching, and vulnerability scanning.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'devops-l1-s1',
            title: 'Container Engineering & Image Hardening',
            topics: [
              buildTopic({
                id: 'devops-l1-t1',
                title: 'Production Dockerfiles, Multi-Stage Builds & Security Scanning',
                description: 'Author secure, lightweight production container images and scan for CVEs with Trivy.',
                subtopics: [
                  'Multi-Stage Dockerfile Patterns for Compiled & Interpreted Languages',
                  'Layer Caching Optimization & Minimizing Image Size with Distroless / Alpine',
                  'Container Security: Non-Root Execution, Read-Only Root Filesystem, Capability Dropping',
                  'Automated Container Vulnerability Scanning with Trivy & Grype in CI Pipelines',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'devops-l2',
        order: 2,
        title: 'Level 2 — Kubernetes Cluster Orchestration & Helm',
        description: 'Pods, Deployments, StatefulSets, Services, Ingress Controllers, ConfigMaps/Secrets, RBAC, and Helm charts.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'devops-l2-s1',
            title: 'Kubernetes Core & Package Management',
            topics: [
              buildTopic({
                id: 'devops-l2-t1',
                title: 'Kubernetes Workloads, Networking & Helm Packaging',
                description: 'Deploy highly available distributed applications on Kubernetes and package reusable charts with Helm.',
                subtopics: [
                  'Kubernetes Architecture: Control Plane (API Server, etcd, Scheduler) & Worker Nodes (kubelet, kube-proxy)',
                  'Workload Resources: Pods, Deployments (RollingUpdate, Recreate), StatefulSets, DaemonSets, Jobs',
                  'Networking: ClusterIP, NodePort, LoadBalancer Services, Ingress Controllers (NGINX/Traefik)',
                  'Storage: PersistentVolumes (PV), PersistentVolumeClaims (PVC), StorageClasses',
                  'Helm 3: Templates, values.yaml, Dependencies, Chart Versioning & Release Lifecycle',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'devops-l3',
        order: 3,
        title: 'Level 3 — Infrastructure as Code (Terraform) & GitOps (ArgoCD)',
        description: 'Declarative cloud provisioning with Terraform (HCL, state management, modules) and declarative GitOps with ArgoCD.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'devops-l3-s1',
            title: 'Terraform & Declarative GitOps',
            topics: [
              buildTopic({
                id: 'devops-l3-t1',
                title: 'Terraform Cloud Provisioning & ArgoCD Continuous Delivery',
                description: 'Manage immutable cloud infrastructure and automate zero-touch GitOps deployments.',
                subtopics: [
                  'Terraform Workflow: init, plan, apply, destroy; Remote State Locking with S3/DynamoDB',
                  'Modular Terraform: Reusable Modules, Input Variables, Outputs, Data Sources',
                  'GitOps Principles & Architecture with ArgoCD',
                  'Automated Sync, Self-Healing & Drift Detection in Kubernetes Clusters via ArgoCD',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'devops-l4',
        order: 4,
        title: 'Level 4 — Site Reliability Engineering (SRE) & Observability',
        description: 'Metrics, logs, traces: Prometheus, Grafana, OpenTelemetry, Loki, SLIs/SLOs, Error Budgets, and Alerting.',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 'devops-l4-s1',
            title: 'Observability & SRE Reliability',
            topics: [
              buildTopic({
                id: 'devops-l4-t1',
                title: 'Prometheus Metrics, Grafana Dashboards & OpenTelemetry',
                description: 'Build end-to-end distributed tracing, Prometheus alert rules, and calculate SLOs / Error Budgets.',
                subtopics: [
                  'The Three Pillars of Observability: Metrics (Prometheus), Logs (Loki), Distributed Traces (OpenTelemetry/Jaeger)',
                  'PromQL (Prometheus Query Language): Rates, Histograms, Quantiles, Aggregations',
                  'Designing Executive & Operational Grafana Dashboards with Alertmanager Integration',
                  'Defining Service Level Indicators (SLIs), Service Level Objectives (SLOs) & Error Budgets',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
