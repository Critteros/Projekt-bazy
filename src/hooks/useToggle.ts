import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((value) => !value), [setValue]);
  return [value, toggle] as const;
};
