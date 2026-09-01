// src/data/roadmap/placeholder.js
// Placeholder levels for curriculum areas not yet fully detailed.
// Replace each with a real detailed file when curriculum is ready.

function makePlaceholderLevel(id, title, shortTitle, domain, color, colorClass, textClass, bgClass, borderClass, subjects) {
  return {
    id,
    title,
    shortTitle,
    description: `${title} - curriculum coming soon.`,
    domain,
    color,
    colorClass,
    textClass,
    bgClass,
    borderClass,
    subjects: subjects || [
      {
        id: `${id.toLowerCase()}-main`,
        title: title,
        description: `Core ${title} topics`,
        topics: [
          {
            id: `${id.toLowerCase()}-intro`,
            title: `Introduction to ${title}`,
            description: `Foundational concepts of ${title}`,
            priority: 'core',
            tags: [title.toLowerCase()],
            estimatedHours: 8,
            whatToLearn: [
              { id: 'c1', title: `${title} fundamentals` },
              { id: 'c2', title: `Core ${title} concepts` },
              { id: 'c3', title: `${title} best practices` },
            ],
            practice: [],
            interviewQuestions: [],
            resources: [],
          },
        ],
      },
    ],
  };
}

export const placeholderLevels = [
  makePlaceholderLevel('L6', 'Python Automation', 'Automation', 'Foundation', 'lime', 'bg-lime-500', 'text-lime-700', 'bg-lime-50', 'border-lime-200'),
  makePlaceholderLevel('L7', 'Web Scraping', 'Scraping', 'Foundation', 'yellow', 'bg-yellow-500', 'text-yellow-700', 'bg-yellow-50', 'border-yellow-200'),
  makePlaceholderLevel('L8', 'HTML & BeautifulSoup', 'HTML', 'Foundation', 'red', 'bg-red-400', 'text-red-700', 'bg-red-50', 'border-red-200'),
  makePlaceholderLevel('L10', 'Testing & Pytest', 'Testing', 'Foundation', 'sky', 'bg-sky-500', 'text-sky-700', 'bg-sky-50', 'border-sky-200'),
  makePlaceholderLevel('L11', 'SQL & Databases', 'SQL', 'Foundation', 'indigo', 'bg-indigo-400', 'text-indigo-700', 'bg-indigo-50', 'border-indigo-200'),
  makePlaceholderLevel('L12', 'JavaScript', 'JavaScript', 'Foundation', 'amber', 'bg-amber-400', 'text-amber-700', 'bg-amber-50', 'border-amber-200'),
  makePlaceholderLevel('L13', 'Node.js', 'Node.js', 'Foundation', 'green', 'bg-green-600', 'text-green-700', 'bg-green-50', 'border-green-200'),
  makePlaceholderLevel('L14', 'DSA', 'DSA', 'AI / ML', 'purple', 'bg-purple-400', 'text-purple-700', 'bg-purple-50', 'border-purple-200'),
  makePlaceholderLevel('L15', 'Mathematics for ML', 'Math for ML', 'AI / ML', 'fuchsia', 'bg-fuchsia-500', 'text-fuchsia-700', 'bg-fuchsia-50', 'border-fuchsia-200'),
  makePlaceholderLevel('L18', 'Transformers', 'Transformers', 'AI / ML', 'violet', 'bg-violet-500', 'text-violet-700', 'bg-violet-50', 'border-violet-200'),
  makePlaceholderLevel('L20', 'Prompt Engineering', 'Prompt Eng', 'Generative AI', 'orange', 'bg-orange-400', 'text-orange-700', 'bg-orange-50', 'border-orange-200'),
  makePlaceholderLevel('L21', 'LLM APIs & Structured Output', 'LLM APIs', 'Generative AI', 'teal', 'bg-teal-400', 'text-teal-700', 'bg-teal-50', 'border-teal-200'),
  makePlaceholderLevel('L22', 'Embeddings & Vector DBs', 'Embeddings', 'Generative AI', 'cyan', 'bg-cyan-500', 'text-cyan-700', 'bg-cyan-50', 'border-cyan-200'),
  makePlaceholderLevel('L24', 'Tool & Function Calling', 'Tool Calling', 'Generative AI', 'emerald', 'bg-emerald-400', 'text-emerald-700', 'bg-emerald-50', 'border-emerald-200'),
  makePlaceholderLevel('L26', 'LangChain & LangGraph', 'LangChain', 'Generative AI', 'blue', 'bg-blue-500', 'text-blue-700', 'bg-blue-50', 'border-blue-200'),
  makePlaceholderLevel('L27', 'MCP', 'MCP', 'Generative AI', 'rose', 'bg-rose-400', 'text-rose-700', 'bg-rose-50', 'border-rose-200'),
  makePlaceholderLevel('L28', 'Advanced AI & Multimodal', 'Multimodal', 'Generative AI', 'pink', 'bg-pink-400', 'text-pink-700', 'bg-pink-50', 'border-pink-200'),
  makePlaceholderLevel('L29', 'LLM Evaluation & Observability', 'LLM Eval', 'Advanced', 'slate', 'bg-slate-400', 'text-slate-700', 'bg-slate-50', 'border-slate-200'),
  makePlaceholderLevel('L30', 'AI Security', 'AI Security', 'Advanced', 'red', 'bg-red-500', 'text-red-700', 'bg-red-50', 'border-red-200'),
  makePlaceholderLevel('L31', 'Docker & CI/CD', 'DevOps', 'Advanced', 'blue', 'bg-blue-600', 'text-blue-700', 'bg-blue-50', 'border-blue-200'),
  makePlaceholderLevel('L32', 'Cloud', 'Cloud', 'Advanced', 'sky', 'bg-sky-400', 'text-sky-700', 'bg-sky-50', 'border-sky-200'),
  makePlaceholderLevel('L34', 'Production AI Engineering', 'Prod AI', 'Advanced', 'indigo', 'bg-indigo-600', 'text-indigo-700', 'bg-indigo-50', 'border-indigo-200'),
  makePlaceholderLevel('L35', 'Projects', 'Projects', 'Advanced', 'green', 'bg-green-500', 'text-green-700', 'bg-green-50', 'border-green-200'),
  makePlaceholderLevel('L36', 'Interview Preparation', 'Interview Prep', 'Advanced', 'purple', 'bg-purple-600', 'text-purple-700', 'bg-purple-50', 'border-purple-200'),
  makePlaceholderLevel('L37', 'Technology Radar', 'Tech Radar', 'Advanced', 'amber', 'bg-amber-600', 'text-amber-700', 'bg-amber-50', 'border-amber-200'),
];
