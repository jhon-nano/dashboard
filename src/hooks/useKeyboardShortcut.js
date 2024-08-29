import { useEffect } from 'react';

export function useKeyboardShortcut(keyCombination, callback) {
  useEffect(() => {
    const handler = (event) => {
      if (event.ctrlKey && event.key === keyCombination) {
        callback();
      }
    };

    document.addEventListener('keydown', handler);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [keyCombination, callback]);
}
