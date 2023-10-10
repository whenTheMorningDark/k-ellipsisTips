<script setup lang="ts">
import kEllipsistips from "./components/k-ellipsistips.vue";
// import Popper from "vue3-popper";
import { ref } from "vue";
const a =
  ref(` A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      The verb to design expresses the process of developing a design.A design
      is a plan or specification for the construction of an object or system or
      for the implementation of an activity or process, or the result of that
      plan or specification in the form of a prototype, product or process. The
      verb to design expresses the process of developing a design. The verb to
      design expresses the process of developing a design.`);
const change = () => {
  a.value = "A design is a plan or specification";
};
</script>

<template>
  <div style="width: 100%">
    <kEllipsistips :text="a" />
    <!-- <p v-ellipsis="a" /> -->
    <!-- <button @click="change">按钮</button> -->
    <!-- <Popper content="This is the Popper content" hover class="dark">
      <button>Trigger element</button>
    </Popper> -->
  </div>
</template>

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
