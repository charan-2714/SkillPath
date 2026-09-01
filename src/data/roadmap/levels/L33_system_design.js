// src/data/roadmap/levels/L33_system_design.js
export const systemDesignLevel = {
  id: 'L33',
  title: 'System Design',
  shortTitle: 'System Design',
  description: 'Designing scalable, reliable, and maintainable systems.',
  domain: 'Advanced',
  color: 'slate',
  colorClass: 'bg-slate-500',
  textClass: 'text-slate-700',
  bgClass: 'bg-slate-50',
  borderClass: 'border-slate-200',
  subjects: [
    {
      id: 'system-design-fundamentals',
      title: 'System Design Fundamentals',
      description: 'Core concepts for designing large-scale systems',
      topics: [
        {
          id: 'sd-scalability',
          title: 'Scalability & Distributed Systems',
          description: 'Horizontal scaling, load balancing, CAP theorem',
          priority: 'core',
          tags: ['system design', 'scalability', 'distributed'],
          estimatedHours: 15,
          whatToLearn: [
            { id: 'c1', title: 'Vertical vs horizontal scaling' },
            { id: 'c2', title: 'Load balancers' },
            { id: 'c3', title: 'CAP theorem' },
            { id: 'c4', title: 'Caching strategies (Redis, Memcached)' },
            { id: 'c5', title: 'Message queues (Kafka, RabbitMQ)' },
            { id: 'c6', title: 'Database sharding and replication' },
            { id: 'c7', title: 'CDN' },
            { id: 'c8', title: 'Microservices vs monolith' },
          ],
          practice: [
            { id: 'p1', title: 'Design URL shortener', description: 'Design a URL shortening service like bit.ly', difficulty: 'medium' },
            { id: 'p2', title: 'Design a RAG system architecture', description: 'Design a production-grade RAG system', difficulty: 'hard' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain CAP theorem.', difficulty: 'hard' },
            { id: 'iq2', question: 'Design a real-time analytics system.', difficulty: 'hard' },
            { id: 'iq3', question: 'How would you design a production RAG pipeline?', difficulty: 'hard' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
