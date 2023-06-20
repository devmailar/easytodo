import { useEffect, useState } from 'react';

/**
 * Create a storage object and return its data and set state function
 * @export
 * @param {*} name
 * @param {*} defaultValue
 * @returns {Array} An array with two elements
 */
export function createStorage(name, defaultValue) {
  const [data, setData] = useState(() => {
    const items = window.localStorage.getItem(name);
    return items ? JSON.parse(items) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(data));
  }, [name, data]);

  return [data, setData];
}

/**
 * Get specific storage from localstorage and return its data
 * @export
 * @param {*} name
 * @return {Array} An array with one element
 */
export function getStorage(name) {
  const [data] = useState(() => {
    const items = window.localStorage.getItem(name);
    return JSON.parse(items);
  });

  return [data];
}
