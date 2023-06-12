<script setup lang="ts">
//import InitValidation from "~/util/validator2.js";
//import "~/util/validator.js";

const props = defineProps(["title", "subtitle", "footer", "btnText"]);
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
  <form name="auth-form" @submit="emits.submit">
    <div
      class="flex flex-col justify-center items-center content-center w-screen h-screen"
    >
      <img
        class="w-[64px] h-[64px] mt-5 mb-5"
        src="~/assets/bridgestars/logo/logo-trans-512px.png"
        alt="hej"
      />
      <h6 class="zoomIn text-bridgeBlue text-opacity-100 font-bold mb-1">
        {{ props.title }}
      </h6>
      <span class="zoomIn text2 mb-6 !text-[14px]">{{ props.subtitle }}</span>

      <div class="zoomIn flex flex-col items-center w-screen w-height">
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
    </div>
  </form>

  <!-- opacity 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,  -->
  <!--           transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; -->
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

img {
  animation: anim-bounce-in 1000ms ease-out 0ms;
}
.zoomIn {
  animation: anim-zoom 500ms ease-in-out 0ms;
}
@keyframes anim-bounce-in {
  0%,
  40% {
    opacity: 0;
    transform: translateY(-40px);
  }
  60% {
    opacity: 1;
    transform: translateY(10px);
  }
  75% {
    transform: translateY(-5px);
  }
  85% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes anim-zoom {
  0% {
    opacity: 0;
    transform: scaleY(0.8) scaleX(0.3) translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
}

button {
  background-image: linear-gradient(
    195deg,
    rgb(73, 163, 241),
    rgb(26, 115, 232)
  );
}
</style>
