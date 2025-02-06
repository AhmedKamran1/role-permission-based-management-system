import { useState, useEffect } from 'react';

export default function useDebounce(value, timer) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timer);

    return () => {
      clearTimeout(handler);
    };
  }, [value, timer]);

  return debouncedValue;
}
