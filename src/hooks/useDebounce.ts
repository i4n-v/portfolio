import React, { useRef, useState } from 'react';

export default function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [value, delay]);

  return debouncedValue;
}
