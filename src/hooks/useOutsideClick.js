import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  // Manually select an element, <StyledModal ref={ref}>
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // if current element doesn't contains target, so a click was done outside WINDOW, so close
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      // add event listner click, run funcion handleClick, and TRUE means listen event on the capturing fase, while event moves down the DOM tree, and not up the DOM tree (bubbling fase)
      document.addEventListener("click", handleClick, listenCapturing);

      // Is needed to remove eventListener...
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
