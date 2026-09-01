// src/data/roadmap/levels/L25_agents.js
export const agentsLevel = {
  id: 'L25',
  title: 'Agentic AI',
  shortTitle: 'AI Agents',
  description: 'Building autonomous AI agents with tools, memory, and planning.',
  domain: 'Generative AI',
  color: 'rose',
  colorClass: 'bg-rose-500',
  textClass: 'text-rose-700',
  bgClass: 'bg-rose-50',
  borderClass: 'border-rose-200',
  subjects: [
    {
      id: 'agents-fundamentals',
      title: 'Agent Fundamentals',
      description: 'Core concepts of agentic AI systems',
      topics: [
        {
          id: 'agents-concepts',
          title: 'Agent Concepts',
          description: 'What are AI agents, ReAct pattern, tool use, memory',
          priority: 'core',
          tags: ['agents', 'llm', 'tool-use', 'react'],
          estimatedHours: 12,
          whatToLearn: [
            { id: 'c1', title: 'What is an AI agent?' },
            { id: 'c2', title: 'ReAct (Reasoning + Acting) pattern' },
            { id: 'c3', title: 'Tool / function calling' },
            { id: 'c4', title: 'Memory types: short-term, long-term, episodic' },
            { id: 'c5', title: 'Planning strategies' },
            { id: 'c6', title: 'Multi-agent systems' },
            { id: 'c7', title: 'Agent evaluation' },
          ],
          practice: [
            { id: 'p1', title: 'Research agent', description: 'Build an agent that can search and summarize information', difficulty: 'hard' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What is an AI agent and how does it differ from a chatbot?', difficulty: 'medium' },
            { id: 'iq2', question: 'Explain the ReAct pattern.', difficulty: 'hard' },
            { id: 'iq3', question: 'What are the main challenges in multi-agent systems?', difficulty: 'hard' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
