import { useEffect } from "react";

export const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    const handleKeyup = (ev: KeyboardEvent) => {
      const { ctrlKey, shiftKey, key } = ev;
      if (ctrlKey && shiftKey && key == targetKey) {
        callback();
      }
    };
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [targetKey, callback]);
};
