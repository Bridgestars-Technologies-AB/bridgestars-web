<script setup lang="ts">
// const { data } = await useAsyncData("welcome-page", () =>
//   queryContent("/welcome-page").find(),
// );

//const { data } = await api.get(`pages/welcome-page`);

interface WelcomePage {
  title: String;
  introduction: String;
  headlines: Array<string>;
  sections: Array<string>;
}

const data: WelcomePage = {
  title: "Välkommen Till BridgeStars! Det nya sättet att bli bättre på bridge!",
  introduction:
    "Bridge To Bridge är en utbildningsplattform med tusentals givar att träna på. Vi hoppas du vill vara med på vår gemensamma resa mot bättre bridge även om vi fortfarande knappt har startat motorerna. Om du har kommentarer eller förslag, tveka inte att kontakta oss på info@bridgetobridge.se Bridge to Bridge är en prenumerationstjänst och du betalar för tjänsten under fliken Mina sidor. Vissa delar av materialet är helt gratis, medan andra delar är för dig som är prenumerant. Titta gärna på vår YouTube-kanal där vi berättar om hur saker och ting fungerar på vår hemsida.",
  headlines: [
    "Träna budgivning",
    "Studera vårt bibliotek",
    "Utmana dina vänner",
  ],
  sections: [
    "Klicka på någon av kategorierna till vänster på sidan. Nu kommer du att se olika områden som du kan träna på och det är bara att välja. Om du vill ha variation snarare än bara ett område välj Mix.",
    "Högst upp på sidan hittar du vårt **Bibliotek**. Om det finns ett speciellt område för budträning finns det också en dokumentation på vad olika bud betyder och oftast också en beskrivande text.",
    "Gå till **Mina sidor** högst upp på sidan, här kan du bli Bridge To Bridge-vän med dina vänner från verkliga livet. För att det ska fungera måste även din kamrat ha ett användarkonto på plattformen. Klicka sedan på **Utmaningar** högst upp och välj vem du vill utmana och på vilket område. Lycka till och Trevlig resa!",
  ],
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full overflow-auto"
  >
    <div
      class="flex flex-col items-center justify-center rounded-xl mt-[20px] mb-[20px]"
    >
      <span
        class="dark:text-white text-dark text-[10px] sm:text-[35px] font-bold font-family2 leading-3 sm:leading-10"
        >{{ data.title.split("!")[0] }}</span
      >
      <span
        class="dark:text-white text-dark text-[7px] sm:text-[35px] font-bold font-family2 leading-3 sm:leading-10"
        >{{ data.title.split("!")[1] }}!</span
      >
    </div>
    <MDC
      class="prose prose-lg dark:prose-invert"
      :value="data.introduction"
      tag="article"
    />
    <div
      class="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 mt-[30px]"
    >
      <div
        v-for="(h, index) in data.headlines"
        :key="index"
        class="w-[350px] border-2 border-premium rounded-xl dark:bg-dark-100 bg-white flex flex-col items-center"
      >
        <span
          class="dark:text-white text-dark text-[20px] sm:text-[30px] font-bold font-family2 leading-7 sm:leading-10"
          >{{ h }}</span
        >
        <MDC
          class="prose prose-lg p-5 text-[17px] dark:prose-invert"
          :value="data.sections[index]"
          tag="article"
        />
      </div>
    </div>
  </div>
</template>
