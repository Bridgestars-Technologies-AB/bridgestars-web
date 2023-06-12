<script setup lang="ts">
//import InitValidation from "~/util/validator2.js";
//import "~/util/validator.js";

const props = defineProps(["title", "subtitle", "footer"]);
defineEmits(["submit"]);

///import autoAnimate from "../js/autoAnimate.ts";
//const formRef = ref(); // we need a DOM node

onMounted(() => {
  const form = document.querySelector("form[name=auth-form]");
  //autoAnimate(formRef.value); // thats it!
  useValidateAuthForm(form, (err, res) => {
    alert("OK");
    return res;
  });
});
</script>

<template>
  <form name="auth-form">
    <div
      class="flex flex-col justify-center items-center content-center w-screen h-screen"
    >
      <img
        class="w-[77px] h-[77px] mt-5 mb-5"
        src="~/assets/bridgestars/logo/logo-trans-64px.png"
        alt="hej"
      />
      <h1 class="text-bridgeBlue text-opacity-100 font-bold mb-2">
        {{ props.title }}
      </h1>
      <h2 class="text-bridgeGray mb-3">{{ props.subtitle }}</h2>

      <slot></slot>
    </div>
  </form>
</template>
