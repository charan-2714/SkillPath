// src/utils/storage.js
// Adapter re-exporting from storageService for backwards compatibility

export {
  loadAppData as loadState,
  saveAppData as saveState,
  exportBackup as exportData,
  importBackup as importData,
  resetAllData as resetState,
  loadAppData,
  saveAppData,
  exportBackup,
  importBackup,
  resetAllData,
} from '../services/storageService';
