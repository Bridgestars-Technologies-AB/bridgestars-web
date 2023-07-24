<script setup>
import { Popover, initPopovers } from "flowbite";

const route = useRoute();
const darkMode = useDarkMode();

const common =
  "w-[24px] h-[24px] hover:bg-dash-accent dark:hover:bg-dash-accent hover:animate-shake "; //important keep space at the end

const isSelected = (item) => route.name == "dash-" + item;
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";
</script>
<template>
  <div
    class="bg-dash-light-300 dark:bg-dash-dark flex justify-end flex-grow p-3 space-x-4 h-fit"
  >
    <span
      :class="`${
        !darkMode.enabled
          ? 'i-material-symbols-dark-mode-outline'
          : 'i-material-symbols-light-mode-outline'
      }  ${colored(false)}`"
      @click="darkMode.toggle()"
    />
    <dash-bell />
    <span
      @click="navigateTo({ name: 'dash-account-details' })"
      :class="`i-material-symbols-settings-outline ${colored(
        isSelected('settings')
      )}`"
    />
    <span
      :class="`i-ic-baseline-account-circle ${colored(isSelected('profile'))}`"
    />
  </div>
</template>

<style scoped></style>
