// src/data/roadmap/levels/L19_llm.js
export const llmFundamentalsLevel = {
  id: 'L19',
  title: 'LLM Fundamentals',
  shortTitle: 'LLM Basics',
  description: 'How large language models work, tokens, context, and capabilities.',
  domain: 'Generative AI',
  color: 'orange',
  colorClass: 'bg-orange-500',
  textClass: 'text-orange-700',
  bgClass: 'bg-orange-50',
  borderClass: 'border-orange-200',
  subjects: [
    {
      id: 'llm-concepts',
      title: 'LLM Concepts',
      description: 'Transformers, tokenization, and LLM internals',
      topics: [
        {
          id: 'llm-how-they-work',
          title: 'How LLMs Work',
          description: 'Transformers architecture, attention, tokenization',
          priority: 'core',
          tags: ['llm', 'transformers', 'attention'],
          estimatedHours: 10,
          whatToLearn: [
            { id: 'c1', title: 'Transformer architecture overview' },
            { id: 'c2', title: 'Self-attention mechanism' },
            { id: 'c3', title: 'Tokenization and vocabulary' },
            { id: 'c4', title: 'Context window and tokens' },
            { id: 'c5', title: 'Temperature and sampling strategies' },
            { id: 'c6', title: 'RLHF and instruction tuning' },
            { id: 'c7', title: 'Model families (GPT, Claude, Gemini, Llama)' },
          ],
          practice: [],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain self-attention in simple terms.', difficulty: 'hard' },
            { id: 'iq2', question: 'What is a token? How many tokens are in a typical sentence?', difficulty: 'easy' },
            { id: 'iq3', question: 'What is temperature in LLM inference?', difficulty: 'medium' },
          ],
          resources: [
            { id: 'r1', title: 'Attention Is All You Need (paper)', url: 'https://arxiv.org/abs/1706.03762', type: 'Article' },
          ],
        },
        {
          id: 'llm-apis',
          title: 'LLM APIs',
          description: 'Using OpenAI, Anthropic, Google, and open-source LLM APIs',
          priority: 'core',
          tags: ['llm', 'api', 'openai', 'anthropic'],
          estimatedHours: 8,
          whatToLearn: [
            { id: 'c1', title: 'OpenAI API chat completions' },
            { id: 'c2', title: 'Streaming responses' },
            { id: 'c3', title: 'System/user/assistant message roles' },
            { id: 'c4', title: 'Token usage and cost estimation' },
            { id: 'c5', title: 'Anthropic Claude API' },
            { id: 'c6', title: 'Structured output (JSON mode)' },
          ],
          practice: [
            { id: 'p1', title: 'Streaming chatbot', description: 'Build a streaming chatbot using OpenAI API', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'How do you control output format from an LLM?', difficulty: 'medium' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
