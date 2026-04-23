import { useState, useCallback } from 'react';

/**
 * Drop-in replacement for useState that persists the value in localStorage.
 * The value must be JSON-serialisable.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setAndStore = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState(prev => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch { /* quota exceeded — silently ignore */ }
        return next;
      });
    },
    [key]
  );

  return [state, setAndStore];
}
