// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertCircle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
};

const COLORS = {
  success: 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800',
  error: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800',
  warning: 'border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800',
  info: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast: toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-card-lg text-sm font-medium pointer-events-auto animate-slide-in max-w-sm ${COLORS[t.type]}`}
          >
            {ICONS[t.type]}
            <span className="flex-1 text-gray-800 dark:text-gray-200">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  const toastFn = (...args) => ctx.toast(...args);
  toastFn.showToast = (...args) => ctx.toast(...args);
  toastFn.toast = (...args) => ctx.toast(...args);
  return toastFn;
}
