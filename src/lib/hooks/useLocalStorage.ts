import { useState } from 'react';

import { useNotification } from '@/components/notifications/NotificationContext';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const { notify } = useNotification();

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      notify({ title: 'Error', content: `${error}` });
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      notify({ title: 'Error', content: `${error}` });
    }
  };

  const clean = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    } else
      notify({
        title: 'Error cleaning local storage',
      });
  };

  return [storedValue, setValue, clean] as const;
}
