// src/data/templates/index.js
// Adapter re-exporting from roles registry for clean architectural separation

export {
  ROLE_TEMPLATES,
  TEMPLATES,
  getRoleTemplateById,
  getTemplateById,
  cloneJourneyFromTemplate,
} from '../roles';
