import { useEffect, useState } from 'react';

const createStorage = (name, defaultValue) => {
  const [data, setData] = useState(() => {
    const items = window.localStorage.getItem(name);
    return items ? JSON.parse(items) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(data));
  }, [name, data]);

  return [data, setData];
};

const getStorage = (name) => {
  const [data] = useState(() => {
    const items = window.localStorage.getItem(name);
    return JSON.parse(items);
  });

  return [data];
};

export { createStorage, getStorage };
