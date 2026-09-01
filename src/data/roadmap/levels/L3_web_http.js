// src/data/roadmap/levels/L3_web_http.js
export const webHttpLevel = {
  id: 'L3',
  title: 'Web & HTTP',
  shortTitle: 'Web & HTTP',
  description: 'How the web works under the hood.',
  domain: 'Foundation',
  color: 'cyan',
  colorClass: 'bg-cyan-500',
  textClass: 'text-cyan-700',
  bgClass: 'bg-cyan-50',
  borderClass: 'border-cyan-200',
  subjects: [
    {
      id: 'http-fundamentals',
      title: 'HTTP Fundamentals',
      description: 'HTTP protocol, methods, headers, and status codes',
      topics: [
        {
          id: 'http-methods-status',
          title: 'HTTP Methods & Status Codes',
          description: 'GET, POST, PUT, PATCH, DELETE and HTTP response codes',
          priority: 'core',
          tags: ['http', 'web', 'rest'],
          estimatedHours: 4,
          whatToLearn: [
            { id: 'c1', title: 'HTTP methods: GET, POST, PUT, PATCH, DELETE' },
            { id: 'c2', title: '2xx, 3xx, 4xx, 5xx status codes' },
            { id: 'c3', title: 'Request and response headers' },
            { id: 'c4', title: 'Content-Type and Accept headers' },
            { id: 'c5', title: 'Authentication headers (Bearer, Basic)' },
          ],
          practice: [
            { id: 'p1', title: 'HTTP exploration', description: 'Use curl/Postman to explore REST API endpoints', difficulty: 'easy' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What is the difference between PUT and PATCH?', difficulty: 'easy' },
            { id: 'iq2', question: 'What does a 422 status code mean?', difficulty: 'medium' },
          ],
          resources: [],
        },
        {
          id: 'http-cookies-sessions',
          title: 'Cookies, Sessions & Auth',
          description: 'Cookie-based and token-based authentication',
          priority: 'core',
          tags: ['http', 'auth', 'cookies', 'jwt'],
          estimatedHours: 5,
          whatToLearn: [
            { id: 'c1', title: 'Cookies vs sessions' },
            { id: 'c2', title: 'JWT tokens' },
            { id: 'c3', title: 'CORS fundamentals' },
            { id: 'c4', title: 'HTTPS and TLS' },
            { id: 'c5', title: 'OAuth 2.0 basics' },
          ],
          practice: [],
          interviewQuestions: [
            { id: 'iq1', question: 'What is CORS and how do you fix a CORS error?', difficulty: 'medium' },
            { id: 'iq2', question: 'Explain JWT structure.', difficulty: 'medium' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
