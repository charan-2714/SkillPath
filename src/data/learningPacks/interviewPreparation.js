// src/data/learningPacks/interviewPreparation.js
// Canonical Learning Pack: Technical & Behavioral Interview Preparation

export const interviewPreparationPack = {
  id: 'pack-interview-prep',
  slug: 'interview-preparation',
  title: 'Interview Preparation',
  category: 'Career & Interview',
  difficulty: 'Intermediate to Advanced',
  priority: 'High',
  estimatedHours: 40,
  version: '2.0',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-28',
  description: 'Complete technical drill-downs (Python, Java, C++, JavaScript, DSA, OOP, DBMS, OS, Networks, SQL), System Design mock rounds, and Behavioral STAR framework interview mastery (HR & Hiring Manager rounds).',
  targetUsers: 'Students preparing for campus placements, engineers preparing for technical interviews, and candidates facing HR/Hiring Manager rounds.',
  prerequisites: ['Basic DSA, CS Fundamentals, and language knowledge'],
  tags: ['interview-prep', 'technical-interview', 'behavioral', 'star-method', 'hr-round', 'system-design', 'placements'],
  relatedPacks: ['pack-dsa-problem-solving', 'pack-cs-fundamentals', 'pack-sql-databases', 'pack-resume-projects'],
  relatedTemplates: ['software-developer-placement', 'ai-ml-engineer', 'full-stack-developer'],
  careerRelevance: 'The final gatekeeper for securing job offers, negotiating compensation, and demonstrating communication fluency.',
  learningOutcomes: [
    'Deliver a crisp 90-second "Tell Me About Yourself" pitch connecting past achievements to the target role',
    'Structure answers to technical deep-dive questions (OOP, DBMS, OS, Networks, SQL) without hesitation',
    'Frame compelling behavioral answers using the STAR (Situation, Task, Action, Result) methodology',
    'Explain complex project architectures, trade-offs, bug debugging sagas, and scale bottlenecks clearly',
    'Navigate tricky HR questions: Strengths/Weaknesses, Why Our Company?, Conflict, Failures, and Salary expectations',
  ],
  subjects: [
    {
      id: 'ip-s1-technical-interviews',
      title: 'Technical Interview Mastery (Languages, CS & SQL)',
      description: 'High-frequency core questions across Python, Java, C++, JavaScript, OOP, DBMS, OS, Networks, and SQL.',
      order: 1,
      topics: [
        {
          id: 'ip-t1-language-drills',
          title: 'Language Deep-Dives: Python, Java, C++ & JavaScript',
          description: 'Memory models, garbage collection, closures, pointers, GIL, event loop, and virtual functions.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['python', 'java', 'cpp', 'javascript', 'interviews'],
          learningItems: [
            { id: 'ip-li-1', title: 'Python: GIL mechanics, decorators, generators vs iterators, mutable default arguments, deep vs shallow copy', type: 'concept' },
            { id: 'ip-li-2', title: 'Java: JVM architecture (Heap, Stack, Metaspace), Garbage Collection (G1GC), equals() vs hashCode() contract, String pool immutability', type: 'concept' },
            { id: 'ip-li-3', title: 'C++: Pointers vs references, smart pointers (unique_ptr, shared_ptr), RAII, virtual destructors, vtable mechanism', type: 'concept' },
            { id: 'ip-li-4', title: 'JavaScript: Event loop (microtasks vs macrotasks), closures, prototypal inheritance, Promises vs async/await, hoisting', type: 'concept' },
          ],
          practice: [
            { id: 'ip-pr-1', title: 'Language Rapid-Fire Mock Quiz', description: 'Answer 25 tricky language output prediction and internals questions.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'ip-as-1', question: 'Explain the equals() and hashCode() contract in Java. What happens if you override equals() without hashCode() in a HashMap?', difficulty: 'medium', type: 'interview' },
            { id: 'ip-as-2', question: 'How does Python\'s Global Interpreter Lock (GIL) impact CPU-bound multithreading versus I/O-bound asyncio?', difficulty: 'medium', type: 'interview' },
          ],
        },
        {
          id: 'ip-t2-cs-sql-interviews',
          title: 'CS Fundamentals & SQL Technical Drills',
          description: 'Top 50 most asked questions in OOP, DBMS, OS, Computer Networks, and live SQL whiteboard coding.',
          priority: 'core',
          estimatedHours: 5,
          tags: ['oop', 'dbms', 'os', 'networks', 'sql', 'technical-interview'],
          learningItems: [
            { id: 'ip-li-5', title: 'OOP: Compile-time vs runtime polymorphism, Abstract class vs interface, SOLID real-world violation examples', type: 'concept' },
            { id: 'ip-li-6', title: 'DBMS & SQL: Normalization trade-offs, Index internals (B+ Tree), ACID transaction isolation anomalies, writing window functions live', type: 'concept' },
            { id: 'ip-li-7', title: 'OS: Process vs Thread, Context switching, Mutex vs Semaphore, 4 Coffman conditions for deadlocks', type: 'concept' },
            { id: 'ip-li-8', title: 'Networks: What happens when you type a URL?, TCP 3-way handshake, HTTP 1.1 vs HTTP 2 vs HTTP 3, SSL/TLS handshake', type: 'concept' },
          ],
          practice: [
            { id: 'ip-pr-2', title: 'Live Technical Whiteboard Mock Interview', description: 'Simulate answering 10 rapid technical questions under a 30-minute interview timer.', difficulty: 'hard', type: 'interview' },
          ],
          assessments: [
            { id: 'ip-as-3', question: 'How would you explain the difference between a Process and a Thread to a non-technical stakeholder vs a Senior Principal Engineer?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'ip-s2-project-explanation',
      title: 'Project Deep-Dive & Architecture Defense',
      description: 'Explaining portfolio projects, system architecture, database schema decisions, trade-offs, and debugging war stories.',
      order: 2,
      topics: [
        {
          id: 'ip-t3-project-breakdown',
          title: 'Structuring Project Explanations (Problem -> Architecture -> Trade-offs)',
          description: 'The 3-minute project walkthrough formula, architecture diagrams, scalability considerations, and challenges overcome.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['projects', 'architecture', 'trade-offs', 'storytelling'],
          learningItems: [
            { id: 'ip-li-9', title: 'The 3-Minute Project Formula: 1. Business Problem & User Pain Point, 2. High-Level Tech Stack & Architecture, 3. Your Specific Individual Contribution, 4. Key Metrics & Outcomes', type: 'concept' },
            { id: 'ip-li-10', title: 'Defending Technical Trade-offs: "Why SQL over NoSQL?", "Why FastAPI over Django?", "Why Redux over Context API?"', type: 'concept' },
            { id: 'ip-li-11', title: 'The "Hardest Bug I Ever Solved" storytelling framework: Symptoms -> Hypothesis -> Investigation -> Root Cause -> Fix -> Preventative Test', type: 'implementation' },
          ],
          practice: [
            { id: 'ip-pr-3', title: 'Record 3-Minute Project Pitch Video', description: 'Deliver a concise 3-minute architectural walkthrough of your primary resume project.', difficulty: 'medium', type: 'interview' },
          ],
          assessments: [
            { id: 'ip-as-4', question: 'If you had to scale your primary project to handle 100,000 concurrent daily active users, what component would break first and how would you re-architect it?', difficulty: 'hard', type: 'interview' },
          ],
        },
      ],
    },
    {
      id: 'ip-s3-behavioral-hr',
      title: 'Behavioral Interviews (STAR Framework) & HR Round',
      description: 'Tell me about yourself, Strengths/Weaknesses, Conflict resolution, Leadership, Why this company?, and Salary negotiation.',
      order: 3,
      topics: [
        {
          id: 'ip-t4-behavioral-star',
          title: 'The STAR Behavioral Story Bank',
          description: 'Structuring answers using Situation, Task, Action, Result for leadership, conflict, mistakes, and pressure scenarios.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['star-framework', 'behavioral', 'hr', 'leadership', 'conflict'],
          learningItems: [
            { id: 'ip-li-12', title: 'The STAR Framework: Situation (20%), Task (10%), Action (60% focus on YOU), Result (10% with quantifiable numbers)', type: 'concept' },
            { id: 'ip-li-13', title: 'Building a 5-Story Reusable Master Bank: 1. Technical Disagreement, 2. Production Failure/Mistake, 3. Tight Deadline Under Pressure, 4. Leadership & Mentorship, 5. Unfamiliar Technology Adoption', type: 'implementation' },
            { id: 'ip-li-14', title: 'Answering "Tell Me About Yourself" (Present -> Past -> Future alignment)', type: 'implementation' },
            { id: 'ip-li-15', title: 'Handling tricky questions: "What is your biggest weakness?", "Why do you want to join our company?", "Where do you see yourself in 5 years?"', type: 'concept' },
            { id: 'ip-li-16', title: 'Asking impactful reverse-interview questions to the hiring manager at the end of the interview', type: 'implementation' },
          ],
          practice: [
            { id: 'ip-pr-4', title: 'Write Your 5-Story Master STAR Matrix', description: 'Document 5 complete STAR stories covering all major behavioral competency categories.', difficulty: 'easy', type: 'reading' },
          ],
          assessments: [
            { id: 'ip-as-5', question: 'Describe a situation where you had a strong technical disagreement with a team member. How did you resolve it and what was the outcome?', difficulty: 'medium', type: 'interview' },
            { id: 'ip-as-6', question: 'Tell me about a time you made a significant mistake on a project. What happened, and how did you handle the aftermath?', difficulty: 'medium', type: 'interview' },
          ],
        },
      ],
    },
  ],
};
