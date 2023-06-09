<script setup lang="ts">
//import InitValidation from "~/util/validator2.js";
//import "~/util/validator.js";

const props = defineProps(["title", "subtitle", "fields"]);
defineEmits(["submit"]);

//import autoAnimate from "@formkit/auto-animate";
//const formRef = ref(); // we need a DOM node

onMounted(() => {
  const form = document.querySelector("form[name=auth-form]");
  // autoAnimate(formRef.value); // thats it!
  useValidateAuthForm(form, (err, res) => {
    alert("OK");
    return res;
  });
});
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <h2>{{ props.subtitle }}</h2>
    <form name="auth-form" ref="formRef">
      <slot></slot>
    </form>
  </div>
</template>
