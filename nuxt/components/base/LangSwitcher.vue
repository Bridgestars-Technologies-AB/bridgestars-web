<script setup>
// const { locale, locales, setLocale } = useI18n()
const {t, i18} = useTranslate()

const emit = defineEmits(['switched'])
console.log(i18.supportedLngs)
async function set(lang){
  await i18.changeLanguage(lang)
  emit('switched', lang)
}
const flags = {
  sv: 'i-circle-flags-se',
  en: 'i-circle-flags-gb',
}
</script>

<template>
  <div class="flex space-x-2">
    <span 
      v-for="l in ['sv', 'en']" 
      :class="`${flags[l]} ${l != i18.language ? 'opacity-50':''}`" 
      style="height:34px;width:34px;"
      @click="set(l)"
    /> 
  </div>
</template>
