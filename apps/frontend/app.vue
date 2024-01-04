<script setup lang="ts">

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

// import 'flowbite'

onMounted(() => {});

//import "tw-elements/dist/css/tw-elements.min.css";
provide("first_time_at_home", ref(true));

const {$pwa} = useNuxtApp();
onMounted(() => {
  console.log($pwa)
})
</script>

<template>
    <div class="mainwrapper">
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>


    <!-- PWA TEST -->
  <ClientOnly>
      <div
        class="fixed z-1 bottom-0 right-0 m-3 p-3 bg-white border border-black rounded-lg shadow-xl text-left"
        v-if="$pwa?.offlineReady || $pwa?.needRefresh"
        role="alert"
      >
        <div class="text4">
          <span v-if="$pwa.offlineReady">
            App ready to work offline
          </span>
          <span v-else>
            New content available, click on reload button to update.
          </span>
        </div>
        <button

          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          v-if="$pwa.needRefresh"
          @click="$pwa.updateServiceWorker()"
        >
          Reload
        </button>
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.cancelPrompt()">
          Close
        </button>
      </div>
      <div
        v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        role="alert"
      >
        <div class="text4">
          <span>
            Install PWA
          </span>
        </div>
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.install()">
          Install
        </button>
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$pwa.cancelInstall()">
          Cancel
        </button>
      </div>
    </ClientOnly>
  </div>
</template>
