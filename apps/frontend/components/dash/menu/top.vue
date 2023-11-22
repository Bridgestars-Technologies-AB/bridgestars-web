<script setup>
const open = inject("side-menu-open");
const route = useRoute();
const darkMode = useDarkMode();

const common =
  "transition-colors duration-300 w-[30px] h-[30px] hover:bg-dash-accent dark:hover:bg-dash-accent hover:animate-shake "; //important keep space at the end

const isSelected = (item) => route.name == "dash-" + item;
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";
</script>
<template>
  <div
    class="flex justify-end bg-dash-light-400 dark:bg-dash-dark-200 pr-3 transition-colors duration-300"
  >
    <!-- side menu open/close -->
    <div class="fixed left-0 z-10">
      <div
        :class="`flex justify-center h-full w-[67px] z-10 ${
          open ? 'ml-[195px]' : ''
        } transition-[margin-left,background-color,color] duration-300`"
        @click="open = !open"
      >
        <base-tooltip
          :text="`${open ? 'Stäng sidomenyn' : 'Öppna sidomenyn'}`"
          position="right"
          class="flex items-center"
        >
          <span
            v-if="open"
            class="i-mdi-menu-open dark:bg-dash-light-300 bg-dark h-[38px] w-[38px] ml-3 transition-colors duration-300"
          ></span>
          <span
            v-else
            class="i-mdi-menu-close dark:bg-dash-light-300 bg-dark h-[38px] w-[38px] ml-3 transition-colors duration-300"
          ></span>
        </base-tooltip>
      </div>
    </div>

    <!-- top menu right -->
    <div class="flex space-x-4 py-1">
      <!-- light/dark -->
      <base-tooltip
        class="flex items-center"
        :text="$t('dashboard:top_menu.tooltip.toggle_dark_mode')"
      >
        <span
          :class="`${
            !darkMode.enabled
              ? 'i-material-symbols-dark-mode-outline'
              : 'i-material-symbols-light-mode-outline'
          }  ${colored(false)}`"
          @click="darkMode.toggle()"
        />
      </base-tooltip>

      <!-- notifications -->
      <dash-menu-top-bell />

      <!-- settings -->
      <base-tooltip
        class="flex items-center"
        :text="$t('dashboard:top_menu.tooltip.settings')"
      >
        <span
          :class="`i-material-symbols-settings-outline ${colored(
            isSelected('settings'),
          )}`"
        />
      </base-tooltip>

      <!-- account -->
      <dash-menu-top-account />
    </div>
  </div>
</template>

<style scoped></style>
