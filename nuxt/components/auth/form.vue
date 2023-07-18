<script setup lang="ts">
//import InitValidation from "~/util/validator2.js";
//import "~/util/validator.js";

const router = useRouter();

defineProps(["header", "title", "subtitle", "footer"]);
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
  <div
    class="fixed bottom-0 top-0 w-full h-full flex flex-col justify-center bg-[#fefefe]"
  >
    <!-- header -->
    <div
      class="absolute top-0 flex justify-start whitespace-nowrap pt-[30px] pl-[30px]"
    >
      <button
        @click="router.push({ path: '/' })"
        class="normal-case text-blue authHeader"
      >
        {{ $t("auth:common.home") }}
      </button>
      <span class="authHeader text-grey opacity-80 mx-2"> / </span>
      <span class="authHeader text-grey opacity-80">{{ header }}</span>
    </div>

    <div class="absolute flex justify-center items-center z-[-1] h-full w-full">
      <img
        src="~/assets/bridgestars/art/auth-form-suits.svg"
        class="xs:block sm:hidden w-[100%] scale-[1] min-w-[600px]"
      />
      <img
        src="~/assets/bridgestars/art/auth-form-ipad.svg"
        class="xs:hidden sm:block w-[100%] scale-[1] max-w-[1400px] min-w-[1085px]"
      />
    </div>
    <!-- form -->
    <form
      name="auth-form"
      class="flex flex-col grow items-center justify-center"
    >
      <!-- IMG -->
      <img
        class="anim-bounce pt-[10px] w-[50%] h-[80%]"
        id="sign-in-image"
        src="~/assets/bridgestars/art/sign_in.svg"
        alt="Bridgestars sign-in image"
      />
      <!-- TITLE -->
      <img
        class="anim-bounce w-[64px] h-[64px] xs:mt-0 sm:mt-5 mb-5"
        src="~/assets/bridgestars/logo/logo-trans-512px.png"
        alt="Bridgestars logo"
      />
      <h6
        class="zoomIn text-dark flex text-center text-opacity-100 font-bold mb-4 text-[19px] font-family2"
      >
        {{ title }}
      </h6>
      <span class="zoomIn text2 sm:mb-7 xs:mb-4 flex text-center text-[17px]">{{
        subtitle
      }}</span>
      <!-- SLOTS -->
      <div
        class="zoomIn flex flex-col items-center sm:space-y-4 xs:space-y-3 xs:w-[80%] sm:w-[80%] md:w-[70%] lg:w-[70%] max-w-[400px]"
      >
        <slot></slot>
      </div>
    </form>
  </div>

  <!-- opacity 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,  -->
  <!--           transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; -->
</template>
<style scoped>
.authHeader {
  @apply font-family2 text-[3vh] hsm:text-[30px]  leading-[1.5] font-bold;
}

.anim-bounce {
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

/* button {
  background-image: linear-gradient(
    195deg,
    rgb(73, 163, 241),
    rgb(26, 115, 232)
  );
} */

#sign-in-image {
  display: none;
}
</style>
