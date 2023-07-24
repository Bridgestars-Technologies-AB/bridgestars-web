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

async function signOut(){
  if(auth.authenticated) await auth.signOut();
  toast.clear() //remove old toasts , ex sign in 
  toast.success("You have been signed out.") //translate
  navigateTo("/")
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



  <base-modal v-model:open="logoutModalOpen">
    <div class="p-6 text-center">
        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      <h3 class="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">{{$t("dashboard:sign_out_modal.text")}}</h3>
        <button @click="logoutModalOpen = false; signOut()" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 normal-case font-medium rounded-lg text-[20px] leading-[20px] inline-flex items-center px-5 py-2.5 text-center mr-2">
          {{ $t("dashboard:sign_out_modal.yes")}}
        </button>
      <button @click="logoutModalOpen=false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-[20px] leading-[20px] font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white normal-case dark:hover:bg-gray-600 dark:focus:ring-gray-600">{{$t("dashboard:sign_out_modal.no")}}</button>
    </div>
  </base-modal>

</template>

<style scoped>
#side-menu{
  transition: left .3s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out; 
}
</style>
