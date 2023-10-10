import { isRef, watch, unref, onMounted, onBeforeUnmount, Ref } from "vue";

type EventTarget = Ref<HTMLElement | null> | HTMLElement | Window;
type Handler = (event: Event) => void;

export default function useEventListener(
  target: EventTarget,
  event: string,
  handler: Handler
) {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler);
      value?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}
