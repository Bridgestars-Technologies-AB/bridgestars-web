<script setup>
const router = useRouter()
const route = useRoute()

const toast = useToast()

// name is both the key for the translation and the route name, keep them in sync!
const items = [
  {
    name:"overview",
    icon:"i-ic-outline-home"
  },
  {
    divider:true,
    name: "analysis",
  },
  {
    name: "deal-editor",
    icon:"i-material-symbols-sports-esports-outline"
  },
  // {
  //   name: "dealhistory",
  //   icon:"i-material-symbols-history"
  // },
  {
    name: "contract-calc",
    icon:"i-material-symbols-score"
  },
  {
    name: "simulator",
    icon: "i-material-symbols-analytics"
  },
  {
    divider:true,
    name: "exercise",
  },
  {
    name: "contracting",
    icon: "i-material-symbols-sports-esports-outline"
  },
  {
    name: "gambit",
    icon: "i-material-symbols-play-circle-outline"
  },
  {
    name: "suit-treatments",
    icon: "i-material-symbols-hive"
  },
  {
    name: "play",
    icon: "i-material-symbols-play-circle-outline"
  },
  {
    divider:true,
    name: "other",
  },
  {
    name: "results",
    icon: "i-material-symbols-text-snippet"
  },
  {
    name: "help",
    icon: "i-material-symbols-info"
  },
  {
    name: "sign-out",
    icon: "i-tabler-logout-2",
    action: async () => {
      if(Parse.User.current()) await Parse.User.logOut();
      toast.clear() //remove old toasts , ex sign in 
      toast.success("You have been signed out.") //translate
      navigateTo("/")
    }
  }
]
items.map(x => x.enabled = x.action || router.getRoutes().some(r => r.name=="dash-"+x.name))

function click(item){
  if(item.divider) return;
  if(item.action) return item.action();
  if(item.enabled) 
    navigateTo({name:"dash-"+item.name})
  else
    toast.error("Not implemented yet.")
  
}

</script>



<template>
    <div class="bg-dash-light-200 dark:bg-dash-dark-300 flex flex-col w-[270px] h-[100%] overflow-y-auto">

      <div class="text-center flex flex-col items-center p-4">
        <img class="object-cover object-top w-[150px] h-[150px] rounded-full" src="~/assets/bridgestars/images/castor.jpg"/> 
        <h3 class="">Castor</h3>
        <h6 class="text-[#14C6A4] dark:text-[#14C6a4] font-light tracking-normal">Bridgestars Premium</h6>
      </div>

      <div class="flex flex-col px-5 mt-6 mb-10">
        <div v-for="item in items" :key="item.key" @click="() => click(item)">
          <div v-if="item.divider" 
            class="text font-light dark:!text-[#aaaaaa] mb-3 mt-5">
            {{$t(item.key)}}
          </div>
        <dash-side-menu-item v-else :icon="item.icon" :keypath="`dashboard:side_menu.${item.name}`" :selected="route.name == 'dash-'+item.name" :enabled="item.enabled"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
</style>
