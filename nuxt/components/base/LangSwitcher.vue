<script setup>
const { locale, locales, setLocale } = useI18n()
console.log(locale.value)
</script>

<template>
  <div class="flex space-x-2">
    <span 
      v-for="l in locales" 
      :class="`${l.flag} ${l.code != locale ? 'opacity-50':''}`" 
      style="height:34px;width:34px;"
      @click="setLocale(l.code)"
    /> 
  </div>
</template>
