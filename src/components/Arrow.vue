<template>
  <div id="arrow" data-popper-arrow />
</template>

<style>
#arrow,
#arrow::before {
  transition: background 250ms ease-in-out;
  position: absolute;
  width: 6px;
  height: 6px;
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
  bottom: -3px;
}

.popper[data-popper-placement^="top"] > #arrow::before {
  border-right: 0px solid #eeeeee;
  border-bottom: 0px solid #eeeeee;
}

/* Bottom arrow */
.popper[data-popper-placement^="bottom"] > #arrow {
  top: -3px;
}

.popper[data-popper-placement^="bottom"] > #arrow::before {
  border-left: 0px solid #eeeeee;
  border-top: 0px solid #eeeeee;
}

/* Left arrow */
.popper[data-popper-placement^="left"] > #arrow {
  right: -3px;
}

.popper[data-popper-placement^="left"] > #arrow::before {
  border-right: 0px solid #eeeeee;
  border-top: 0px solid #eeeeee;
}

/* Right arrow */
.popper[data-popper-placement^="right"] > #arrow {
  left: -3px;
}
</style>
