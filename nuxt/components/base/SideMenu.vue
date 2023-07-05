<template>
  <div class="bg-light dark:bg-[#1A2538] flex flex-col w-[200px]">

    <div class="text-center flex flex-col items-center p-4">
      <img class="object-cover object-top w-[150px] h-[150px] rounded-full" src="~/assets/bridgestars/images/castor.jpg"/> 
      <h3 class="text-white">Castor</h3>
      <h6 class="text-[#14C6A4] font-light tracking-normal">Bridgestars Premium</h6>
    </div>

    <div class="flex flex-col px-5 mt-6">
      <SideMenuItem icon="i-ic-outline-home" text="Översikt" @click=""/>

      <span class="text font-light dark:!text-[#aaaaaa] !text-[#000000] my-3">Analys</span>
      <SideMenuItem icon="i-material-symbols-sports-esports-outline" text="Givredigerare"/>
      <SideMenuItem icon="i-material-symbols-score" text="Kontraktberäknare"/>
      <SideMenuItem icon="i-ic-outline-home" text="Simulator"/>

      <span class="text font-light !text-[#aaaaaa] my-3">Träna</span>
      <SideMenuItem icon="i-material-symbols-sports-esports-outline" text="Budgivning"/>
      <SideMenuItem icon="i-material-symbols-play-circle-outline" text="Utspel"/>
      <SideMenuItem icon="i-material-symbols-hive" text="Färgbehandlingar"/>
      <SideMenuItem icon="i-material-symbols-play-circle-outline" text="Spela"/>

      <span class="text font-light !text-[#aaaaaa] my-3">Övrigt</span>
      <SideMenuItem icon="i-material-symbols-text-snippet" text="Tävlingsresultat"/>
      <SideMenuItem icon="i-material-symbols-info" text="Statistik"/>
      <SideMenuItem icon="i-material-symbols-hive" text="hmm?"/>
    </div>
  </div>
</template>

<style scoped>
</style>
