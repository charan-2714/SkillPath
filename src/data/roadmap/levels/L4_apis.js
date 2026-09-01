// src/data/roadmap/levels/L4_apis.js
export const apisBackendLevel = {
  id: 'L4',
  title: 'APIs & Backend',
  shortTitle: 'APIs',
  description: 'Building and consuming APIs with FastAPI and REST principles.',
  domain: 'Foundation',
  color: 'teal',
  colorClass: 'bg-teal-500',
  textClass: 'text-teal-700',
  bgClass: 'bg-teal-50',
  borderClass: 'border-teal-200',
  subjects: [
    {
      id: 'fastapi',
      title: 'FastAPI',
      description: 'Modern Python API framework',
      topics: [
        {
          id: 'fastapi-basics',
          title: 'FastAPI Basics',
          description: 'Building REST APIs with FastAPI',
          priority: 'core',
          tags: ['fastapi', 'python', 'api', 'rest'],
          estimatedHours: 8,
          whatToLearn: [
            { id: 'c1', title: 'FastAPI project structure' },
            { id: 'c2', title: 'Path parameters and query parameters' },
            { id: 'c3', title: 'Pydantic models for request/response' },
            { id: 'c4', title: 'Dependency injection' },
            { id: 'c5', title: 'Background tasks' },
            { id: 'c6', title: 'Middleware' },
            { id: 'c7', title: 'Exception handlers' },
            { id: 'c8', title: 'OpenAPI documentation' },
          ],
          practice: [
            { id: 'p1', title: 'CRUD API', description: 'Build a complete CRUD REST API with FastAPI', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What makes FastAPI fast?', difficulty: 'medium' },
            { id: 'iq2', question: 'How does dependency injection work in FastAPI?', difficulty: 'hard' },
          ],
          resources: [
            { id: 'r1', title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', type: 'Documentation' },
          ],
        },
        {
          id: 'api-design',
          title: 'REST API Design',
          description: 'Principles and best practices for designing REST APIs',
          priority: 'important',
          tags: ['rest', 'api design', 'architecture'],
          estimatedHours: 5,
          whatToLearn: [
            { id: 'c1', title: 'REST constraints and principles' },
            { id: 'c2', title: 'Resource naming conventions' },
            { id: 'c3', title: 'Pagination strategies' },
            { id: 'c4', title: 'Error response structure' },
            { id: 'c5', title: 'Versioning strategies' },
          ],
          practice: [],
          interviewQuestions: [
            { id: 'iq1', question: 'What are the 6 constraints of REST?', difficulty: 'hard' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
