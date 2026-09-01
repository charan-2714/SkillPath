// src/components/dsa/DSAAiPromptModal.jsx
// Interactive 9-mode AI Prompt Generator for DSA Problems & Solutions

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  BrainCircuit,
  Lightbulb,
  FileCode,
  Bug,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  Scale,
  X,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';

const PROMPT_MODES = [
  {
    id: 'learn-concept',
    label: '1. Learn Concept',
    icon: Lightbulb,
    description: 'Explain the core algorithmic pattern and intuition behind this problem without spoiling the code.',
  },
  {
    id: 'give-hint',
    label: '2. Give Me a Hint',
    icon: HelpCircle,
    description: 'Provide progressive, subtle hints to nudge you in the right direction.',
  },
  {
    id: 'review-approach',
    label: '3. Review My Approach',
    icon: BrainCircuit,
    description: 'Critique your planned strategy, invariant, and theoretical complexity before writing code.',
  },
  {
    id: 'review-code',
    label: '4. Review My Code',
    icon: FileCode,
    description: 'Full code review on correctness, time/space complexity, edge cases, and code quality.',
  },
  {
    id: 'find-bug',
    label: '5. Find My Bug',
    icon: Bug,
    description: 'Diagnose why your code is failing or hitting TLE/edge case without giving away full answer.',
  },
  {
    id: 'optimal-approach',
    label: '6. Explain Optimal Approach',
    icon: TrendingUp,
    description: 'Step-by-step explanation of the best known time and space complexity solution.',
  },
  {
    id: 'interview-questions',
    label: '7. Mock Interview Follow-ups',
    icon: MessageSquare,
    description: 'Generate follow-up questions, scaling constraints, and interview trade-off questions.',
  },
  {
    id: 'explain-no-spoiler',
    label: '8. Explain Without Solution',
    icon: Lightbulb,
    description: 'Clarify problem requirements and edge cases for complete conceptual clarity.',
  },
  {
    id: 'compare-optimal',
    label: '9. Compare with Optimal',
    icon: Scale,
    description: 'Compare your written solution against the optimal benchmark.',
  },
];

