<script setup lang="ts">
const props = defineProps(["placeholder", "id", "wrapperClass"]);

//import autoAnimate from "../../js/autoAnimate.ts";
//import autoAnimate from "@formkit/auto-animate";
const inputBlock = ref(); // we need a DOM node

onMounted(() => {
  // autoAnimate(inputBlock.value); // thats it!
});
</script>

<template>
  <div :class="'input-block ' + wrapperClass">
    <input v-bind="$attrs" placeholder=" " :id="id" />
    <span class="placeholder"> {{ placeholder }} </span>
    <small class="info"></small>
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
  padding: 5px 15px;
  width: 100%;
  margin: 5px;
  border-radius: 12px;
  border: 1.5px solid #d9d9d9;
  outline: none;
}

div.input-block.error input:focus,
div.input-block.error input {
  border: 2px solid red;
}

div.input-block.error small.info {
  color: red;
}

div.input-block.error input:focus + span.placeholder,
div.input-block.error span.placeholder {
  color: red;
}

div.input-block.success input:focus,
div.input-block.success input {
  border: 2px solid green;
}

div.input-block.success small.info {
  color: green;
}

div.input-block.success input:focus + span.placeholder,
div.input-block.success span.placeholder {
  color: green;
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
