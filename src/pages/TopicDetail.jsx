// src/pages/TopicDetail.jsx
// Detailed Topic workspace with dynamic skill ratings, learning checklist, practice, debugging, assessments, resources, notes, and AI independence check

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Code2,
  CheckCircle2,
  StickyNote,
  Library,
  Star,
  Clock,
  Sparkles,
  AlertTriangle,
  BrainCircuit,
  Bug,
  Target,
  Shield,
  Layers,
  Copy,
  Check,
  Eye,
  Maximize2,
  Lightbulb,
  FileText,
  Search,
  Binary,
  ArrowRight,
  Upload,
  FileUp,
  Film,
  Download,
  File,
  Video,
  Play,
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { StatusBadge, STATUSES } from '../components/common/StatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { Tabs } from '../components/common/Tabs';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { getVerifiedResources } from '../utils/verifiedResources';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useAppState } from '../context/AppContext';
import { useJourney } from '../hooks/useJourney';
import { useToast } from '../context/ToastContext';
import { calculateTopicProgress } from '../utils/calculations';
import {
  DEFAULT_SKILL_DIMENSIONS,
  PRACTICE_TYPES,
  PRACTICE_STATUSES,
  DEBUGGING_ERROR_TYPES,
  DEBUGGING_STATUSES,
  ASSESSMENT_TYPES,
  ASSESSMENT_STATUSES,
  RESOURCE_TYPES,
  TOPIC_STATUSES,
} from '../models/journeySchema';

const SCORE_LABELS = {
  0: 'Not Assessed',
  1: 'Novice (Concept)',
  2: 'Fundamental (Assisted)',
  3: 'Competent (Working)',
  4: 'Advanced (Production)',
  5: 'Mastered (Expert)',
};

const SCORE_COLORS = {
  0: 'text-gray-500 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  1: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60',
  2: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
  3: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60',
  4: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60',
  5: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
};

function SkillDimensionRating({ dimension, score = 0, onChange }) {
  const [hoverScore, setHoverScore] = useState(null);
  const maxScore = dimension.maxScore || 5;
  const currentVal = Number(score) || 0;
  const activeRating = hoverScore !== null ? hoverScore : currentVal;

  const handleClick = (num) => {
    setHoverScore(null);
    if (currentVal === num) {
      onChange(0); // Clicking active score resets it
    } else {
      onChange(num);
    }
  };

  return (
    <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
            {dimension.name}
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            {dimension.description || 'Self-rated technical proficiency'}
          </div>
        </div>

        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
            SCORE_COLORS[activeRating] || SCORE_COLORS[0]
          }`}
        >
          {SCORE_LABELS[activeRating] || 'Not Rated'} ({activeRating}/{maxScore})
        </span>
      </div>

      {/* Clickable Interactive Rating 1 to 5 Track */}
      <div
        className="flex items-center gap-1.5 pt-1"
        onMouseLeave={() => setHoverScore(null)}
      >
        {Array.from({ length: maxScore }, (_, i) => i + 1).map((num) => {
          const isFilled = num <= activeRating;
          const isSelected = num <= currentVal;

          return (
            <button
              key={num}
              type="button"
              onClick={() => handleClick(num)}
              onMouseEnter={() => setHoverScore(num)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer select-none border ${
                isFilled
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-xs scale-[1.02]'
                  : isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                  : 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 border-transparent'
              }`}
              title={`Rate ${num}/${maxScore}: ${SCORE_LABELS[num]} (Click again to reset)`}
            >
              <Star className={`w-3 h-3 ${isFilled ? 'fill-white text-white' : ''}`} />
              <span>{num}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getSubtopicDetails(subtopicTitle, topicTitle = '') {
  const titleLower = (subtopicTitle || '').toLowerCase();
  
  let explanation = '';
  let codeSnippet = '';
  let pitfalls = [];
  let keyTakeaways = [];

  if (titleLower.includes('positional') && titleLower.includes('keyword')) {
    explanation = 'Positional arguments are passed by position and mapped strictly to parameters in order. Keyword arguments are passed as key=value pairs, enabling arbitrary order and self-documenting invocations.';
    codeSnippet = `# Positional vs Keyword Arguments
def configure_model(name, layers, learning_rate=0.001):
    return f"Model: {name}, Layers: {layers}, LR: {learning_rate}"

# Positional invocation (mapped strictly in declaration order)
print(configure_model("Transformer", 12))

# Keyword invocation (order independent & explicit)
print(configure_model(learning_rate=0.0001, name="ResNet", layers=50))`;
    pitfalls = [
      'Passing a positional argument AFTER a keyword argument raises a SyntaxError.',
      'Renaming function parameters breaks external callers relying on keyword arguments.',
    ];
    keyTakeaways = [
      'Positional arguments must precede keyword arguments in invocations.',
      'Keyword arguments make API calls explicit and easy to read.',
    ];
  } else if (titleLower.includes('*args') || titleLower.includes('**kwargs')) {
    explanation = '*args collects variable positional arguments into an immutable tuple. **kwargs collects variable keyword arguments into a mutable dictionary, enabling flexible variadic interfaces and universal function wrappers/decorators.';
    codeSnippet = `# Variadic parameters with *args and **kwargs
def log_pipeline(step_name, *metrics, **config):
    print(f"Step: {step_name}")
    print(f"Metrics (tuple): {metrics}")
    print(f"Config (dict): {config}")

# Unpacking callers:
log_pipeline("Training", 0.95, 0.98, batch_size=64, epochs=10)

# Unpacking collections into functions:
extra_metrics = (0.91, 0.89)
hyperparams = {"lr": 0.001, "optimizer": "AdamW"}
log_pipeline("Validation", *extra_metrics, **hyperparams)`;
    pitfalls = [
      'Overusing *args and **kwargs obscures signatures and disables IDE parameter autocomplete.',
      'Unpacking a non-dictionary with ** raises a TypeError.',
    ];
    keyTakeaways = [
      '*args is always received as a tuple; **kwargs is received as a dictionary.',
      'Always use *args and **kwargs when building generic decorators or forwarding arguments.',
    ];
  } else if (titleLower.includes('mutable default') || titleLower.includes('default argument')) {
    explanation = 'In Python, default parameter expressions are evaluated exactly ONCE at function definition time (when module loads), not at each invocation. Passing a mutable default (like [] or {}) creates a shared singleton across all calls.';
    codeSnippet = `# ANTI-PATTERN (Shared mutable state bug):
# def append_item(val, target_list=[]):
#     target_list.append(val)
#     return target_list

# IDIOMATIC PATTERN (Sentinel None with lazy instantiation):
def append_item(val, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(val)
    return target_list

print(append_item(1))  # [1]
print(append_item(2))  # [2] - clean new list!`;
    pitfalls = [
      'Shared mutable defaults cause catastrophic silent data bleeding across web requests and concurrent threads.',
      'Always use None as default sentinel for mutable arguments (lists, dicts, custom objects).',
    ];
    keyTakeaways = [
      'Default arguments evaluate once at module load time.',
      'Always use `param = None` and initialize inside the function body.',
    ];
  } else if (titleLower.includes('decorator') || titleLower.includes('@')) {
    explanation = 'Decorators wrap functions to dynamically extend their behavior without altering source code. Using @functools.wraps is mandatory to preserve the original function docstring, name, and type signature.';
    codeSnippet = `import functools
import time

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] completed in {duration:.4f}s")
        return result
    return wrapper

@timing_decorator
def process_embeddings(batch_size=64):
    """Calculates vector embeddings for a batch."""
    time.sleep(0.05)
    return f"Processed {batch_size} vectors"`;
    pitfalls = [
      'Omitting @functools.wraps wipes function metadata (__name__, __doc__) and breaks FastAPI/OpenAPI schema generators.',
      'Parameterized decorators require a 3-level function hierarchy (factory -> decorator -> wrapper).',
    ];
    keyTakeaways = [
      'Decorators are evaluated when the module is imported/defined.',
      'Always decorate inner wrapper with `@functools.wraps(func)`.',
    ];
  } else if (titleLower.includes('playwright') || titleLower.includes('locator') || titleLower.includes('selector')) {
    explanation = 'Playwright locators represent a way to find elements on the page with automatic actionability waiting (attached, visible, stable, enabled). User-facing locators (getByRole, getByText, getByLabel) resist DOM changes.';
    codeSnippet = `# Playwright Resilient Locators & Actionability
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://app.example.com/login")
    
    # User-facing role locators (best practice)
    page.get_by_label("Email Address").fill("dev@example.com")
    page.get_by_label("Password").fill("Secret123!")
    page.get_by_role("button", name="Sign In").click()
    
    # Web assertion with auto-retry
    expect(page.get_by_text("Dashboard Overview")).to_be_visible()`;
    pitfalls = [
      'Using time.sleep() instead of built-in auto-waiting creates flaky automation suites.',
      'Strict mode violations happen when a locator matches multiple elements without scoping (use filter or .first).',
    ];
    keyTakeaways = [
      'Prefer get_by_role() and get_by_label() over CSS/XPath classes.',
      'Locators automatically wait for elements to be visible and stable before executing actions.',
    ];
  } else if (titleLower.includes('async') || titleLower.includes('await') || titleLower.includes('coroutine')) {
    explanation = 'Asynchronous non-blocking I/O enables Python to handle thousands of concurrent network connections using a single-threaded Event Loop and cooperative coroutines.';
    codeSnippet = `# Asynchronous Concurrency with asyncio & httpx
import asyncio
import httpx

async def fetch_endpoint(client, url, semaphore):
    async with semaphore:
        response = await client.get(url, timeout=10.0)
        return response.json()

async def main():
    semaphore = asyncio.Semaphore(5)  # Max 5 concurrent connections
    urls = [f"https://api.example.com/items/{i}" for i in range(20)]
    
    async with httpx.AsyncClient() as client:
        tasks = [fetch_endpoint(client, url, semaphore) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        print(f"Fetched {len(results)} items concurrently")`;
    pitfalls = [
      'Calling blocking operations (like time.sleep or synchronous requests) inside async functions halts the entire event loop.',
      'Forgetting to await a coroutine leaves it un-executed and triggers RuntimeWarning.',
    ];
    keyTakeaways = [
      'Use asyncio.gather to fire parallel I/O requests.',
      'Always rate-limit concurrent tasks with asyncio.Semaphore.',
    ];
  } else if (titleLower.includes('pydantic') || titleLower.includes('schema') || titleLower.includes('structured output')) {
    explanation = 'Pydantic provides runtime type validation and JSON serialization. LLM structured output pipelines use Pydantic models to guarantee 100% schema compliance at generation time.';
    codeSnippet = `from pydantic import BaseModel, Field
from typing import List, Optional

class InvoiceItem(BaseModel):
    description: str = Field(description="Description of line item")
    quantity: int = Field(ge=1, description="Quantity purchased")
    unit_price: float = Field(ge=0.0, description="Price per unit in USD")

class InvoiceData(BaseModel):
    invoice_id: str
    vendor: str
    items: List[InvoiceItem]
    total: float
    notes: Optional[str] = None`;
    pitfalls = [
      'Omitting Optional[T] on nullable fields causes Pydantic validation crashes at runtime.',
      'Using default=[] instead of Field(default_factory=list) in model fields.',
    ];
    keyTakeaways = [
      'Include Field(description="...") on every field to guide LLM extraction accuracy.',
      'Pydantic guarantees validated, strongly-typed Python objects.',
    ];
  } else if (titleLower.includes('rag') || titleLower.includes('chunk') || titleLower.includes('embedding')) {
    explanation = 'Retrieval-Augmented Generation (RAG) grounds LLM prompts with retrieved factual knowledge from vector stores and keyword indexes, eliminating hallucinations and enabling verifiable source citations.';
    codeSnippet = `# Grounded Context Assembly in RAG
query_vector = embed_model.embed_query("How is rate limiting handled?")
retrieved_chunks = vector_store.similarity_search_by_vector(query_vector, k=3)

context_block = "\\n\\n".join([
    f"<source id='{doc.metadata['id']}' file='{doc.metadata['file']}'>\\n{doc.page_content}\\n</source>"
    for doc in retrieved_chunks
])

prompt = f"""Answer strictly using the provided context. If unsure, state that context is insufficient.

Context:
{context_block}

Question: How is rate limiting handled?"""`;
    pitfalls = [
      'Fixed-size chunking without overlap splits crucial sentences across boundaries.',
      'Using pure vector search without BM25 keyword search causes misses on exact alphanumeric IDs or error codes.',
    ];
    keyTakeaways = [
      'Use RecursiveCharacterTextSplitter with 15-20% chunk overlap.',
      'Always provide metadata (source, page, author) with every retrieved chunk for citation verification.',
    ];
  } else {
    explanation = `Core technical concept for "${subtopicTitle}". Understanding this component provides the foundational mental model for building resilient, production-ready software and AI architectures in "${topicTitle}".`;
    codeSnippet = `# Technical Implementation: ${subtopicTitle}
# Topic: ${topicTitle}

def execute_concept():
    """
    Demonstrates: ${subtopicTitle}
    Domain: ${topicTitle}
    """
    # 1. Setup execution context and parameters
    params = {"mode": "production", "topic": "${topicTitle}"}
    
    # 2. Execute verified logic
    result = {"status": "success", "subtopic": "${subtopicTitle}"}
    return result

print(execute_concept())`;
    pitfalls = [
      'Always validate edge cases (null inputs, empty collections, network timeouts).',
      'Ensure proper error handling with informative logging and clean teardown.',
    ];
    keyTakeaways = [
      'Understand the underlying data structure and memory/time complexity.',
      'Verify behavior with automated unit test assertions and edge condition checks.',
    ];
  }

  return { explanation, codeSnippet, pitfalls, keyTakeaways };
}

