import { onMounted, onBeforeUnmount, Ref } from "vue";
/**
 *
 * @param ignore 不需要的类名['.a']
 * @param event 鼠标事件
 * @returns boolean
 */
export const IgnoreElement = (ignore: string[], event: MouseEvent) => {
  return ignore.some((target) => {
    if (typeof target === "string") {
      return Array.from(window.document.querySelectorAll(target)).some(
        (el) => el === event.target || event.composedPath().includes(el)
      );
    }
  });
};
interface Options {
  ignore?: string[];
}
function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: (event: MouseEvent) => void,
  options?: Options
): void {
  let isIgnore = true;
  const clickOutsideHandler = (event: MouseEvent) => {
    const el = elementRef.value;
    if (!el || el === event.target || event.composedPath().includes(el)) {
      return;
    }
    if (options?.ignore && options.ignore.length > 0) {
      isIgnore = !IgnoreElement(options.ignore, event);
    }
    if (!isIgnore) {
      isIgnore = true;
      return;
    }
    callback(event);
  };

  onMounted(() => {
    window.addEventListener("click", clickOutsideHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", clickOutsideHandler);
  });
}

export default useClickOutside;
