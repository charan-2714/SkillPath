// src/components/dsa/DSACodeEditor.jsx
// Lightweight, responsive multi-language code editor for DSA solutions

import React, { useRef } from 'react';
import { Copy, Trash2, Code2, Check, FileCode } from 'lucide-react';
import { PROGRAMMING_LANGUAGES } from '../../models/dsaSchema';
import { useToast } from '../../context/ToastContext';

export function DSACodeEditor({
  code,
  onChange,
  language = 'python',
  onLanguageChange,
  readOnly = false,
  placeholder = 'Write your solution code here...',
}) {
  const textareaRef = useRef(null);
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleKeyDown = (e) => {
    if (readOnly) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = e.target.value;
      const newVal = val.substring(0, start) + '    ' + val.substring(end);
      onChange(newVal);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (readOnly) return;
    if (window.confirm('Are you sure you want to clear the editor?')) {
      onChange('');
    }
  };

  const lineCount = (code || '').split('\n').length || 1;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-900 text-gray-100 overflow-hidden shadow-card">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/80 border-b border-gray-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="h-4 w-px bg-gray-800" />

          {/* Language Selector */}
          {onLanguageChange ? (
            <div className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                disabled={readOnly}
                className="bg-transparent text-gray-200 font-semibold focus:outline-hidden text-xs cursor-pointer"
              >
                {PROGRAMMING_LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id} className="bg-gray-900 text-gray-100">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="font-mono text-gray-400 capitalize">{language}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!code}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-30"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {!readOnly && (
            <button
              type="button"
              onClick={handleClear}
              disabled={!code}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-30"
              title="Clear Editor"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex font-mono text-xs sm:text-sm leading-6 min-h-[260px] max-h-[500px] overflow-auto">
        {/* Line numbers column */}
        <div className="select-none py-3 px-3 text-right text-gray-600 bg-gray-950/40 border-r border-gray-800/80 font-mono text-xs">
          {Array.from({ length: Math.max(lineCount, 8) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-gray-100 placeholder-gray-600 resize-none focus:outline-hidden font-mono text-xs sm:text-sm leading-6"
        />
      </div>
    </div>
  );
}
