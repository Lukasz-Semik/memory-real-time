import { useState } from 'react';

export const useModalState = (
  initialState = false
): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  return [isOpen, () => setIsOpen(true), () => setIsOpen(false)];
};
