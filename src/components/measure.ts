export interface EllipsisConfig {
  /**
   * @zh 显示省略的行数
   * @en The number of omitted lines
   * @defaultValue 1
   */
  rows?: number;
  /**
   * @zh 是否支持展开/折叠
   * @en Whether expandable
   */
  expandable?: boolean;
  /**
   * @zh 省略号
   * @en Ellipsis string
   * @defaultValue '...'
   */
  ellipsisStr?: string;
  /**
   * @zh 后缀
   * @en Suffix
   */
  suffix?: string;
  /**
   * @zh 配置省略时的弹出框
   * @en Pop-up box when configuration is omitted
   * @defaultValue false
   * */
  showTooltip?:
    | boolean
    | { type: "tooltip" | "popover"; props: Record<string, any> };
}
export interface EllipsisInternalConfig extends Required<EllipsisConfig> {
  showTooltip: boolean;
  TooltipComponent?: any;
  tooltipProps?: { [key: string]: any };
}

let ellipsisContainer: HTMLElement;

function styleToString(style: CSSStyleDeclaration) {
  const styleNames: string[] = Array.prototype.slice.apply(style);
  return styleNames
    .map((name) => `${name}: ${style.getPropertyValue(name)};`)
    .join("");
}

function pxToNumber(value: string | null): number {
  if (!value) return 0;

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

export default (
  originElement: HTMLElement,
  ellipsisConfig: EllipsisInternalConfig,
  fullText: string
) => {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement("div");
    document.body.appendChild(ellipsisContainer);
  }

  const { rows, ellipsisStr } = ellipsisConfig;

  const originStyle = window.getComputedStyle(originElement);
  const styleString = styleToString(originStyle);
  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight = Math.round(
    lineHeight * rows +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)
  );

  ellipsisContainer.setAttribute("style", styleString);
  ellipsisContainer.setAttribute("aria-hidden", "true");

  ellipsisContainer.style.height = "auto";
  ellipsisContainer.style.minHeight = "auto";
  ellipsisContainer.style.maxHeight = "auto";
  ellipsisContainer.style.position = "fixed";
  ellipsisContainer.style.left = "0";
  ellipsisContainer.style.top = "-99999999px";
  ellipsisContainer.style.zIndex = "-200";
  ellipsisContainer.style.whiteSpace = "normal";
  ellipsisContainer.innerHTML = "";
  // 省略号和后缀
  const ellipsisTextNode = document.createTextNode(`${ellipsisStr}`);
  ellipsisContainer.appendChild(ellipsisTextNode);

  // 内容
  const textNode = document.createTextNode(fullText);
  ellipsisContainer.insertBefore(textNode, ellipsisTextNode);

  function inRange() {
    return ellipsisContainer.offsetHeight <= maxHeight;
  }

  if (inRange()) {
    return {
      ellipsis: false,
      text: fullText,
    };
  }

  // 寻找最多的文字
  /**
   *
   * @param textNode 文本节点
   * @param startLoc 起始index
   * @param endLoc 文本长度
   * @param lastSuccessLoc 最后寻找到的节点
   * @returns null
   * 时间复杂度为o(logn),最坏情况下，如果我们不能在二分查找中找到满足条件的长度，我们需要从 endLoc 开始，一步步向回退，再检查每个长度，这将使时间复杂度变为 O(n)
   */
  function measureText(
    textNode: Text,
    startLoc = 0,
    endLoc = fullText.length,
    lastSuccessLoc = 0
  ) {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    const currentText = fullText.slice(0, midLoc);
    textNode.textContent = currentText;

    if (startLoc >= endLoc - 1) {
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;

        if (inRange() || !currentStepText) {
          return;
        }
      }
    }

    if (inRange()) {
      measureText(textNode, midLoc, endLoc, midLoc);
    } else {
      measureText(textNode, startLoc, midLoc, lastSuccessLoc);
    }
  }

  measureText(textNode);
  // 删除ellipsisContainer节点
  // ellipsisContainer.parentNode?.removeChild(ellipsisContainer);
  return {
    text: textNode.textContent,
    ellipsis: true,
  };
};
