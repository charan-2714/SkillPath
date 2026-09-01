// scripts/templates/build_all_templates.js
// Master build and validation script generating all production templates

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  generateSapFioriTemplate,
  generateSapIntegrationDeveloperTemplate,
  generateSapPiPoTemplate,
  generateSapMmTemplate,
} from './sap_templates.js';

import {
  generateSapS4HanaTemplate,
  generateSapBtpTemplate,
  generateSapCapTemplate,
  generateSapRapTemplate,
  generateSapAbapTemplate,
  generateSapHanaTemplate,
  generateSapODataTemplate,
  generateSapEventDrivenTemplate,
  generateSapAnalyticsTemplate,
  generateSapAribaTemplate,
  generateSapSuccessFactorsTemplate,
  generateSapBuildTemplate,
  generateSapBasTemplate,
} from './sap_templates_part2.js';

import {
  generatePythonAutomationTemplate,
  generateAgenticAiTemplate,
  generateMlOpsTemplate,
  generateDevopsPlatformTemplate,
} from './trending_tech_templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROLES_DIR = path.resolve(__dirname, '../../src/data/roles');

console.log('Building Professional Template Library...');

const templatesToBuild = [
  // SAP Ecosystem (17 templates)
  generateSapFioriTemplate(),
  generateSapIntegrationDeveloperTemplate(),
  generateSapPiPoTemplate(),
  generateSapMmTemplate(),
  generateSapS4HanaTemplate(),
  generateSapBtpTemplate(),
  generateSapCapTemplate(),
  generateSapRapTemplate(),
  generateSapAbapTemplate(),
  generateSapHanaTemplate(),
  generateSapODataTemplate(),
  generateSapEventDrivenTemplate(),
  generateSapAnalyticsTemplate(),
  generateSapAribaTemplate(),
  generateSapSuccessFactorsTemplate(),
  generateSapBuildTemplate(),
  generateSapBasTemplate(),

  // Trending Technologies & Core Roles (4 new high-value templates)
  generatePythonAutomationTemplate(),
  generateAgenticAiTemplate(),
  generateMlOpsTemplate(),
  generateDevopsPlatformTemplate(),
];

let totalLevels = 0;
let totalSubjects = 0;
let totalTopics = 0;
let totalSubtopics = 0;
let totalLearningItems = 0;

templatesToBuild.forEach((tpl) => {
  if (!tpl.id || !tpl.name || !tpl.title) {
    throw new Error(`Template missing required ID or Title: ${JSON.stringify(tpl)}`);
  }

  // Count stats
  const lvls = tpl.levels || [];
  totalLevels += lvls.length;
  lvls.forEach((lvl) => {
    const subs = lvl.subjects || [];
    totalSubjects += subs.length;
    subs.forEach((sub) => {
      const tops = sub.topics || [];
      totalTopics += tops.length;
      tops.forEach((top) => {
        const items = top.learningItems || [];
        totalLearningItems += items.length;
        totalSubtopics += items.length;
      });
    });
  });

  const filePath = path.join(ROLES_DIR, `${tpl.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(tpl, null, 2), 'utf-8');
  console.log(`✓ Generated template [${tpl.category}] ${tpl.title} -> ${tpl.id}.json`);
});

console.log('============================================================');
console.log(`Summary of newly built templates:`);
console.log(`- New Templates: ${templatesToBuild.length}`);
console.log(`- Total Levels: ${totalLevels}`);
console.log(`- Total Subjects: ${totalSubjects}`);
console.log(`- Total Topics: ${totalTopics}`);
console.log(`- Total Subtopics / Learning Items: ${totalSubtopics}`);
console.log('============================================================');
