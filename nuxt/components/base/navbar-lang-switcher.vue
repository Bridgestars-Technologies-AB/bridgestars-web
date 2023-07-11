
<script setup>
const { locale, locales, setLocale } = useI18n()
const emit = defineEmits(['switched'])

async function set(locale){

  await setLocale(locale)
  emit('switched', locale)
  current.value = locales.value.find(l => l.code === locale.value)
  expanded.value = false;
}


const expanded = ref(false)
const current = reactive(locales.value.find(l => l.code === locale.value))
</script>

<!-- Work In Progress -->
<template>
  <div class="flex flex-col space-y-2">
    <span 
      v-if="!expanded"
      :class="`${current.flag}`" 
      style="height:34px;width:34px;"
      @click="expanded = !expanded"
    /> 
    <span 
      v-else
      v-for="l in locales" 
      :class="`${l.flag} ${l.code != locale ? 'opacity-50':''}`" 
      style="height:34px;width:34px;"
      @click="set(l.code)"
    /> 
  </div>
</template>