export function generateAIPrompt({ levelTitle, subjectTitle, topicTitle, subtopicTitle, mode = 'deepdive' }) {
  const baseContext = `Role: Staff AI & Software Engineer (acting as my personalized technical mentor)
Learner Background: Python Automation Developer transitioning to Production AI/ML & AI Engineer
Roadmap Level: ${levelTitle || 'AI/ML Engineering Mastery'}
Subject Area: ${subjectTitle || 'Engineering Foundation'}
Topic: ${topicTitle || 'Core Engineering Concept'}
${subtopicTitle ? `Specific Subtopic / Concept Focus: ${subtopicTitle}` : ''}`;

  if (mode === 'interview') {
    return `${baseContext}

Task: Conduct a rigorous Senior Technical & Architectural Mock Interview on this exact concept.

Instructions for AI Mentor:
1. Act as a Staff AI Engineer interviewing me for a Senior AI/ML Engineer role.
2. Ask me 3 progressive interview questions:
   - Question 1: Core conceptual mechanics & under-the-hood implementation.
   - Question 2: Real-world engineering trade-off or architectural decision (Compare Approach A vs B).
   - Question 3: Live debugging scenario or failure recovery question under pressure.
3. For each question, highlight the difference between a Junior vs Senior response.
4. Provide the ideal, bulletproof answer that demonstrates deep production expertise.`;
  }

  if (mode === 'socratic') {
    return `${baseContext}

Task: Socratic Tutor & "Grill Me" Interactive Learning Session.

Instructions for AI Mentor:
1. Do NOT lecture me all at once.
2. Ask me ONE targeted question to test my understanding of "${subtopicTitle || topicTitle}".
3. Wait for my response. After I answer, critique my response, highlight any missing nuances, and ask the next progressive question.
4. Keep grilling me until I have demonstrated 100% mastery without hand-wavy assumptions.`;
  }

  if (mode === 'debugging') {
    return `${baseContext}

Task: Masterclass on Debugging, Error Taxonomies & Common Gotchas for "${subtopicTitle || topicTitle}".

Instructions for AI Mentor:
1. Provide 3 realistic broken code snippets / production error scenarios involving this concept:
   - Scenario 1: Silent logical bug / data corruption.
   - Scenario 2: High-load performance bottleneck / memory leak / concurrency trap.
   - Scenario 3: Real-world runtime crash or framework exception.
2. Walk through the step-by-step diagnostic process (stack trace analysis, telemetry, root cause).
3. Provide the corrected, production-hardened code fix for each scenario.`;
  }

  // Default: Comprehensive Deep Dive
  return `${baseContext}

Task: Provide an exhaustive, masterclass-level technical tutorial on "${subtopicTitle || topicTitle}".

Please structure your response systematically with the following 6 sections:

1. 🧠 Core Mental Model & Under-the-Hood Mechanics:
   - How does this work internally in memory / execution lifecycle?
   - What fundamental engineering problem does it solve, and why was it designed this way?

2. 💻 Production-Grade Code Implementation:
   - Provide a clean, robust, type-hinted Python/AI code example demonstrating real-world production usage.
   - Add line-by-line annotations explaining non-obvious details.

3. ⚠️ Critical Pitfalls & Anti-Patterns:
   - What are the top 3 mistakes developers make when implementing this?
   - How do I avoid silent failures and edge-case bugs?

4. ⚖️ Architectural Trade-Offs ("When to Use vs When to Avoid"):
   - Compare this approach with its primary alternatives.
   - What are the performance, complexity, and maintainability trade-offs?

5. 🎯 Senior Interview Question & Ideal Answer:
   - Give me 1 high-frequency interview question on this concept.
   - Provide the exact model answer a senior engineer should give.

6. 🛠️ Practical Hands-on Challenge:
   - Give me a challenging implementation exercise to build myself to verify mastery (without revealing the full solution upfront).`;
}

