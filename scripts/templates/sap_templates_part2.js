// scripts/templates/sap_templates_part2.js
// Comprehensive Curriculum Definitions for SAP Technical, Cloud & Functional Templates

import { buildLevel, buildSubject, buildTopic, buildTemplate } from './template_helpers.js';

// ============================================================================
// 5. SAP S/4HANA CONSULTANT / DEVELOPER
// ============================================================================
export function generateSapS4HanaTemplate() {
  return buildTemplate({
    id: 'sap-s4hana-consultant',
    name: 'SAP S/4HANA Consultant / Developer',
    title: 'SAP S/4HANA Consultant / Developer',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '7-9 months',
    estimatedHours: 420,
    targetRoles: ['SAP S/4HANA Lead Consultant', 'S/4HANA Solution Architect', 'SAP Techno-Functional Consultant'],
    prerequisites: ['Basic ERP knowledge', 'General understanding of enterprise finance & logistics'],
    technologies: ['SAP S/4HANA', 'Universal Journal (ACDOCA)', 'Business Partner', 'Clean Core', 'In-App Extensibility', 'Side-by-Side Extensibility', 'Embedded Analytics', 'Fiori Architecture'],
    description: 'Mastery of SAP S/4HANA architecture, simplified data structures, Universal Journal, Business Partner concept, cross-functional module integration (FI, CO, MM, SD, PP, EWM), Clean Core extensibility paradigm, and migration cockpit.',
    levels: [
      buildLevel({
        id: 's4-l0',
        order: 0,
        title: 'Level 0 — S/4HANA Architecture & Simplified Data Model',
        description: 'Evolution to in-memory computing, table elimination (BSIS, BSAS, BSEG -> ACDOCA, MATDOC), and architectural principles.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 's4-l0-s1',
            title: 'S/4HANA Core Data Model',
            topics: [
              buildTopic({
                id: 's4-l0-t1',
                title: 'In-Memory Computing & Table Reductions',
                description: 'Understand how HANA column store enabled table elimination, aggregate removal, and real-time processing.',
                subtopics: [
                  'Traditional ERP Aggregate and Index Tables vs S/4HANA Columnar Architecture',
                  'Universal Journal Table (ACDOCA): Merging FI and CO Single Source of Truth',
                  'Material Document Table (MATDOC): Simplifying Inventory Management',
                  'Simplification List & Release Differences across S/4HANA Versions (2020, 2021, 2022, 2023)',
                  'Compatibility Views & Redirects for Legacy Custom Code',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 's4-l1',
        order: 1,
        title: 'Level 1 — Business Partner & Master Data Harmonization',
        description: 'Customer-Vendor Integration (CVI), central Business Partner data model, and credit management.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 's4-l1-s1',
            title: 'Central Business Partner (BP) Approach',
            topics: [
              buildTopic({
                id: 's4-l1-t1',
                title: 'Business Partner Architecture & CVI Migration',
                description: 'Configure Business Partner categories, roles, groupings, and synchronization with FI/SD/MM.',
                subtopics: [
                  'Business Partner Concept: Person, Organization, Group',
                  'BP Roles: FLCU00/FLCU01 (Customer), FLVN00/FLVN01 (Supplier), General Roles',
                  'Customer Vendor Integration (CVI) Synchronization Direction & Post-Processing Office (PPO)',
                  'Credit Management in S/4HANA (FSCM Integration vs Classic FI-AR Credit Check)',
                  'Product Master (Material Master) S/4HANA Enhancements (40-Character Material Number)',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 's4-l2',
        order: 2,
        title: 'Level 2 — End-to-End Enterprise Module Integration',
        description: 'Cross-functional touchpoints: Record-to-Report (FI/CO), Procure-to-Pay (MM/FI), Order-to-Cash (SD/FI), Plan-to-Produce (PP/MM).',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 's4-l2-s1',
            title: 'Cross-Functional Business Process Flows',
            topics: [
              buildTopic({
                id: 's4-l2-t1',
                title: 'Record-to-Report & Order-to-Cash Integration',
                description: 'Understand end-to-end accounting flows from sales orders, billing documents, goods movements to General Ledger.',
                subtopics: [
                  'Order-to-Cash (O2C): Sales Order -> Availability Check -> Outbound Delivery -> PGI -> Billing -> FI Posting',
                  'Record-to-Report (R2R): General Ledger, Accounts Payable, Accounts Receivable, Asset Accounting, Profitability Analysis (CO-PA)',
                  'Plan-to-Produce (P2P): Production Orders, BOM Explosion, Routing, Confirmation, Settlement',
                  'Extended Warehouse Management (EWM) & Transportation Management (TM) Embedded in S/4HANA',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 's4-l3',
        order: 3,
        title: 'Level 3 — Clean Core Strategy & Extensibility Paradigms',
        description: 'Modern SAP Extensibility: Clean Core, Key-User In-App Extensibility, Developer Extensibility, and Side-by-Side on BTP.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 's4-l3-s1',
            title: 'Modern S/4HANA Extensibility Matrix',
            topics: [
              buildTopic({
                id: 's4-l3-t1',
                title: 'Clean Core, In-App & Side-by-Side Extensibility on BTP',
                description: 'Implement upgrades without friction using released APIs, custom fields, and BTP extensions.',
                subtopics: [
                  'The Clean Core Principle: Zero Direct Modifications to SAP Core Code',
                  'Key-User In-App Extensibility: Custom Fields & Logic App, Custom CDS Views, Custom Business Objects',
                  'Developer Extensibility (Embedded Steampunk / ABAP Cloud): Restricted ABAP Syntax & Released APIs',
                  'Side-by-Side Extensibility on SAP BTP: CAP, RAP, Event-Driven Decoupling via Event Mesh',
                  'Choosing the Right Extensibility Model for Business Scenarios',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 's4-l4',
        order: 4,
        title: 'Level 4 — Migration Cockpit & Transition Scenarios',
        description: 'Transition strategies: System Conversion (Brownfield), New Implementation (Greenfield), Selective Data Transition (Bluefield).',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 's4-l4-s1',
            title: 'S/4HANA Migration & Conversion',
            topics: [
              buildTopic({
                id: 's4-l4-t1',
                title: 'SAP Readiness Check & Migration Cockpit (LTMC / Fiori App)',
                description: 'Execute readiness assessments, custom code remediation, and staging table data migrations.',
                subtopics: [
                  'Transition Paths: Greenfield (New Implementation) vs Brownfield (System Conversion) vs Bluefield',
                  'SAP Readiness Check for S/4HANA: Financial Data Quality, Add-On Compatibility, Recommended Fiori Apps',
                  'Custom Code Migration App & ABAP Test Cockpit (ATC) for S/4HANA Readiness Checks',
                  'SAP S/4HANA Migration Cockpit (Migrate Your Data Fiori App): Staging Tables, Direct Extraction from SAP',
                  'Financial Data Reconciliation & Migration to ACDOCA',
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
// 6. SAP BTP DEVELOPER
// ============================================================================
export function generateSapBtpTemplate() {
  return buildTemplate({
    id: 'sap-btp-developer',
    name: 'SAP BTP Developer (Business Technology Platform)',
    title: 'SAP BTP Developer (Business Technology Platform)',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-8 months',
    estimatedHours: 360,
    targetRoles: ['SAP BTP Cloud Developer', 'BTP Solution Architect', 'SAP Cloud Platform Engineer'],
    prerequisites: ['Cloud computing basics', 'REST & Node.js/Java awareness'],
    technologies: ['SAP BTP', 'Cloud Foundry', 'Kyma (Kubernetes)', 'Destinations', 'Connectivity Service', 'Cloud Connector', 'HTML5 Application Repository', 'cTMS', 'SAP Build'],
    description: 'Architecting and developing cloud-native extensions on SAP Business Technology Platform (BTP). Global accounts, subaccounts, Cloud Foundry, Kyma runtime, Connectivity Service, Destinations, Cloud Connector, Approuter, Multi-Target Applications (MTA), Security (XSUAA/IAS), and DevOps.',
    levels: [
      buildLevel({
        id: 'btp-l0',
        order: 0,
        title: 'Level 0 — BTP Hierarchy, Subaccounts & Entitlements',
        description: 'Global Accounts, Directories, Subaccounts, Regions, Commercial Models (CPEA, Pay-As-You-Go), and Quotas.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'btp-l0-s1',
            title: 'Account Administration & Governance',
            topics: [
              buildTopic({
                id: 'btp-l0-t1',
                title: 'BTP Account Hierarchy & Resource Management',
                description: 'Configure enterprise global accounts, subaccounts, spaces, and entitlement allocations.',
                subtopics: [
                  'BTP Account Model: Global Account -> Directories -> Subaccounts -> Spaces/Namespaces',
                  'Hyperscaler Regions (AWS, Azure, GCP) & Service Availability',
                  'Commercial Models: Consumption-Based (CPEA, Pay-As-You-Go) vs Subscription Model',
                  'Managing Entitlements & Service Plans Allocation across Subaccounts',
                  'BTP CLI (btp tool) for Automated Scripting and Account Provisioning',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'btp-l1',
        order: 1,
        title: 'Level 1 — Cloud Foundry & Kyma Runtime Environments',
        description: 'Multi-runtime architecture: Cloud Foundry environment, Kyma (Managed Kubernetes) runtime, and ABAP Environment.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'btp-l1-s1',
            title: 'Runtimes & Container Orchestration',
            topics: [
              buildTopic({
                id: 'btp-l1-t1',
                title: 'Cloud Foundry vs Kyma Runtime Environments',
                description: 'Deploy microservices, manage buildpacks, scale instances, and work with Kubernetes manifests in Kyma.',
                subtopics: [
                  'Cloud Foundry Architecture: Orgs, Spaces, Droplets, Buildpacks, Memory Quotas',
                  'Cloud Foundry CLI (cf push, cf scale, cf logs, cf env)',
                  'Kyma Environment: Managed Kubernetes, Istio Service Mesh, Serverless Functions, Microservices',
                  'Containerization: Dockerizing Custom Workloads & Deploying to Kyma via Helm/kubectl',
                  'SAP BTP ABAP Environment (Steampunk): Cloud ABAP Runtime on BTP',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'btp-l2',
        order: 2,
        title: 'Level 2 — Connectivity, Destinations & Cloud Connector',
        description: 'Secure hybrid connectivity: SAP Cloud Connector, BTP Connectivity Service, Destinations, and Principal Propagation.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'btp-l2-s1',
            title: 'Hybrid Cloud Connectivity',
            topics: [
              buildTopic({
                id: 'btp-l2-t1',
                title: 'Cloud Connector & Destination Configuration',
                description: 'Connect BTP applications securely to on-premise SAP S/4HANA, ECC, and databases without inbound firewall ports.',
                subtopics: [
                  'SAP Cloud Connector Installation, Pairing with BTP Subaccount & Resource Whitelisting',
                  'BTP Connectivity Service & Destination Service Binding in Cloud Foundry / Kyma',
                  'Destination Types: HTTP, RFC, Mail; Proxy Types: Internet vs OnPremise',
                  'Authentication Methods: Basic, OAuth2ClientCredentials, PrincipalPropagation (SSO)',
                  'Calling Destinations programmatically using @sap-cloud-sdk/connectivity',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'btp-l3',
        order: 3,
        title: 'Level 3 — Security, Identity & Multi-Target Applications (MTA)',
        description: 'Identity Authentication Service (IAS), XSUAA service, role collections, Approuter, and MTA descriptor (mta.yaml).',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'btp-l3-s1',
            title: 'BTP Security & Multi-Target Applications',
            topics: [
              buildTopic({
                id: 'btp-l3-t1',
                title: 'XSUAA, IAS, Approuter & MTA Deployment',
                description: 'Implement zero-trust security and deploy full-stack applications with Cloud MTA Build Tool.',
                subtopics: [
                  'SAP Cloud Identity Services: Identity Authentication (IAS) & Identity Provisioning (IPS)',
                  'BTP XSUAA Service (xs-security.json): Scopes, Role Templates, Role Collections',
                  'Application Router (@sap/approuter): Reverse Proxy, CSRF Handling, Authentication Flow',
                  'Multi-Target Application Architecture (mta.yaml): Modules, Resources, Parameters, Requires/Provides',
                  'Building and Deploying MTA Archives (.mtar) using Cloud MTA Build Tool (mbt) and cf deploy',
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
// 7. SAP CAP DEVELOPER
// ============================================================================
export function generateSapCapTemplate() {
  return buildTemplate({
    id: 'sap-cap-developer',
    name: 'SAP CAP Developer (Cloud Application Programming Model)',
    title: 'SAP CAP Developer (Cloud Application Programming Model)',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-8 months',
    estimatedHours: 350,
    targetRoles: ['SAP CAP Developer', 'Full-Stack SAP Cloud Engineer', 'BTP Backend Developer'],
    prerequisites: ['JavaScript/Node.js or Java', 'Basic SQL & REST concepts'],
    technologies: ['SAP CAP', 'CDS (Core Data Services)', 'Node.js', 'Java SDK', 'SAP HANA Cloud', 'SQLite', 'OData V4', 'Fiori Elements', 'BTP Cloud Foundry'],
    description: 'Enterprise backend development with SAP Cloud Application Programming Model (CAP). Core Data Services (CDS) modeling, custom event handlers (before/on/after), persistence on SQLite & HANA Cloud, external service integration via SAP Cloud SDK, security annotations, and Fiori frontends.',
    levels: [
      buildLevel({
        id: 'cap-l0',
        order: 0,
        title: 'Level 0 — CAP Architecture, CLI & CDS Modeling',
        description: 'CAP philosophy (convention over configuration), CDS language, entities, types, associations, and compositions.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'cap-l0-s1',
            title: 'CDS Data Modeling & Service Definitions',
            topics: [
              buildTopic({
                id: 'cap-l0-t1',
                title: 'Core Data Services (CDS) & Entity Relations',
                description: 'Define domain models, managed aspects (cuid, managed), associations, and compositions in schema.cds.',
                subtopics: [
                  'CAP Architecture: Separation of Domain Data Model, Service Definitions, and Custom Logic',
                  '@sap/cds-dk CLI Setup & Project Scaffolding (cds init, cds watch)',
                  'Defining Entities, Custom Types, Enums & Built-in Types in schema.cds',
                  'Built-in Aspects: cuid (UUID keys), managed (createdAt, createdBy, modifiedAt), temporal',
                  'Associations (1:1, 1:N) vs Compositions (Parent-Child Lifecycle Coupling)',
                  'Service Definitions in srv/cat-service.cds & OData Service Expositions',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'cap-l1',
        order: 1,
        title: 'Level 1 — Custom Handlers, Events & Business Logic',
        description: 'Implementing server logic: Custom handlers (before, on, after), CQL (Core Query Language), and custom actions/functions.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'cap-l1-s1',
            title: 'Node.js / Java Event Handlers & CQL',
            topics: [
              buildTopic({
                id: 'cap-l1-t1',
                title: 'Event Handling Lifecycle & CQL Database Operations',
                description: 'Implement validation, enrichments, custom CRUD handlers, and custom actions/functions.',
                subtopics: [
                  'Service Event Handlers: srv.before(), srv.on(), srv.after() for READ, CREATE, UPDATE, DELETE',
                  'Core Query Language (CQL): SELECT, INSERT, UPDATE, UPSERT, DELETE programmatically',
                  'Custom Actions (Side-Effect Modifiers) and Custom Functions (Read-Only Computations)',
                  'Input Validation, Data Sanitization & Rejecting Requests with req.error() / req.reject()',
                  'Handling Draft-Enabled Entities & Side-Effects in CAP',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'cap-l2',
        order: 2,
        title: 'Level 2 — Persistence, HANA Cloud & External Services',
        description: 'Database deployment on SQLite (local) and SAP HANA Cloud (production), HDI containers, and consuming external S/4HANA APIs.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'cap-l2-s1',
            title: 'HANA Cloud & External Integrations',
            topics: [
              buildTopic({
                id: 'cap-l2-t1',
                title: 'SAP HANA Cloud Deployment & External S/4HANA Integration',
                description: 'Deploy HDI containers with cds-deploy and integrate remote OData services using CDS external imports.',
                subtopics: [
                  'Local Development with In-Memory SQLite vs Persistent SQLite',
                  'SAP HANA Cloud Configuration: HDI Containers & @sap/hana-client',
                  'Deploying Schema to HANA: cds deploy --to hana',
                  'Importing External S/4HANA OData Services (cds import api.edmx)',
                  'Connecting to External Services with cds.connect.to() and Destination Service',
                  'Authentication & Authorization with @requires and @restrict Annotations',
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
// 8. SAP RAP DEVELOPER
// ============================================================================
export function generateSapRapTemplate() {
  return buildTemplate({
    id: 'sap-rap-developer',
    name: 'SAP RAP Developer (ABAP RESTful Application Programming Model)',
    title: 'SAP RAP Developer (ABAP RESTful Application Programming Model)',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-8 months',
    estimatedHours: 360,
    targetRoles: ['SAP RAP Developer', 'Modern ABAP Cloud Engineer', 'S/4HANA Backend Architect'],
    prerequisites: ['ABAP fundamentals', 'Core Data Services (CDS) basics'],
    technologies: ['SAP RAP', 'ABAP Cloud', 'ABAP Development Tools (ADT)', 'CDS Views', 'Behavior Definitions (BDEF)', 'Behavior Implementations', 'EML', 'Draft Handling', 'OData V4', 'Fiori Elements'],
    description: 'State-of-the-art backend architecture on S/4HANA and ABAP Cloud using RAP. CDS data modeling, interface/projection views, Behavior Definitions (BDEF), Behavior Implementations (ABAP OO), Managed vs Unmanaged scenarios, Draft capability, EML (Entity Manipulation Language), Actions, Determinations, Validations, and OData V4 service bindings.',
    levels: [
      buildLevel({
        id: 'rap-l0',
        order: 0,
        title: 'Level 0 — RAP Architecture & CDS Data Modeling',
        description: 'RAP evolution, Interface Views (R_View), Projection Views (C_View), associations, compositions, and semantic annotations.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'rap-l0-s1',
            title: 'RAP Layers & Core Data Services',
            topics: [
              buildTopic({
                id: 'rap-l0-t1',
                title: 'RAP Architectural Layers & CDS Views Hierarchy',
                description: 'Build robust data models with CDS Basic/Interface views and consumption projection views in Eclipse ADT.',
                subtopics: [
                  'Evolution: Classic ABAP -> BOPF -> ABAP Programming Model for SAP Fiori -> SAP RAP',
                  'RAP Big Picture: Data Model (CDS), Behavior Definition, Business Logic, Service Definition, Service Binding',
                  'Defining CDS Interface / Root Views (define root view entity R_TravelTP)',
                  'Compositions of Children Entities (Parent-Child Tree) & Associations to Master Data',
                  'CDS Consumption / Projection Views (define root view entity C_TravelTP as projection on R_TravelTP)',
                  'UI Annotations in CDS Views & Metadata Extensions (.ddlx files)',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'rap-l1',
        order: 1,
        title: 'Level 1 — Behavior Definitions & Implementations (BDEF / EML)',
        description: 'Behavior Definitions: Managed vs Unmanaged scenarios, Operations (create, update, delete), Actions, Determinations, Validations, and EML.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'rap-l1-s1',
            title: 'Behavior Modeling & Entity Manipulation Language (EML)',
            topics: [
              buildTopic({
                id: 'rap-l1-t1',
                title: 'Managed Scenarios, Validations, Determinations & Actions',
                description: 'Author managed behaviors and implement custom business logic in Local Handler classes (LCL_HANDLER).',
                subtopics: [
                  'Managed Behavior Definition: Framework-Handled Standard CRUD vs Unmanaged (Legacy BAPI Integration)',
                  'Determinations: Triggering Automatic Computations (on modify, on save)',
                  'Validations: Enforcing Business Rules (on save) with REPORTED and FAILED response structures',
                  'Custom Actions: Non-Standard Operations (e.g. approveTravel, calculateDiscount)',
                  'Entity Manipulation Language (EML): MODIFY ENTITIES, READ ENTITIES, COMMIT ENTITIES in ABAP',
                  'Draft Handling: Enabling Draft Capabilities for Long-Running Web Transactions & Auto-Save',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'rap-l2',
        order: 2,
        title: 'Level 2 — Service Definitions, Bindings & Fiori Elements Integration',
        description: 'Exposing RAP business objects: Service Definitions, Service Bindings (OData V4 UI / Web API), and Fiori Elements apps.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'rap-l2-s1',
            title: 'Service Exposure & Fiori Elements',
            topics: [
              buildTopic({
                id: 'rap-l2-t1',
                title: 'Service Definition, Service Binding & Fiori Elements App Generation',
                description: 'Publish OData V4 services in ADT, test with Fiori Elements Preview, and build List Report / Object Page apps.',
                subtopics: [
                  'Service Definition: Exposing Projection Views as a Cohesive Business Service',
                  'Service Binding: Binding Types (OData V4 - UI, OData V4 - Web API, OData V2 - UI)',
                  'Publishing Services Locally in ADT & Testing via Fiori Elements App Preview',
                  'Implementing Value Helps & Value List Annotations in RAP',
                  'Side Effects in RAP: Refreshing Dependent Fields on User Input',
                  'Authorization Control in RAP: Instance-Based vs Master Authorization (authorization:update)',
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
// 9. SAP ABAP DEVELOPER
// ============================================================================
export function generateSapAbapTemplate() {
  return buildTemplate({
    id: 'sap-abap-developer',
    name: 'SAP ABAP Developer',
    title: 'SAP ABAP Developer',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-9 months',
    estimatedHours: 400,
    targetRoles: ['SAP ABAP Developer', 'ABAP Cloud Engineer', 'SAP Technical Consultant'],
    prerequisites: ['Basic programming fundamentals', 'Relational database concepts'],
    technologies: ['ABAP', 'ABAP OO', 'ABAP Cloud', 'Eclipse ADT', 'Open SQL', 'CDS Views', 'AMDP', 'BAdIs', 'ALV Grid', 'SAP NetWeaver'],
    description: 'Comprehensive ABAP engineering curriculum. Covers procedural and Object-Oriented ABAP, Data Dictionary, modern Open SQL syntax, CDS Views, ABAP Managed Database Procedures (AMDP), Enhancement Framework (BAdIs, User Exits), ALV Grid, and modern ABAP Cloud syntax rules.',
    levels: [
      buildLevel({
        id: 'abap-l0',
        order: 0,
        title: 'Level 0 — ABAP Core & Data Dictionary (DDIC)',
        description: 'Syntax fundamentals, elementary types, structures, internal tables, and Data Dictionary objects (Tables, Views, Data Elements).',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'abap-l0-s1',
            title: 'Data Dictionary & Internal Tables',
            topics: [
              buildTopic({
                id: 'abap-l0-t1',
                title: 'Data Dictionary (SE11) & ABAP Data Types',
                description: 'Build robust database tables, data elements, domains, structures, and search helps.',
                subtopics: [
                  'Data Dictionary Objects: Domains, Data Elements, Structures, Database Tables (SE11)',
                  'Primary Keys, Foreign Key Relationships & Value Tables',
                  'Elementary Data Types, Variables & String Manipulation in ABAP',
                  'Internal Tables: Standard Tables, Sorted Tables, Hashed Tables & Performance Trade-Offs',
                  'Table Operations: APPEND, INSERT, MODIFY, DELETE, READ TABLE with Keys, LOOP AT ... ASSIGNING FIELD-SYMBOLS',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'abap-l1',
        order: 1,
        title: 'Level 1 — Object-Oriented ABAP (ABAP OO) & Clean ABAP',
        description: 'Classes, interfaces, inheritance, polymorphism, design patterns, exception handling, and Clean ABAP guidelines.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'abap-l1-s1',
            title: 'Object-Oriented Programming in ABAP',
            topics: [
              buildTopic({
                id: 'abap-l1-t1',
                title: 'ABAP OO Classes, Interfaces & Clean ABAP',
                description: 'Master global and local classes (SE24/ADT), interfaces, polymorphism, and Clean ABAP principles.',
                subtopics: [
                  'Global Classes (CLAS) & Interfaces (INTF) in Eclipse ADT',
                  'Visibility Sections: PUBLIC, PROTECTED, PRIVATE',
                  'Constructors, Class-Methods vs Instance-Methods',
                  'Inheritance, Method Redefinition (Polymorphism) and Abstract Classes',
                  'Class-Based Exception Handling (TRY ... CATCH cx_root ... ENDTRY)',
                  'Clean ABAP Guidelines: Method Length, Expression-Based Syntax, Constructor Operators (NEW, VALUE, CORRESPONDING, COND, REDUCE)',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'abap-l2',
        order: 2,
        title: 'Level 2 — Modern Open SQL, CDS Views & AMDP',
        description: 'Modern Open SQL expressions, Core Data Services (CDS), and ABAP Managed Database Procedures (AMDP) in HANA.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'abap-l2-s1',
            title: 'Database Access & Code Pushdown',
            topics: [
              buildTopic({
                id: 'abap-l2-t1',
                title: 'Modern Open SQL, CDS Views & AMDP Execution',
                description: 'Leverage SAP HANA code pushdown with modern Open SQL joins, CDS views, and AMDP SQLScript methods.',
                subtopics: [
                  'Modern Open SQL Syntax: Comma-Separated Columns, Host Variables (@), Inline Declarations (DATA(...))',
                  'SQL Expressions: CASE, COALESCE, String/Math Functions, Subqueries, Left/Inner Joins',
                  'Core Data Services (CDS Views) in ADT: Calculations, Joins, Associations, Annotations',
                  'ABAP Managed Database Procedures (AMDP): Writing SQLScript directly inside ABAP Class Methods',
                  'ABAP Test Cockpit (ATC) & Performance Profiling (SAT / ST05 Trace Analysis)',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'abap-l3',
        order: 3,
        title: 'Level 3 — Enhancements, BAdIs & Modern ABAP Cloud',
        description: 'Enhancement framework, BAdIs, User Exits, Enhancement Points, and transition to ABAP Cloud language version.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'abap-l3-s1',
            title: 'Enhancement Framework & ABAP Cloud',
            topics: [
              buildTopic({
                id: 'abap-l3-t1',
                title: 'BAdIs, Enhancement Points & ABAP Cloud Language Rules',
                description: 'Implement custom business logic non-invasively using modern BAdIs and ABAP Cloud strict syntax rules.',
                subtopics: [
                  'Business Add-Ins (BAdI): Classic BAdIs (SE18/SE19) vs New Enhancement Spot Kernel BAdIs',
                  'Explicit Enhancement Points & Implicit Enhancement Options',
                  'User Exits & Customer Exits (SMOD/CMOD) in Legacy Maintenance',
                  'ABAP Cloud Language Version: Restricted Syntax (No Direct DB Modifs on SAP Tables, No Dynpro, No Obsolete Statements)',
                  'Calling Released SAP APIs (C1 Release Contract) in ABAP Cloud',
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
// 10. SAP HANA DEVELOPER
// ============================================================================
export function generateSapHanaTemplate() {
  return buildTemplate({
    id: 'sap-hana-developer',
    name: 'SAP HANA Native Developer',
    title: 'SAP HANA Native Developer',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '5-7 months',
    estimatedHours: 320,
    targetRoles: ['SAP HANA Developer', 'HANA Database Engineer', 'SAP Data Modeler'],
    prerequisites: ['SQL fundamentals', 'Relational database architecture'],
    technologies: ['SAP HANA', 'HANA Cloud', 'SQLScript', 'Calculation Views', 'HDI Containers', 'SAP Business Application Studio (BAS)', 'Explain Plan', 'Database Explorer'],
    description: 'Native in-memory development on SAP HANA and SAP HANA Cloud. Columnar data storage, SQLScript procedures, Graphical Calculation Views, HDI (HANA Deployment Infrastructure) containers, performance tuning with Plan Visualizer, and security.',
    levels: [
      buildLevel({
        id: 'hana-l0',
        order: 0,
        title: 'Level 0 — HANA Architecture & Column Store Internals',
        description: 'In-memory engine, columnar vs row-based storage, compression techniques (dictionary, run-length), and persistence layer.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'hana-l0-s1',
            title: 'HANA In-Memory Engine',
            topics: [
              buildTopic({
                id: 'hana-l0-t1',
                title: 'HANA Engine Architecture & Columnar Storage Mechanics',
                description: 'Understand how column store, dictionary compression, and delta merge engines operate in RAM.',
                subtopics: [
                  'HANA Architecture: In-Memory Computing Engine, Persistence Layer, Log Volume, Data Volume',
                  'Column Store vs Row Store: When to use which, Cache Locality & SIMD Parallelism',
                  'Compression Algorithms: Dictionary Encoding, Prefix Encoding, Run-Length Encoding (RLE)',
                  'Delta Store vs Main Store & Delta Merge Process Operations',
                  'SAP HANA Cloud vs On-Premise SAP HANA 2.0 SPS Enterprise',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'hana-l1',
        order: 1,
        title: 'Level 1 — SQLScript & Calculation Views Modeling',
        description: 'Advanced SQLScript programming, graphical Calculation Views (Projection, Join, Aggregation, Star Schema), and HDI containers.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'hana-l1-s1',
            title: 'Data Modeling & SQLScript',
            topics: [
              buildTopic({
                id: 'hana-l1-t1',
                title: 'Calculation Views & Stored Procedures in BAS',
                description: 'Model dimensional and star schema calculation views and write high-performance SQLScript stored procedures.',
                subtopics: [
                  'Graphical Calculation Views: Projection, Join (Inner, Left, Referential), Aggregation Nodes',
                  'Star Schema Models & Dimensional Cube Calculation Views with Measures/Attributes',
                  'Calculated Columns, Input Parameters, Filter Expressions & Variables',
                  'SQLScript Fundamentals: Table Variables, Control Structures, Dynamic SQL, Stored Procedures, Functions',
                  'HANA Deployment Infrastructure (HDI Containers) & Synonyms (.hdbsynonym) for Cross-Schema Access',
                  'Plan Visualizer & EXPLAIN PLAN Analysis for Eliminating Expensive Full-Table Scans',
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
// 11. SAP ODATA & GATEWAY DEVELOPER
// ============================================================================
export function generateSapODataTemplate() {
  return buildTemplate({
    id: 'sap-odata-developer',
    name: 'SAP OData & Gateway Developer',
    title: 'SAP OData & Gateway Developer',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate',
    estimatedDuration: '4-6 months',
    estimatedHours: 250,
    targetRoles: ['SAP Gateway Developer', 'SAP OData Engineer', 'SAP Integration Specialist'],
    prerequisites: ['ABAP fundamentals', 'REST & HTTP understanding'],
    technologies: ['SAP Gateway (SEGW)', 'OData V2', 'OData V4', 'SAP NetWeaver', 'ABAP DPC/MPC Classes', 'OData Batch', 'Service Registration (/IWFND/MAINT_SERVICE)'],
    description: 'Deep dive into building and consuming enterprise OData services via SAP Gateway. SEGW Service Builder, Data Provider Class (DPC_EXT), Model Provider Class (MPC_EXT), CRUDQ operations, deep entities, batch processing, and security.',
    levels: [
      buildLevel({
        id: 'odata-l0',
        order: 0,
        title: 'Level 0 — OData Protocol & SAP Gateway Architecture',
        description: 'OData protocol standards, SAP Gateway hub vs embedded deployment, Service Builder (SEGW), and metadata generation.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'odata-l0-s1',
            title: 'Gateway Architecture & Service Modeling',
            topics: [
              buildTopic({
                id: 'odata-l0-t1',
                title: 'Gateway Architecture & SEGW Model Definition',
                description: 'Define entity types, entity sets, properties, navigation properties, and associations in transaction SEGW.',
                subtopics: [
                  'OData Protocol Foundations (OASIS Standard, EDM - Entity Data Model)',
                  'SAP Gateway Hub Deployment vs Embedded Deployment Architecture',
                  'Service Builder (SEGW): Modeling Entity Types, Entity Sets, Associations & Navigation Properties',
                  'Model Provider Class (MPC/MPC_EXT) and Data Provider Class (DPC/DPC_EXT) Generation',
                  'Service Registration & Activation via /IWFND/MAINT_SERVICE',
                  'Gateway Client (/IWFND/GW_CLIENT) for Testing HTTP GET, POST, PUT, DELETE',
                ],
              }),
            ],
          }),
        ],
      }),
      buildLevel({
        id: 'odata-l1',
        order: 1,
        title: 'Level 1 — DPC_EXT CRUDQ Operations & Performance',
        description: 'Implementing GetEntity (Read), GetEntitySet (Query), Create, Update, Delete, Deep Inserts, and $batch handling.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'odata-l1-s1',
            title: 'DPC_EXT Implementation & Query Options',
            topics: [
              buildTopic({
                id: 'odata-l1-t1',
                title: 'DPC_EXT Implementation, Filtering, Batching & Deep Inserts',
                description: 'Write ABAP logic in DPC_EXT to handle $filter, $select, $expand, $orderby, $top/$skip, and deep entity structures.',
                subtopics: [
                  'Implementing ENTITYSET_GET_ENTITYSET with Filter Strings (io_tech_request_context)',
                  'Implementing ENTITYSET_GET_ENTITY for Single Key Lookups',
                  'Implementing CREATE_ENTITY, UPDATE_ENTITY & DELETE_ENTITY with ETag Validation',
                  'Handling Deep Entities (CREATE_DEEP_ENTITY) for Header-Item Structures (e.g. Sales Order + Items)',
                  'Batch Processing (CHANGESET_BEGIN, CHANGESET_PROCESS, CHANGESET_END) with Database Commits',
                  'Error Handling with /IWBEP/CX_MGW_BUSI_EXCEPTION and Message Containers',
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
// 12. SAP EVENT-DRIVEN ARCHITECTURE (EVENT MESH)
// ============================================================================
export function generateSapEventDrivenTemplate() {
  return buildTemplate({
    id: 'sap-event-driven-architecture',
    name: 'SAP Event-Driven Architecture (EDA) & Event Mesh',
    title: 'SAP Event-Driven Architecture (EDA) & Event Mesh',
    category: 'SAP Ecosystem',
    status: 'Growing',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '4-6 months',
    estimatedHours: 260,
    targetRoles: ['Event-Driven Solution Architect', 'SAP Cloud Integration Engineer', 'BTP Eventing Specialist'],
    prerequisites: ['Enterprise integration concepts', 'BTP & REST basics'],
    technologies: ['SAP Event Mesh', 'Advanced Event Mesh', 'CloudEvents', 'AMQP', 'MQTT', 'Webhooks', 'S/4HANA Business Events', 'Event-Driven Architecture'],
    description: 'Designing and building asynchronous event-driven architectures with SAP Event Mesh and Advanced Event Mesh. CloudEvents standards, S/4HANA business events, queues, topics, webhook consumers, idempotency, and high-throughput event streaming.',
    levels: [
      buildLevel({
        id: 'eda-l0',
        order: 0,
        title: 'Level 0 — Event-Driven Architecture & Event Mesh Core',
        description: 'Publish/Subscribe paradigms, CloudEvents specification, SAP Event Mesh service on BTP, and queue/topic design.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'eda-l0-s1',
            title: 'EDA Foundations & Event Mesh Service',
            topics: [
              buildTopic({
                id: 'eda-l0-t1',
                title: 'Event-Driven Architecture & SAP Event Mesh Configuration',
                description: 'Configure Event Mesh instances, queues, topic subscriptions, and understand asynchronous decoupling.',
                subtopics: [
                  'Event-Driven Architecture (EDA) vs Synchronous Request-Response Topologies',
                  'CloudEvents Specification (JSON format, id, source, type, time, data)',
                  'SAP Event Mesh on BTP: Service Plans (default, subaccount), Management UI',
                  'Queue Definitions, Queue Subscriptions to Topic Patterns (e.g. sap/s4/ce/*)',
                  'Publishing Events from S/4HANA using SAP Enterprise Event Enablement (/IWXBE/CONFIG)',
                  'Consuming Events via Webhooks, AMQP, and REST APIs',
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
// 13. SAP ANALYTICS CLOUD & DATASPHERE
// ============================================================================
export function generateSapAnalyticsTemplate() {
  return buildTemplate({
    id: 'sap-analytics-cloud',
    name: 'SAP Analytics Cloud & Datasphere Consultant',
    title: 'SAP Analytics Cloud & Datasphere Consultant',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate',
    estimatedDuration: '5-7 months',
    estimatedHours: 300,
    targetRoles: ['SAP Analytics Consultant', 'SAC Developer', 'SAP Data Fabric Architect', 'BI Specialist'],
    prerequisites: ['Data analysis fundamentals', 'SQL & reporting basics'],
    technologies: ['SAP Analytics Cloud (SAC)', 'SAP Datasphere', 'Data Modeling', 'Stories & Dashboards', 'Live Connections', 'Import Connections', 'Analytical Models'],
    description: 'Enterprise analytics, business intelligence, and planning with SAP Analytics Cloud (SAC) and SAP Datasphere. Live/Import connections to S/4HANA and HANA, Story design, calculations, planning models, Datasphere Spaces, Data Builder, and Business Builder.',
    levels: [
      buildLevel({
        id: 'sac-l0',
        order: 0,
        title: 'Level 0 — SAC Architecture, Data Models & Stories',
        description: 'SAC overview, Live vs Import data connections, Model creation, Dimensions, Measures, and responsive Story design.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'sac-l0-s1',
            title: 'Data Modeling & Dashboard Design in SAC',
            topics: [
              buildTopic({
                id: 'sac-l0-t1',
                title: 'SAC Data Connections, Models & Interactive Stories',
                description: 'Build live connections to S/4HANA CDS views and create interactive dashboards with charts and tables.',
                subtopics: [
                  'SAP Analytics Cloud (SAC) Architecture & User Roles',
                  'Live Data Connections (S/4HANA, HANA, BW/4HANA) vs Import Data Connections',
                  'SAC Data Modeling: Dimensions (Generic, Organization, Date), Measures, Hierarchies',
                  'Story Design: Responsive Pages, Canvas Pages, Charts, Tables, Dynamic Text',
                  'Calculated Measures, Restricted Measures & Aggregation Formulas',
                  'SAP Datasphere Foundations: Spaces, Data Builder (Tables, Views), Business Builder (Analytical Datasets)',
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
// 14. SAP ARIBA CONSULTANT
// ============================================================================
export function generateSapAribaTemplate() {
  return buildTemplate({
    id: 'sap-ariba-consultant',
    name: 'SAP Ariba Sourcing & Procurement Consultant',
    title: 'SAP Ariba Sourcing & Procurement Consultant',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate',
    estimatedDuration: '5-7 months',
    estimatedHours: 280,
    targetRoles: ['SAP Ariba Consultant', 'Strategic Sourcing Lead', 'Ariba Procurement Specialist'],
    prerequisites: ['Procurement and sourcing fundamentals'],
    technologies: ['SAP Ariba', 'Ariba Sourcing', 'Ariba Buying & Invoicing', 'Ariba Network (SAP Business Network)', 'Cloud Integration Gateway (CIG / Managed Gateway)', 'S/4HANA Integration'],
    description: 'Mastery of strategic sourcing, supplier management, buying, and contract compliance with SAP Ariba and SAP Business Network. Integration with S/4HANA via SAP Integration Suite Managed Gateway for Spend&Network (CIG).',
    levels: [
      buildLevel({
        id: 'ariba-l0',
        order: 0,
        title: 'Level 0 — Ariba Modules & Sourcing Lifecycle',
        description: 'Strategic Sourcing, Contracts, Supplier Lifecycle & Performance (SLP), Buying & Invoicing, and SAP Business Network.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'ariba-l0-s1',
            title: 'Ariba Sourcing & Procurement Suite',
            topics: [
              buildTopic({
                id: 'ariba-l0-t1',
                title: 'Ariba Modules & S/4HANA CIG Integration',
                description: 'Understand Ariba strategic sourcing, guided buying, catalogs, and Managed Gateway integration.',
                subtopics: [
                  'SAP Ariba Solution Portfolio: Upstream (Sourcing, Contracts, SLP) vs Downstream (Buying, Invoicing)',
                  'Guided Buying: Requisitioning, Spot Buy, Approval Workflows, Catalogs',
                  'SAP Business Network (Ariba Network): Purchase Order Dispatch, PO Flip to Invoice, Advance Ship Notices (ASN)',
                  'SAP Integration Suite Managed Gateway for Spend&Network (formerly CIG) Integration with S/4HANA',
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
// 15. SAP SUCCESSFACTORS CONSULTANT
// ============================================================================
export function generateSapSuccessFactorsTemplate() {
  return buildTemplate({
    id: 'sap-successfactors-consultant',
    name: 'SAP SuccessFactors Human Experience Management (HXM) Consultant',
    title: 'SAP SuccessFactors Human Experience Management (HXM) Consultant',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate',
    estimatedDuration: '5-7 months',
    estimatedHours: 280,
    targetRoles: ['SAP SuccessFactors Consultant', 'HXM Specialist', 'HR Technology Architect'],
    prerequisites: ['HR business processes understanding'],
    technologies: ['SAP SuccessFactors', 'Employee Central', 'OData API', 'Integration Center', 'Business Rules', 'Role-Based Permissions (RBP)', 'People Analytics'],
    description: 'Human Experience Management (HXM) with SAP SuccessFactors. Employee Central core, Foundation Objects, Position Management, Role-Based Permissions (RBP), Business Rules Engine, Integration Center, and OData APIs.',
    levels: [
      buildLevel({
        id: 'sf-l0',
        order: 0,
        title: 'Level 0 — Employee Central & SuccessFactors HXM Architecture',
        description: 'Employee Central data model, MDF objects, Foundation Objects, Position Management, and Role-Based Permissions.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'sf-l0-s1',
            title: 'Employee Central Core & Integration Center',
            topics: [
              buildTopic({
                id: 'sf-l0-t1',
                title: 'Employee Central, Business Rules & Integration Center',
                description: 'Configure Employee Central master data, business rules, RBP security, and export data via Integration Center.',
                subtopics: [
                  'SuccessFactors HXM Architecture & Core Modules Overview',
                  'Employee Central: Foundation Objects (Legal Entity, Business Unit), Generic Objects (MDF)',
                  'Role-Based Permissions (RBP): Permission Groups, Permission Roles, Target Populations',
                  'SuccessFactors Business Rules Engine: Trigger Events (onChange, onSave, onInit)',
                  'Integration Center & SuccessFactors OData API for System Integrations',
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
// 16. SAP BUILD (LOW-CODE/NO-CODE)
// ============================================================================
export function generateSapBuildTemplate() {
  return buildTemplate({
    id: 'sap-build-developer',
    name: 'SAP Build (Low-Code/No-Code) Specialist',
    title: 'SAP Build (Low-Code/No-Code) Specialist',
    category: 'SAP Ecosystem',
    status: 'Growing',
    difficulty: 'Beginner to Intermediate',
    estimatedDuration: '3-5 months',
    estimatedHours: 200,
    targetRoles: ['SAP Build Developer', 'Citizen Developer Lead', 'Low-Code Enterprise Specialist'],
    prerequisites: ['Basic understanding of enterprise business applications'],
    technologies: ['SAP Build Apps', 'SAP Build Process Automation', 'SAP Build Work Zone', 'Business Rules', 'BTP Destinations'],
    description: 'Rapid application development and workflow automation with SAP Build. Build Apps (AppGyver), Build Process Automation (Workflows, Forms, RPA bots, Business Rules), and Build Work Zone digital experience hubs.',
    levels: [
      buildLevel({
        id: 'build-l0',
        order: 0,
        title: 'Level 0 — SAP Build Portfolio & Unified Experience',
        description: 'SAP Build Apps, SAP Build Process Automation, SAP Build Work Zone, and citizen development governance.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'build-l0-s1',
            title: 'SAP Build Suite & Visual Workflows',
            topics: [
              buildTopic({
                id: 'build-l0-t1',
                title: 'SAP Build Apps & Process Automation',
                description: 'Build web/mobile applications and automated approval workflows without writing complex code.',
                subtopics: [
                  'SAP Build Unified Low-Code Portfolio Overview',
                  'SAP Build Apps: Drag-and-Drop UI, Logic Canvas, Formulas, BTP Destination Integrations',
                  'SAP Build Process Automation: Designing Automated Workflow Processes, Approval Forms & Triggers',
                  'Business Rules Management & Decision Tables in Process Automation',
                  'SAP Build Work Zone: Standard and Advanced Digital Workplace Portals & Launchpad Sites',
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
// 17. SAP BUSINESS APPLICATION STUDIO (BAS)
// ============================================================================
export function generateSapBasTemplate() {
  return buildTemplate({
    id: 'sap-bas-developer',
    name: 'SAP Business Application Studio (BAS) Specialist',
    title: 'SAP Business Application Studio (BAS) Specialist',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Beginner to Intermediate',
    estimatedDuration: '2-3 months',
    estimatedHours: 120,
    targetRoles: ['SAP Cloud Tooling Specialist', 'SAP Full-Stack Developer'],
    prerequisites: ['Basic web & terminal literacy'],
    technologies: ['SAP Business Application Studio (BAS)', 'Dev Spaces', 'UI5 Tooling', 'CAP Tools', 'BTP CLI', 'Git', 'MTA Build Tool'],
    description: 'Mastering SAP Business Application Studio (BAS) as the standard enterprise cloud IDE on SAP BTP. Dev Space configurations, extension ecosystems, Git integration, local mock testing, and deployment to BTP.',
    levels: [
      buildLevel({
        id: 'bas-l0',
        order: 0,
        title: 'Level 0 — BAS Dev Spaces, Extensions & Cloud Development',
        description: 'Dev Space types (SAP Fiori, Full-Stack Cloud, SAP HANA), extensions, terminal, Git workflow, and deployment.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'bas-l0-s1',
            title: 'BAS Architecture & Tooling',
            topics: [
              buildTopic({
                id: 'bas-l0-t1',
                title: 'Dev Spaces, Extension Ecosystem & BTP Integration in BAS',
                description: 'Configure and optimize your cloud IDE environment for SAPUI5, CAP, and HANA development.',
                subtopics: [
                  'SAP Business Application Studio Architecture (Theia / VS Code Cloud Foundation)',
                  'Dev Space Profiles: SAP Fiori, Full-Stack Cloud Application (CAP), SAP HANA Native Modeling',
                  'Managing Extensions, Integrated Terminal, Node.js, and npm in Dev Spaces',
                  'Git Source Control Integration, Branching & Merge Conflicts in BAS',
                  'Connecting BAS to BTP Cloud Foundry Spaces & Service Bindings',
                  'Deploying Multi-Target Applications (MTA) directly from BAS to Cloud Foundry and Kyma',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