export function DSAAiPromptModal({ isOpen, onClose, problem, userProgress }) {
  const { showToast } = useToast();
  const [selectedMode, setSelectedMode] = useState('learn-concept');
  const [copied, setCopied] = useState(false);
  const [includeCode, setIncludeCode] = useState(true);
  const [includeApproach, setIncludeApproach] = useState(true);

  const generatedPrompt = useMemo(() => {
    if (!problem) return '';

    const diff = problem.difficulty || 'Medium';
    const topics = (problem.topics || []).join(', ');
    const patterns = (problem.patterns || []).join(', ');
    const prerequisites = (problem.prerequisites || []).join(', ');

    const codeSnippet = includeCode && userProgress?.activeSolution
      ? `\n### My Current Code (${userProgress.language || 'Python'}):\n\`\`\`${userProgress.language || 'python'}\n${userProgress.activeSolution}\n\`\`\`\n`
      : '';

    const approachSnippet = includeApproach && userProgress?.approach
      ? `\n### My Stated Approach:\n"${userProgress.approach}"\n\n### My Claimed Complexity:\n- Time: ${userProgress.timeComplexity || 'O(n)'}\n- Space: ${userProgress.spaceComplexity || 'O(1)'}\n`
      : '';

    const mistakesSnippet = userProgress?.mistakesLessons
      ? `\n### Known Stumbling Blocks / Mistakes:\n"${userProgress.mistakesLessons}"\n`
      : '';

    let promptGoal = '';

    switch (selectedMode) {
      case 'learn-concept':
        promptGoal = `Please explain the underlying algorithmic pattern and mental models required to solve this problem effectively.
- Break down WHY this problem belongs to the "${patterns}" pattern family.
- Do NOT provide the full source code solution directly yet.
- Explain the key invariant or data structure choice that eliminates brute force.
- Give a visual or step-by-step conceptual walkthrough of a small example.`;
        break;

      case 'give-hint':
        promptGoal = `I am attempting this problem and would like progressive hints without spoiling the entire solution.
- Give me 3 progressive hints:
  1. Hint 1: High-level intuition & observation.
  2. Hint 2: Data structure choice and invariant to maintain.
  3. Hint 3: Pointer/state transition logic.
- Do NOT write full code. Let me code it myself.`;
        break;

      case 'review-approach':
        promptGoal = `Please review my stated approach and complexity analysis:
${approachSnippet}
- Is my strategy mathematically sound and optimal?
- Did I correctly identify the time and space complexity?
- What critical edge cases (e.g. empty inputs, duplicates, boundary limits) should I watch out for before I start coding?`;
        break;

      case 'review-code':
        promptGoal = `Please perform a thorough senior software engineer code review on my solution:
${codeSnippet}
${approachSnippet}
Please evaluate:
1. **Correctness & Logic:** Does the implementation handle all edge cases?
2. **Time & Space Complexity:** State the exact Big-O and whether it can be optimized further.
3. **Clean Code & Idiomatic Style:** Suggest readability improvements and standard language conventions.
4. **Potential Bugs & Traps:** Highlight any subtle off-by-one errors or memory inefficiencies.`;
        break;

      case 'find-bug':
        promptGoal = `My code is failing tests or hitting unexpected behavior:
${codeSnippet}
${approachSnippet}
Please help me debug:
- Point out the specific line or condition that creates the logical flaw or edge-case failure.
- Explain WHY the logic fails with a concrete failing test case.
- Give me a hint on how to fix it without giving a completely rewritten script.`;
        break;

      case 'optimal-approach':
        promptGoal = `Please explain the optimal industry-standard solution for this problem:
- State the best theoretical Time and Space complexity achievable.
- Provide a clean, well-commented implementation in ${userProgress?.language || 'Python'}.
- Explain how the optimal algorithm works step-by-step.
- Highlight common pitfalls candidates make in interviews with this problem.`;
        break;

      case 'interview-questions':
        promptGoal = `Act as an expert technical interviewer at a top tech company (e.g., Google/Meta):
- Ask me 3 challenging follow-up questions regarding scalability and constraints for this problem.
- Ask about memory trade-offs (e.g., streaming input, ultra-large dataset exceeding RAM).
- Ask how I would test this solution with unit tests and fuzzing.`;
        break;

      case 'explain-no-spoiler':
        promptGoal = `Explain the problem requirements in simple, crystal-clear terms:
- Rephrase the problem statement with everyday analogies.
- List all implicit constraints and edge cases I need to consider.
- Do NOT mention the exact algorithm or solution code.`;
        break;

      case 'compare-optimal':
        promptGoal = `Please compare my written solution against the canonical optimal solution:
${codeSnippet}
${approachSnippet}
- How does my code compare in terms of runtime speed, memory footprint, and lines of code?
- What algorithmic trade-offs did I make compared to the gold-standard benchmark?`;
        break;

      default:
        promptGoal = 'Please assist me with understanding and mastering this problem.';
    }

    return `I am practicing Data Structures & Algorithms on SkillPath and working on the following LeetCode problem:

### Problem Details:
- **Title:** ${problem.title} (${diff})
- **Topics:** ${topics || 'Algorithms'}
- **Algorithmic Patterns:** ${patterns || 'General'}
- **Prerequisites:** ${prerequisites || 'None'}
- **Official URL:** ${problem.leetcodeUrl || ''}
${codeSnippet}${approachSnippet}${mistakesSnippet}
---

### Instruction for AI Assistant:
${promptGoal}
`;
  }, [problem, userProgress, selectedMode, includeCode, includeApproach]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    showToast('AI Study Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !problem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`AI Study & Code Review Prompt: ${problem.title}`}
      size="lg"
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        {/* Mode Selector Grid */}
        <div>
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 block">
            Select Prompt Objective:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PROMPT_MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 dark:border-indigo-500 shadow-2xs'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                    <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900 dark:text-indigo-200' : 'text-gray-800 dark:text-gray-200'}`}>
                      {mode.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                    {mode.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles: Include user's code & approach */}
        {(userProgress?.activeSolution || userProgress?.approach) && (
          <div className="flex items-center gap-4 py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Include in Prompt:</span>
            {userProgress.activeSolution && (
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={includeCode}
                  onChange={(e) => setIncludeCode(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                My Current Code ({userProgress.language || 'Python'})
              </label>
            )}
            {userProgress.approach && (
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={includeApproach}
                  onChange={(e) => setIncludeApproach(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                My Stated Approach
              </label>
            )}
          </div>
        )}

        {/* Generated Prompt Preview */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Generated Prompt (Copy & Paste to ChatGPT / Claude / Gemini):
            </label>
            <span className="text-[10px] text-gray-400 font-mono">
              {generatedPrompt.length} characters
            </span>
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={generatedPrompt}
              rows={9}
              className="input font-mono text-xs leading-relaxed bg-gray-50 dark:bg-gray-900 pr-10"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 shadow-2xs"
              title="Copy to Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Paste this prompt into your favorite AI model to learn without unwanted spoilers.
          </p>

          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Close
            </button>
            <button type="button" onClick={handleCopy} className="btn-primary text-xs flex items-center gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
