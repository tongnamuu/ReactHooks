import { useRef } from "react";
import { isElementOfType } from "react-dom/test-utils";

export const useFullScreen = () => {
  const element = useRef();

  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
    }
  };

  const exitFull = () => {
    document.exitFullscreen();
  };
  return { element, triggerFull, exitFull };
};
