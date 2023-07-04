<script setup>
const { locale, locales, setLocale } = useI18n()
const emit = defineEmits(['switched'])
console.log(locale.value)
async function set(locale){
  await setLocale(locale)
  emit('switched', locale)
}
</script>

<template>
  <div class="flex space-x-2">
    <span 
      v-for="l in locales" 
      :class="`${l.flag} ${l.code != locale ? 'opacity-50':''}`" 
      style="height:34px;width:34px;"
      @click="set(l.code)"
    /> 
  </div>
</template>
