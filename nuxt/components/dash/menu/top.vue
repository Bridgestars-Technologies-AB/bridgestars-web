<script setup>
const open = inject('side-menu-open')
const route = useRoute();
const darkMode = useDarkMode();

const common =
  "w-[30px] h-[30px] hover:bg-dash-accent dark:hover:bg-dash-accent hover:animate-shake "; //important keep space at the end

const isSelected = (item) => route.name == "dash-" + item;
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";


</script>
<template>
  <div class="flex justify-between bg-dash-light-400 dark:bg-dash-dark-200 pr-3 ">

<!-- side menu open/close button with tooltip, some styles going on here for all the different situations -->
    <div class="flex justify-start items-center">
      <div :class="`flex justify-center h-full w-[67px] z-10 sm:-ml-[67px] ${open ? 'xs:-ml-[70px]' : 'xs:-ml-2 sm:dark:bg-dash-dark-100 sm:bg-dash-light-300'} transition-[margin-left] duration-300`" @click="open = !open">

        <base-tooltip :text="`${open ? 'Stäng sidomenyn' : 'Öppna sidomenyn'}`" position="right" class="flex items-center">
          <span v-if="open" class="i-mdi-menu-open dark:bg-dash-light-300 bg-dark h-[38px] w-[38px] ml-3"></span>
          <span v-else class="i-mdi-menu-close dark:bg-dash-light-300 bg-dark h-[38px] w-[38px] ml-3"></span>
        </base-tooltip>
      </div>
    </div>


    <div
      class="flex justify-end items-center space-x-4 py-1"
    >
      <span
        :class="`${
          !darkMode.enabled
            ? 'i-material-symbols-dark-mode-outline'
            : 'i-material-symbols-light-mode-outline'
        }  ${colored(false)}`"
        @click="darkMode.toggle()"
      />

      <dash-menu-top-bell/>

      <span
        :class="`i-material-symbols-settings-outline ${colored(
          isSelected('settings')
        )}`"
      />

      <dash-menu-top-account/>

    </div>
  </div>
</template>

<style scoped></style>
