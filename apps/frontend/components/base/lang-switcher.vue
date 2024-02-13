<script setup lang="ts">
// const { locale, locales, setLocale } = useI18n()
const { i18 } = useTranslate();

const emit = defineEmits(["switched"]);
// console.log(i18.supportedLngs)
async function set(lang) {
  await i18.changeLanguage(lang);
  emit("switched", lang);
}

const flags = {
  sv: "i-circle-flags-se",
  en: "i-circle-flags-gb",
};

const key = ref(8976634);
onMounted(() => {
  key.value += 1; // force re-render component, otherwise server decides flag which does not work if client is on another language
});
</script>

<template>
  <div class="flex space-x-2">
    <span
      v-for="l in ['sv', 'en']"
      :key="l"
      :class="`${flags[l]} ${l == i18.language || 'opacity-50'}`"
      style="height: 34px; width: 34px"
      @click="set(l)"
    />
  </div>
</template>
