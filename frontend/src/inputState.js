import { useState } from 'react';

export const useInputState = () => {
  const [input, setInput] = useState('');
  return { input, setInput };
};
