// scratch_test.js
// Verification of role template library & clone functionality

import { ROLE_TEMPLATES, cloneJourneyFromTemplate, getRoleTemplateById } from './src/data/roles/index.js';

console.log(`Verifying Role Template Library (${ROLE_TEMPLATES.length} total templates)...`);

let totalLevels = 0;
let totalTopics = 0;
let totalItems = 0;
let errors = 0;

ROLE_TEMPLATES.forEach((tpl) => {
  if (!tpl.id || !tpl.title) {
    console.error(`❌ Template missing ID or Title:`, tpl);
    errors++;
  }

  // Verify cloning
  try {
    const cloned = cloneJourneyFromTemplate(tpl, `Test ${tpl.title}`);
    if (!cloned.id || !cloned.levels || cloned.levels.length !== (tpl.levels || []).length) {
      console.error(`❌ Clone validation failed for ${tpl.id}`);
      errors++;
    }
  } catch (err) {
    console.error(`❌ Error cloning ${tpl.id}:`, err.message);
    errors++;
  }

  (tpl.levels || []).forEach((lvl) => {
    totalLevels++;
    (lvl.subjects || []).forEach((sub) => {
      (sub.topics || []).forEach((top) => {
        totalTopics++;
        const items = top.learningItems || top.subtopics || [];
        totalItems += items.length;
      });
    });
  });
});

console.log(`Validation results:`);
console.log(`- Total Templates: ${ROLE_TEMPLATES.length}`);
console.log(`- Total Levels: ${totalLevels}`);
console.log(`- Total Topics: ${totalTopics}`);
console.log(`- Total Subtopics/Learning Items: ${totalItems}`);
console.log(`- Errors: ${errors}`);

if (errors === 0) {
  console.log('✅ ALL TEMPLATES & CLONING VALIDATED SUCCESSFULLY!');
}
