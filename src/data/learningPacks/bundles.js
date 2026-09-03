// src/data/learningPacks/bundles.js
// Composite and Domain Learning Packs referencing canonical modules

import { programmingFundamentalsPack } from './programmingFundamentals';
import { dsaProblemSolvingPack } from './dsaProblemSolving';
import { csFundamentalsPack } from './csFundamentals';
import { sqlDatabasesPack } from './sqlDatabases';
import { aptitudePack } from './aptitude';
import { logicalReasoningPack } from './logicalReasoning';
import { verbalAbilityPack } from './verbalAbility';
import { webFundamentalsPack } from './webFundamentals';
import { gitDeveloperToolsPack } from './gitDeveloperTools';
import { interviewPreparationPack } from './interviewPreparation';
import { resumeProjectsPack } from './resumeProjects';

// 1. Placement Fundamentals (The Ultimate Student Bundle)
export const placementFundamentalsPack = {
  id: 'pack-placement-fundamentals',
  slug: 'placement-fundamentals',
  title: 'Placement Fundamentals',
  category: 'Placement Preparation',
  difficulty: 'All Levels',
  priority: 'High',
  estimatedHours: 180,
  version: '2.0',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-28',
  description: 'The complete all-in-one placement mastery curriculum for college students & fresh graduates: Coding, DSA, CS Core, SQL, Aptitude, Reasoning, English, Git, Resume, and Interview preparation.',
  targetUsers: 'College engineering students, fresh graduates, and placement aspirants targeting mass recruitment & product drives.',
  prerequisites: ['Basic high school mathematics and eagerness to learn coding'],
  tags: ['placements', 'campus-hiring', 'dsa', 'aptitude', 'cs-fundamentals', 'sql', 'interview-prep', 'resume'],
  isCompositeBundle: true,
  referencedPackIds: [
    'pack-programming-fundamentals',
    'pack-dsa-problem-solving',
    'pack-cs-fundamentals',
    'pack-sql-databases',
    'pack-quantitative-aptitude',
    'pack-logical-reasoning',
    'pack-verbal-ability',
    'pack-git-tools',
    'pack-interview-prep',
    'pack-resume-projects',
  ],
  careerRelevance: 'The ultimate blueprint for clearing every round: Online Assessment (OA), Technical Coding, Core CS Whiteboarding, and HR Interviews.',
  learningOutcomes: [
    'Clear Round 1 Aptitude & Online Assessment (Quant, Logical Reasoning, Verbal English)',
    'Clear Round 2 Technical Coding with core programming and algorithmic problem-solving',
    'Ace Round 3 Technical Interviews on CS Fundamentals (OOP, DBMS, OS, Networks) and live SQL querying',
    'Build an ATS-optimized resume, impressive portfolio projects, and excel in behavioral HR interviews',
  ],
  // Assembled canonical subjects
  subjects: [
    ...programmingFundamentalsPack.subjects,
    ...dsaProblemSolvingPack.subjects.slice(0, 10), // Top 10 core DSA patterns for placement baseline
    ...csFundamentalsPack.subjects,
    ...sqlDatabasesPack.subjects,
    ...aptitudePack.subjects,
    ...logicalReasoningPack.subjects,
    ...verbalAbilityPack.subjects,
    ...gitDeveloperToolsPack.subjects,
    ...interviewPreparationPack.subjects,
    ...resumeProjectsPack.subjects,
  ],
};

