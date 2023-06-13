<script setup lang="ts">
//import InitValidation from "~/util/validator2.js";
//import "~/util/validator.js";

defineProps(["title", "subtitle", "footer"]);
const emit = defineEmits(["submit"]);
//hej
///import autoAnimate from "../js/autoAnimate.ts";
//const formRef = ref(); // we need a DOM node

onMounted(() => {
  const form = document.querySelector("form[name=auth-form]");
  //autoAnimate(formRef.value); // thats it!
  useValidateAuthForm(form, (res: any) => {
    emit("submit", res); //res is undefined right now but that could be changed in validator script
    return res;
  });
});
</script>

<template>
  <form name="auth-form">
    <div class="authGrid">
      <div
        class="pt-[20px] flex flex-col justify-center items-center content-center"
      >
        <img
          class="pt-[10px] w-[50%] h-[80%]"
          id="sign-in-image"
          src="~/assets/bridgestars/art/sign_in.svg"
          alt="Bridgestars sign-in image"
        />
      </div>

      <div
        class="authFlex flex flex-col justify-center items-center content-center w-screen h-screen"
      >
        <img
          class="w-[64px] h-[64px] mt-5 mb-5"
          src="~/assets/bridgestars/logo/logo-trans-512px.png"
          alt="Bridgestars logo"
        />
        <h6 class="zoomIn text-bridgeBlue text-opacity-100 font-bold mb-1">
          {{ title }}
        </h6>
        <span class="zoomIn text2 mb-6 !text-[14px]">{{ subtitle }}</span>

        <div
          class="zoomIn inputDiv flex flex-col space-y-4 items-center sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] max-w-[400px]"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </form>

  <!-- opacity 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,  -->
  <!--           transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; -->
</template>
<style scoped>
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

#sign-in-image {
  display: none;
}
@media (min-width: 992px) {
  .authGrid {
    @apply grid grid-cols-2;
  }

  .authFlex {
    @apply inline-flex justify-end content-end w-[100%] h-[100%];
  }
  .inputDiv {
    @apply lg:w-[50%];
  }

  #sign-in-image {
    display: block;
  }
}
</style>
