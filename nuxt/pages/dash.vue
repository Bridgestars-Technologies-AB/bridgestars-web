<script setup>

// await loadTranslations("dashboard"); // load translation
//
// const route = useRoute()
//
// if(route.name === "dash") {
//   useRouter().replace("dash/overview"); //without replace "dash" will be in history and we won't be able to go back to the login page
// }
//
// onMounted(() => {
//   //find html and body elements and set their overflow to hidden
//   document.getElementsByTagName("html")[0].style.overflow = "hidden";
//   document.getElementsByTagName("body")[0].style.overflow = "hidden";
//
// })
//
// onUnmounted(() => {
//   //find html and body elements and set their overflow to auto
//   document.getElementsByTagName("html")[0].style.overflow = "auto";
//   document.getElementsByTagName("body")[0].style.overflow = "";
// })
//
// const darkMode = useDarkMode() 
// const sideMenuOpen = ref(true)
// provide('side-menu-open', sideMenuOpen)
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full space-y-4">
    <h3>{{$t("temp:welcome", {name: useAuth().get("dispName")})}}</h3>
    <span class="text1">{{$t("temp:info")}}</span>
    <base-submit-button
    @click="useAuth().signOut()">{{$t("temp:signout")}}</base-submit-button>
  </div>
  <!-- enables tailwind darkmode, toggle this  -->
  <!-- <div :class="`${darkMode.value ? 'dark [color-scheme:dark]':''} flex h-full w-full overflow-x-clip`">-->
  <!--   <dash-menu-side/> -->
  <!---->
  <!--   <div class="bg-dash-light-400 dark:bg-dash-dark-200 flex-col flex-grow transition-colors duration-300"> -->
  <!--     <div :class="`absolute z-100 bg-black w-full h-full sm:hidden ${sideMenuOpen ? 'opacity-70' :'opacity-0'} transition-opacity duration-1000`" @click="sideMenuOpen = false"/> -->
  <!--       <dash-menu-top /> -->
  <!--     <div id="content" :class="`bg-dash-light-400 dark:bg-dash-dark-200 p-5 flex ${sideMenuOpen ? 'sm:ml-[270px] xs:ml-0':'xs:ml-0 sm:ml-[67px]'}`"> -->
  <!--         <NuxtPage/> -->
  <!--       <ClientOnly> -->
  <!--         <dash-chat-toggle/> -->
  <!--       </ClientOnly> -->
  <!--     </div> -->
  <!--   </div> -->
  <!---->
  <!-- </div> -->
</template>

<style scoped>
#content{
  transition: margin-left 0.3s ease-in-out, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* html, body { */
/*   /* DISABLE ALL SCROLLING ON BODY */
/*   overflow-y: hidden; */
/*   overflow-x: hidden; */
/* } */
</style>