// 2. Software Developer Placement Pack
export const softwareDeveloperPlacementPack = {
  id: 'pack-software-developer-placement',
  slug: 'software-developer-placement',
  title: 'Software Developer Placement',
  category: 'Placement Preparation',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 140,
  version: '2.0',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-28',
  description: 'Specialized placement preparation track tailored specifically for Software Engineer (SDE / SWE) and Product Development roles.',
  targetUsers: 'Computer Science & IT students targeting SDE-1, Software Developer, and Member Technical Staff (MTS) positions.',
  prerequisites: ['Basic programming syntax'],
  tags: ['sde', 'software-engineer', 'dsa', 'cs-fundamentals', 'sql', 'web', 'system-design', 'interviews'],
  isCompositeBundle: true,
  referencedPackIds: [
    'pack-programming-fundamentals',
    'pack-dsa-problem-solving',
    'pack-cs-fundamentals',
    'pack-sql-databases',
    'pack-git-tools',
    'pack-web-fundamentals',
    'pack-interview-prep',
    'pack-resume-projects',
  ],
  careerRelevance: 'Focused strictly on product company expectations: clean code, DSA rigor, systems knowledge, and design aptitude.',
  learningOutcomes: [
    'Master advanced problem solving across dynamic programming, trees, and graphs',
    'Demonstrate deep understanding of system architecture, database indexing, and networking',
    'Design and build high-performance web applications and REST APIs',
    'Pass SDE-1 technical coding rounds and architectural discussions with confidence',
  ],
  subjects: [
    ...programmingFundamentalsPack.subjects,
    ...dsaProblemSolvingPack.subjects,
    ...csFundamentalsPack.subjects,
    ...sqlDatabasesPack.subjects,
    ...gitDeveloperToolsPack.subjects,
    ...webFundamentalsPack.subjects,
    ...interviewPreparationPack.subjects,
    ...resumeProjectsPack.subjects,
  ],
};

