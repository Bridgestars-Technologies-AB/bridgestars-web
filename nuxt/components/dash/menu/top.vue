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
  <div class="flex justify-between bg-dash-light-400 dark:bg-dash-dark-200 pr-3 py-1">


    <div class="flex justify-start items-center">

      <div class="flex items-center justify-center z-10 -ml-[44px] rounded-full" @click="open = !open">
        <base-tooltip :text="`${open ? 'Stäng sidomenyn' : 'Öppna sidomenyn'}`" position="right">
          <!-- <base-hamburger-menu-button :isOpen="open" class="!scale-[0.4]" innerClass="dark:bg-dash-light-300 bg-dark"/> -->
          <span v-if="open" class="i-mdi-menu-open dark:bg-dash-light-300 bg-dark h-[32px] w-[32px]"></span>
          <span v-else class="i-mdi-menu-close dark:bg-dash-light-300 bg-dark h-[32px] w-[32px]"></span>
        </base-tooltip>
      </div>
    </div>

    <div
      class="flex justify-end items-center space-x-4"
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
