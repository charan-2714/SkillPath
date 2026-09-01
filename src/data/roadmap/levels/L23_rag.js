// src/data/roadmap/levels/L23_rag.js
export const ragLevel = {
  id: 'L23',
  title: 'RAG Systems',
  shortTitle: 'RAG',
  description: 'Retrieval-Augmented Generation: building knowledge-powered AI systems.',
  domain: 'Generative AI',
  color: 'emerald',
  colorClass: 'bg-emerald-500',
  textClass: 'text-emerald-700',
  bgClass: 'bg-emerald-50',
  borderClass: 'border-emerald-200',
  subjects: [
    {
      id: 'rag-fundamentals',
      title: 'RAG Fundamentals',
      description: 'Building retrieval-augmented generation systems',
      topics: [
        {
          id: 'rag-pipeline',
          title: 'RAG Pipeline',
          description: 'Designing and implementing a complete RAG pipeline',
          priority: 'core',
          tags: ['rag', 'retrieval', 'llm', 'vector-db'],
          estimatedHours: 15,
          whatToLearn: [
            { id: 'c1', title: 'RAG architecture overview' },
            { id: 'c2', title: 'Document loading and chunking strategies' },
            { id: 'c3', title: 'Embedding models' },
            { id: 'c4', title: 'Vector stores (Pinecone, Chroma, Weaviate)' },
            { id: 'c5', title: 'Similarity search' },
            { id: 'c6', title: 'Context injection into prompts' },
            { id: 'c7', title: 'Re-ranking' },
            { id: 'c8', title: 'Evaluation of RAG systems' },
          ],
          practice: [
            { id: 'p1', title: 'Document Q&A', description: 'Build a Q&A system over PDF documents', difficulty: 'hard' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain the full RAG pipeline from document to answer.', difficulty: 'hard' },
            { id: 'iq2', question: 'What chunking strategies exist and when do you use each?', difficulty: 'hard' },
            { id: 'iq3', question: 'How would you evaluate a RAG system?', difficulty: 'hard' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
