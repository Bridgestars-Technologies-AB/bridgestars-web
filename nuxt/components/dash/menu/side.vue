<script setup>
const router = useRouter()
const route = useRoute()

const toast = useToast()
const auth = useAuth()

const logoutModalOpen = ref(false)

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
      logoutModalOpen.value = true;
      // if(auth.authenticated) await auth.signOut();
      // toast.clear() //remove old toasts , ex sign in 
      // toast.success("You have been signed out.") //translate
      // navigateTo("/")
    }
  }
]
items.map(x => x.enabled = x.action || router.getRoutes().some(r => r.name=="dash-"+x.name))

const isOpen = inject('side-menu-open')

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
<!-- show open button if closed -->
  <div v-if="!isOpen" class="absolute">
    <base-hamburger-menu-button @click="isOpen = !isOpen" :isOpen="isOpen" class="!scale-[0.3]" innerClass="dark:bg-dash-light-300 bg-dark"/>
  </div>

  <div id="side-menu" :class="`bg-dash-light-200 dark:bg-dash-dark-300 flex flex-col w-[270px] z-[10] ${isOpen ? 'left-0' : '-left-[270px]'} h-[100%] overflow-y-auto fixed`">

<!-- close btn -->
    <div class="sticky top-0 h-0 flex justify-end">
        <base-hamburger-menu-button @click="isOpen = !isOpen" :isOpen="isOpen" class="!scale-[0.3]" innerClass="dark:bg-dash-light-300 bg-dark"/>
    </div>

    <div class="text-center flex items-center pl-4 pt-7 flex-wrap cursor-pointer" @click="navigateTo({name:'dash-profile'})">
        <img class="object-cover object-top w-[50px] aspect-square rounded-full" src="~/assets/bridgestars/images/castor.jpg"/> 
        <div class="flex flex-col text-start pl-2 justify-center space-y-2">
          <h3 class="text-[22px] leading-[22px] tracking-tighter">Castor Mann</h3>
          <h6 class="text-[#14C6A4] dark:text-[#14C6a4] font-light tracking-normal">Bridgestars Premium</h6>
        </div>
      </div>

      <div class="flex flex-col px-5 mt-6 mb-10">
        <div v-for="item in items" :key="item.key" @click="() => click(item)">
          <div v-if="item.divider" 
            class="font-family font-light text-dark opacity-70 dark:text-light mb-1 mt-5 tracking-wide text-[16px]">
            {{$t("dashboard:side_menu."+item.name)}}
          </div>
        <dash-menu-side-item v-else :icon="item.icon" :keypath="`dashboard:side_menu.${item.name}`" :selected="route.name == 'dash-'+item.name" :enabled="item.enabled"/>
        </div>
      </div>
    </div>

  <base-modal v-model:open="logoutModalOpen"/>

</template>

<style scoped>
#side-menu{
  transition: left .3s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out; 
}
</style>
