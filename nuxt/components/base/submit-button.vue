<script setup>
const props = defineProps(["wrapperClass", "text"]);
</script>

<template>
  <div :class="'buttonDiv ' + wrapperClass">
    <button
      class="text-[18px] font-family py-[12px] px-[28px] font-normal rounded-[8px] h-[42px] btn tracking-[2px]"
      v-bind="$attrs"
    >
    {{text ||  "SUBMIT"}}
    </button>
  </div>
</template>

<style scoped>
button {
  width: 100%;
  color: white;
  outline: 0px;
  border: 0px;
  margin: 0px;
  background-image: linear-gradient(
    195deg,
    rgb(73, 163, 241),
    rgb(26, 115, 232)
  );
  box-shadow: rgb(73 163 241 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
    rgb(73 163 241 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
    rgb(73 163 241 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
}
</style>
