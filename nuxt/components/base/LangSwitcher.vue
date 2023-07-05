<script setup>
// const { locale, locales, setLocale } = useI18n()
import { useTranslation } from "i18next-vue";
const {t, i18next} = useTranslation()

const emit = defineEmits(['switched'])
console.log(i18next.supportedLngs)
async function set(lang){
  await i18next.changeLanguage(lang)
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
      :class="`${flags[l]} ${l != i18next.language ? 'opacity-50':''}`" 
      style="height:34px;width:34px;"
      @click="set(l)"
    /> 
  </div>
</template>
