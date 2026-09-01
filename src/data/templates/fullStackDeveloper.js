// src/data/templates/fullStackDeveloper.js
export const fullStackDeveloperTemplate = {
  id: 'template-fullstack-dev',
  name: 'Full Stack Developer Roadmap',
  description: 'Master modern full-stack web development from HTML/CSS/JS fundamentals to React, Node.js, databases, and cloud deployment.',
  goal: 'Job-Ready Full Stack Engineer',
  category: 'Technology',
  difficulty: 'Beginner to Advanced',
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
      title: 'Web & Programming Foundations',
      description: 'HTML5 semantic structure, CSS3 responsive styling, and modern JavaScript syntax.',
      order: 0,
      color: 'slate',
      subjects: [
        {
          id: 'L0-S1',
          title: 'Frontend Basics',
          order: 1,
          topics: [
            {
              id: 'L0-T1',
              title: 'Semantic HTML5 & Accessibility',
              description: 'Semantic tags, ARIA attributes, forms, and responsive viewport meta.',
              priority: 'core',
              tags: ['html', 'accessibility'],
              learningItems: [
                { id: 'fs-l0-1', title: 'Use semantic structure: header, nav, main, section, article, footer' },
                { id: 'fs-l0-2', title: 'Accessible forms with label association and validation' },
              ],
            },
            {
              id: 'L0-T2',
              title: 'Modern CSS & Flexbox / Grid',
              description: 'CSS box model, Flexbox layouts, CSS Grid, media queries, and variables.',
              priority: 'core',
              tags: ['css', 'responsive'],
            },
            {
              id: 'L0-T3',
              title: 'JavaScript ES6+ & DOM Manipulation',
              description: 'Variables (let/const), arrow functions, destructuring, Promises, async/await, and event listeners.',
              priority: 'core',
              tags: ['javascript', 'es6'],
            },
          ],
        },
      ],
    },
    {
      id: 'L1',
      title: 'Frontend Frameworks (React & Next.js)',
      description: 'Component architecture, hooks, state management, routing, and server-side rendering.',
      order: 1,
      color: 'indigo',
      subjects: [
        {
          id: 'L1-S1',
          title: 'React Ecosystem',
          order: 1,
          topics: [
            {
              id: 'L1-T1',
              title: 'React Hooks & State Flow',
              description: 'useState, useEffect, useMemo, useCallback, useRef, and custom hooks.',
              priority: 'core',
              tags: ['react', 'hooks'],
            },
            {
              id: 'L1-T2',
              title: 'Next.js App Router & Server Components',
              description: 'Server Components, Client Components, dynamic routes, and server actions.',
              priority: 'core',
              tags: ['nextjs', 'react'],
            },
          ],
        },
      ],
    },
    {
      id: 'L2',
      title: 'Backend & APIs (Node.js & Express)',
      description: 'Building robust REST and GraphQL APIs, authentication, and middleware.',
      order: 2,
      color: 'teal',
      subjects: [
        {
          id: 'L2-S1',
          title: 'Server-Side Engineering',
          order: 1,
          topics: [
            {
              id: 'L2-T1',
              title: 'Express REST API Architecture',
              description: 'Routing, middleware pipelines, error handlers, and input validation with Zod.',
              priority: 'core',
              tags: ['nodejs', 'express'],
            },
            {
              id: 'L2-T2',
              title: 'Authentication & Security (JWT, OAuth)',
              description: 'Password hashing with bcrypt, JWT tokens, secure HTTP-only cookies, and CORS.',
              priority: 'core',
              tags: ['security', 'auth'],
            },
          ],
        },
      ],
    },
    {
      id: 'L3',
      title: 'Databases & ORMs',
      description: 'PostgreSQL, MongoDB, Prisma ORM, database schema migrations, and indexing.',
      order: 3,
      color: 'blue',
      subjects: [
        {
          id: 'L3-S1',
          title: 'Data Persistence',
          order: 1,
          topics: [
            {
              id: 'L3-T1',
              title: 'PostgreSQL & Prisma ORM',
              description: 'Relational modeling, one-to-many/many-to-many relations, migrations, and queries.',
              priority: 'core',
              tags: ['sql', 'postgres', 'prisma'],
            },
          ],
        },
      ],
    },
    {
      id: 'L4',
      title: 'DevOps & Cloud Deployment',
      description: 'Docker containers, GitHub Actions CI/CD, and deploying to Vercel and AWS/Render.',
      order: 4,
      color: 'purple',
      subjects: [
        {
          id: 'L4-S1',
          title: 'Deployment & CI/CD',
          order: 1,
          topics: [
            {
              id: 'L4-T1',
              title: 'Docker & Production Builds',
              description: 'Multi-stage Dockerfiles, docker-compose for local DB, and cloud deployment.',
              priority: 'core',
              tags: ['docker', 'devops'],
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-fs-1',
      name: 'Full Stack SaaS Task Manager',
      description: 'Production React + Node + PostgreSQL application with auth and real-time updates.',
      goal: 'Portfolio cornerstone project',
      technologies: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma'],
      status: 'planning',
      progress: 0,
      checklist: [
        { id: 'c1', title: 'Database schema & migrations', completed: false },
        { id: 'c2', title: 'Auth API endpoints (JWT)', completed: false },
        { id: 'c3', title: 'React frontend UI', completed: false },
      ],
    },
  ],
};
