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
  <div style="width: 500px">
    <kEllipsistips :text="a" />
    <!-- <p v-ellipsis="a" /> -->
    <button @click="change">按钮</button>
    <!-- <Popper content="This is the Popper content" hover class="dark">
      <button>Trigger element</button>
    </Popper> -->
  </div>
</template>

<style lang="scss"></style>
