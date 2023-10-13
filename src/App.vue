<script setup lang="ts">
import kEllipsistips from "./components/k-ellipsistips.vue";
// import Popper from "vue3-popper";
import { ref } from "vue";
const a = ref(`中中中中中中中中中中中中中中中中`);
const f = ref(false)
const change = () => {
  if(f.value){
    a.value = "中中中中中中中中中中中中中中中中";
    f.value = false
  } else {
    a.value = `A design`
    f.value = true
  }
  
};
</script>

<template>
  <div style="width: 50%; margin: 200px">
    <div style="width: 25%; background-color: red">
      <kEllipsistips :text="a" />
    </div>
    <button @click="change">按钮</button>
  </div>
</template>

<style lang="scss"></style>
