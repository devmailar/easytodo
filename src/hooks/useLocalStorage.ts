import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : initialValue;
  });

  useEffect(
    () => window.localStorage.setItem(key, JSON.stringify(value)),
    [key, value]
  );

  return [value, setValue];
}