export default function TopicDetail() {
  const { journeyId, topicId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { getTopicLocation } = useAppState();

  const location = useMemo(() => {
    return getTopicLocation(topicId, journeyId);
  }, [getTopicLocation, topicId, journeyId]);

  const {
    journey,
    updateTopic,
    updateTopicSkill,
    updatePracticeItem,
    updateDebuggingItem,
    updateAssessmentItem,
    updateIndependenceCheck,
    toggleLearningItem,
    addLearningItem,
    updateLearningItem,
    deleteLearningItem,
    addResource,
    updateResource,
    deleteResource,
  } = useJourney(location?.journey?.id || journeyId);

  const [activeTab, setActiveTab] = useState('learn');
  const [learningItemModal, setLearningItemModal] = useState({ open: false, title: '' });
  const [expandedSubtopics, setExpandedSubtopics] = useState({});
  const [subtopicSearch, setSubtopicSearch] = useState('');
  const [subtopicFilter, setSubtopicFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [subtopicDrawer, setSubtopicDrawer] = useState(null);
  const [aiPromptModal, setAiPromptModal] = useState({ open: false, subtopic: null, mode: 'deepdive' });
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [subtopicNotes, setSubtopicNotes] = useState({});
  const [showSkillDimensions, setShowSkillDimensions] = useState(false);
  const [practiceModal, setPracticeModal] = useState({
    open: false,
    title: '',
    description: '',
    difficulty: 'medium',
    type: 'coding',
  });
  const [debuggingModal, setDebuggingModal] = useState({
    open: false,
    title: '',
    description: '',
    errorType: 'runtime',
    difficulty: 'medium',
  });
  const [assessmentModal, setAssessmentModal] = useState({
    open: false,
    question: '',
    difficulty: 'medium',
    type: 'interview',
  });
  const [resourceModal, setResourceModal] = useState({
    open: false,
    mode: 'url', // 'url' | 'upload'
    title: '',
    url: '',
    fileName: '',
    fileSize: '',
    fileType: '',
    fileData: '',
    type: 'Documentation',
    description: '',
  });

  const level = location?.level;
  const subject = location?.subject;
  const topic = location?.topic;

  // Find next & prev topics (unconditional hook)
  const allJourneyTopics = useMemo(() => {
    return (journey?.levels || []).flatMap((lvl) =>
      (lvl.subjects || []).flatMap((sub) =>
        (sub.topics || []).map((t) => ({ ...t, levelId: lvl.id, subjectId: sub.id }))
      )
    );
  }, [journey]);

  const currentIndex = topic ? allJourneyTopics.findIndex((t) => t.id === topic.id) : -1;
  const prevTopic = currentIndex > 0 ? allJourneyTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex !== -1 && currentIndex < allJourneyTopics.length - 1
      ? allJourneyTopics[currentIndex + 1]
      : null;

  const isDsaTopic = useMemo(() => {
    const tTitle = (topic?.title || '').toLowerCase();
    const lTitle = (level?.title || '').toLowerCase();
    const sTitle = (subject?.title || '').toLowerCase();
    return (
      tTitle.includes('dsa') ||
      tTitle.includes('data structure') ||
      tTitle.includes('algorithm') ||
      tTitle.includes('leetcode') ||
      lTitle.includes('dsa') ||
      lTitle.includes('data structures') ||
      lTitle.includes('algorithm') ||
      sTitle.includes('dsa')
    );
  }, [topic?.title, level?.title, subject?.title]);

  if (!location || !location.topic) {
    return (
      <AppLayout pageTitle="Topic Not Found">
        <EmptyState
          icon="book"
          title="Topic Not Found"
          description="Could not locate this topic in your journey."
          action={
            <button
              onClick={() => navigate(journey ? `/journeys/${journey.id}` : '/journeys')}
              className="btn-primary text-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back to Journey
            </button>
          }
        />
      </AppLayout>
    );
  }

  const trackingModel = journey?.trackingModel || 'skill-development';
  const skillDimensions =
    journey?.skillDimensions && journey.skillDimensions.length > 0
      ? journey.skillDimensions
      : DEFAULT_SKILL_DIMENSIONS;
  const progress = calculateTopicProgress(topic, trackingModel, skillDimensions);

  const handleStatusChange = (newStatus) => {
    updateTopic(topic.id, { status: newStatus });
    showToast(`Topic status updated to ${newStatus}`, 'success');
  };

  const handleAddLearningItem = (e) => {
    e.preventDefault();
    if (!learningItemModal.title.trim()) return;
    const newItem = {
      id: `item-${Date.now()}`,
      title: learningItemModal.title.trim(),
      completed: false,
    };
    updateTopic(topic.id, {
      learningItems: [...(topic.learningItems || []), newItem],
    });
    setLearningItemModal({ open: false, title: '' });
    showToast('Learning checklist item added', 'success');
  };

  const handleDeleteLearningItem = (itemId) => {
    updateTopic(topic.id, {
      learningItems: (topic.learningItems || []).filter((i) => i.id !== itemId),
    });
  };

  const handleAddPractice = (e) => {
    e.preventDefault();
    if (!practiceModal.title.trim()) return;
    const newPrac = {
      id: `prac-${Date.now()}`,
      title: practiceModal.title.trim(),
      description: practiceModal.description.trim(),
      difficulty: practiceModal.difficulty,
      type: practiceModal.type,
      status: 'not-started',
      notes: '',
    };
    updateTopic(topic.id, {
      practice: [...(topic.practice || []), newPrac],
    });
    setPracticeModal({ open: false, title: '', description: '', difficulty: 'medium', type: 'coding' });
    showToast('Practice task added', 'success');
  };

  const handleAddDebugging = (e) => {
    e.preventDefault();
    if (!debuggingModal.title.trim()) return;
    const newDbg = {
      id: `dbg-${Date.now()}`,
      title: debuggingModal.title.trim(),
      description: debuggingModal.description.trim(),
      errorType: debuggingModal.errorType,
      difficulty: debuggingModal.difficulty,
      status: 'unsolved',
      notes: '',
    };
    updateTopic(topic.id, {
      debugging: [...(topic.debugging || []), newDbg],
    });
    setDebuggingModal({ open: false, title: '', description: '', errorType: 'runtime', difficulty: 'medium' });
    showToast('Debugging challenge added', 'success');
  };

  const handleAddAssessment = (e) => {
    e.preventDefault();
    if (!assessmentModal.question.trim()) return;
    const newAssess = {
      id: `assess-${Date.now()}`,
      question: assessmentModal.question.trim(),
      difficulty: assessmentModal.difficulty,
      type: assessmentModal.type,
      status: 'not-attempted',
      confidence: 0,
      notes: '',
    };
    updateTopic(topic.id, {
      assessments: [...(topic.assessments || []), newAssess],
    });
    setAssessmentModal({ open: false, question: '', difficulty: 'medium', type: 'interview' });
    showToast('Assessment question added', 'success');
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!resourceModal.title.trim()) {
      showToast('Please provide a title for the resource', 'error');
      return;
    }

    const finalUrl = resourceModal.mode === 'upload' ? resourceModal.fileData : resourceModal.url.trim();

    addResource(topic.id, {
      title: resourceModal.title.trim(),
      url: finalUrl || '',
      type: resourceModal.type,
      description: resourceModal.description?.trim() || '',
      fileName: resourceModal.fileName || '',
      fileSize: resourceModal.fileSize || '',
      isFileUpload: resourceModal.mode === 'upload' && Boolean(resourceModal.fileData),
      completed: false,
    });

    setResourceModal({
      open: false,
      mode: 'url',
      title: '',
      url: '',
      fileName: '',
      fileSize: '',
      fileType: '',
      fileData: '',
      type: 'Documentation',
      description: '',
    });
    showToast('Resource saved successfully', 'success');
  };

  const subtopicsList = useMemo(() => {
    let items = [];
    if (topic.learningItems && topic.learningItems.length > 0) {
      items = topic.learningItems;
    } else if (topic.subtopics && topic.subtopics.length > 0) {
      items = topic.subtopics.map((st, idx) => ({
        id: `st-${idx}`,
        title: typeof st === 'string' ? st : st.title,
        completed: false,
      }));
    }
    return items.map((item, idx) => ({
      ...item,
      displayIndex: idx + 1,
    }));
  }, [topic.learningItems, topic.subtopics]);

  const topicResources = useMemo(() => {
    return getVerifiedResources(
      topic?.title || '',
      topic?.description || '',
      subject?.title || '',
      topic?.resources || []
    );
  }, [topic?.title, topic?.description, topic?.resources, subject?.title]);

  const tabs = [
    {
      id: 'learn',
      label: 'Subtopics & Concepts',
      icon: <Layers className="w-3.5 h-3.5" />,
      count: subtopicsList.length,
    },
    {
      id: 'practice',
      label: 'Practice Tasks',
      icon: <Code2 className="w-3.5 h-3.5" />,
      count: topic.practice?.length,
    },
    {
      id: 'debugging',
      label: 'Debugging',
      icon: <Bug className="w-3.5 h-3.5" />,
      count: topic.debugging?.length,
    },
    {
      id: 'assessment',
      label: 'Assessments',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      count: topic.assessments?.length,
    },
    {
      id: 'resources',
      label: 'Resources & Docs',
      icon: <Library className="w-3.5 h-3.5" />,
      count: topicResources.length,
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: <StickyNote className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <AppLayout pageTitle={topic.title}>
      <Breadcrumbs
        items={[
          { label: 'My Journeys', to: '/journeys' },
          { label: journey?.name || 'Journey', to: `/journeys/${journey?.id}` },
          { label: level.title, to: `/journeys/${journey?.id}#${level.id}` },
          { label: subject.title, to: `/journeys/${journey?.id}#${level.id}` },
          { label: topic.title },
        ]}
      />

      {/* Module Topics Switcher Ribbon (when subject has multiple topics) */}
      {(subject.topics || []).length > 1 && (
        <div className="mb-4 overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max p-1 bg-gray-100 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-750">
            <span className="text-[11px] font-black text-gray-500 dark:text-gray-400 px-2.5 py-1">
              Topics in {subject.title}:
            </span>
            {subject.topics.map((top, tIdx) => {
              const isCur = top.id === topic.id;
              const isDone = top.status === 'completed';

              return (
                <button
                  key={top.id}
                  onClick={() => navigate(`/journeys/${journey?.id}/topics/${top.id}`)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    isCur
                      ? 'bg-sky-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{tIdx + 1}. {top.title}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Header Topic Card */}
      <div className="card p-6 mb-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold">
                {level.title}
              </span>
              <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {subject.title}
              </span>
              <span
                className={`badge font-semibold ${
                  topic.priority === 'core'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {topic.priority === 'core' ? '⭐ Core Topic' : topic.priority}
              </span>
              {topic.source === 'template' ? (
                <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold text-[10px]">
                  Recommended
                </span>
              ) : (
                <span className="badge bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 font-semibold text-[10px]">
                  Custom
                </span>
              )}
            </div>

            <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
              {topic.title}
            </h1>

            {topic.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
                {topic.description}
              </p>
            )}

            {/* Tags */}
            {topic.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {topic.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status and Progress */}
          <div className="flex flex-col sm:items-end gap-3 flex-shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-2 flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => setAiPromptModal({ open: true, subtopic: null, mode: 'deepdive' })}
                className="btn-secondary text-xs flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs"
                title="Generate complete AI Prompt for this Topic"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>AI Study Prompt</span>
              </button>

              <div className="flex items-center gap-1.5">
                <label className="text-xs font-semibold text-gray-500">Status:</label>
                <select
                  value={topic.status || 'not-started'}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="input text-xs py-1.5 w-auto"
                >
                  {TOPIC_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full sm:w-48 text-left sm:text-right">
              <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                <span>Mastery Progress</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} height="h-2" />
            </div>
          </div>
        </div>

        {/* Skill Dimensions Rating (Collapsible) */}
        {skillDimensions.length > 0 && (
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setShowSkillDimensions(!showSkillDimensions)}
              className="flex items-center justify-between w-full text-left py-1 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span className="uppercase tracking-wider">
                Skill Dimensions Self-Assessment ({skillDimensions.length})
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                {showSkillDimensions ? 'Hide Breakdown' : 'Rate Specific Skills'}
                {showSkillDimensions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </button>

            {showSkillDimensions && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 animate-fade-in">
                {skillDimensions.map((dim) => {
                  const score = topic.skillScores?.[dim.id] ?? 0;
                  return (
                    <SkillDimensionRating
                      key={dim.id}
                      dimension={dim}
                      score={score}
                      onChange={(newScore) => {
                        updateTopicSkill(topic.id, dim.id, newScore);
                        showToast(`Rated ${dim.name}: ${newScore}/5`, 'success');
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Dedicated DSA Studio Link Banner */}
        {isDsaTopic && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-md">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  Dedicated DSA & LeetCode Problem Tracker
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  Practice 60+ curated LeetCode problems, track multi-version code solutions, time/space complexity, and spaced repetition.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dsa')}
              className="btn-primary text-xs flex items-center gap-1.5 shadow-xs whitespace-nowrap"
            >
              <Code2 className="w-3.5 h-3.5" />
              Open DSA Tracker
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Tabs & Tab Content */}
      <div className="card p-6 mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {/* TAB 1: Subtopics & Concepts */}
          {activeTab === 'learn' && (
            <div className="space-y-4">
              {/* Learning Objectives */}
              {(topic.learningObjectives || []).length > 0 && (
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                    <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Learning Objectives (What You Will Master)</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {topic.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <span className="text-indigo-500 font-bold mt-0.5">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Subtopics Toolbar & Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search subtopics..."
                      value={subtopicSearch}
                      onChange={(e) => setSubtopicSearch(e.target.value)}
                      className="input pl-8 py-1.5 text-xs w-full"
                    />
                    {subtopicSearch && (
                      <button
                        onClick={() => setSubtopicSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg text-xs flex-shrink-0">
                    <button
                      onClick={() => setSubtopicFilter('all')}
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                        subtopicFilter === 'all'
                          ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      All ({subtopicsList.length})
                    </button>
                    <button
                      onClick={() => setSubtopicFilter('pending')}
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                        subtopicFilter === 'pending'
                          ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      Pending ({subtopicsList.filter((i) => !i.completed).length})
                    </button>
                    <button
                      onClick={() => setSubtopicFilter('completed')}
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                        subtopicFilter === 'completed'
                          ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-xs'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      Completed ({subtopicsList.filter((i) => i.completed).length})
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      const allOpen = Object.values(expandedSubtopics).filter(Boolean).length === subtopicsList.length;
                      const next = {};
                      subtopicsList.forEach((st) => {
                        next[st.id] = !allOpen;
                      });
                      setExpandedSubtopics(next);
                    }}
                    className="btn-secondary text-xs py-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>
                      {Object.values(expandedSubtopics).filter(Boolean).length === subtopicsList.length && subtopicsList.length > 0
                        ? 'Collapse All'
                        : 'Expand All'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Subtopics List */}
              {subtopicsList.length > 0 ? (
                <div className="space-y-3 pt-2">
                  {subtopicsList
                    .filter((item) => {
                      if (subtopicFilter === 'completed' && !item.completed) return false;
                      if (subtopicFilter === 'pending' && item.completed) return false;
                      if (subtopicSearch.trim()) {
                        const q = subtopicSearch.toLowerCase();
                        return (item.title || '').toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q);
                      }
                      return true;
                    })
                    .map((item, idx) => {
                      const isExpanded = Boolean(expandedSubtopics[item.id]);
                      const details = getSubtopicDetails(item.title, topic.title, topic.tags);

                      return (
                        <div
                          key={item.id}
                          className={`rounded-2xl border transition-all ${
                            isExpanded
                              ? 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/10 shadow-xs'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 hover:border-indigo-200 dark:hover:border-indigo-900/40'
                          }`}
                        >
                          {/* Subtopic Header */}
                          <div className="p-3.5 flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLearningItem(topic.id, item.id, !item.completed);
                              }}
                              className="flex-shrink-0 p-1 hover:scale-110 transition-transform"
                              title={item.completed ? 'Mark as in-progress' : 'Mark as mastered'}
                            >
                              {item.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-indigo-500" />
                              )}
                            </button>

                            <div
                              onClick={() =>
                                setExpandedSubtopics((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                              }
                              className="flex-1 min-w-0 cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 font-mono">
                                  #{item.displayIndex || idx + 1}
                                </span>
                                <h4
                                  className={`text-sm font-semibold transition-colors ${
                                    item.completed
                                      ? 'line-through text-gray-400 dark:text-gray-500'
                                      : 'text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400'
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                {item.type && (
                                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                    {item.type}
                                  </span>
                                )}
                                {item.notes && (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40 flex items-center gap-1">
                                    <StickyNote className="w-2.5 h-2.5" /> Note saved
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                                {item.description || details.explanation}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() =>
                                  setAiPromptModal({
                                    open: true,
                                    subtopic: item.title,
                                    mode: 'deepdive',
                                  })
                                }
                                className="p-1.5 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                                title="Generate tailored AI Prompt for this subtopic"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                                <span className="hidden sm:inline">AI Prompt</span>
                              </button>
                              <button
                                onClick={() => setSubtopicDrawer({ item, details })}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                title="Open Full Study View"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() =>
                                  setExpandedSubtopics((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                                }
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Expanded Subtopic Accordion Pane */}
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-2 border-t border-indigo-100/70 dark:border-indigo-900/30 space-y-4">
                              {/* AI Learning Prompt Banner Box */}
                              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/50 space-y-2">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                    <span>AI Study Mentor Prompt</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        setAiPromptModal({
                                          open: true,
                                          subtopic: item.title,
                                          mode: 'deepdive',
                                        })
                                      }
                                      className="text-[11px] text-purple-700 dark:text-purple-300 hover:underline font-medium"
                                    >
                                      Change Prompt Mode ⚙️
                                    </button>
                                    <button
                                      onClick={() => {
                                        const prompt = generateAIPrompt({
                                          levelTitle: level?.title,
                                          subjectTitle: subject?.title,
                                          topicTitle: topic.title,
                                          subtopicTitle: item.title,
                                          mode: 'deepdive',
                                        });
                                        navigator.clipboard.writeText(prompt);
                                        setCopiedCodeId(`prompt-${item.id}`);
                                        showToast('Tailored AI Prompt copied! Paste into Claude/ChatGPT/Gemini', 'success');
                                        setTimeout(() => setCopiedCodeId(null), 2500);
                                      }}
                                      className="btn-primary text-[11px] py-1 px-2.5 bg-purple-600 hover:bg-purple-700 border-purple-600 flex items-center gap-1 shadow-xs"
                                    >
                                      {copiedCodeId === `prompt-${item.id}` ? (
                                        <>
                                          <Check className="w-3 h-3 text-white" /> Copied Prompt!
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" /> Copy AI Prompt
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                                <p className="text-[11px] text-purple-900/80 dark:text-purple-200/80 font-mono line-clamp-2 bg-white/70 dark:bg-gray-900/60 p-2 rounded-lg border border-purple-100 dark:border-purple-900/40">
                                  {generateAIPrompt({
                                    levelTitle: level?.title,
                                    subjectTitle: subject?.title,
                                    topicTitle: topic.title,
                                    subtopicTitle: item.title,
                                    mode: 'deepdive',
                                  })}
                                </p>
                              </div>

                              {/* Concept Overview */}
                              <div className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-1.5">
                                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Concept Breakdown & Mental Model</span>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {item.description || details.explanation}
                                </p>
                              </div>

                              {/* Code Implementation */}
                              {details.codeSnippet && (
                                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                  <div className="bg-gray-900 text-gray-300 px-3.5 py-1.5 text-xs font-mono flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Code Implementation & Syntax
                                    </span>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(details.codeSnippet);
                                        setCopiedCodeId(item.id);
                                        showToast('Code snippet copied to clipboard', 'success');
                                        setTimeout(() => setCopiedCodeId(null), 2000);
                                      }}
                                      className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition-colors"
                                    >
                                      {copiedCodeId === item.id ? (
                                        <>
                                          <Check className="w-3 h-3 text-green-400" /> Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" /> Copy Code
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <pre className="p-3.5 bg-gray-950 text-gray-200 font-mono text-xs overflow-x-auto leading-relaxed">
                                    <code>{details.codeSnippet}</code>
                                  </pre>
                                </div>
                              )}

                              {/* Key Takeaways & Pitfalls */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1.5">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Key Engineering Takeaways</span>
                                  </div>
                                  <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                                    {details.keyTakeaways.map((point, kIdx) => (
                                      <li key={kIdx} className="flex items-start gap-1.5">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-1.5">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                                    <span>Common Gotchas & Pitfalls</span>
                                  </div>
                                  <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                                    {details.pitfalls.map((pitfall, pIdx) => (
                                      <li key={pIdx} className="flex items-start gap-1.5">
                                        <span className="text-rose-500 font-bold">•</span>
                                        <span>{pitfall}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Verified Concept References & Official Docs */}
                              {(() => {
                                const subtopicResources = getVerifiedResources(item.title, item.description || details.explanation, topic.title);
                                if (!subtopicResources || subtopicResources.length === 0) return null;
                                return (
                                  <div className="p-3.5 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40 space-y-2">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 dark:text-sky-300">
                                      <Library className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                                      <span>Verified Reference Documentation & Guides</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {subtopicResources.slice(0, 4).map((res, rIdx) => (
                                        <a
                                          key={rIdx}
                                          href={res.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-sky-100 dark:border-sky-900/50 hover:border-sky-400 dark:hover:border-sky-600 shadow-2xs group transition-all"
                                        >
                                          <div className="min-w-0 pr-2">
                                            <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                                              {res.title}
                                            </p>
                                            <span className="text-[10px] text-gray-400 font-medium">
                                              {res.source || res.type}
                                            </span>
                                          </div>
                                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-sky-500 flex-shrink-0" />
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })()}

                              {/* Personal Notes for this Subtopic */}
                              <div className="p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <StickyNote className="w-3.5 h-3.5 text-amber-500" />
                                    <span>My Personal Notes for this Subtopic</span>
                                  </label>
                                  {subtopicNotes[item.id] !== undefined && (
                                    <button
                                      onClick={() => {
                                        const newNotes = subtopicNotes[item.id];
                                        updateTopic(topic.id, {
                                          learningItems: (topic.learningItems || []).map((li) =>
                                            li.id === item.id ? { ...li, notes: newNotes } : li
                                          ),
                                        });
                                        showToast('Subtopic note saved', 'success');
                                      }}
                                      className="btn-primary text-[11px] py-1 px-2.5"
                                    >
                                      Save Note
                                    </button>
                                  )}
                                </div>
                                <textarea
                                  rows={2}
                                  placeholder="Write your custom notes, takeaways, or mnemonics for this concept..."
                                  value={subtopicNotes[item.id] !== undefined ? subtopicNotes[item.id] : item.notes || ''}
                                  onChange={(e) =>
                                    setSubtopicNotes((prev) => ({ ...prev, [item.id]: e.target.value }))
                                  }
                                  className="input text-xs w-full bg-white dark:bg-gray-850"
                                />
                              </div>

                              {/* Action Footer */}
                              <div className="flex items-center justify-between pt-1 text-xs">
                                <button
                                  onClick={() => toggleLearningItem(topic.id, item.id, !item.completed)}
                                  className={`btn text-xs ${
                                    item.completed
                                      ? 'btn-secondary text-gray-600'
                                      : 'btn-primary'
                                  }`}
                                >
                                  {item.completed ? 'Mark as In-Progress' : 'Mark as Mastered ✓'}
                                </button>

                                <button
                                  onClick={() => handleDeleteLearningItem(item.id)}
                                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 hover:underline"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Remove Subtopic
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ) : (
                <EmptyState
                  icon="inbox"
                  title="No subtopics found"
                  description="Break down this topic into specific concepts, theory points, or subtopics."
                  action={
                    <button
                      onClick={() => setLearningItemModal({ open: true, title: '' })}
                      className="btn-primary text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add First Subtopic
                    </button>
                  }
                />
              )}
            </div>
          )}

          {/* TAB 2: Practice Tasks */}
          {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {(topic.practice || []).filter((p) => p.status === 'solved' || p.status === 'completed').length} of{' '}
                  {(topic.practice || []).length} practice tasks solved
                </span>

                <button
                  onClick={() =>
                    setPracticeModal({
                      open: true,
                      title: '',
                      description: '',
                      difficulty: 'medium',
                      type: 'coding',
                    })
                  }
                  className="btn-secondary text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Practice Task
                </button>
              </div>

              {(topic.practice || []).length > 0 ? (
                <div className="space-y-3">
                  {topic.practice.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/40 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                              {p.type}
                            </span>
                            <span
                              className={`badge ${
                                p.difficulty === 'easy'
                                  ? 'bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                                  : p.difficulty === 'hard' || p.difficulty === 'challenge'
                                  ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              }`}
                            >
                              {p.difficulty}
                            </span>
                            <span
                              className={`badge text-[10px] ${
                                p.aiMode === 'no-ai' || p.attemptedWithoutAI
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                                  : p.aiMode === 'ai-restricted'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                              }`}
                            >
                              {p.attemptedWithoutAI ? '✓ 100% No-AI Attempt' : p.aiMode || 'AI Allowed'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {p.title}
                          </h4>
                          {p.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {p.description}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updatePracticeItem(topic.id, p.id, {
                                attemptedWithoutAI: !p.attemptedWithoutAI,
                              })
                            }
                            className={`text-[10px] px-2 py-1 rounded-lg border transition-colors ${
                              p.attemptedWithoutAI
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300 font-semibold'
                                : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                            }`}
                            title="Mark if you solved this without AI code generation"
                          >
                            {p.attemptedWithoutAI ? '★ Solved Without AI' : 'Attempt Without AI'}
                          </button>

                          <select
                            value={p.status || 'not-started'}
                            onChange={(e) => updatePracticeItem(topic.id, p.id, { status: e.target.value })}
                            className="input text-xs py-1 w-auto"
                          >
                            {PRACTICE_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st
                                  .split('-')
                                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                  .join(' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <textarea
                        value={p.notes || ''}
                        onChange={(e) =>
                          updatePracticeItem(topic.id, p.id, { notes: e.target.value })
                        }
                        placeholder="Add solution notes, snippet, or learnings..."
                        className="input text-xs font-mono"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="inbox"
                  title="No practice tasks yet"
                  description="Add coding challenges, exercises, or hands-on tasks to cement your skills."
                  action={
                    <button
                      onClick={() =>
                        setPracticeModal({
                          open: true,
                          title: '',
                          description: '',
                          difficulty: 'medium',
                          type: 'coding',
                        })
                      }
                      className="btn-primary text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Practice Task
                    </button>
                  }
                />
              )}
            </div>
          )}

          {/* TAB 3: Debugging Challenges */}
          {activeTab === 'debugging' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {(topic.debugging || []).filter((d) => d.status === 'solved').length} of{' '}
                  {(topic.debugging || []).length} debugging exercises solved
                </span>

                <button
                  onClick={() =>
                    setDebuggingModal({
                      open: true,
                      title: '',
                      description: '',
                      errorType: 'runtime',
                      difficulty: 'medium',
                    })
                  }
                  className="btn-secondary text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Debugging Challenge
                </button>
              </div>

              {(topic.debugging || []).length > 0 ? (
                <div className="space-y-3">
                  {topic.debugging.map((d) => (
                    <div
                      key={d.id}
                      className="p-4 rounded-xl border border-red-100 dark:border-red-950/40 bg-red-50/20 dark:bg-red-950/10 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="badge bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 font-mono text-[10px]">
                              Error: {d.errorType}
                            </span>
                            <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px]">
                              {d.difficulty}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {d.title}
                          </h4>
                          {d.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {d.description}
                            </p>
                          )}
                        </div>

                        <select
                          value={d.status || 'unsolved'}
                          onChange={(e) =>
                            updateDebuggingItem(topic.id, d.id, { status: e.target.value })
                          }
                          className="input text-xs py-1 w-auto"
                        >
                          {DEBUGGING_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st.charAt(0).toUpperCase() + st.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        value={d.notes || ''}
                        onChange={(e) =>
                          updateDebuggingItem(topic.id, d.id, { notes: e.target.value })
                        }
                        placeholder="Write diagnostic steps, root cause analysis, and how to fix this bug..."
                        className="input text-xs font-mono"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="inbox"
                  title="No debugging challenges yet"
                  description="Add common bugs, exceptions, and troubleshooting exercises to build real debugging ability."
                  action={
                    <button
                      onClick={() =>
                        setDebuggingModal({
                          open: true,
                          title: '',
                          description: '',
                          errorType: 'runtime',
                          difficulty: 'medium',
                        })
                      }
                      className="btn-primary text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Debugging Challenge
                    </button>
                  }
                />
              )}
            </div>
          )}

          {/* TAB 4: Assessment & Interview Questions */}
          {activeTab === 'assessment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {(topic.assessments || []).filter((a) => a.status === 'confident').length} of{' '}
                  {(topic.assessments || []).length} assessments verified confident
                </span>

                <button
                  onClick={() =>
                    setAssessmentModal({
                      open: true,
                      question: '',
                      difficulty: 'medium',
                      type: 'interview',
                    })
                  }
                  className="btn-secondary text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Question
                </button>
              </div>

              {(topic.assessments || []).length > 0 ? (
                <div className="space-y-3">
                  {topic.assessments.map((a) => (
                    <div
                      key={a.id}
                      className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/40 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="badge bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                              {a.type}
                            </span>
                            <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                              {a.difficulty}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {a.question}
                          </p>
                        </div>

                        <select
                          value={a.status || 'not-attempted'}
                          onChange={(e) =>
                            updateAssessmentItem(topic.id, a.id, { status: e.target.value })
                          }
                          className="input text-xs py-1 w-auto"
                        >
                          {ASSESSMENT_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st
                                .split('-')
                                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(' ')}
                            </option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        value={a.notes || ''}
                        onChange={(e) =>
                          updateAssessmentItem(topic.id, a.id, { notes: e.target.value })
                        }
                        placeholder="Write your explanation or answer notes..."
                        className="input text-xs"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="star"
                  title="No assessment questions"
                  description="Add interview or exam questions to test your conceptual clarity."
                  action={
                    <button
                      onClick={() =>
                        setAssessmentModal({
                          open: true,
                          question: '',
                          difficulty: 'medium',
                          type: 'interview',
                        })
                      }
                      className="btn-primary text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Question
                    </button>
                  }
                />
              )}
            </div>
          )}

          {/* TAB 5: Resources & Docs */}
          {activeTab === 'resources' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sky-50/50 dark:bg-sky-950/30 p-4 rounded-2xl border border-sky-100 dark:border-sky-900/40">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                    <Library className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Curated & Verified Resources for {topic.title}</span>
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Official documentation, interactive sandboxes, and reference guides specifically for this topic.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setResourceModal({
                      open: true,
                      mode: 'url',
                      title: '',
                      url: '',
                      fileName: '',
                      fileSize: '',
                      fileType: '',
                      fileData: '',
                      type: 'Documentation',
                      description: '',
                    })
                  }
                  className="btn-primary text-xs flex items-center gap-1.5 self-start sm:self-center"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Custom Resource
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {topicResources.map((res, idx) => {
                  const isCustom = Boolean(res.id);
                  const isUploaded = Boolean(res.isFileUpload || res.fileData || (res.url && res.url.startsWith('data:')));
                  const isVideo = res.type === 'Video' || (res.url && (res.url.includes('youtube.com') || res.url.includes('youtu.be') || res.url.includes('vimeo') || res.url.endsWith('.mp4')));

                  return (
                    <div
                      key={res.id || idx}
                      className="card p-4 flex flex-col justify-between hover:border-sky-400 dark:hover:border-sky-600 shadow-xs hover:shadow transition-all group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="badge bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 font-bold text-[10px]">
                              {res.type || 'Documentation'}
                            </span>
                            {isUploaded && (
                              <span className="badge bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 font-semibold text-[10px] flex items-center gap-1">
                                <FileUp className="w-2.5 h-2.5" /> Uploaded File
                              </span>
                            )}
                            {isVideo && (
                              <span className="badge bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 font-semibold text-[10px] flex items-center gap-1">
                                <Film className="w-2.5 h-2.5" /> Video
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                            {res.fileSize || res.source || 'Official Reference'}
                          </span>
                        </div>

                        {isUploaded ? (
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                              <File className="w-4 h-4 text-purple-500 flex-shrink-0" />
                              <span className="line-clamp-2">{res.title}</span>
                            </h4>
                            {res.fileName && (
                              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono mt-0.5 truncate">
                                📎 {res.fileName}
                              </p>
                            )}
                          </div>
                        ) : (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center justify-between gap-2"
                          >
                            <span className="line-clamp-2">{res.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </a>
                        )}

                        {res.description && (
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {res.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] mt-2">
                        {isUploaded ? (
                          <div className="flex items-center gap-3">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1 hover:underline"
                            >
                              <span>Preview / Open</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href={res.url}
                              download={res.fileName || `${res.title}.pdf`}
                              className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </a>
                          </div>
                        ) : (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1 hover:underline"
                          >
                            <span>Visit Resource</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}

                        {isCustom && (
                          <button
                            onClick={() => deleteResource(topic.id, res.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Remove custom resource"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: Notes */}
          {activeTab === 'notes' && (
            <div>
              <textarea
                value={topic.notes || ''}
                onChange={(e) => updateTopic(topic.id, { notes: e.target.value })}
                placeholder="Write your study notes, insights, code snippets, or formulas here... (auto-saved)"
                className="input font-mono text-xs sm:text-sm leading-relaxed"
                rows={14}
              />
              <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                All changes are automatically synchronized with your cloud account and browser cache.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Previous / Next Navigation */}
      <div className="flex gap-3">
        {prevTopic ? (
          <button
            onClick={() =>
              navigate(`/journeys/${journey?.id}/topics/${prevTopic.id}`)
            }
            className="flex-1 btn-secondary justify-start text-xs py-2.5 px-4 truncate"
          >
            <ChevronLeft className="w-4 h-4 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-[10px] text-gray-400 uppercase font-bold">Previous</div>
              <div className="font-semibold truncate">{prevTopic.title}</div>
            </div>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {nextTopic && (
          <button
            onClick={() =>
              navigate(`/journeys/${journey?.id}/topics/${nextTopic.id}`)
            }
            className="flex-1 btn-secondary justify-end text-xs py-2.5 px-4 truncate"
          >
            <div className="text-right min-w-0">
              <div className="text-[10px] text-gray-400 uppercase font-bold">Next</div>
              <div className="font-semibold truncate">{nextTopic.title}</div>
            </div>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          </button>
        )}
      </div>

      {/* Modal: Learning Item */}
      <Modal
        isOpen={learningItemModal.open}
        onClose={() => setLearningItemModal({ open: false, title: '' })}
        title="Add Learning Checklist Item"
        size="sm"
      >
        <form onSubmit={handleAddLearningItem} className="space-y-4">
          <div>
            <label className="label">Item Description</label>
            <input
              type="text"
              required
              value={learningItemModal.title}
              onChange={(e) => setLearningItemModal({ ...learningItemModal, title: e.target.value })}
              placeholder="e.g. Understand closures and lexical scope"
              className="input"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setLearningItemModal({ open: false, title: '' })}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Add Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Practice Task */}
      <Modal
        isOpen={practiceModal.open}
        onClose={() => setPracticeModal({ open: false, title: '', description: '', difficulty: 'medium', type: 'coding' })}
        title="Add Practice Task"
        size="md"
      >
        <form onSubmit={handleAddPractice} className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input
              type="text"
              required
              value={practiceModal.title}
              onChange={(e) => setPracticeModal({ ...practiceModal, title: e.target.value })}
              placeholder="e.g. Build a Retry Decorator"
              className="input"
              autoFocus
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              value={practiceModal.description}
              onChange={(e) => setPracticeModal({ ...practiceModal, description: e.target.value })}
              placeholder="Problem statement or prompt..."
              rows={2}
              className="input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Difficulty</label>
              <select
                value={practiceModal.difficulty}
                onChange={(e) => setPracticeModal({ ...practiceModal, difficulty: e.target.value })}
                className="input"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="label">Type</label>
              <select
                value={practiceModal.type}
                onChange={(e) => setPracticeModal({ ...practiceModal, type: e.target.value })}
                className="input"
              >
                {PRACTICE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setPracticeModal({ open: false, title: '', description: '', difficulty: 'medium', type: 'coding' })}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Debugging Challenge */}
      <Modal
        isOpen={debuggingModal.open}
        onClose={() => setDebuggingModal({ open: false, title: '', description: '', errorType: 'runtime', difficulty: 'medium' })}
        title="Add Debugging Challenge"
        size="md"
      >
        <form onSubmit={handleAddDebugging} className="space-y-4">
          <div>
            <label className="label">Challenge Title *</label>
            <input
              type="text"
              required
              value={debuggingModal.title}
              onChange={(e) => setDebuggingModal({ ...debuggingModal, title: e.target.value })}
              placeholder="e.g. Fix Context Window Overflow in RAG"
              className="input"
              autoFocus
            />
          </div>
          <div>
            <label className="label">Bug Scenario Description</label>
            <textarea
              value={debuggingModal.description}
              onChange={(e) => setDebuggingModal({ ...debuggingModal, description: e.target.value })}
              placeholder="Describe the error, exception, or broken behavior..."
              rows={2}
              className="input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Error Type</label>
              <select
                value={debuggingModal.errorType}
                onChange={(e) => setDebuggingModal({ ...debuggingModal, errorType: e.target.value })}
                className="input"
              >
                {DEBUGGING_ERROR_TYPES.map((et) => (
                  <option key={et} value={et}>
                    {et}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Difficulty</label>
              <select
                value={debuggingModal.difficulty}
                onChange={(e) => setDebuggingModal({ ...debuggingModal, difficulty: e.target.value })}
                className="input"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDebuggingModal({ open: false, title: '', description: '', errorType: 'runtime', difficulty: 'medium' })}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Add Challenge
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Assessment Question */}
      <Modal
        isOpen={assessmentModal.open}
        onClose={() => setAssessmentModal({ open: false, question: '', difficulty: 'medium', type: 'interview' })}
        title="Add Assessment Question"
        size="md"
      >
        <form onSubmit={handleAddAssessment} className="space-y-4">
          <div>
            <label className="label">Question *</label>
            <textarea
              required
              value={assessmentModal.question}
              onChange={(e) => setAssessmentModal({ ...assessmentModal, question: e.target.value })}
              placeholder="e.g. Explain how decorators work and give a real-world use case."
              rows={3}
              className="input"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Difficulty</label>
              <select
                value={assessmentModal.difficulty}
                onChange={(e) => setAssessmentModal({ ...assessmentModal, difficulty: e.target.value })}
                className="input"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="label">Assessment Type</label>
              <select
                value={assessmentModal.type}
                onChange={(e) => setAssessmentModal({ ...assessmentModal, type: e.target.value })}
                className="input"
              >
                {ASSESSMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAssessmentModal({ open: false, question: '', difficulty: 'medium', type: 'interview' })}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Save Question
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Resource (Dual Mode: URL or Upload File/Video/Doc) */}
      <Modal
        isOpen={resourceModal.open}
        onClose={() =>
          setResourceModal({
            open: false,
            mode: 'url',
            title: '',
            url: '',
            fileName: '',
            fileSize: '',
            fileType: '',
            fileData: '',
            type: 'Documentation',
            description: '',
          })
        }
        title="Add Learning Resource"
        size="md"
      >
        {(() => {
          const isUpload = resourceModal.mode === 'upload';
          const isUrl = !isUpload;

          return (
            <form onSubmit={handleAddResource} className="space-y-4">
              {/* Mode Switch Tabs with clear high-contrast active styling */}
              <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1.5 border border-gray-200 dark:border-gray-700 gap-1.5">
                <button
                  type="button"
                  onClick={() => setResourceModal((prev) => ({ ...prev, mode: 'url' }))}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isUrl
                      ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-400/40'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/60'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Web Link or Video URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setResourceModal((prev) => ({ ...prev, mode: 'upload' }))}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isUpload
                      ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/40'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/60'
                  }`}
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Upload Document / Video / PDF</span>
                </button>
              </div>

              {isUpload ? (
                <div className="space-y-3">
              <div>
                <label className="label">Choose File (PDF, Video, Cheatsheet, Code, Image) *</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-gray-900/40 relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.md,.json,.py,.js,.jsx,.ts,.tsx,.zip,.png,.jpg,.jpeg,.gif,.svg,.mp4,.webm,.mov"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // Format size
                      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
                      const sizeText = file.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;

                      // Detect type
                      let detectedType = 'Documentation';
                      if (file.type.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
                        detectedType = 'Video';
                      } else if (file.name.endsWith('.pdf')) {
                        detectedType = 'Documentation';
                      } else if (file.type.includes('image')) {
                        detectedType = 'Other';
                      } else if (file.name.endsWith('.zip') || file.name.endsWith('.py') || file.name.endsWith('.js')) {
                        detectedType = 'Practice';
                      }

                      const reader = new FileReader();
                      reader.onload = (uploadEvt) => {
                        const base64Data = uploadEvt.target?.result;
                        setResourceModal((prev) => ({
                          ...prev,
                          title: prev.title.trim() ? prev.title : file.name.replace(/\.[^/.]+$/, ''),
                          fileName: file.name,
                          fileSize: sizeText,
                          fileType: file.type || 'application/octet-stream',
                          fileData: base64Data,
                          type: detectedType,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Upload className="w-4 h-4" />
                    </div>
                    {resourceModal.fileName ? (
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate max-w-[280px]">
                          {resourceModal.fileName}
                        </p>
                        <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                          {resourceModal.fileSize} • Ready to save
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          Click to browse or drag & drop file
                        </p>
                        <p className="text-[10px] text-gray-400">
                          PDFs, Video clips (MP4), Cheatsheets, Code, Diagrams
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="label">Web URL or Video Link (Optional)</label>
              <input
                type="url"
                value={resourceModal.url}
                onChange={(e) => {
                  const val = e.target.value;
                  let autoType = resourceModal.type;
                  if (val.includes('youtube.com') || val.includes('youtu.be') || val.includes('vimeo')) {
                    autoType = 'Video';
                  } else if (val.includes('github.com')) {
                    autoType = 'GitHub';
                  }
                  setResourceModal({ ...resourceModal, url: val, type: autoType });
                }}
                placeholder="https://docs.python.org/... or https://youtube.com/..."
                className="input"
                autoFocus
              />
            </div>
          )}

          <div>
            <label className="label">Resource Title *</label>
            <input
              type="text"
              required
              value={resourceModal.title}
              onChange={(e) => setResourceModal({ ...resourceModal, title: e.target.value })}
              placeholder={resourceModal.mode === 'upload' ? 'e.g. Chapter 3 Summary Notes PDF' : 'e.g. Official Documentation, Real Python Guide, or Book Title'}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Category / Type</label>
              <select
                value={resourceModal.type}
                onChange={(e) => setResourceModal({ ...resourceModal, type: e.target.value })}
                className="input"
              >
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Optional Note</label>
              <input
                type="text"
                value={resourceModal.description}
                onChange={(e) => setResourceModal({ ...resourceModal, description: e.target.value })}
                placeholder="Key takeaways or summary..."
                className="input"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() =>
                setResourceModal({
                  open: false,
                  mode: 'url',
                  title: '',
                  url: '',
                  fileName: '',
                  fileSize: '',
                  fileType: '',
                  fileData: '',
                  type: 'Documentation',
                  description: '',
                })
              }
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Save Resource
            </button>
          </div>
        </form>
      );
    })()}
  </Modal>
      {/* Modal: Subtopic Deep Dive Study View */}
      {subtopicDrawer && (
        <Modal
          isOpen={Boolean(subtopicDrawer)}
          onClose={() => setSubtopicDrawer(null)}
          title={`Study Concept: ${subtopicDrawer.item.title}`}
          size="lg"
        >
          <div className="space-y-4">
            {/* Header badges */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                  {subtopicDrawer.item.type || 'Concept'}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    subtopicDrawer.item.completed
                      ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  {subtopicDrawer.item.completed ? 'Mastered ✓' : 'In Progress'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const prompt = generateAIPrompt({
                      levelTitle: level?.title,
                      subjectTitle: subject?.title,
                      topicTitle: topic.title,
                      subtopicTitle: subtopicDrawer.item.title,
                      mode: 'deepdive',
                    });
                    navigator.clipboard.writeText(prompt);
                    showToast('AI Study Prompt copied to clipboard!', 'success');
                  }}
                  className="btn-secondary text-xs flex items-center gap-1.5 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/40"
                  title="Copy ready-to-use AI Prompt"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Copy AI Prompt</span>
                </button>

                <button
                  onClick={() => {
                    toggleLearningItem(topic.id, subtopicDrawer.item.id, !subtopicDrawer.item.completed);
                    setSubtopicDrawer({
                      ...subtopicDrawer,
                      item: { ...subtopicDrawer.item, completed: !subtopicDrawer.item.completed },
                    });
                  }}
                  className="btn-secondary text-xs"
                >
                  {subtopicDrawer.item.completed ? 'Mark In-Progress' : 'Mark as Mastered ✓'}
                </button>
              </div>
            </div>

            {/* AI Learning Prompt Card */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>AI Mentor Prompt for this Concept</span>
                </div>
                <button
                  onClick={() =>
                    setAiPromptModal({
                      open: true,
                      subtopic: subtopicDrawer.item.title,
                      mode: 'deepdive',
                    })
                  }
                  className="text-xs font-semibold text-purple-700 dark:text-purple-300 hover:underline"
                >
                  Customize Mode & View Full Prompt ↗
                </button>
              </div>
              <p className="text-xs text-purple-900/80 dark:text-purple-200/80 font-mono bg-white/70 dark:bg-gray-900/60 p-2.5 rounded-lg border border-purple-100 dark:border-purple-900/40 line-clamp-2">
                {generateAIPrompt({
                  levelTitle: level?.title,
                  subjectTitle: subject?.title,
                  topicTitle: topic.title,
                  subtopicTitle: subtopicDrawer.item.title,
                  mode: 'deepdive',
                })}
              </p>
            </div>

            {/* Concept Explanation */}
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Concept Breakdown & Mental Model</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                {subtopicDrawer.item.description || subtopicDrawer.details.explanation}
              </p>
            </div>

            {/* Code Implementation */}
            {subtopicDrawer.details.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-gray-900 text-gray-300 px-4 py-2 text-xs font-mono flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" /> Code Implementation & Syntax
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(subtopicDrawer.details.codeSnippet);
                      showToast('Code snippet copied to clipboard', 'success');
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </button>
                </div>
                <pre className="p-4 bg-gray-950 text-gray-200 font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{subtopicDrawer.details.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Key Takeaways & Pitfalls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Engineering Takeaways</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                  {subtopicDrawer.details.keyTakeaways.map((point, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-900 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Common Gotchas & Pitfalls</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                  {subtopicDrawer.details.pitfalls.map((pitfall, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-0.5">•</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Personal Notes */}
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-500" />
                <span>My Personal Concept Notes</span>
              </label>
              <textarea
                rows={3}
                placeholder="Write down personal notes, syntax tricks, or real-world project observations..."
                value={
                  subtopicNotes[subtopicDrawer.item.id] !== undefined
                    ? subtopicNotes[subtopicDrawer.item.id]
                    : subtopicDrawer.item.notes || ''
                }
                onChange={(e) =>
                  setSubtopicNotes((prev) => ({
                    ...prev,
                    [subtopicDrawer.item.id]: e.target.value,
                  }))
                }
                className="input text-xs w-full bg-white dark:bg-gray-850"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    const newNotes = subtopicNotes[subtopicDrawer.item.id];
                    updateTopic(topic.id, {
                      learningItems: (topic.learningItems || []).map((li) =>
                        li.id === subtopicDrawer.item.id ? { ...li, notes: newNotes } : li
                      ),
                    });
                    showToast('Subtopic note saved', 'success');
                  }}
                  className="btn-primary text-xs"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: AI Study Prompt Generator */}
      {aiPromptModal.open && (
        <Modal
          isOpen={aiPromptModal.open}
          onClose={() => setAiPromptModal({ open: false, subtopic: null, mode: 'deepdive' })}
          title={
            aiPromptModal.subtopic
              ? `AI Learning Prompt: ${aiPromptModal.subtopic}`
              : `Topic AI Learning Prompt: ${topic.title}`
          }
          size="lg"
        >
          <div className="space-y-4">
            {/* Mode selection tabs */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                Select Your AI Learning Objective:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'deepdive', label: '📘 Deep Dive', desc: 'Comprehensive tutorial' },
                  { id: 'interview', label: '🎯 Interview Mock', desc: 'Q&A + Senior defense' },
                  { id: 'socratic', label: '⚔️ Socratic Grill', desc: '1-by-1 interrogation' },
                  { id: 'debugging', label: '🐞 Bug Diagnosis', desc: '3 failure scenarios' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setAiPromptModal((prev) => ({ ...prev, mode: m.id }))}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      aiPromptModal.mode === m.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-400 dark:border-purple-600 shadow-xs'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{m.label}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Prompt Preview */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gray-900 text-gray-300 px-4 py-2 text-xs font-mono flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Tailored Prompt Ready for AI (Claude / ChatGPT / Gemini)
                </span>
                <button
                  onClick={() => {
                    const prompt = generateAIPrompt({
                      levelTitle: level?.title,
                      subjectTitle: subject?.title,
                      topicTitle: topic.title,
                      subtopicTitle: aiPromptModal.subtopic,
                      mode: aiPromptModal.mode,
                    });
                    navigator.clipboard.writeText(prompt);
                    setCopiedCodeId('modal-prompt');
                    showToast('AI prompt copied to clipboard! Paste into your AI chat.', 'success');
                    setTimeout(() => setCopiedCodeId(null), 2500);
                  }}
                  className="btn-primary text-xs py-1 px-3 bg-purple-600 hover:bg-purple-700 border-purple-600 flex items-center gap-1.5 shadow-xs"
                >
                  {copiedCodeId === 'modal-prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Prompt
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-gray-950 text-purple-100 font-mono text-xs overflow-x-auto max-h-80 leading-relaxed whitespace-pre-wrap">
                <code>
                  {generateAIPrompt({
                    levelTitle: level?.title,
                    subjectTitle: subject?.title,
                    topicTitle: topic.title,
                    subtopicTitle: aiPromptModal.subtopic,
                    mode: aiPromptModal.mode,
                  })}
                </code>
              </pre>
            </div>

            {/* AI Assistant recommendation tip */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>How to Use This Prompt:</span>
              </div>
              <p>
                1. Click <strong>"Copy Prompt"</strong> above.<br />
                2. Open your preferred AI assistant (Claude 3.5 Sonnet, ChatGPT GPT-4o, Google Gemini 1.5 Pro, or DeepSeek-R1).<br />
                3. Paste the prompt and send. The AI will provide a structured mentor breakdown without missing critical prerequisites or context!
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setAiPromptModal({ open: false, subtopic: null, mode: 'deepdive' })}
                className="btn-secondary text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const prompt = generateAIPrompt({
                    levelTitle: level?.title,
                    subjectTitle: subject?.title,
                    topicTitle: topic.title,
                    subtopicTitle: aiPromptModal.subtopic,
                    mode: aiPromptModal.mode,
                  });
                  navigator.clipboard.writeText(prompt);
                  showToast('AI prompt copied to clipboard!', 'success');
                  setAiPromptModal({ open: false, subtopic: null, mode: 'deepdive' });
                }}
                className="btn-primary text-xs bg-purple-600 hover:bg-purple-700 border-purple-600"
              >
                <Copy className="w-3.5 h-3.5" /> Copy & Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}
