// scripts/templates/sap_templates.js
// Comprehensive Curriculum Definitions for all SAP Ecosystem Master Templates

import { buildLevel, buildSubject, buildTopic, buildTemplate } from './template_helpers.js';

// ============================================================================
// 1. SAP FIORI / SAPUI5 DEVELOPER
// ============================================================================
export function generateSapFioriTemplate() {
  return buildTemplate({
    id: 'sap-fiori-developer',
    name: 'SAP Fiori / SAPUI5 Developer',
    title: 'SAP Fiori / SAPUI5 Developer',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-8 months',
    estimatedHours: 400,
    targetRoles: ['SAP Fiori Developer', 'SAPUI5 Frontend Engineer', 'SAP Technical Consultant', 'SAP S/4HANA UX Specialist'],
    prerequisites: ['Basic web development understanding', 'Basic understanding of enterprise business software'],
    technologies: ['SAPUI5', 'SAP Fiori', 'OData', 'JavaScript ES6+', 'SAP BTP', 'SAP Business Application Studio', 'Fiori Elements', 'Smart Controls', 'SAP S/4HANA'],
    description: 'Complete, production-grade learning path for mastering SAP Fiori and SAPUI5 front-end enterprise engineering. Drills down through SAP & Web fundamentals, deep MVC & SAPUI5 mechanics, Fiori UX & Launchpad, OData V2/V4, Advanced Fiori Elements, Smart Controls, Cloud Deployment on SAP BTP, and Senior Debugging/Performance optimization.',
    levels: [
      buildLevel({
        id: 'fiori-l0',
        order: 0,
        title: 'Level 0 — SAP Fundamentals & Architecture',
        description: 'Core concepts of the SAP enterprise landscape, ERP evolution, S/4HANA, BTP, and Fiori user experience paradigm.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'fiori-l0-s1',
            title: 'SAP Enterprise Landscape & ERP',
            topics: [
              buildTopic({
                id: 'fiori-l0-t1',
                title: 'SAP Ecosystem & ERP Overview',
                description: 'Understand the SAP product suite, enterprise architecture, client-server model, and ERP evolution from R/3 to ECC and S/4HANA.',
                subtopics: [
                  'SAP Ecosystem & Product Landscape',
                  'Evolution from SAP R/3 to ECC to SAP S/4HANA',
                  'SAP Business Suite & Industry Solutions',
                  'Three-Tier Architecture (Presentation, Application, Database)',
                  'SAP NetWeaver Application Server (AS ABAP / AS Java)',
                  'SAP Release Cycles & Enhancement Packages (EhP)',
                ],
              }),
              buildTopic({
                id: 'fiori-l0-t2',
                title: 'SAP S/4HANA & SAP BTP Core Concepts',
                description: 'Master the architectural foundations of modern S/4HANA, in-memory computing, and SAP Business Technology Platform (BTP).',
                subtopics: [
                  'SAP S/4HANA In-Memory Database & Simplified Data Model',
                  'On-Premise vs Private Cloud vs Public Cloud Editions',
                  'Clean Core Strategy & Side-by-Side Extensibility',
                  'SAP Business Technology Platform (BTP) Role in Enterprise UX',
                  'Multi-Cloud Foundation (Cloud Foundry, Kyma Runtimes)',
                  'Cloud Security, Tenant Separation & Service Subscriptions',
                ],
              }),
            ],
          }),
          buildSubject({
            id: 'fiori-l0-s2',
            title: 'SAP UX Paradigm & Fiori Launchpad',
            topics: [
              buildTopic({
                id: 'fiori-l0-t3',
                title: 'SAP GUI vs SAP Fiori Architecture',
                description: 'Contrast monolithic SAP GUI transactions with role-based, responsive, modern Fiori web applications.',
                subtopics: [
                  'Traditional SAP GUI Limitations & Dynpro Screens',
                  'SAP Fiori Design Paradigm: Role-Based, Adaptive, Simple, Coherent, Delightful',
                  'Evolution: Fiori 1.0, Fiori 2.0, Fiori 3.0 (Quartz Theme) & Horizon Theme',
                  'Fiori Launchpad (FLP) as Single Entry Point',
                  'Business Catalogs, Groups, Spaces, and Pages Architecture',
                  'SAP Business Roles & Authorization Profiles (PFCG Integration)',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l1',
        order: 1,
        title: 'Level 1 — Modern Web Foundations for UI5',
        description: 'Mastery of modern JavaScript (ES6+), DOM, asynchronous programming, HTTP/REST, and JSON required for high-performance UI5.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'fiori-l1-s1',
            title: 'Modern JavaScript (ES6+) & Web Standards',
            topics: [
              buildTopic({
                id: 'fiori-l1-t1',
                title: 'ES6+ Syntax, Modules & Scoping',
                description: 'Deep dive into modern JavaScript features essential for UI5 and modern web tooling.',
                subtopics: [
                  'let, const, Variable Scoping & Hoisting Rules',
                  'Arrow Functions, Lexical this & Execution Contexts',
                  'Destructuring, Rest/Spread Operators, Template Literals',
                  'ES Modules (import/export) vs AMD (sap.ui.define)',
                  'Classes, Prototypes, and Inheritance Patterns in JS',
                  'Array Functional Methods (map, filter, reduce, find, some, every)',
                ],
              }),
              buildTopic({
                id: 'fiori-l1-t2',
                title: 'Asynchronous JavaScript & Event Loop',
                description: 'Master async execution, promises, and network requests essential for non-blocking UI5 applications.',
                subtopics: [
                  'JavaScript Single-Threaded Event Loop, Call Stack & Microtask Queue',
                  'Promises: States, Chaining, Promise.all, Promise.allSettled',
                  'Async/Await Syntax, Error Handling with try/catch',
                  'Fetch API & XMLHttpRequest Internals',
                  'HTTP Headers, Status Codes (200, 201, 400, 401, 403, 404, 500)',
                  'REST Principles, JSON Serialization & Data Parsing',
                ],
              }),
            ],
          }),
          buildSubject({
            id: 'fiori-l1-s2',
            title: 'HTML5, CSS3 & Browser Internals',
            topics: [
              buildTopic({
                id: 'fiori-l1-t3',
                title: 'DOM Manipulation, Events & CSS Flexbox/Grid',
                description: 'Understand browser layout engines, event propagation, and custom CSS styling for SAP Fiori themes.',
                subtopics: [
                  'DOM Tree, Virtual DOM vs UI5 Control Tree',
                  'Event Bubbling, Capturing, and Delegation',
                  'CSS Flexbox & CSS Grid for Responsive Enterprise Layouts',
                  'CSS Custom Properties (Variables) & Theme Overrides',
                  'Browser DevTools: Elements, Console, Network, Performance Profiling',
                  'CORS (Cross-Origin Resource Sharing) Mechanics & Prevention',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l2',
        order: 2,
        title: 'Level 2 — SAPUI5 Core Architecture & Controls',
        description: 'Comprehensive mastery of SAPUI5 Model-View-Controller (MVC), Data Binding, Controls, Views, and Application Descriptors.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'fiori-l2-s1',
            title: 'MVC Architecture & Data Binding in UI5',
            topics: [
              buildTopic({
                id: 'fiori-l2-t1',
                title: 'SAPUI5 MVC Architecture & Component.js',
                description: 'Understand the core bootstrap lifecycle, Component.js, manifest.json, and MVC separation.',
                subtopics: [
                  'UI5 Bootstrap (sap-ui-core.js) Configuration & Resource Roots',
                  'Component.js Lifecycle (init, destroy, createContent)',
                  'manifest.json (App Descriptor): sap.app, sap.ui5, models, routing',
                  'XML Views vs JSON Views vs JavaScript Views',
                  'Controller Architecture & Lifecycle Hooks (onInit, onBeforeRendering, onAfterRendering, onExit)',
                  'BaseController Pattern & Dependency Injection with sap.ui.define',
                ],
              }),
              buildTopic({
                id: 'fiori-l2-t2',
                title: 'Data Binding Models & Expressions',
                description: 'Master JSONModel, ODataModel, ResourceModel, binding modes, and complex expression bindings.',
                subtopics: [
                  'JSONModel for Client-Side State Management',
                  'ResourceModel (i18n.properties) for Localization & Multilingual Support',
                  'ODataModel (v2 vs v4) Fundamentals & Metadata Loading',
                  'One-Way, Two-Way, and One-Time Data Binding Modes',
                  'Property Binding, Context Binding, and Aggregation Binding',
                  'Expression Binding ({= ${status} === "A" ? "Active" : "Inactive" })',
                  'Custom Formatters (Formatter.js) for Enterprise Formatting',
                ],
              }),
            ],
          }),
          buildSubject({
            id: 'fiori-l2-s2',
            title: 'SAPUI5 Controls, Layouts & Fragments',
            topics: [
              buildTopic({
                id: 'fiori-l2-t3',
                title: 'Standard UI5 Controls, Tables & Forms',
                description: 'Build enterprise layouts using sap.m controls, responsive tables, forms, and dialogs.',
                subtopics: [
                  'sap.m Library Controls (Text, Input, Select, DatePicker, Button, Icon)',
                  'Layouts: DynamicPage, ObjectPageLayout, FlexBox, Grid, SimpleForm',
                  'Responsive Tables (sap.m.Table) & Analytical Tables (sap.ui.table.Table)',
                  'List Controls (sap.m.List, StandardListItem, ObjectListItem, CustomListItem)',
                  'SearchField, Filtering, Sorting, and Grouping on Lists/Tables',
                  'Fragments (sap.ui.core.Fragment) for Reusable Modals & Popovers',
                  'Dialogs, ValueHelpDialog, MessageToast, and MessageBox',
                ],
              }),
              buildTopic({
                id: 'fiori-l2-t4',
                title: 'Routing, Navigation & Reusable Custom Controls',
                description: 'Configure declarative routing, query parameters, cross-view navigation, and custom control authoring.',
                subtopics: [
                  'Routing Configuration in manifest.json (routes, targets, config)',
                  'Pattern Matching, Route Parameters & Query Strings (subroutes)',
                  'Router Navigation: navTo, getURL, getRouter, History Traversal',
                  'Handling Nested Views & Flexible Column Layout (FCL) Basics',
                  'Authoring Custom UI5 Controls (metadata, properties, aggregations, renderer)',
                  'Extending Standard Controls & Custom CSS Class Hooks',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l3',
        order: 3,
        title: 'Level 3 — SAP Fiori UX & Launchpad Integration',
        description: 'Design principles, Fiori Launchpad administration, Intent-Based Navigation, Tiles, Spaces, Pages, and Catalogs.',
        color: 'cyan',
        subjects: [
          buildSubject({
            id: 'fiori-l3-s1',
            title: 'Fiori Design Principles & Launchpad Architecture',
            topics: [
              buildTopic({
                id: 'fiori-l3-t1',
                title: 'Fiori Design Guidelines & Floorplans',
                description: 'Learn official SAP Fiori design guidelines, responsive typography, icon sets, and standard floorplans.',
                subtopics: [
                  'SAP Fiori Design Guidelines (Fiori 3 Quartz & Horizon Themes)',
                  'Standard Floorplans: Worklist, List Report, Object Page, Wizard',
                  'Responsive Behavior on Desktop, Tablet, and Mobile Form Factors',
                  'Enterprise Accessibility (WCAG 2.1, Screen Readers, Keyboard Navigation)',
                  'Fiori Tile Types: Static, Dynamic (KPI Count), Numeric, Chart Tiles',
                  'Fiori Launchpad Configuration Cockpit & Administration',
                ],
              }),
              buildTopic({
                id: 'fiori-l3-t2',
                title: 'Intent-Based Navigation & Business Roles',
                description: 'Master semantic objects, actions, cross-application navigation, target mappings, and PFCG roles.',
                subtopics: [
                  'Semantic Objects and Actions Concept (#SalesOrder-display)',
                  'Target Mappings & Inbound/Outbound Navigation Parameters',
                  'CrossApplicationNavigation Service (sap.ushell.services)',
                  'Passing Parameters & Context across Fiori Apps',
                  'Spaces and Pages Concept in Modern S/4HANA Launchpad',
                  'Catalogs, Groups, and PFCG Role Assignment in Backend',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l4',
        order: 4,
        title: 'Level 4 — OData Protocol Mastery (V2 & V4)',
        description: 'Comprehensive protocol mastery: Entity sets, associations, CRUDQ operations, query options, batch requests, and pagination.',
        color: 'teal',
        subjects: [
          buildSubject({
            id: 'fiori-l4-s1',
            title: 'OData V2 vs V4 Protocol & Data Operations',
            topics: [
              buildTopic({
                id: 'fiori-l4-t1',
                title: 'OData Service Architecture & Metadata',
                description: 'Explore OData metadata ($metadata), EntityTypes, EntitySets, NavigationProperties, and Associations.',
                subtopics: [
                  'OData Protocol Foundations (OASIS Standard, REST on Steroids)',
                  'OData V2 vs OData V4 Core Differences & Advancements',
                  'Metadata Document ($metadata): EntityType, EntitySet, Associations, Annotations',
                  'Reading Single Entities & Entity Sets (GET requests)',
                  'Creating, Updating, and Deleting (POST, PUT, PATCH, DELETE)',
                  'ETags & Concurrency Control (Optimistic Locking via If-Match)',
                ],
              }),
              buildTopic({
                id: 'fiori-l4-t2',
                title: 'System Query Options, Batching & Pagination',
                description: 'Master URL query options, server-side pagination, batch operations ($batch), and deep inserts.',
                subtopics: [
                  'System Query Options: $filter, $select, $expand, $orderby, $top, $skip, $count',
                  'Complex Filter Expressions (eq, ne, gt, lt, substringof, contains, startswith)',
                  'Deep Reads & Expands across Navigation Properties',
                  'Batch Processing ($batch): ChangeSets, Content-ID Referencing, Performance',
                  'Server-Side vs Client-Side Paging (Growing Table, Paging Bar)',
                  'OData Function Imports & Action Imports Execution',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l5',
        order: 5,
        title: 'Level 5 — Production Fiori Application Development',
        description: 'Building end-to-end robust Fiori apps: State management, validation, message handling, error logging, and performance.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'fiori-l5-s1',
            title: 'Production State & Message Management',
            topics: [
              buildTopic({
                id: 'fiori-l5-t1',
                title: 'Message Handling, Popovers & Validation',
                description: 'Implement enterprise message manager, field validation, and popover error messaging.',
                subtopics: [
                  'sap.ui.core.message.MessageManager Architecture',
                  'Automatic Target Binding & Input Validation States (Error, Warning, Success)',
                  'MessagePopover Implementation & Display of Backend RFC/OData Messages',
                  'Client-Side Form Validation Rules before Submitting Requests',
                  'BusyDialog, BusyIndicator & Skeleton Screen Loading States',
                  'Global Error Handling in Component.js for Failed Network Calls',
                ],
              }),
              buildTopic({
                id: 'fiori-l5-t2',
                title: 'Fiori Performance Optimization & Caching',
                description: 'Techniques for sub-second load times, component preload, bundle minification, and metadata caching.',
                subtopics: [
                  'Component-preload.js Generation & Minification',
                  'Asynchronous Module Definition & Lazy Loading of Heavy Views/Dialogs',
                  'OData Model Metadata Caching & Batch Grouping Optimization',
                  'Reducing DOM Nodes & Virtual Scrolling for Huge Tables',
                  'Network Waterfall Analysis & Eliminating Duplicate OData Roundtrips',
                  'Gzip Compression, Content Delivery Networks (CDN) & Cache Busters',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l6',
        order: 6,
        title: 'Level 6 — Advanced Fiori Elements & Smart Controls',
        description: 'Annotation-driven enterprise applications: Fiori Elements, SmartForm, SmartTable, SmartFilterBar, and Extensions.',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 'fiori-l6-s1',
            title: 'SAP Fiori Elements & Floorplans',
            topics: [
              buildTopic({
                id: 'fiori-l6-t1',
                title: 'Fiori Elements List Report & Object Page',
                description: 'Build enterprise apps rapidly without code using CDS/OData annotations and Fiori Elements floorplans.',
                subtopics: [
                  'Fiori Elements Architecture & Benefits over Freestyle UI5',
                  'List Report Floorplan: SelectionFields, LineItem Annotations',
                  'Object Page Floorplan: HeaderInfo, Facets, FieldGroups, Sub-Sections',
                  'Analytical List Page (ALP) with Interactive Visual Filters & Charts',
                  'Overview Page (OVP) & Analytical Cards Configuration',
                  'Worklist Template for High-Volume Operational Tasks',
                ],
              }),
              buildTopic({
                id: 'fiori-l6-t2',
                title: 'Smart Controls & CDS Annotations',
                description: 'Leverage SmartField, SmartTable, SmartFilterBar, and OData UI/Common annotations.',
                subtopics: [
                  'sap.ui.comp Library Overview (Smart Controls Ecosystem)',
                  'SmartTable with Automatic Personalization (P13n), Sorting & Export to Excel',
                  'SmartFilterBar with Automated Value Help & Dropdown Lookups',
                  'SmartForm & SmartField with Dynamic Read/Edit Mode Switching',
                  'UI Annotations: UI.SelectionFields, UI.LineItem, UI.HeaderInfo, UI.Facets',
                  'Common Annotations: TextArrangement, ValueList, SemanticKey',
                ],
              }),
              buildTopic({
                id: 'fiori-l6-t3',
                title: 'Fiori Elements Extensions & Custom Actions',
                description: 'Extend standard Fiori Elements with custom controller logic, custom columns, and custom sections.',
                subtopics: [
                  'Controller Extensions (sap.ui.core.mvc.ControllerExtension)',
                  'Custom Actions in List Report Table Toolbar & Object Page Header',
                  'Adding Custom Columns to Fiori Elements SmartTable',
                  'Custom Object Page Sections & Custom Views Integration',
                  'ExtensionAPI Usage for Navigation & Draft Handling',
                  'Flexible Column Layout (FCL) Master-Detail-Detail Navigation',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l7',
        order: 7,
        title: 'Level 7 — Development Tooling & BTP Deployment',
        description: 'Modern development workflow: Business Application Studio, UI5 Tooling, BTP HTML5 Repository, and MTA Deployment.',
        color: 'violet',
        subjects: [
          buildSubject({
            id: 'fiori-l7-s1',
            title: 'Modern Tooling & Cloud Deployment',
            topics: [
              buildTopic({
                id: 'fiori-l7-t1',
                title: 'SAP Business Application Studio & UI5 Tooling',
                description: 'Modern cloud IDE setup, extensions, UI5 CLI, and local mock servers.',
                subtopics: [
                  'SAP Business Application Studio (BAS) Dev Spaces Configuration',
                  'Local Development with VS Code & SAP Fiori Tools Extension Pack',
                  'UI5 Tooling (ui5.yaml, ui5-tooling CLI, custom middlewares)',
                  'Local OData Mock Server (sap.ui.core.util.MockServer) with JSON Data',
                  'Fiori Application Generator Wizard in BAS',
                  'Git Version Control & CI/CD Pipelines for UI5 Apps',
                ],
              }),
              buildTopic({
                id: 'fiori-l7-t2',
                title: 'BTP Deployment, Destinations & Launchpad Integration',
                description: 'Package, deploy to BTP Cloud Foundry/Kyma, configure Managed Approuter, and publish to FLP.',
                subtopics: [
                  'Multi-Target Application (MTA) Architecture (mta.yaml)',
                  'SAP BTP HTML5 Application Repository & Managed Approuter',
                  'BTP Destinations Configuration (OAuth2, Principal Propagation, Basic)',
                  'Building and Deploying with Cloud MTA Build Tool (mbt)',
                  'Deploying to On-Premise ABAP Repository (/UI5/UI5_REPOSITORY_LOAD)',
                  'Integrating Deployed Apps into SAP Build Work Zone / Fiori Launchpad',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'fiori-l8',
        order: 8,
        title: 'Level 8 — Enterprise Debugging, Diagnostics & Troubleshooting',
        description: 'Advanced diagnostic skills: Browser DevTools, UI5 Inspector, Network diagnostics, Binding debugging, and Error taxonomy.',
        color: 'rose',
        subjects: [
          buildSubject({
            id: 'fiori-l8-s1',
            title: 'Enterprise Debugging Tools & Error Taxonomies',
            topics: [
              buildTopic({
                id: 'fiori-l8-t1',
                title: 'UI5 Diagnostics Window & UI5 Inspector Extension',
                description: 'Use specialized SAP diagnostic tools to inspect control trees, model bindings, and performance logs.',
                subtopics: [
                  'Technical Information Dialog (Ctrl+Shift+Alt+P) & UI5 Version Checks',
                  'UI5 Diagnostics Window (Ctrl+Shift+Alt+S) & Control Tree Explorer',
                  'UI5 Inspector Chrome Extension (Control Tree, Binding Model Inspector)',
                  'Support Assistant (sap.ui.core.support) & Automated Rule Checks',
                  'Debugging Two-Way Binding & Unsynchronized Model Properties',
                  'Tracing Event Listeners, Control Destroy Cycles & Memory Leaks',
                ],
              }),
              buildTopic({
                id: 'fiori-l8-t2',
                title: 'Network, OData & HTTP Error Taxonomy',
                description: 'Systematic diagnosis of 400, 401, 403, 404, 500, CORS, and CSRF token failures.',
                subtopics: [
                  'Diagnosing 400 Bad Request & OData Payload Formatting Mismatches',
                  'Resolving 401 Unauthorized & 403 Forbidden (BTP Destination & SAML Issues)',
                  '404 Not Found: Service URL, Destination Mapping & Subroute Misconfiguration',
                  '500 Internal Server Error: SAP Backend ABAP Dumps (ST22) & Gateway Traces (/IWFND/ERROR_LOG)',
                  'CSRF Token Fetching (x-csrf-token) Failures on POST/PUT/DELETE Requests',
                  'CORS Errors in Local Development & Proxy Middleware Fixes',
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
// 2. SAP INTEGRATION SUITE / CLOUD INTEGRATION (CPI)
// ============================================================================
export function generateSapIntegrationDeveloperTemplate() {
  return buildTemplate({
    id: 'sap-integration-developer',
    name: 'SAP Integration Developer (Integration Suite / Cloud Integration)',
    title: 'SAP Integration Developer (Integration Suite / Cloud Integration)',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '7-10 months',
    estimatedHours: 450,
    targetRoles: ['SAP Integration Developer', 'SAP CPI Consultant', 'Enterprise Integration Architect', 'SAP Cloud Integration Engineer'],
    prerequisites: ['HTTP & REST fundamentals', 'XML & JSON data structures', 'Basic enterprise systems awareness'],
    technologies: ['SAP Integration Suite', 'Cloud Integration (CPI)', 'API Management', 'Event Mesh', 'Groovy Scripting', 'XSLT', 'Open Connectors', 'Integration Advisor', 'OData', 'SOAP', 'IDoc', 'SFTP'],
    description: 'The definitive end-to-end curriculum for modern enterprise integration engineering on SAP BTP. Covers Integration Suite capabilities, Cloud Integration (CPI) core, iFlow authoring, 15+ adapters, multi-format message transformations (XML/JSON/CSV/Groovy/XSLT), advanced routing patterns, Groovy scripting, security & keystores, exception subprocesses & dead-letter handling, API Management policies, Event Mesh EDA, and production operations.',
    levels: [
      buildLevel({
        id: 'cpi-l0',
        order: 0,
        title: 'Level 0 — Enterprise Integration Fundamentals',
        description: 'Core integration paradigms, topologies, synchronous vs asynchronous communications, and message patterns.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'cpi-l0-s1',
            title: 'Integration Paradigms & Topologies',
            topics: [
              buildTopic({
                id: 'cpi-l0-t1',
                title: 'Integration Concepts, Topologies & Patterns',
                description: 'Master source/target systems, middleware, point-to-point vs hub-and-spoke, and message-driven architectures.',
                subtopics: [
                  'Source System, Target System & Middleware Roles in Enterprises',
                  'Synchronous vs Asynchronous Integration: Latency, Coupling & Guarantees',
                  'Point-to-Point vs Hub-and-Spoke vs Enterprise Service Bus (ESB)',
                  'API-Led Integration vs Event-Driven Architecture (EDA)',
                  'Message-Based Integration: Payloads, Headers, Properties, Metadata',
                  'Data Transformation, Message Enrichment, Protocol Conversion, Routing',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l1',
        order: 1,
        title: 'Level 1 — SAP Integration Suite Overview & Capabilities',
        description: 'Explore the full spectrum of SAP Integration Suite services on SAP BTP and their strategic capabilities.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'cpi-l1-s1',
            title: 'SAP Integration Suite Architecture',
            topics: [
              buildTopic({
                id: 'cpi-l1-t1',
                title: 'SAP Integration Suite Portfolio & Capabilities',
                description: 'Understand Cloud Integration, API Management, Event Mesh, Open Connectors, Integration Advisor, and Migration Assessment.',
                subtopics: [
                  'SAP BTP Multi-Cloud Architecture for Integration Suite',
                  'Cloud Integration (formerly CPI): Core Message Orchestration',
                  'API Management: API Gateway, Security Policies, Lifecycle & Monetization',
                  'Event Mesh: Event-Driven Publish/Subscribe & Decoupling',
                  'Open Connectors: 160+ Pre-built Third-Party SaaS Connectors',
                  'Integration Advisor: AI-Powered Mapping & Schema Standardization (MAG/MIG)',
                  'Integration Assessment Tool & Migration Assessment (PI/PO to Cloud)',
                  'SAP Graph: Unified API Access across SAP Business Systems',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l2',
        order: 2,
        title: 'Level 2 — Cloud Integration Core Architecture & Tenants',
        description: 'Tenants, workspace hierarchy, integration packages, runtime execution engine, and deployment lifecycle.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'cpi-l2-s1',
            title: 'Tenants, Packages & Message Context',
            topics: [
              buildTopic({
                id: 'cpi-l2-t1',
                title: 'Cloud Integration Workspace & Package Lifecycle',
                description: 'Navigate the web UI, manage integration packages, versioning, artifacts, and discover pre-packaged content.',
                subtopics: [
                  'Design, Discover, and Monitor Workspaces in Integration Suite UI',
                  'Integration Packages: Metadata, Documents, Artifact Bundling, Versioning',
                  'Discovering & Consuming Standard Pre-Packaged Content from SAP Business Accelerator Hub',
                  'Sender & Receiver Participants in Integration Canvas',
                  'Integration Flow (iFlow) Runtime Container & Camel Exchange Lifecycle',
                  'Message Structure in Memory: Body, Headers, Exchange Properties',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l3',
        order: 3,
        title: 'Level 3 — Integration Flow (iFlow) Modeling',
        description: 'Authoring integration flows: Step palette, sequence flows, message events, enrichers, validators, and modularization.',
        color: 'cyan',
        subjects: [
          buildSubject({
            id: 'cpi-l3-s1',
            title: 'iFlow Construction & Step Palette',
            topics: [
              buildTopic({
                id: 'cpi-l3-t1',
                title: 'iFlow Steps, Sequence Flows & Local Integration Processes',
                description: 'Construct structured iFlows with subprocesses, request-reply calls, content enrichers, and message validators.',
                subtopics: [
                  'Start, End, and Error Message Events',
                  'Sequence Flows, Message Flows, and Connecting Sender/Receiver Channels',
                  'Request-Reply Step vs Send Step vs Poll Enrich Step',
                  'Content Enricher: Lookups, Combine vs Enrich Matching Key Algorithms',
                  'XML / JSON Message Validator Steps & Schema Validation (XSD/JSON Schema)',
                  'Local Integration Process & Reusable Subprocesses for Clean Architecture',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l4',
        order: 4,
        title: 'Level 4 — Comprehensive Adapters Deep Dive',
        description: 'Deep configuration, authentication, and troubleshooting for 15+ standard adapters in Cloud Integration.',
        color: 'teal',
        subjects: [
          buildSubject({
            id: 'cpi-l4-s1',
            title: 'Synchronous & Web Protocol Adapters',
            topics: [
              buildTopic({
                id: 'cpi-l4-t1',
                title: 'HTTP, HTTPS, REST & OData Adapters',
                description: 'Configure REST/HTTP/OData sender and receiver channels, query parameters, headers, and OAuth/Basic auth.',
                subtopics: [
                  'HTTPS / REST Sender Configuration, CSRF Protection & URL Paths',
                  'HTTP Receiver Channel: Method, Query Parameters, Header Whitelisting',
                  'OData V2 / V4 Receiver: Entity Operations, Query Builder, Pagination',
                  'SOAP 1.1 / 1.2 Adapter: WSDL Import, WS-Security, SOAP Headers',
                  'ProcessDirect Adapter: Fast In-Memory iFlow-to-iFlow Communication',
                ],
              }),
            ],
          }),
          buildSubject({
            id: 'cpi-l4-s2',
            title: 'Enterprise, File & Messaging Adapters',
            topics: [
              buildTopic({
                id: 'cpi-l4-t2',
                title: 'SFTP, IDoc, RFC, JDBC, Mail, AMQP, AS2 & JMS Adapters',
                description: 'Configure asynchronous and enterprise channels: SFTP file handling, IDoc/RFC backends, JMS queues, and AS2.',
                subtopics: [
                  'SFTP / FTP Adapter: File Polling, Directory Traversal, PGP Decryption, Archive',
                  'IDoc Adapter: IDoc XML to/from S/4HANA & ECC via Cloud Connector',
                  'RFC Adapter: BAPI & Remote Function Module Invocations',
                  'JDBC Adapter: Database Table Inserts/Updates via Cloud Connector',
                  'Mail Adapter: SMTP Sender/IMAP Receiver, Attachments & HTML Templates',
                  'JMS Adapter: Cloud Integration Message Queuing, Decoupling & Retries',
                  'AMQP & AS2 Adapters: B2B/EDI Partner Exchange & Message Disposition Notifications (MDN)',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l5',
        order: 5,
        title: 'Level 5 — Message Transformation & Mapping',
        description: 'Transforming enterprise data: Graphical Message Mapping, XSLT, Content Modifiers, Converters, and Encoders.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'cpi-l5-s1',
            title: 'Data Transformation & Graphical Mapping',
            topics: [
              buildTopic({
                id: 'cpi-l5-t1',
                title: 'Message Mapping, Content Modifiers & Converters',
                description: 'Master graphical drag-and-drop mapping, standard/custom functions, and data format conversions.',
                subtopics: [
                  'Content Modifier: Creating/Modifying Headers, Properties, and Body Expressions',
                  'Graphical Message Mapping (GMM): Source/Target XSD Structures & Context Queues',
                  'Standard Mapping Functions: String, Math, Boolean, Node Functions (createIf, removeContexts)',
                  'Value Mapping Artifacts (Key-Value Cross-Reference Tables)',
                  'XML to JSON & JSON to XML Converter Steps',
                  'CSV to XML & XML to CSV Converters with Header Handling',
                  'Base64 & GZIP Encoders/Decoders for Binary Payloads',
                  'XSLT 2.0 / 3.0 Transformations for High-Performance Complex Mapping',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l6',
        order: 6,
        title: 'Level 6 — Advanced Routing & Mediation Patterns',
        description: 'Enterprise integration patterns: Content-Based Router, Splitters, Aggregators, Multicast, and Gather.',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 'cpi-l6-s1',
            title: 'Enterprise Routing & Splitting Patterns',
            topics: [
              buildTopic({
                id: 'cpi-l6-t1',
                title: 'Router, Splitter, Multicast & Aggregator Patterns',
                description: 'Implement complex routing, parallel/sequential multicasting, batch record splitting, and aggregation.',
                subtopics: [
                  'Content-Based Router: Non-XML/XML Conditions (XPath / Header Expressions)',
                  'Iterating Splitter vs General Splitter vs PKCS7 Splitter',
                  'Gather Step: Combining Split Records back into a Consolidated Payload',
                  'Sequential Multicast vs Parallel Multicast Steps',
                  'Aggregator Step: Correlation Keys, Completion Conditions & Timeouts',
                  'Filter Step: Stripping Unwanted XML/JSON Subtrees from Large Payloads',
                  'Idempotent Process Step: Deduplicating Repetitive Inbound Messages',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l7',
        order: 7,
        title: 'Level 7 — Groovy Scripting for Integration Developers',
        description: 'Production-grade Groovy scripts: Manipulating Apache Camel message objects, XML parsing (XmlSlurper), JSON parsing (JsonSlurper).',
        color: 'violet',
        subjects: [
          buildSubject({
            id: 'cpi-l7-s1',
            title: 'Groovy Programming in Cloud Integration',
            topics: [
              buildTopic({
                id: 'cpi-l7-t1',
                title: 'Message Object Manipulation & XML/JSON Parsing',
                description: 'Write robust Groovy scripts to inspect and transform payloads, headers, and properties.',
                subtopics: [
                  'com.sap.gateway.ip.core.customdev.util.Message Object API',
                  'Accessing and Mutating message.getBody(), setBody(), getHeaders(), getProperties()',
                  'Parsing & Constructing XML with XmlSlurper, XmlParser & StreamingMarkupBuilder',
                  'Parsing & Transforming JSON with JsonSlurper & JsonBuilder / JsonOutput',
                  'Dynamic Routing & Header Injection via Scripting',
                  'Creating Shared Reusable Script Collections in Integration Suite',
                  'Unit Testing & Debugging Groovy Scripts Locally with IntelliJ / VS Code',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l8',
        order: 8,
        title: 'Level 8 — Security, Keystores & Authentication',
        description: 'Enterprise security: Security Materials, Keystore, Truststore, OAuth2, Client Certificates, PGP Encryption, and Secrets.',
        color: 'rose',
        subjects: [
          buildSubject({
            id: 'cpi-l8-s1',
            title: 'Security Materials & Cryptography',
            topics: [
              buildTopic({
                id: 'cpi-l8-t1',
                title: 'Security Artifacts, Certificates & OAuth Configuration',
                description: 'Secure iFlow endpoints and backends with SSL/TLS, OAuth2 Client Credentials, and PGP encryption.',
                subtopics: [
                  'Managing Security Materials: User Credentials, Secure Parameters, OAuth2 Client Credentials',
                  'Keystore & Truststore Management (Importing CA Certificates & Root Certs)',
                  'Client Certificate Authentication (mTLS) for Sender and Receiver Channels',
                  'PGP Encryptor / Decryptor Steps & Keyring Management',
                  'Signing and Verifying XML Digital Signatures (XML-DSig)',
                  'SAP Cloud Connector Setup: Principal Propagation & On-Premise Tunneling',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l9',
        order: 9,
        title: 'Level 9 — Robust Error Handling & Exception Subprocesses',
        description: 'Resilience engineering: Exception Subprocess, dead-letter queues, custom alert emails, retries, and correlation IDs.',
        color: 'amber',
        subjects: [
          buildSubject({
            id: 'cpi-l9-s1',
            title: 'Fault Tolerance & Error Recovery',
            topics: [
              buildTopic({
                id: 'cpi-l9-t1',
                title: 'Exception Subprocesses & Dead-Letter Handling',
                description: 'Capture runtime exceptions, extract root-cause stack traces, and dispatch alert notifications.',
                subtopics: [
                  'Exception Subprocess Architecture & Trigger Conditions',
                  'Extracting ${exception.message} and ${exception.stacktrace} via Groovy/Headers',
                  'Custom Error Response Construction (Standardized JSON/XML Error Bodies)',
                  'End Event vs Error End Event in Exception Handling',
                  'Dead-Letter Queue (DLQ) Implementation using JMS & Data Store',
                  'Automated Alert Email Notifications to IT Operations Teams',
                  'Correlation ID & Message ID Tracking across Microservices',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l10',
        order: 10,
        title: 'Level 10 — SAP API Management',
        description: 'API Management capabilities: API Proxies, Security Policies, Rate Limiting, Quotas, API Products, and Developer Portal.',
        color: 'orange',
        subjects: [
          buildSubject({
            id: 'cpi-l10-s1',
            title: 'API Proxies, Policies & Monetization',
            topics: [
              buildTopic({
                id: 'cpi-l10-t1',
                title: 'API Proxy Creation & Policy Flow Execution',
                description: 'Protect backend APIs and iFlows with API Management policies and rate limits.',
                subtopics: [
                  'API Management Architecture: Provider, Proxy, Target Endpoint',
                  'Policy Flow Steps: PreFlow, Conditional Flows, PostFlow, PostClientFlow',
                  'Security Policies: VerifyAPIKey, OAuthV2, BasicAuthentication, JSONtoXML',
                  'Traffic Management Policies: SpikeArrest, Quota, ConcurrentRateLimit',
                  'Mediation Policies: AssignMessage, ExtractVariables, JavaScript, ServiceCallout',
                  'Publishing API Products to Developer Portal & Application Subscriptions',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l11',
        order: 11,
        title: 'Level 11 — SAP Event Mesh & Event-Driven Architecture',
        description: 'Asynchronous event streaming: SAP Event Mesh, Advanced Event Mesh, Queues, Topics, Webhooks, and S/4HANA Business Events.',
        color: 'yellow',
        subjects: [
          buildSubject({
            id: 'cpi-l11-s1',
            title: 'Event-Driven Messaging & Event Mesh',
            topics: [
              buildTopic({
                id: 'cpi-l11-t1',
                title: 'Event Mesh Queues, Topics & CloudEvents',
                description: 'Publish and consume standard S/4HANA business events using SAP Event Mesh.',
                subtopics: [
                  'Event-Driven Architecture (EDA) Principles: Decoupling & Reactive Systems',
                  'SAP Event Mesh vs SAP Integration Suite Advanced Event Mesh (Solace-based)',
                  'Queues, Queue Subscriptions, Topic Hierarchies (sap/s4/ce/...)',
                  'CloudEvents Specification & Payload Structure',
                  'Publishing S/4HANA Business Events (e.g. SalesOrder.Created) to Event Mesh',
                  'Consuming Events in Cloud Integration iFlows via AMQP / Webhook Subscriptions',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l12',
        order: 12,
        title: 'Level 12 — Integration Operations, Monitoring & CI/CD',
        description: 'Operations cockpit: Message monitoring, traces, payload logging, alerts, TMS transport, and Git CI/CD.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'cpi-l12-s1',
            title: 'Monitoring, Diagnostics & Lifecycle Management',
            topics: [
              buildTopic({
                id: 'cpi-l12-t1',
                title: 'Message Monitoring, Tracing & Transport Management',
                description: 'Monitor live message flows, enable trace logs, analyze performance bottlenecks, and transport artifacts.',
                subtopics: [
                  'Monitoring Dashboard: Completed, Failed, Escalated, and Retrying Messages',
                  'Setting Log Levels: Info vs Debug vs Trace (Inspecting In-Flight Payloads)',
                  'Custom Header Properties for Fast Search (Search Indexing)',
                  'Cloud Integration OData API for Automated Monitoring & Metrics Extraction',
                  'Transporting Integration Packages: Manual Export/Import vs SAP Cloud Transport Management (cTMS)',
                  'Git Integration & Automated CI/CD Pipelines with Project "Piper"',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'cpi-l13',
        order: 13,
        title: 'Level 13 — Enterprise Capstone Integration Projects',
        description: 'End-to-end multi-system capstone implementations solving realistic enterprise integration challenges.',
        color: 'indigo',
        subjects: [
          buildSubject({
            id: 'cpi-l13-s1',
            title: 'Enterprise Integration Scenarios',
            topics: [
              buildTopic({
                id: 'cpi-l13-t1',
                title: 'Project 1: REST API to SAP S/4HANA OData Synchronous Order Hub',
                description: 'Build an API Proxy and iFlow that ingests external orders, transforms JSON to OData, posts to S/4HANA with batching, and returns synchronous confirmations.',
                subtopics: [
                  'External REST Client Payload Schema & Validation',
                  'OData Deep Insert to S/4HANA Sales Order API',
                  'Groovy-Based Response Formatting & Status Mapping',
                  'Exception Handling with Rollback & Standard JSON Error Responses',
                ],
              }),
              buildTopic({
                id: 'cpi-l13-t2',
                title: 'Project 2: SFTP CSV to S/4HANA IDoc Asynchronous Invoice Processing',
                description: 'Build an asynchronous iFlow that polls an encrypted SFTP server, decrypts PGP files, converts CSV to IDoc XML, sends via Cloud Connector, and archives files.',
                subtopics: [
                  'SFTP Polling with PGP Decryption and Dynamic Filename Parsing',
                  'CSV to XML Conversion and Graphical Mapping to INVOIC02 IDoc',
                  'Asynchronous Queueing with JMS Adapter for High Volume Throttling',
                  'Dead-Letter Handling and Email Alerts for Malformed Records',
                ],
              }),
              buildTopic({
                id: 'cpi-l13-t3',
                title: 'Project 3: S/4HANA Event Mesh to Third-Party CRM Multi-System Broadcast',
                description: 'Ingest Customer.Created business events from Event Mesh, multicast to Salesforce and Snowflake with parallel enrichments, transformations, and rate-limiting.',
                subtopics: [
                  'Webhook Subscription to SAP Event Mesh Queue',
                  'Parallel Multicast to Salesforce REST API and Snowflake Ingestion API',
                  'Content-Enricher Request-Reply to Fetch Additional Master Data',
                  'Idempotent Message Processing & End-to-End Latency Logging',
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
// 3. SAP PI/PO DEVELOPER (LEGACY & MIGRATION TO INTEGRATION SUITE)
// ============================================================================
export function generateSapPiPoTemplate() {
  return buildTemplate({
    id: 'sap-pi-po-developer',
    name: 'SAP PI/PO Developer (Legacy & Migration to Integration Suite)',
    title: 'SAP PI/PO Developer (Legacy & Migration to Integration Suite)',
    category: 'SAP Ecosystem',
    status: 'Legacy / Migration',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '5-7 months',
    estimatedHours: 320,
    targetRoles: ['SAP PI/PO Consultant', 'Legacy SAP Integration Specialist', 'SAP Migration Consultant', 'Integration Architect'],
    prerequisites: ['Basic enterprise integration understanding', 'XML & Java concepts'],
    technologies: ['SAP Process Integration (PI)', 'SAP Process Orchestration (PO)', 'Enterprise Services Repository (ESR)', 'Integration Directory (ID)', 'SLD', 'Advanced Adapter Engine (AEX)', 'Java Mapping', 'SAP Integration Suite Migration'],
    description: 'Specialized learning path for supporting, maintaining, and migrating legacy SAP Process Integration (PI) and SAP Process Orchestration (PO) landscapes. Covers ESR, Integration Directory, Dual-Stack vs Single-Stack Java (AEX), Message Mapping, Java Mappings, BPM, classic adapters (RFC, IDoc, File, JDBC, SOAP), message monitoring, and the complete step-by-step migration methodology to SAP Integration Suite on BTP.',
    levels: [
      buildLevel({
        id: 'pipo-l0',
        order: 0,
        title: 'Level 0 — SAP PI/PO Architecture & Landscape Foundations',
        description: 'System landscape directory, architecture evolution from XI to PI to PO, dual-stack vs single-stack Java.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'pipo-l0-s1',
            title: 'PI/PO Architecture & System Landscape',
            topics: [
              buildTopic({
                id: 'pipo-l0-t1',
                title: 'Architecture Evolution: XI, PI (Dual-Stack) vs PO (Single-Stack Java AEX)',
                description: 'Understand the historical evolution, Integration Engine (ABAP) vs Adapter Engine (Java), and components.',
                subtopics: [
                  'Evolution: SAP Exchange Infrastructure (XI) to Process Integration (PI) to Process Orchestration (PO)',
                  'Dual-Stack (ABAP + Java) vs Single-Stack Java Advanced Adapter Engine Extended (AEX)',
                  'System Landscape Directory (SLD): Technical Systems, Business Systems, Products, Software Components',
                  'Enterprise Services Repository (ESR) Design-Time vs Integration Directory (ID) Configuration-Time',
                  'Integration Server, Advanced Adapter Engine (AAE), Business Process Management (BPM), Business Rules (BRM)',
                  'Comparing SAP PI/PO Architecture vs Cloud-Native SAP Integration Suite',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'pipo-l1',
        order: 1,
        title: 'Level 1 — Enterprise Services Repository (ESR) Design-Time',
        description: 'Data types, message types, service interfaces, message mappings, operation mappings, and mapping programs.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'pipo-l1-s1',
            title: 'ESR Design Objects & Mappings',
            topics: [
              buildTopic({
                id: 'pipo-l1-t1',
                title: 'Data Types, Service Interfaces & Message Mappings',
                description: 'Define interface contracts and create graphical message mappings in ESR.',
                subtopics: [
                  'Software Component Versions (SWCV) and Namespace Management in ESR',
                  'Data Types, Message Types, and Fault Message Types Definition',
                  'Service Interfaces: Inbound, Outbound, Abstract; Synchronous vs Asynchronous',
                  'Imported Objects: RFCs, IDocs (IDoc Types and Segments), External WSDLs/XSDs',
                  'Graphical Message Mapping: Context Queues, Standard Functions, User-Defined Functions (UDFs)',
                  'Operation Mapping & Multi-Mapping (1:N, N:1, N:M Transformation Scenarios)',
                ],
              }),
              buildTopic({
                id: 'pipo-l1-t2',
                title: 'Advanced Mappings: Java Mapping, XSLT Mapping & Parameterized Mappings',
                description: 'Write custom Java mappings implementing StreamTransformation and parameterized mappings.',
                subtopics: [
                  'Java Mapping in Eclipse / NWDS: Implementing StreamTransformation Interface',
                  'Accessing Dynamic Configuration (Header Properties) in Java Mapping',
                  'XSLT Mapping in ESR: Importing Zip Archives with Stylesheets',
                  'Parameterized Message Mappings & Passing Parameters from Integration Directory',
                  'Mapping Lookup APIs (RFC Lookup, JDBC Lookup in UDFs)',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'pipo-l2',
        order: 2,
        title: 'Level 2 — Integration Directory (ID) Configuration-Time',
        description: 'Communication channels, integrated configurations (ICO), classic routing objects, and security profiles.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'pipo-l2-s1',
            title: 'Directory Configuration & Integrated Configuration Objects (ICO)',
            topics: [
              buildTopic({
                id: 'pipo-l2-t1',
                title: 'Business Components, Communication Channels & ICOs',
                description: 'Configure sender and receiver channels and single-stack Integrated Configuration (ICO) objects.',
                subtopics: [
                  'Business Systems vs Business Components in Integration Directory',
                  'Communication Channels: Adapter Types, Modules, Processing Parameters',
                  'Integrated Configuration (ICO) in Single-Stack PO: Inbound, Receiver, Interface, Outbound Tabs',
                  'Classic Dual-Stack Objects: Sender Agreement, Receiver Determination, Interface Determination, Receiver Agreement',
                  'Content-Based Routing & XPath Conditions in ICO Receiver Determination',
                  'Adapter Module Chains & Custom Adapter Modules (EJB in Java EE)',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'pipo-l3',
        order: 3,
        title: 'Level 3 — Classic SAP PI/PO Adapters',
        description: 'Configuring standard PI/PO adapters: File/FTP, JDBC, RFC, IDoc_AAE, SOAP, REST, HTTP_AAE, Mail.',
        color: 'cyan',
        subjects: [
          buildSubject({
            id: 'pipo-l3-s1',
            title: 'Adapter Configuration & Channel Processing',
            topics: [
              buildTopic({
                id: 'pipo-l3-t1',
                title: 'File/FTP, JDBC, RFC, IDoc_AAE & SOAP Adapters in PI/PO',
                description: 'Deep configuration of classic adapter engine channels and conversion parameters.',
                subtopics: [
                  'File/FTP Adapter: Content Conversion (FCC), Advanced Selection, File Processing Parameters',
                  'JDBC Adapter: Synchronous/Asynchronous SQL Operations, XML SQL Document Structure',
                  'RFC Adapter: Sender/Receiver RFC Channels, RFC Server Configuration in JCo',
                  'IDoc_AAE Adapter: Inbound/Outbound IDoc Processing via Java Resource Adapter',
                  'SOAP Adapter: Web Service Addressing, WS-Security, XI 3.0 Message Protocol',
                  'REST Adapter in PO: REST Poller, URL Patterns, JSON/XML Transformations',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'pipo-l4',
        order: 4,
        title: 'Level 4 — PI/PO Monitoring, Administration & Troubleshooting',
        description: 'Runtime monitoring: PIMON, NWA, Message Monitoring, Component Monitoring, SXMB_MONI, and Error Logs.',
        color: 'teal',
        subjects: [
          buildSubject({
            id: 'pipo-l4-s1',
            title: 'Message Monitoring & Runtime Diagnostics',
            topics: [
              buildTopic({
                id: 'pipo-l4-t1',
                title: 'PIMON, NWA, SXMB_MONI & Performance Troubleshooting',
                description: 'Troubleshoot stuck messages, queue locks, communication channel errors, and memory dumps.',
                subtopics: [
                  'Process Integration Monitoring (PIMON) Cockpit Overview',
                  'Message Monitoring: Status Codes, Payloads, Header Logs, Trace Inspection',
                  'Communication Channel Monitoring: Automatic Channel Control, Availability Time Planning',
                  'NetWeaver Administrator (NWA): Java Logs, Thread Dumps, JCo Destinations',
                  'Classic Dual-Stack ABAP Monitoring: SXMB_MONI, SM58, SMQ1/SMQ2 Queue Analysis',
                  'Resolving Common Errors: Mapping Failures, Adapter Timeouts, Certificate Expiry',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'pipo-l5',
        order: 5,
        title: 'Level 5 — Complete PI/PO to SAP Integration Suite Migration Path',
        description: 'Strategic and technical migration: Migration Assessment tool, automated artifact migration, mapping conversion, and architectural paradigm shifts.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'pipo-l5-s1',
            title: 'End-to-End Migration Methodology & Tooling',
            topics: [
              buildTopic({
                id: 'pipo-l5-t1',
                title: 'PI/PO vs Integration Suite: Architecture & Migration Assessment',
                description: 'Analyze legacy landscapes using SAP Migration Assessment tool and evaluate scenario readiness.',
                subtopics: [
                  'Business Case for Migration: PI/PO End of Mainstream Maintenance & Cloud Modernization',
                  'Architectural Comparison: On-Premise Monolith vs Cloud-Native Micro-iFlows',
                  'SAP Migration Assessment Tool: Extracting PI/PO Landscape & Generating Effort Estimates',
                  'Evaluation Categories: Automated Migration, Semi-Automated, Manual Redesign Required',
                  'Handling Unsupported Scenarios (e.g. Complex ccBPM -> Workflow / Integration Suite)',
                ],
              }),
              buildTopic({
                id: 'pipo-l5-t2',
                title: 'Technical Artifact Migration, Testing & Cutover',
                description: 'Migrate ICOs to iFlows, convert Java Mappings to Groovy, migrate Keystores, and execute parallel testing.',
                subtopics: [
                  'Automated ICO-to-iFlow Migration Tool in SAP Integration Suite',
                  'Migrating ESR Message Mappings to Cloud Integration Message Mappings',
                  'Refactoring Java Mappings and UDFs to Groovy Scripts',
                  'Adapter Migration Matrix: File/FTP -> SFTP, RFC/IDoc -> Cloud Connector Channels',
                  'Security Migration: Keystores, SSL Certificates, User Accounts -> OAuth/Certificates',
                  'Regression & Parallel Testing Strategies: Comparing XML Payloads between PI/PO and CPI',
                  'Cutover Strategy, Rollback Planning & Decommissioning Legacy PI/PO Systems',
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
// 4. SAP MM / S/4HANA SOURCING & PROCUREMENT CONSULTANT
// ============================================================================
export function generateSapMmTemplate() {
  return buildTemplate({
    id: 'sap-mm-consultant',
    name: 'SAP MM / S/4HANA Sourcing & Procurement Consultant',
    title: 'SAP MM / S/4HANA Sourcing & Procurement Consultant',
    category: 'SAP Ecosystem',
    status: 'Production Standard',
    difficulty: 'Intermediate to Advanced',
    estimatedDuration: '6-9 months',
    estimatedHours: 380,
    targetRoles: ['SAP MM Functional Consultant', 'S/4HANA Sourcing & Procurement Consultant', 'Supply Chain Analyst', 'Procure-to-Pay Lead'],
    prerequisites: ['Enterprise business processes understanding', 'Supply chain and procurement basics'],
    technologies: ['SAP MM', 'SAP S/4HANA', 'Sourcing & Procurement', 'Business Partner', 'Fiori Procurement Apps', 'Flexible Workflow', 'Material Master', 'Inventory Management', 'Logistics Invoice Verification'],
    description: 'Comprehensive functional and technical curriculum for SAP MM and S/4HANA Sourcing & Procurement consultants. Moves far beyond transaction codes into enterprise organizational structures, Business Partner master data, full Procure-to-Pay (P2P) lifecycle, 3-way matching, inventory management, special procurement (Subcontracting, Consignment, Stock Transport Orders), cross-module integration (FI, CO, SD, PP, EWM), configuration (Release Strategies, Pricing Conditions, Automatic Account Determination), and S/4HANA innovations (Flexible Workflows, Fiori Procurement Apps, Embedded Analytics, APIs).',
    levels: [
      buildLevel({
        id: 'mm-l0',
        order: 0,
        title: 'Level 0 — MM Enterprise Structure & Organizational Units',
        description: 'Organizational hierarchy: Client, Company Code, Plant, Storage Location, Purchasing Organization, and Assignments.',
        color: 'slate',
        subjects: [
          buildSubject({
            id: 'mm-l0-s1',
            title: 'Enterprise Organizational Architecture',
            topics: [
              buildTopic({
                id: 'mm-l0-t1',
                title: 'Organizational Units & Hierarchy in Procurement',
                description: 'Configure and assign enterprise units for procurement and inventory management.',
                subtopics: [
                  'Client and Company Code (FI Integration Foundation)',
                  'Plant: Logistics Facility Definition, Valuation Area Significance',
                  'Storage Location: Physical/Logical Warehouse Subdivisions',
                  'Purchasing Organization Types: Plant-Specific, Cross-Plant, Cross-Company Code',
                  'Purchasing Group: Buyer Team Responsibilities & Operational Tracking',
                  'Assignments in SPRO: Plant to Company Code, Purchasing Org to Company Code & Plant',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l1',
        order: 1,
        title: 'Level 1 — Master Data Architecture in S/4HANA',
        description: 'Material Master views, Business Partner (Supplier), Purchasing Info Records, Source Lists, and Material Valuation.',
        color: 'sky',
        subjects: [
          buildSubject({
            id: 'mm-l1-s1',
            title: 'Master Data & Valuation in S/4HANA',
            topics: [
              buildTopic({
                id: 'mm-l1-t1',
                title: 'Material Master & S/4HANA Business Partner (BP)',
                description: 'Configure material types, industry sectors, field selection, and the unified Business Partner model.',
                subtopics: [
                  'Material Master Views: Basic Data, Purchasing, MRP, Storage/Warehouse, Accounting, Costing',
                  'Material Types (ROH, HALB, FERT, DIEN, NLAG) & Number Ranges Configuration',
                  'S/4HANA Business Partner (BP) Approach vs Classic Vendor Master (XK01/MK01)',
                  'BP Roles: General BP, FI Vendor (FLVN00), Purchasing Vendor (FLVN01)',
                  'Customer-Vendor Integration (CVI) Configuration & Number Assignment',
                ],
              }),
              buildTopic({
                id: 'mm-l1-t2',
                title: 'Purchasing Info Records, Source Lists & Valuation',
                description: 'Manage pricing conditions, vendor determination, quota arrangements, and inventory valuation.',
                subtopics: [
                  'Purchasing Info Record (PIR): Standard, Subcontracting, Consignment, Pipeline',
                  'Source List Configuration, Automatic Vendor Source Determination & Blocking',
                  'Quota Arrangement: Splitting Procurement Demand across Multiple Suppliers',
                  'Material Valuation: Standard Price (S) vs Moving Average Price (V)',
                  'Material Ledger & Multiple Currencies / Valuation Views in S/4HANA',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l2',
        order: 2,
        title: 'Level 2 — Operational Procurement Lifecycle (Procure-to-Pay)',
        description: 'Complete operational P2P lifecycle: Purchase Requisitions, RFQ, Quotations, Purchase Orders, Contracts, and Agreements.',
        color: 'blue',
        subjects: [
          buildSubject({
            id: 'mm-l2-s1',
            title: 'Procure-to-Pay (P2P) Flow & Documents',
            topics: [
              buildTopic({
                id: 'mm-l2-t1',
                title: 'Purchase Requisitions, RFQ & Purchase Orders',
                description: 'Manage requisitioning, sourcing quotes, PO creation, item categories, and account assignments.',
                subtopics: [
                  'Purchase Requisition (PR): Direct vs Indirect Requisitions, MRP Generation',
                  'Request for Quotation (RFQ) & Quotation Comparison (Price Comparison List)',
                  'Purchase Order (PO) Creation: Structure, Header, Item Overview, Item Details',
                  'Item Categories (Standard, Consignment, Subcontracting, Third-Party, Stock Transfer, Service)',
                  'Account Assignment Categories (K - Cost Center, P - Project, A - Asset, F - Order)',
                  'Outline Agreements: Quantity Contracts, Value Contracts & Scheduling Agreements',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l3',
        order: 3,
        title: 'Level 3 — Inventory Management & Physical Inventory',
        description: 'Goods Receipts, Goods Issues, Stock Transfers, Transfer Postings, Reservations, Stock Types, and Physical Inventory.',
        color: 'cyan',
        subjects: [
          buildSubject({
            id: 'mm-l3-s1',
            title: 'Movement Types & Stock Management',
            topics: [
              buildTopic({
                id: 'mm-l3-t1',
                title: 'Goods Movements (MIGO), Stock Types & Transfer Postings',
                description: 'Master standard movement types, stock states, reservations, and inventory documents.',
                subtopics: [
                  'Goods Receipt (GR) against Purchase Order (Movement Type 101)',
                  'Goods Issue (GI) to Cost Center (201), Project (221), Production Order (261)',
                  'Stock Types: Unrestricted-Use, Quality Inspection (321/322), Blocked Stock (350/351)',
                  'Transfer Postings & Stock Transfers (Plant-to-Plant, SLoc-to-SLoc; 1-step vs 2-step)',
                  'Reservations Management (Manual vs System-Generated)',
                  'Batch Management & Serial Number Profiles in Inventory',
                  'Physical Inventory Process: Physical Inventory Document, Count Entry, Difference Posting',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l4',
        order: 4,
        title: 'Level 4 — Special Procurement Processes',
        description: 'Complex procurement flows: Subcontracting, Vendor Consignment, Stock Transport Orders (STO), and Third-Party Orders.',
        color: 'teal',
        subjects: [
          buildSubject({
            id: 'mm-l4-s1',
            title: 'Special Procurement Scenarios',
            topics: [
              buildTopic({
                id: 'mm-l4-t1',
                title: 'Subcontracting, Consignment, STO & Third-Party Orders',
                description: 'Configure and execute end-to-end special procurement processes with multi-component BOMs.',
                subtopics: [
                  'Subcontracting Process: BOM Components Provisioning (541), GR (101) & Component Consumption (543)',
                  'Vendor Consignment: Goods Receipt to Consignment Stock (101 K) & Settlement (MRKO)',
                  'Stock Transport Order (STO): Intra-Company (UB) vs Inter-Company STO (with Billing & SD Delivery)',
                  'Third-Party Procurement: Sales Order -> Auto PR -> PO -> Direct Supplier Delivery to Customer',
                  'Pipeline Procurement: Continuous Supply (Oil/Gas/Electricity) & Direct Settlement',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l5',
        order: 5,
        title: 'Level 5 — Logistics Invoice Verification (LIV)',
        description: 'Invoice Receipts (MIRO), 3-way matching, price variances, quantity variances, credit memos, and GR/IR clearing.',
        color: 'emerald',
        subjects: [
          buildSubject({
            id: 'mm-l5-s1',
            title: 'Invoice Verification & GR/IR Clearing',
            topics: [
              buildTopic({
                id: 'mm-l5-t1',
                title: 'Three-Way Match, Price/Quantity Variances & GR/IR',
                description: 'Perform logistics invoice verification, investigate blocking reasons, and clear GR/IR accounts.',
                subtopics: [
                  'Three-Way Matching: Purchase Order vs Goods Receipt vs Vendor Invoice',
                  'Logistics Invoice Verification (MIRO): Entering Invoices against PO & GR',
                  'Tolerance Limits Configuration & Invoice Blocking Reasons (Price, Quantity, Date)',
                  'Credit Memos, Subsequent Debits, and Subsequent Credits Handling',
                  'GR/IR Clearing Account (F.13 / MR11) Maintenance & Discrepancy Investigation',
                  'Evaluated Receipt Settlement (ERS) for Automated Invoice Generation without Vendor Invoice',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l6',
        order: 6,
        title: 'Level 6 — Cross-Module Integration',
        description: 'End-to-end integration: MM + FI (Accounting), MM + CO (Controlling), MM + SD (Sales), MM + PP (Production), MM + EWM.',
        color: 'purple',
        subjects: [
          buildSubject({
            id: 'mm-l6-s1',
            title: 'Enterprise Cross-Module Touchpoints',
            topics: [
              buildTopic({
                id: 'mm-l6-t1',
                title: 'Integration with FI, CO, SD, PP & Extended Warehouse Management (EWM)',
                description: 'Understand accounting document generation, cost center assignments, production backflushing, and EWM.',
                subtopics: [
                  'MM-FI Integration: Automatic Financial Postings on Goods Receipt and Invoice Receipt',
                  'MM-CO Integration: Account Assignments to Cost Centers, Internal Orders, WBS Elements',
                  'MM-SD Integration: Intercompany STOs, Third-Party Deliveries, Availability Checks (ATP)',
                  'MM-PP Integration: Material Requirements Planning (MRP), Component Staging, Backflushing',
                  'MM-EWM Integration: Inbound Deliveries, Warehouse Tasks, Putaway Strategies',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l7',
        order: 7,
        title: 'Level 7 — SPRO Configuration & Valuation Engine',
        description: 'Deep backend configuration: Document Types, Release Procedures, Pricing Condition Technique, Automatic Account Determination (OBYC).',
        color: 'violet',
        subjects: [
          buildSubject({
            id: 'mm-l7-s1',
            title: 'SPRO Configuration & Pricing Conditions',
            topics: [
              buildTopic({
                id: 'mm-l7-t1',
                title: 'Document Types, Release Strategy & Condition Technique',
                description: 'Configure PO document types, field selection keys, classification release strategies, and pricing schemas.',
                subtopics: [
                  'Defining Document Types, Number Ranges & Field Selection Controls for PR and PO',
                  'Release Procedure with Classification: Characteristics, Classes, Release Groups, Codes, Strategies',
                  'Pricing Condition Technique in Purchasing: Condition Types (PB00, FRA1, RA01), Calculation Schema, Access Sequences',
                  'Schema Determination for Standard POs and Stock Transport Orders',
                ],
              }),
              buildTopic({
                id: 'mm-l7-t2',
                title: 'Automatic Account Determination (OBYC)',
                description: 'Configure automatic posting rules linking MM movement types to FI general ledger accounts.',
                subtopics: [
                  'Valuation Grouping Code, Valuation Class, and Account Category Reference',
                  'Transaction Keys in OBYC: BSX (Inventory Posting), WRX (GR/IR Clearing), PRD (Price Difference), GBB (Offsetting Entry)',
                  'General Modification (Account Modification Keys): VBR, VAX, VNG, BSA',
                  'Step-by-Step Simulation and Troubleshooting of OBYC Account Determination Errors',
                ],
              }),
            ],
          }),
        ],
      }),

      buildLevel({
        id: 'mm-l8',
        order: 8,
        title: 'Level 8 — S/4HANA Sourcing Innovations, Analytics & APIs',
        description: 'Modern S/4HANA procurement: Flexible Workflows, Situation Handling, Fiori Procurement Apps, Embedded Analytics, and APIs.',
        color: 'rose',
        subjects: [
          buildSubject({
            id: 'mm-l8-s1',
            title: 'S/4HANA Next-Gen Procurement',
            topics: [
              buildTopic({
                id: 'mm-l8-t1',
                title: 'Flexible Workflow, Situation Handling & Fiori Apps',
                description: 'Configure modern workflow approvals, automated exception handling, and self-service procurement.',
                subtopics: [
                  'Flexible Workflow for PR and PO: Managing Conditions, Approvers & Push Notifications',
                  'Situation Handling: Proactive Alerts for Expiring Contracts, Overdue Deliveries, Invoice Errors',
                  'SAP Fiori Procurement Apps: Manage Purchase Orders, Create Purchase Requisition (Self-Service), Monitor GR/IR',
                  'Real-Time Embedded Analytics in S/4HANA: Spend Analysis, Supplier Evaluation KPI Cards',
                  'Standard Procurement OData APIs & Integration with SAP Ariba and SAP Integration Suite',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
