<script setup>
defineProps({
  wrapperClass: String,
  text: String,
  loading: Boolean,
});
</script>

<template>
  <div :class="'buttonDiv ' + wrapperClass">
    <button
      class="text-[18px] font-family py-[12px] px-[28px] font-normal rounded-[8px] h-[42px] btn tracking-[2px]"
      v-bind="$attrs"
    >
      <span v-if="!loading">
        {{ text || "SUBMIT" }}
      </span>
      <div v-else class="flex justify-center items-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>{{ $t("auth:common.loading") }}</span>
      </div>
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
  box-shadow:
    rgb(73 163 241 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
    rgb(73 163 241 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
    rgb(73 163 241 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
}
</style>
