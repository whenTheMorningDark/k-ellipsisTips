import { Ref, onMounted, onBeforeUnmount, watch, Slots, ref } from "vue";

export default function useContent(
  slots: Slots,
  popperNode: Ref<HTMLElement | null>,
  content: Ref<string>
) {
  let observer: MutationObserver | null = null;
  const hasContent = ref(false);

  onMounted(() => {
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }

    observer = new MutationObserver(checkContent);
    observer.observe(popperNode.value!, {
      childList: true,
      subtree: true,
    });
  });

  onBeforeUnmount(() => observer?.disconnect());

  /**
   * Watch the content prop
   */
  watch(content, (content) => {
    if (content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  });

  /**
   * Check the content slot
   */
  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent,
  };
}
