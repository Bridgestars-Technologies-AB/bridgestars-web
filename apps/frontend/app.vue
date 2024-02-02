<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
useHead({
  htmlAttrs: {
    lang: useTranslate().i18.language,
  },
});
await loadTranslations("common"); // load translation

import "@fontsource/roboto-slab/100.css";
import "@fontsource/roboto-slab/200.css";
import "@fontsource/roboto-slab/300.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/roboto-slab/500.css";
import "@fontsource/roboto-slab/600.css";
import "@fontsource/roboto-slab/700.css";
import "@fontsource/roboto-slab/800.css";
import "@fontsource/roboto-slab/900.css";

// looks nicer than regular roboto
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

onMounted(() => {});

provide("first_time_at_home", ref(true));
</script>

<template>
  <SpeedInsights />
  <NuxtLayout>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtPage />
    <ClientOnly>
      <div
        v-if="$pwa?.offlineReady || $pwa?.needRefresh"
        class="fixed z-1 bottom-0 right-0 m-3 p-3 bg-white border border-black rounded-lg shadow-xl text-left"
        role="alert"
      >
        <div class="font-family1 mb-2">
          <span v-if="$pwa.offlineReady"> App ready to work offline </span>
          <span v-else>
            New content available, click on reload button to update.
          </span>
        </div>
        <button
          v-if="$pwa.needRefresh"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.updateServiceWorker()"
        >
          Reload
        </button>
        <button
          class="bg-red-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.cancelPrompt()"
        >
          Close
        </button>
      </div>
      <div
        v-if="
          $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
        "
        class="fixed z-1 bottom-0 right-0 m-3 p-3 bg-white border border-black rounded-lg shadow-xl text-left"
        role="alert"
      >
        <div class="font-family1 mb-2">
          <span> Vill du ladda ner vår app? </span>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.install()"
        >
          Ladda ner
        </button>
        <button
          class="bg-red-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.cancelInstall()"
        >
          Stäng
        </button>
      </div>
    </ClientOnly>
  </NuxtLayout>

  <!-- comment to test vercel build -->
  <!-- PWA TEST -->
</template>
