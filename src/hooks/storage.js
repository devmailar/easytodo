import { useEffect, useState } from 'react';

export const createStorage = (name, defaultValue) => {
  const [data, setData] = useState(() => {
    const items = window.localStorage.getItem(name);
    return items ? JSON.parse(items) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(data));
  }, [name, data]);

  return [data, setData];
};

export const getStorage = (name) => {
  const [data] = useState(() => {
    const items = window.localStorage.getItem(name);
    return JSON.parse(items);
  });

  return [data];
};
