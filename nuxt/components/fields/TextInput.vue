<script setup lang="ts">
const props = defineProps(["placeholder"]);
</script>

<template>
  <div class="input-block">
    <input v-bind="$attrs" placeholder=" " />
    <span class="placeholder"> {{ placeholder }} </span>
  </div>
</template>

<style scoped>
div.input-block {
  position: relative;
}
div.input-block input {
  font-weight: 500;
  font-size: 1.1rem;
  color: #495055;
  width: 250px;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 12px;
  border: 1.5px solid #d9d9d9;
  outline: none;
}
div.input-block span.placeholder {
  position: absolute;
  margin: 11px 0;
  padding: 0 4px;
  font-family: Roboto, sans-serif; /*  */
  color: #6c757d;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  top: 0;
  left: 17px;
  transition: all 0.2s;
  transform-origin: 0% 0%;
  background: none;
  pointer-events: none;
}
div.input-block input:not(:placeholder-shown) + span.placeholder,
div.input-block input:focus + span.placeholder {
  transform: scale(0.8) translateY(-17px);
  background: #fff;
}
div.input-block input:focus {
  color: #284b63;
  border-color: #284b63;
  border: 2px solid;
}
div.input-block input:focus + span.placeholder {
  color: #284b63;
}
</style>
