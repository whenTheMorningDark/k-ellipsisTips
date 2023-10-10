<template>
  <div id="arrow" data-popper-arrow />
</template>

<style>
/* --popper-theme-background-color: #333333;
--popper-theme-background-color-hover: #333333;
--popper-theme-text-color: white;
--popper-theme-border-width: 0px;
--popper-theme-border-radius: 6px;
--popper-theme-padding: 32px;
--popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25); */
#arrow,
#arrow::before {
  transition: background 250ms ease-in-out;
  position: absolute;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  background: #333333;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

/* Top arrow */
.popper[data-popper-placement^="top"] > #arrow {
  bottom: -5px;
}

.popper[data-popper-placement^="top"] > #arrow::before {
  border-right: 0px solid #eeeeee;
  border-bottom: 0px solid #eeeeee;
}

/* Bottom arrow */
.popper[data-popper-placement^="bottom"] > #arrow {
  top: -5px;
}

.popper[data-popper-placement^="bottom"] > #arrow::before {
  border-left: 0px solid #eeeeee;
  border-top: 0px solid #eeeeee;
}

/* Left arrow */
.popper[data-popper-placement^="left"] > #arrow {
  right: -5px;
}

.popper[data-popper-placement^="left"] > #arrow::before {
  border-right: 0px solid #eeeeee;
  border-top: 0px solid #eeeeee;
}

/* Right arrow */
.popper[data-popper-placement^="right"] > #arrow {
  left: -5px;
}
</style>