// 3. Backend Developer Foundation Pack
export const backendDeveloperFoundationPack = {
  id: 'pack-backend-developer-foundation',
  slug: 'backend-developer-foundation',
  title: 'Backend Developer Foundation',
  category: 'Domain Foundations',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 65,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Core backend engineering skills: Server architecture, REST/gRPC APIs, SQL/NoSQL databases, Caching (Redis), Message Queues (Kafka/RabbitMQ), Docker containerization, and System Design.',
  targetUsers: 'Engineers building robust server-side applications, microservices, and distributed backend systems.',
  prerequisites: ['Basic programming in Python, Java, Node.js, Go, or C++'],
  tags: ['backend', 'api', 'databases', 'caching', 'docker', 'system-design', 'redis', 'kafka'],
  relatedPacks: ['pack-cs-fundamentals', 'pack-sql-databases', 'pack-web-fundamentals'],
  relatedTemplates: ['backend-developer', 'full-stack-developer'],
  careerRelevance: 'Powers the core business logic, scalability, and data storage for every digital product.',
  learningOutcomes: [
    'Design scalable RESTful APIs with authentication, rate limiting, and structured error responses',
    'Implement database optimizations with connection pooling, migrations, and composite indexes',
    'Integrate distributed caching (Redis) and asynchronous messaging queues for high throughput',
    'Containerize backend services using Docker and Docker Compose for consistent deployments',
  ],
  subjects: [
    ...webFundamentalsPack.subjects,
    ...sqlDatabasesPack.subjects,
    {
      id: 'be-s1-server-architecture',
      title: 'Backend Architecture & Asynchronous Processing',
      description: 'Layered architectures (Controller-Service-Repository), ORMs, Caching, and Message Queues.',
      order: 3,
      topics: [
        {
          id: 'be-t1-layered-arch-caching',
          title: 'Layered Architecture, ORM vs Raw SQL & Redis Caching',
          description: 'Controller-Service-Repository pattern, database migrations, connection pooling, and Redis cache-aside.',
          priority: 'core',
          estimatedHours: 6,
          tags: ['backend', 'architecture', 'orm', 'redis', 'caching'],
          learningItems: [
            { id: 'be-li-1', title: 'Layered Architecture: Separation of Concerns across Controllers, Business Services, and Repositories', type: 'concept' },
            { id: 'be-li-2', title: 'Database connection pooling (HikariCP / SQLAlchemy engine pool) and graceful shutdown', type: 'concept' },
            { id: 'be-li-3', title: 'Database schema migrations with Alembic / Flyway / Prisma', type: 'implementation' },
            { id: 'be-li-4', title: 'Distributed Caching with Redis: Cache-Aside pattern, TTL expiration, cache stampede prevention', type: 'implementation' },
            { id: 'be-li-5', title: 'Message Queues (RabbitMQ / Kafka / BullMQ) for background email/image processing jobs', type: 'implementation' },
          ],
          practice: [
            { id: 'be-pr-1', title: 'Build Production REST API with Redis Caching and Migrations', description: 'Implement a cached product catalog with automatic Alembic migrations and rate-limiting.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'be-as-1', question: 'How do you prevent Cache Stampede (Thundering Herd) when a popular cached key expires?', difficulty: 'medium', type: 'interview' },
          ],
        },
        {
          id: 'be-t2-docker-containerization',
          title: 'Docker Containers & Backend Deployment',
          description: 'Dockerfiles, multi-stage builds, Docker Compose for multi-service local environments, and environment configs.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['docker', 'containers', 'docker-compose', 'devops'],
          learningItems: [
            { id: 'be-li-6', title: 'Container vs Virtual Machine: namespace isolation, cgroups, and layered filesystem', type: 'concept' },
            { id: 'be-li-7', title: 'Writing optimized multi-stage Dockerfiles with minimal production images (Alpine/Distroless)', type: 'implementation' },
            { id: 'be-li-8', title: 'Multi-container orchestration with Docker Compose (API + PostgreSQL + Redis)', type: 'implementation' },
            { id: 'be-li-9', title: 'Health checks, environment variable secrets injection, and non-root security execution', type: 'concept' },
          ],
          practice: [
            { id: 'be-pr-2', title: 'Dockerize Full Stack Backend Stack with Compose', description: 'Containerize an API service, PostgreSQL database, and Redis cache with health checks and volume persistence.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'be-as-2', question: 'Why are multi-stage Docker builds essential for production backend images?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    ...interviewPreparationPack.subjects,
  ],
};

// 4. Full Stack Developer Foundation Pack
export const fullStackDeveloperPack = {
  id: 'pack-full-stack-developer',
  slug: 'full-stack-developer',
  title: 'Full Stack Developer',
  category: 'Domain Foundations',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 75,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'End-to-end full stack web engineering: React/Frontend SPAs, Node.js/FastAPI Backends, REST APIs, SQL/NoSQL databases, Authentication, Docker, and Cloud Deployment.',
  targetUsers: 'Developers wanting to build, deploy, and scale complete production web applications from frontend to database.',
  prerequisites: ['Basic JavaScript / Programming knowledge'],
  tags: ['full-stack', 'react', 'nodejs', 'rest', 'sql', 'docker', 'deployment'],
  isCompositeBundle: true,
  referencedPackIds: [
    'pack-programming-fundamentals',
    'pack-git-tools',
    'pack-web-fundamentals',
    'pack-sql-databases',
    'pack-resume-projects',
    'pack-interview-prep',
  ],
  careerRelevance: 'The most versatile software development profile across startups and tech enterprises.',
  learningOutcomes: [
    'Build responsive, reactive user interfaces with modern component frameworks and state management',
    'Develop robust server-side APIs handling validation, authentication, and database transactions',
    'Connect frontend clients to backend microservices seamlessly with automated error handling',
    'Deploy and maintain full stack web apps in production cloud environments',
  ],
  subjects: [
    ...programmingFundamentalsPack.subjects,
    ...gitDeveloperToolsPack.subjects,
    ...webFundamentalsPack.subjects,
    ...sqlDatabasesPack.subjects,
    ...resumeProjectsPack.subjects,
    ...interviewPreparationPack.subjects,
  ],
};

// 5. Data & AI Foundations Pack
export const dataAiFoundationsPack = {
  id: 'pack-data-ai-foundations',
  slug: 'data-ai-foundations',
  title: 'Data & AI Foundations',
  category: 'Domain Foundations',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 70,
  version: '1.5',
  status: 'Production Standard',
  createdAt: '2025-01-12',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-28',
  description: 'Fundamental mathematical, statistical, and engineering foundations for Machine Learning, Data Science, and Modern AI Engineering: Python, NumPy, Pandas, Linear Algebra, Calculus, Classical ML, and Vector Embeddings.',
  targetUsers: 'Students and engineers transitioning into Data Science, Machine Learning, and Generative AI roles.',
  prerequisites: ['Python basics and high-school math'],
  tags: ['ai', 'machine-learning', 'python', 'pandas', 'numpy', 'statistics', 'math-for-ml'],
  relatedPacks: ['pack-programming-fundamentals', 'pack-sql-databases'],
  relatedTemplates: ['ai-ml-engineer', 'data-scientist', 'machine-learning-engineer'],
  careerRelevance: 'Required mathematical and engineering ground floor for LLMs, RAG, and Computer Vision.',
  learningOutcomes: [
    'Perform high-speed vectorized data manipulations with NumPy ndarrays and Pandas DataFrames',
    'Grasp Linear Algebra (Matrix decompositions, SVD, Dot products) and Multivariable Calculus (Gradients, Backpropagation)',
    'Train, evaluate, and tune classical machine learning models (Linear Regression, Random Forest, XGBoost)',
    'Understand Vector Embeddings, Cosine Similarity, and foundational Neural Network forward/backward passes',
  ],
  subjects: [
    ...programmingFundamentalsPack.subjects,
    ...sqlDatabasesPack.subjects,
    {
      id: 'ai-s1-numpy-pandas-math',
      title: 'Data Wrangling (NumPy & Pandas) & Math for AI',
      description: 'Vectorized arrays, DataFrames, Data Cleaning, Linear Algebra matrices, and Probability distributions.',
      order: 3,
      topics: [
        {
          id: 'ai-t1-numpy-pandas',
          title: 'NumPy Arrays & Pandas Data Manipulation',
          description: 'Vectorization, broadcasting, DataFrame indexing (loc/iloc), groupby aggregations, and missing data imputation.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['numpy', 'pandas', 'data-wrangling'],
          learningItems: [
            { id: 'ai-li-1', title: 'NumPy ndarray memory layout, broadcasting rules, vectorization vs slow Python loops', type: 'concept' },
            { id: 'ai-li-2', title: 'Pandas Series and DataFrames: boolean indexing, loc vs iloc, merge/join/concat', type: 'implementation' },
            { id: 'ai-li-3', title: 'Data Cleaning: handling missing values (fillna, dropna), duplicates, datatype conversions, outlier detection', type: 'implementation' },
            { id: 'ai-li-4', title: 'Feature engineering: one-hot encoding, standard scaling, min-max normalization', type: 'concept' },
          ],
          practice: [
            { id: 'ai-pr-1', title: 'Complete End-to-End Data Cleaning Pipeline', description: 'Clean a noisy 50,000-row tabular dataset with missing values, skewed outliers, and categorical encoding.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'ai-as-1', question: 'How does NumPy array broadcasting work when operating on matrices with differing shapes?', difficulty: 'medium', type: 'interview' },
          ],
        },
        {
          id: 'ai-t2-math-for-ml',
          title: 'Linear Algebra, Calculus & Statistics for Machine Learning',
          description: 'Vectors, Matrix Multiplication, Eigenvalues, Partial Derivatives, Gradients, and Probability Distributions.',
          priority: 'core',
          estimatedHours: 6,
          tags: ['linear-algebra', 'calculus', 'statistics', 'math'],
          learningItems: [
            { id: 'ai-li-5', title: 'Vectors, Vector spaces, Dot Products, Cosine Similarity, and Matrix Multiplication', type: 'concept' },
            { id: 'ai-li-6', title: 'Eigenvalues, Eigenvectors, and Principal Component Analysis (PCA) dimensionality reduction', type: 'concept' },
            { id: 'ai-li-7', title: 'Multivariable Calculus: Partial Derivatives, Gradient Vectors, and the Chain Rule of calculus', type: 'concept' },
            { id: 'ai-li-8', title: 'Probability & Statistics: Mean, Variance, Normal Distribution, Central Limit Theorem, Bayes\' Theorem', type: 'concept' },
          ],
          practice: [
            { id: 'ai-pr-2', title: 'Implement Gradient Descent from Scratch with NumPy', description: 'Code batch gradient descent with learning rate decay from pure mathematical equations without scikit-learn.', difficulty: 'hard', type: 'coding' },
          ],
          assessments: [
            { id: 'ai-as-2', question: 'Why is the Chain Rule fundamental to the Backpropagation algorithm in Deep Learning neural networks?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    ...resumeProjectsPack.subjects,
    ...interviewPreparationPack.subjects,
  ],
};

// 6. Cloud & DevOps Foundation Pack
export const cloudDevopsFoundationPack = {
  id: 'pack-cloud-devops-foundation',
  slug: 'cloud-devops-foundation',
  title: 'Cloud & DevOps Foundation',
  category: 'Domain Foundations',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 50,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Linux systems, Cloud infrastructure (AWS/Azure/GCP), Docker containerization, CI/CD automated deployment pipelines, Kubernetes orchestration, and Infrastructure as Code (IaC).',
  targetUsers: 'Engineers, sysadmins, and developers pursuing Cloud, DevOps, SRE, and Platform Engineering paths.',
  prerequisites: ['Basic Linux command line and Git familiarity'],
  tags: ['cloud', 'devops', 'aws', 'docker', 'kubernetes', 'ci-cd', 'linux', 'infrastructure'],
  relatedPacks: ['pack-git-tools', 'pack-cs-fundamentals'],
  relatedTemplates: ['devops-platform-engineer', 'cloud-engineer'],
  careerRelevance: 'Essential for running modern reliable cloud platforms at scale with continuous delivery.',
  learningOutcomes: [
    'Deploy and configure cloud computing, object storage (S3), and VPC networking on AWS/Azure/GCP',
    'Write robust CI/CD workflow pipelines in GitHub Actions to build, test, and deploy code automatically',
    'Manage container workloads with Kubernetes Pods, Deployments, Services, Ingress, and ConfigMaps',
    'Understand monitoring, log aggregation (ELK/Prometheus/Grafana), and cloud security baselines',
  ],
  subjects: [
    ...gitDeveloperToolsPack.subjects,
    {
      id: 'cd-s1-cloud-k8s-ci-cd',
      title: 'Cloud Architecture, CI/CD & Kubernetes',
      description: 'AWS Cloud core services, GitHub Actions CI/CD pipelines, Docker, and Kubernetes clusters.',
      order: 2,
      topics: [
        {
          id: 'cd-t1-cloud-ci-cd-k8s',
          title: 'Cloud Core (AWS), CI/CD Automation & Kubernetes Fundamentals',
          description: 'EC2, S3, IAM, VPC, GitHub Actions workflows, Kubernetes architecture, and Prometheus monitoring.',
          priority: 'core',
          estimatedHours: 8,
          tags: ['aws', 'ci-cd', 'kubernetes', 'monitoring'],
          learningItems: [
            { id: 'cd-li-1', title: 'Cloud Core Concepts: IaaS vs PaaS vs Serverless, Shared Responsibility Model, High Availability zones', type: 'concept' },
            { id: 'cd-li-2', title: 'AWS Core Services: EC2 compute, S3 object storage, IAM roles & least privilege, VPC subnets & Security Groups', type: 'concept' },
            { id: 'cd-li-3', title: 'Automated CI/CD with GitHub Actions: build matrix, secret management, automated unit tests, and production deploy triggers', type: 'implementation' },
            { id: 'cd-li-4', title: 'Kubernetes Architecture: Control Plane (API Server, etcd, Scheduler) vs Worker Nodes (Kubelet, Kube-proxy, Container Runtime)', type: 'concept' },
            { id: 'cd-li-5', title: 'K8s Resource Manifests: Pods, Deployments, ReplicaSets, ClusterIP/NodePort Services, Ingress Controllers', type: 'implementation' },
            { id: 'cd-li-6', title: 'Observability: Metrics (Prometheus + Grafana dashboards), Distributed Logging (Loki/Fluentd), and Health probes', type: 'concept' },
          ],
          practice: [
            { id: 'cd-pr-1', title: 'Build Automated GitHub Actions CI/CD Pipeline to Cloud', description: 'Create workflow YAML that runs linters, unit tests, builds a Docker image, and deploys to cloud.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'cd-as-1', question: 'How does a Kubernetes Deployment ensure zero-downtime rolling updates when updating container images?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
  ],
};

// 7. Cybersecurity Foundation Pack
export const cybersecurityFoundationPack = {
  id: 'pack-cybersecurity-foundation',
  slug: 'cybersecurity-foundation',
  title: 'Cybersecurity Foundation',
  category: 'Domain Foundations',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 45,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Defensive security principles: CIA Triad, Cryptography, Hashing, Web Security & OWASP Top 10 vulnerabilities, Identity Access Management (IAM), and Incident Response.',
  targetUsers: 'Students, security analysts, and engineers building secure systems and enterprise defenses.',
  prerequisites: ['Basic networking and Linux concepts'],
  tags: ['cybersecurity', 'security', 'owasp', 'cryptography', 'iam', 'defense', 'incident-response'],
  relatedPacks: ['pack-cs-fundamentals', 'pack-web-fundamentals'],
  relatedTemplates: ['cybersecurity-engineer'],
  careerRelevance: 'Critical industry discipline required to protect digital assets against cyber threats and vulnerabilities.',
  learningOutcomes: [
    'Apply the CIA Triad (Confidentiality, Integrity, Availability) and Defense-in-Depth architectures',
    'Understand Cryptography: Symmetric (AES), Asymmetric (RSA/ECC), Hashing (SHA-256/bcrypt), and TLS Handshake',
    'Identify and remediate OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF, SSRF, Broken Access Control)',
    'Implement Identity Access Management (IAM), MFA, Role-Based Access Control (RBAC), and Audit Logging',
  ],
  subjects: [
    {
      id: 'sec-s1-fundamentals-crypto-owasp',
      title: 'Security Principles, Cryptography & OWASP Defense',
      description: 'CIA Triad, Symmetric/Asymmetric Encryption, Hashing, OWASP Top 10 mitigations, and IAM.',
      order: 1,
      topics: [
        {
          id: 'sec-t1-defensive-security',
          title: 'CIA Triad, Cryptography, OWASP Top 10 & Incident Response',
          description: 'Hashing vs Encryption, SQL Injection, XSS, SSRF, RBAC, Security Auditing, and Incident handling.',
          priority: 'core',
          estimatedHours: 7,
          tags: ['security', 'cryptography', 'owasp', 'iam', 'incident-response'],
          learningItems: [
            { id: 'sec-li-1', title: 'The CIA Triad (Confidentiality, Integrity, Availability) and Least Privilege Principle', type: 'concept' },
            { id: 'sec-li-2', title: 'Cryptography: Symmetric (AES-256) vs Asymmetric (RSA/ECC), Digital Signatures, and Public Key Infrastructure (PKI)', type: 'concept' },
            { id: 'sec-li-3', title: 'Cryptographic Hashing (SHA-256) vs Password Hashing with Salt & Work Factor (bcrypt / Argon2)', type: 'concept' },
            { id: 'sec-li-4', title: 'OWASP Top 10 Web Vulnerabilities: SQL Injection (parameterized queries), Broken Access Control, Security Misconfigurations, SSRF', type: 'concept' },
            { id: 'sec-li-5', title: 'Identity & Access Management: Role-Based Access Control (RBAC), Attribute-Based (ABAC), Multi-Factor Authentication (MFA)', type: 'implementation' },
            { id: 'sec-li-6', title: 'Security Logging, SIEM monitoring, and the 6 phases of Incident Response (Prepare, Identify, Contain, Eradicate, Recover, Lessons Learned)', type: 'concept' },
          ],
          practice: [
            { id: 'sec-pr-1', title: 'Audit and Remediate OWASP Vulnerabilities in Web App', description: 'Inspect a vulnerable backend API and fix SQL Injection, missing auth checks, and CORS leakage.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'sec-as-1', question: 'Why is standard SHA-256 considered unsafe for user password storage, and why is bcrypt or Argon2 required?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
  ],
};

// 8. Data Engineering Foundation Pack
export const dataEngineeringFoundationPack = {
  id: 'pack-data-engineering-foundation',
  slug: 'data-engineering-foundation',
  title: 'Data Engineering Foundation',
  category: 'Domain Foundations',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 55,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Data pipelines, ETL/ELT architectures, dimensional modeling (Star/Snowflake), Apache Spark distributed processing, Apache Airflow workflow orchestration, and Kafka streaming.',
  targetUsers: 'Engineers building scalable big data platforms, analytics warehouses, and streaming pipelines.',
  prerequisites: ['Python and intermediate SQL'],
  tags: ['data-engineering', 'etl', 'spark', 'airflow', 'kafka', 'data-warehousing', 'sql'],
  relatedPacks: ['pack-sql-databases', 'pack-programming-fundamentals'],
  relatedTemplates: ['data-engineer', 'data-analyst'],
  careerRelevance: 'Drives the data infrastructure behind modern AI, enterprise analytics, and real-time event streaming.',
  learningOutcomes: [
    'Design dimensional data models (Star Schema, Fact & Dimension tables, Slowly Changing Dimensions)',
    'Build reliable batch ETL/ELT pipelines in Python and Apache Spark',
    'Orchestrate scheduled Directed Acyclic Graph (DAG) pipelines using Apache Airflow',
    'Understand streaming event architectures with Apache Kafka topics, producers, and consumer groups',
  ],
  subjects: [
    ...sqlDatabasesPack.subjects,
    {
      id: 'de-s1-pipelines-spark-airflow',
      title: 'Data Modeling, Spark, Airflow & Kafka',
      description: 'Dimensional Modeling, Apache Spark DataFrame transformations, Airflow DAGs, and Kafka streams.',
      order: 2,
      topics: [
        {
          id: 'de-t1-data-pipelines',
          title: 'ETL/ELT Architecture, Dimensional Modeling, Spark & Airflow',
          description: 'Fact/Dimension tables, Spark distributed processing, Airflow DAG orchestration, and Kafka message streaming.',
          priority: 'core',
          estimatedHours: 8,
          tags: ['etl', 'spark', 'airflow', 'kafka', 'data-modeling'],
          learningItems: [
            { id: 'de-li-1', title: 'ETL (Extract-Transform-Load) vs ELT (Extract-Load-Transform in modern cloud data warehouses like Snowflake/BigQuery)', type: 'concept' },
            { id: 'de-li-2', title: 'Dimensional Modeling: Star Schema vs Snowflake Schema, Fact Tables, Dimension Tables, Slowly Changing Dimensions (SCD Type 1 vs Type 2)', type: 'concept' },
            { id: 'de-li-3', title: 'Apache Spark Architecture: Driver, Executors, Resilient Distributed Datasets (RDDs), Spark DataFrames, and Catalyst Optimizer', type: 'concept' },
            { id: 'de-li-4', title: 'Workflow Orchestration with Apache Airflow: DAGs, Operators, Tasks, Scheduling, Retries, and Backfilling', type: 'implementation' },
            { id: 'de-li-5', title: 'Streaming Data with Apache Kafka: Topics, Partitions, Offset tracking, Consumer Groups, and At-Least-Once delivery semantics', type: 'concept' },
            { id: 'de-li-6', title: 'Data Quality & Governance: Schema enforcement, Great Expectations validation, and Data Lineage tracking', type: 'concept' },
          ],
          practice: [
            { id: 'de-pr-1', title: 'Build Automated End-to-End ETL Pipeline in PySpark & Airflow', description: 'Write a PySpark script to ingest raw JSON logs, aggregate metrics by user dimension, and orchestrate with an Airflow DAG.', difficulty: 'hard', type: 'coding' },
          ],
          assessments: [
            { id: 'de-as-1', question: 'Explain the difference between Slowly Changing Dimension Type 1 (overwrite) and Type 2 (historical versioning with effective dates).', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
  ],
};

// 9. MLOps Foundation Pack
export const mlopsFoundationPack = {
  id: 'pack-mlops-foundation',
  slug: 'mlops-foundation',
  title: 'MLOps Foundation',
  category: 'Domain Foundations',
  difficulty: 'Intermediate to Advanced',
  priority: 'High',
  estimatedHours: 50,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-15',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Operationalizing machine learning models in production: Experiment tracking with MLflow, Data versioning (DVC), Model packaging, CI/CD for ML (CT/CD), Model Serving (FastAPI/Triton), and Model/Data Drift Monitoring.',
  targetUsers: 'Machine Learning Engineers, Data Scientists, and DevOps Engineers bridging the gap between ML models and production systems.',
  prerequisites: ['Python, basic Machine Learning, and Docker basics'],
  tags: ['mlops', 'mlflow', 'dvc', 'model-serving', 'model-monitoring', 'drift', 'docker'],
  relatedPacks: ['pack-data-ai-foundations', 'pack-cloud-devops-foundation'],
  relatedTemplates: ['mlops-engineer', 'ai-ml-engineer'],
  careerRelevance: 'Eliminates the "it works on my Jupyter Notebook" bottleneck by automating model deployment and monitoring.',
  learningOutcomes: [
    'Track machine learning experiments, hyperparameters, and artifacts automatically with MLflow',
    'Version large datasets and trained model weights using Data Version Control (DVC)',
    'Deploy high-throughput model inference endpoints using FastAPI, TorchServe, or Triton Inference Server',
    'Detect Data Drift (Covariate Shift) and Concept Drift in production with statistical distribution metrics',
  ],
  subjects: [
    {
      id: 'mlops-s1-lifecycle-serving-monitoring',
      title: 'ML Lifecycle, Experiment Tracking, Serving & Drift Monitoring',
      description: 'MLflow, DVC data versioning, Containerized Model Serving, and Production Drift Detection.',
      order: 1,
      topics: [
        {
          id: 'mlops-t1-mlops-architecture',
          title: 'The Production ML Lifecycle: Tracking, Serving & Observability',
          description: 'MLflow tracking, Model Registry, FastAPI/Docker model serving, and Data Drift (Evidently AI / KS-test).',
          priority: 'core',
          estimatedHours: 8,
          tags: ['mlops', 'mlflow', 'serving', 'drift-monitoring'],
          learningItems: [
            { id: 'mlops-li-1', title: 'The MLOps Lifecycle: Data Preparation -> Experiment Tracking -> Model Registry -> Continuous Training (CT) -> Model Serving -> Production Monitoring', type: 'concept' },
            { id: 'mlops-li-2', title: 'Experiment Tracking with MLflow: logging metrics, hyperparameters, models, and transition stages (Staging -> Production)', type: 'implementation' },
            { id: 'mlops-li-3', title: 'Data and Model Versioning using DVC (Data Version Control) with remote cloud storage backends', type: 'implementation' },
            { id: 'mlops-li-4', title: 'Model Serving Architectures: Real-time REST endpoints (FastAPI / Triton) vs Batch inference pipelines vs Embedded on-device models', type: 'concept' },
            { id: 'mlops-li-5', title: 'Detecting Data Drift (Kolmogorov-Smirnov test, PSI) and Concept Drift in production data streams', type: 'concept' },
            { id: 'mlops-li-6', title: 'Automated Model Retraining Triggers: performance threshold alerts vs scheduled time windows', type: 'concept' },
          ],
          practice: [
            { id: 'mlops-pr-1', title: 'Deploy ML Model with MLflow Tracking and Drift Detection', description: 'Log model training to MLflow, register candidate model, deploy containerized API, and implement automated drift check.', difficulty: 'hard', type: 'coding' },
          ],
          assessments: [
            { id: 'mlops-as-1', question: 'What is the difference between Data Drift (Covariate Shift) and Concept Drift? How do you detect each in production?', difficulty: 'hard', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
