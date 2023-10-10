import { unref, Ref } from "vue";
import useEventListener from "./useEventListener";

export default function useClickAway<T extends HTMLElement>(
  target: Ref<T | null>,
  handler: (event: Event) => void
) {
  const event = "pointerdown";

  if (typeof window === "undefined" || !window) {
    return;
  }

  const listener = (event: Event) => {
    const el = unref(target);
    if (!el) {
      return;
    }

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  return useEventListener(window, event, listener);
}
