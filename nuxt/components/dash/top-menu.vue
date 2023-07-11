<script setup>
  const common = "w-[24px] h-[24px] bg-dark dark:bg-light hover:bg-dash-accent dark:hover:bg-dash-accent hover:animate-shake"
  const darkMode = useDarkMode()
</script>
<template>
  <div class="bg-dash-light-300 dark:bg-dash-dark flex justify-end flex-grow p-3 space-x-4 h-fit">
    <span :class="`${!darkMode.enabled ? 'i-material-symbols-dark-mode-outline' : 'i-material-symbols-light-mode-outline'}  ${common}`" @click="darkMode.toggle()"></span> 
    <span :class="`i-material-symbols-notifications-outline ${common}`"></span> 
    <span :class="`i-material-symbols-settings-outline ${common}`"></span> 
    <span :class="`i-ic-baseline-account-circle ${common}`"></span> 
  </div>
</template>
