// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Generic localStorage hook. Returns [value, setValue].
 * Components should prefer useAppState() instead.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('[useLocalStorage] Read error:', err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error('[useLocalStorage] Write error:', err);
    }
  };

  return [storedValue, setValue];
}
