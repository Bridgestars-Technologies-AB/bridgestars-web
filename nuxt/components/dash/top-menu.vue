<script setup>
  const common = "w-[24px] h-[24px] bg-dark dark:bg-light hover:bg-[#868dfb] dark:hover:bg-[#868dfb] hover:animate-shake"
  const darkMode = inject("darkMode")
</script>
<template>
  <div class="bg-light dark:bg-[#1F2A40] flex justify-end flex-grow p-3 space-x-4">
    <span :class="`i-material-symbols-dark-mode-outline ${common}`" @click="darkMode = !darkMode"></span> 
    <span :class="`i-material-symbols-notifications-outline ${common}`"></span> 
    <span :class="`i-material-symbols-settings-outline ${common}`"></span> 
    <span :class="`i-ic-baseline-account-circle ${common}`"></span> 
  </div>
</template>
