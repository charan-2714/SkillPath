// src/data/roadmap/index.js
// Master roadmap data - structured content separate from user progress.
// Replace/augment topics here to expand the curriculum.

import { engineeringFoundation } from './levels/L0_engineering';
import { pythonLevel } from './levels/L1_python';
import { gitLinuxLevel } from './levels/L2_git_linux';
import { webHttpLevel } from './levels/L3_web_http';
import { apisBackendLevel } from './levels/L4_apis';
import { playwrightLevel } from './levels/L5_playwright';
import { pandasDataLevel } from './levels/L9_pandas';
import { machineLearningLevel } from './levels/L16_ml';
import { deepLearningLevel } from './levels/L17_dl';
import { llmFundamentalsLevel } from './levels/L19_llm';
import { ragLevel } from './levels/L23_rag';
import { agentsLevel } from './levels/L25_agents';
import { systemDesignLevel } from './levels/L33_system_design';
import { placeholderLevels } from './placeholder';

export const ROADMAP_LEVELS = [
  engineeringFoundation,  // L0
  pythonLevel,            // L1
  gitLinuxLevel,          // L2
  webHttpLevel,           // L3
  apisBackendLevel,       // L4
  playwrightLevel,        // L5
  // L6-L8 placeholders
  ...placeholderLevels.slice(0, 3),
  pandasDataLevel,        // L9
  ...placeholderLevels.slice(3, 7),  // L10-L13
  machineLearningLevel,  // L16 (shown as L14 in mock)
  deepLearningLevel,
  llmFundamentalsLevel,
  ragLevel,
  agentsLevel,
  systemDesignLevel,
  ...placeholderLevels.slice(7),
];

// Flatten all topics for search and navigation
export function getAllTopics() {
  return ROADMAP_LEVELS.flatMap(level =>
    level.subjects.flatMap(subject =>
      subject.topics.map(topic => ({
        ...topic,
        levelId: level.id,
        levelTitle: level.title,
        subjectId: subject.id,
        subjectTitle: subject.title,
        domain: level.domain,
        color: level.color,
      }))
    )
  );
}

export function getTopicById(topicId) {
  for (const level of ROADMAP_LEVELS) {
    for (const subject of level.subjects) {
      const topic = subject.topics.find(t => t.id === topicId);
      if (topic) return { topic, subject, level };
    }
  }
  return null;
}

export function getLevelById(levelId) {
  return ROADMAP_LEVELS.find(l => l.id === levelId) || null;
}

export function getAdjacentTopics(topicId) {
  const allTopics = getAllTopics();
  const idx = allTopics.findIndex(t => t.id === topicId);
  return {
    prev: idx > 0 ? allTopics[idx - 1] : null,
    next: idx < allTopics.length - 1 ? allTopics[idx + 1] : null,
  };
}
