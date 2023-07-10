<script setup>

const current_tab = provide("profile.side.selected", ref(""))

const items = [
  {
    key:"dashboard:sidepanel.overview",
    icon:"i-ic-outline-home"
  },
  {
    divider:true,
    key: "dashboard:sidepanel.analysis",
  },
  {
    key: "dashboard:sidepanel.deal_editor",
    icon:"i-material-symbols-sports-esports-outline"
  },
  // {
  //   key: "dashboard:sidepanel.dealhistory",
  //   icon:"i-material-symbols-history"
  // },
  {
    key: "dashboard:sidepanel.contract_calc",
    icon:"i-material-symbols-score"
  },
  {
    key: "dashboard:sidepanel.simulator",
    icon: "i-material-symbols-analytics"
  },
  {
    divider:true,
    key: "dashboard:sidepanel.exercise",
  },
  {
    key: "dashboard:sidepanel.contracting",
    icon: "i-material-symbols-sports-esports-outline"
  },
  {
    key: "dashboard:sidepanel.gambit",
    icon: "i-material-symbols-play-circle-outline"
  },
  {
    key: "dashboard:sidepanel.color",
    icon: "i-material-symbols-hive"
  },
  {
    key: "dashboard:sidepanel.play",
    icon: "i-material-symbols-play-circle-outline"
  },
  {
    divider:true,
    key: "dashboard:sidepanel.other",
  },
  {
    key: "dashboard:sidepanel.results",
    icon: "i-material-symbols-text-snippet"
  },
  {
    key: "dashboard:sidepanel.help",
    icon: "i-material-symbols-info"
  },
  {
    key: "dashboard:sidepanel.sign_out",
    icon: "i-tabler-logout-2"
  }
]

function click(item){
  if(item.divider) return;
}

</script>



<template>
  <div class="bg-light dark:bg-[#1A2538] flex flex-col w-[200px]">

    <div class="text-center flex flex-col items-center p-4">
      <img class="object-cover object-top w-[150px] h-[150px] rounded-full" src="~/assets/bridgestars/images/castor.jpg"/> 
      <h3 class="text-white">Castor</h3>
      <h6 class="text-[#14C6A4] dark:text-[#14C6a4] font-light tracking-normal">{{$t("dashboard:bridgestars.premium")}}</h6>
    </div>

    <div class="flex flex-col px-5 mt-6">
      <div v-for="item in items" :key="item.key" @click="() => click(item)">
        <div v-if="item.divider" 
          class="text font-light dark:!text-[#aaaaaa] !text-[#000000] my-3">
          {{$t(item.key)}}
        </div>
        <SideMenuItem v-else :icon="item.icon" :key="item.key">
          {{ $t(item.key) }}
        </SideMenuItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
