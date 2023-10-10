import { DirectiveBinding } from "vue";
import measure from "./measure";
const ellipsisConfig = {
  rows: 1,
  suffix: "",
  ellipsisStr: "...",
  expandable: false,
  showTooltip: false,
};
const bind = (el: HTMLElement, binding: DirectiveBinding): void => {
  const value = binding.value;
  el.style.lineHeight = (1.33).toString();
  el.setAttribute("title", value);
  const { ellipsis, text } = measure(el, ellipsisConfig, value);
  if (ellipsis) {
    el.innerHTML = text + "..." || "";
  } else {
    el.innerHTML = text || "";
  }
};
const rebind = (el: HTMLElement, binding: DirectiveBinding): void => {
  bind(el, binding);
};

const ellipsisDirective = {
  mounted: bind,
  updated: rebind,
};

export default ellipsisDirective;
