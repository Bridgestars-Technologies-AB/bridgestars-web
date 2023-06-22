<script setup lang="ts">
const props = defineProps(["placeholder", "id", "wrapperClass", "modelValue"]);
defineEmits(["update:modelValue"]);

//import autoAnimate from "../../js/autoAnimate.ts";
//import autoAnimate from "@formkit/auto-animate";
//const inputBlock = ref(); // we need a DOM node

onMounted(() => {
  //autoAnimate(inputBlock.value); // thats it!
});


</script>

<template>
  <div :class="'input-block ' + wrapperClass">
    <input 
      class="py-2.5 px-3.5" 
      v-bind="$attrs" 
      placeholder=" " 
      :id="id" 

      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
    />
<!--  above is solution for using v-model on this custom inputfield -->
    <span class="placeholder text2 !font-light !text-[14px] !tracking-[1.2px]"> {{ placeholder }} </span>
    <small class="info"></small>
  </div>
</template>

<style scoped>
div.input-block {
  position: relative;
}
div.input-block input {
  color: #495055;
  width: 100%;
  border-radius: 8px;
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
  margin: 11px 0px;
  padding: 0px 5px;  
  color: 'rgb(0,0,0,0.87)';
  letter-spacing: 1px;
  display: block;
  align-items: center;
  top: 0;
  left: 15px;
  transition: all 0.2s;
  transform-origin: 0% 0%;
  background: none;
  pointer-events: none;
}
div.input-block input:not(:placeholder-shown) + span.placeholder,
div.input-block input:focus + span.placeholder {
  transform: scale(0.85) translateY(-23px);
  background: #fff;
}
div.input-block input:focus {
  @apply border-info
}
div.input-block input:focus + span.placeholder {
   @apply text-info !font-medium
}
</style>
