// src/data/learningPacks/webFundamentals.js
// Canonical Learning Pack: Web Fundamentals & HTTP Architecture

export const webFundamentalsPack = {
  id: 'pack-web-fundamentals',
  slug: 'web-fundamentals',
  title: 'Web Fundamentals',
  category: 'Technical Skills',
  difficulty: 'Beginner',
  priority: 'High',
  estimatedHours: 35,
  version: '1.5',
  status: 'Production Standard',
  createdAt: '2025-01-12',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-26',
  description: 'HTML5, Modern CSS, JavaScript DOM APIs, Browser Rendering Engines, HTTP/HTTPS Protocol, REST APIs, JSON, Cookies/Sessions, JWT Auth, and Web Security (CORS, CSRF, XSS).',
  targetUsers: 'Frontend, Backend, Full Stack, SAP Fiori, Node.js, and AI App developers.',
  prerequisites: ['Basic programming syntax'],
  tags: ['web', 'html', 'css', 'javascript', 'http', 'rest-api', 'cors', 'auth', 'security'],
  relatedPacks: ['pack-programming-fundamentals', 'pack-git-tools', 'pack-cs-fundamentals'],
  relatedTemplates: ['full-stack-developer', 'frontend-developer', 'backend-developer', 'sap-fiori-developer'],
  careerRelevance: 'Universal foundation for all web development, full-stack engineering, and cloud application building.',
  learningOutcomes: [
    'Build semantic, accessible HTML5 layouts styled with modern CSS Grid and Flexbox',
    'Manipulate the Document Object Model (DOM) dynamically with vanilla JavaScript and event listeners',
    'Grasp client-server web architecture: DNS lookup, TCP/TLS handshake, and Critical Rendering Path',
    'Design and consume REST APIs using fetch/Axios with JSON payloads and error handling',
    'Implement web security best practices: CORS policies, HttpOnly cookies, JWT auth, and XSS/CSRF prevention',
  ],
  subjects: [
    {
      id: 'web-s1-html-css-dom',
      title: 'HTML5, Modern CSS & DOM Manipulation',
      description: 'Semantic markup, Flexbox, CSS Grid, Responsive Design, and JavaScript DOM interaction.',
      order: 1,
      topics: [
        {
          id: 'web-t1-html-css',
          title: 'Semantic HTML5, CSS Flexbox & Grid',
          description: 'Semantic tags (header, nav, main, section, article), CSS Box Model, Flexbox alignment, and CSS Grid.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['html5', 'css', 'flexbox', 'grid'],
          learningItems: [
            { id: 'web-li-1', title: 'Semantic HTML5 elements and accessibility (a11y) tree structures', type: 'concept' },
            { id: 'web-li-2', title: 'The CSS Box Model: content, padding, border, margin, and box-sizing: border-box', type: 'concept' },
            { id: 'web-li-3', title: 'Flexbox layout: main/cross axis, justify-content, align-items, flex-grow/shrink/basis', type: 'implementation' },
            { id: 'web-li-4', title: 'CSS Grid: grid-template-columns, fr units, minmax(), and responsive auto-fill grids', type: 'implementation' },
            { id: 'web-li-5', title: 'Media queries, responsive typography, and mobile-first design philosophy', type: 'concept' },
          ],
          practice: [
            { id: 'web-pr-1', title: 'Responsive Dashboard Card Grid', description: 'Build a responsive SaaS dashboard card layout without external CSS frameworks.', difficulty: 'easy', type: 'coding' },
          ],
          assessments: [
            { id: 'web-as-1', question: 'What is the difference between `display: none` and `visibility: hidden` in the browser rendering tree?', difficulty: 'easy', type: 'interview' },
          ],
        },
        {
          id: 'web-t2-dom-events',
          title: 'JavaScript DOM APIs & Event Loop',
          description: 'querySelector, element creation, Event Bubbling & Capturing, Event Delegation, and Browser Storage.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['javascript', 'dom', 'events', 'event-loop'],
          learningItems: [
            { id: 'web-li-6', title: 'Selecting and modifying DOM elements (document.querySelector, classList, textContent)', type: 'implementation' },
            { id: 'web-li-7', title: 'Event flow: Event Capturing -> Target Phase -> Event Bubbling', type: 'concept' },
            { id: 'web-li-8', title: 'Event Delegation: attaching a single listener to a parent element to handle dynamic children', type: 'implementation' },
            { id: 'web-li-9', title: 'Browser Storage: localStorage (persistent), sessionStorage (tab lifetime), IndexedDB', type: 'concept' },
          ],
          practice: [
            { id: 'web-pr-2', title: 'Interactive Task Manager with LocalStorage Persistence', description: 'Build a dynamic CRUD task tracker using event delegation and localStorage.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'web-as-2', question: 'Explain Event Delegation in JavaScript and why it improves performance for large lists of dynamic items.', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'web-s2-http-rest-apis',
      title: 'HTTP Protocol, REST APIs & Asynchronous Web',
      description: 'HTTP methods, status codes, URLs, headers, REST conventions, JSON data, and Fetch/Async-Await.',
      order: 2,
      topics: [
        {
          id: 'web-t3-http-rest',
          title: 'HTTP/HTTPS Protocol, Methods & REST API Architecture',
          description: 'GET, POST, PUT, PATCH, DELETE, Idempotency, 2xx/3xx/4xx/5xx status codes, and REST principles.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['http', 'https', 'rest', 'api'],
          learningItems: [
            { id: 'web-li-10', title: 'HTTP Request & Response anatomy: Method, URL, Headers, Status Code, Body', type: 'concept' },
            { id: 'web-li-11', title: 'HTTP Methods and Idempotency: Safe methods (GET, HEAD) vs Idempotent (PUT, DELETE) vs Non-Idempotent (POST)', type: 'concept' },
            { id: 'web-li-12', title: 'HTTP Status Codes deep-dive: 200 OK, 201 Created, 204 No Content, 301/302 Redirects, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500/502/503 Server Errors', type: 'concept' },
            { id: 'web-li-13', title: 'RESTful Architecture Principles: Statelessness, Uniform Interface, Resource Naming (plural nouns)', type: 'concept' },
          ],
          practice: [
            { id: 'web-pr-3', title: 'RESTful API Client with Fetch and Error Handling', description: 'Write an API client class handling status code validation and exponential backoff retry.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'web-as-3', question: 'What is the exact semantic difference between PUT and PATCH methods in REST API design?', difficulty: 'easy', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'web-s3-auth-web-security',
      title: 'Authentication, Authorization & Web Security',
      description: 'Cookies, Sessions, JWT, CORS policies, XSS, CSRF, and Web Security fundamentals.',
      order: 3,
      topics: [
        {
          id: 'web-t4-cookies-jwt-security',
          title: 'Auth Mechanics, CORS, XSS & CSRF Prevention',
          description: 'Session Cookies vs JWT tokens, CORS preflight requests (OPTIONS), Content Security Policy (CSP), and defenses.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['authentication', 'jwt', 'cors', 'security', 'xss', 'csrf'],
          learningItems: [
            { id: 'web-li-14', title: 'Cookie-based Session Authentication (HttpOnly, Secure, SameSite flags) vs Stateless JWT Tokens', type: 'concept' },
            { id: 'web-li-15', title: 'JWT structure (Header.Payload.Signature), signing keys, and token refresh strategies', type: 'implementation' },
            { id: 'web-li-16', title: 'Cross-Origin Resource Sharing (CORS): Same-Origin Policy (SOP), Preflight OPTIONS request, Access-Control-Allow-Origin', type: 'concept' },
            { id: 'web-li-17', title: 'Cross-Site Scripting (XSS): Stored vs Reflected vs DOM XSS, sanitization, and CSP headers', type: 'concept' },
            { id: 'web-li-18', title: 'Cross-Site Request Forgery (CSRF): attack mechanics, Anti-CSRF tokens, and SameSite=Strict/Lax cookie defense', type: 'concept' },
          ],
          practice: [
            { id: 'web-pr-4', title: 'Secure Auth Token Storage & CORS Configuration', description: 'Configure CORS headers in backend and store tokens securely with HttpOnly cookies.', difficulty: 'medium', type: 'coding' },
          ],
          assessments: [
            { id: 'web-as-4', question: 'Why is storing JWT access tokens in browser localStorage vulnerable to XSS attacks, and what is the recommended alternative?', difficulty: 'medium', type: 'interview' },
            { id: 'web-as-5', question: 'Explain what triggers a CORS Preflight OPTIONS request and which headers are sent by the browser.', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
