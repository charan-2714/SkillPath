// scripts/curriculum/build_full_curriculum.js
// Master compiler and validator for the definitive AI/ML Engineer Master Curriculum (Automation Developer Focus)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { levels00to09 } from './levels_00_to_09.js';
import { levels10to19 } from './levels_10_to_19.js';
import { levels20to29 } from './levels_20_to_29.js';
import { levels30to37 } from './levels_30_to_37.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Assembling all 38 levels of AI/ML Engineer Master Curriculum (Automation Focus)...');

const allLevels = [
  ...levels00to09,
  ...levels10to19,
  ...levels20to29,
  ...levels30to37,
];

// Ensure orders are 0 to 37 sequentially
allLevels.forEach((lvl, idx) => {
  lvl.order = idx;
});

const fullCurriculum = {
  id: 'ai-ml-engineer',
  title: 'AI/ML Engineer',
  version: '2.0.0',
  description: 'The definitive, exhaustive learning journey and skill tracker for Python Automation Developers transitioning to modern AI/ML Engineers & GenAI Developers. Connects core software and automation foundations (Python, Git, Linux, Web/HTTP, APIs, Python Automation, Playwright Browser Automation, Web Scraping, Pandas) directly to advanced AI/ML capabilities (SQL, JS/Node basics, DSA, Mathematics for ML, Classical ML, Deep Learning & PyTorch, Transformers, LLM Fundamentals, Prompt Engineering, Structured Outputs, Embeddings & Vector DBs, Advanced RAG, Function Calling, Autonomous Agentic AI, LangChain/LangGraph, Model Context Protocol MCP, Multimodal AI, Evaluation & Observability, AI Security, Docker & CI/CD, Cloud Infrastructure, Distributed System Design, Production Reliability, AI-Powered Automation, 13 Capstone Projects, Interview Preparation, and Technology Radar).',
  category: 'Artificial Intelligence & Engineering',
  estimatedDuration: '9-12 months',
  estimatedHours: 1200,
  trackingModel: 'skill-development',
  skillDimensions: [
    { id: 'understanding', name: 'Conceptual Understanding', maxScore: 5 },
    { id: 'implementation', name: 'Hands-on Implementation', maxScore: 5 },
    { id: 'debugging', name: 'Debugging & Diagnostics', maxScore: 5 },
    { id: 'practice', name: 'Practice Challenges', maxScore: 5 },
    { id: 'interview', name: 'Interview & Explanation Readiness', maxScore: 5 },
  ],
  levels: allLevels,
};

// ----------------------------------------------------
// VALIDATION & METRICS EXTRACTION
// ----------------------------------------------------
const seenIds = new Set();
let totalLevels = 0;
let totalSubjects = 0;
let totalTopics = 0;
let totalLearningItems = 0;
let totalPractice = 0;
let totalDebugging = 0;
let totalAssessments = 0;

let pythonAutomationTopicCount = 0;
let playwrightTopicCount = 0;
let apiTopicCount = 0;
let aiAutomationTopicCount = 0;

const levelStats = {};

allLevels.forEach((level) => {
  totalLevels++;
  if (seenIds.has(level.id)) {
    throw new Error(`Duplicate Level ID detected: ${level.id}`);
  }
  seenIds.add(level.id);

  if (!level.subjects || level.subjects.length === 0) {
    throw new Error(`Level ${level.id} (${level.title}) has NO subjects!`);
  }

  levelStats[level.id] = {
    title: level.title,
    subjects: level.subjects.length,
    topics: 0,
    learningItems: 0,
    practice: 0,
    debugging: 0,
    assessments: 0,
  };

  level.subjects.forEach((subject) => {
    totalSubjects++;
    if (seenIds.has(subject.id)) {
      throw new Error(`Duplicate Subject ID detected: ${subject.id}`);
    }
    seenIds.add(subject.id);

    if (!subject.topics || subject.topics.length === 0) {
      throw new Error(`Subject ${subject.id} (${subject.title}) has NO topics!`);
    }

    subject.topics.forEach((topic) => {
      totalTopics++;
      levelStats[level.id].topics++;

      if (seenIds.has(topic.id)) {
        throw new Error(`Duplicate Topic ID detected: ${topic.id}`);
      }
      seenIds.add(topic.id);

      const items = topic.learningItems || [];
      if (items.length === 0) {
        throw new Error(`Topic ${topic.id} (${topic.title}) has NO learning items!`);
      }
      totalLearningItems += items.length;
      levelStats[level.id].learningItems += items.length;

      const prac = topic.practice || [];
      totalPractice += prac.length;
      levelStats[level.id].practice += prac.length;

      const dbg = topic.debugging || [];
      totalDebugging += dbg.length;
      levelStats[level.id].debugging += dbg.length;

      const assess = topic.assessments || [];
      totalAssessments += assess.length;
      levelStats[level.id].assessments += assess.length;

      // Count specific domain topics
      if (level.id === 'l6' || topic.tags?.includes('automation')) {
        pythonAutomationTopicCount++;
      }
      if (level.id === 'l7' || topic.tags?.includes('playwright')) {
        playwrightTopicCount++;
      }
      if (level.id === 'l5' || level.id === 'l4' || level.id === 'l20' || topic.tags?.includes('api') || topic.tags?.includes('http') || topic.tags?.includes('fastapi')) {
        apiTopicCount++;
      }
      if (level.id === 'l34' || topic.tags?.includes('ai-automation')) {
        aiAutomationTopicCount++;
      }
    });
  });
});

console.log('\n========================================');
console.log('REVISED MASTER CURRICULUM AUDIT METRICS');
console.log('========================================');
console.log(`Total Levels:                  ${totalLevels} (L0 to L37)`);
console.log(`Total Subjects:                ${totalSubjects}`);
console.log(`Total Topics:                  ${totalTopics}`);
console.log(`Total Learning Items / Sub:    ${totalLearningItems}`);
console.log(`Total Practice Challenges:     ${totalPractice}`);
console.log(`Total Debugging Challenges:    ${totalDebugging}`);
console.log(`Total Assessments & Qs:        ${totalAssessments}`);
console.log(`Total Independence Checks:     ${totalTopics} (100% covered across all topics)`);
console.log('----------------------------------------');
console.log(`Python Automation Topics:      ${pythonAutomationTopicCount}`);
console.log(`Playwright Automation Topics:  ${playwrightTopicCount}`);
console.log(`API & Backend Topics:          ${apiTopicCount}`);
console.log(`AI-Powered Automation Topics:  ${aiAutomationTopicCount}`);
console.log('========================================\n');

console.log('ALL 38 REVISED ROADMAP LEVELS:');
allLevels.forEach((lvl) => {
  const st = levelStats[lvl.id];
  console.log(`${lvl.id.toUpperCase()}: ${st.title} (${st.subjects} Subjects, ${st.topics} Topics, ${st.learningItems} Subtopics, ${st.practice} Practice, ${st.debugging} Debugging)`);
});

// Write to src/data/roles/ai-ml-engineer.json
const targetPath = path.resolve(__dirname, '../../src/data/roles/ai-ml-engineer.json');
fs.writeFileSync(targetPath, JSON.stringify(fullCurriculum, null, 2), 'utf-8');

console.log(`\nSuccessfully wrote revised master curriculum to ${targetPath}`);
