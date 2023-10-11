<template>
  <div class="k-typography" ref="typographyRef">
    <popper
      :content="fullText"
      class="dark"
      placement="bottom-start"
      arrow
      v-if="isEllipsis"
    >
      <span ref="wrapperRef" style="display: inline-block; width: 100%"
        >{{ ellipsisText }}{{ isEllipsis ? "..." : "" }}</span
      >
    </popper>
    <span ref="wrapperRef" v-else style="display: inline-block; width: 100%">
      {{ ellipsisText }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import measure from "./measure";
import popper from "./popper.vue";
import { useResizeObserver } from "@vueuse/core";
interface Props {
  text: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: "",
});

watch(
  () => props.text,
  (nVal) => {
    init(nVal);
  }
);

const wrapperRef = ref();
const ellipsisText = ref("");
const fullText = ref();
const isEllipsis = ref(false);
const typographyRef = ref();
const ellipsisConfig = ref({
  rows: 1,
  suffix: "",
  ellipsisStr: "...",
  expandable: false,
  showTooltip: false,
});

const init = async (textStr: string) => {
  await nextTick();
  if (!wrapperRef.value) {
    return;
  }
  fullText.value = textStr;
  const { ellipsis, text } = measure(
    wrapperRef.value,
    ellipsisConfig.value,
    fullText.value
  );
  ellipsisText.value = text || "";
  isEllipsis.value = ellipsis;
};

onMounted(async () => {
  if (!typographyRef.value) {
    return;
  }
  useResizeObserver(typographyRef.value, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    console.log(width, "entries", height);
    init(props.text);
  });
});
</script>
<style lang="scss" scoped>
.k-typography {
  line-height: 1.33;
}
</style>
<style lang="scss">
.dark {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: white;
  --popper-theme-border-width: 0px;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.light {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
