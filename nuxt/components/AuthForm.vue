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
        class="w-[64px] h-[64px] mt-5 mb-5"
        src="~/assets/bridgestars/logo/logo-trans-512px.png"
        alt="hej"
      />
      <h6 class="text-bridgeBlue text-opacity-100 font-bold mb-1">
        {{ props.title }}
      </h6>
      <span class="text2 mb-5 !text-[14px]">{{ props.subtitle }}</span>

      <slot></slot>
      <div class="mt-5">
        <span class="text2">Don't have an account? </span>
        <button class="textButton buttonText normal-case">Sign Up</button>
      </div>
      <div>
        <button class="textButton mt-2 buttonText normal-case">
          Forgot your password?
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.textButton {
  background-clip: text;
  cursor: pointer;
  margin: 0;
  background-image: linear-gradient(
    195deg,
    rgb(73, 163, 241),
    rgb(26, 115, 232)
  );
  -webkit-text-fill-color: transparent;
}
</style>
