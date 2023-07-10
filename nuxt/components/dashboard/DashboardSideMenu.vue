<script setup>

const current_tab = provide("profile.side.selected", ref("dashboard:sidepanel.overview"))

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
    icon: "i-tabler-logout-2",
    action: async () => {
      if(Parse.User.current()) await Parse.User.logOut();
      navigateTo("/") 
    }
  }
]

function click(item){
  if(item.divider) return;
  if(item.action) item.action();
}

</script>



<template>
    <div class="bg-light dark:bg-[#1F2A40] flex flex-col w-[270px] h-[100%] overflow-y-auto">

      <div class="text-center flex flex-col items-center p-4">
        <img class="object-cover object-top w-[150px] h-[150px] rounded-full" src="~/assets/bridgestars/images/castor.jpg"/> 
        <h3 class="text-white">Castor</h3>
        <h6 class="text-[#14C6A4] dark:text-[#14C6a4] font-light tracking-normal">{{$t("dashboard:bridgestars.premium")}}</h6>
      </div>

      <div class="flex flex-col px-5 mt-6 mb-10">
        <div v-for="item in items" :key="item.key" @click="() => click(item)">
          <div v-if="item.divider" 
            class="text font-light dark:!text-[#aaaaaa] mb-3 mt-5">
            {{$t(item.key)}}
          </div>
          <SideMenuItem v-else :icon="item.icon" :keypath="item.key"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
</style>
