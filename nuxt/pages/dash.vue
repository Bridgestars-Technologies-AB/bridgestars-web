<script setup>
await loadTranslations("dashboard"); // load translation
const route = useRoute()

if(route.name === "dash") {
  useRouter().replace("dash/overview"); //without replace "dash" will be in history and we won't be able to go back to the login page
}

onMounted(() => {
  // solved by using route middleware, this way the dashboard does not flash before redirecting to login page
  // if (!Parse.User.current()) {
    // useRouter().replace({ path: '/auth/sign-in', query: { to: route.path}});
  // }
  //find html and body elements and set their overflow to hidden
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
})

onUnmounted(() => {
  //find html and body elements and set their overflow to auto
  document.getElementsByTagName("html")[0].style.overflow = "auto";
})

const darkMode = useDarkMode() 
const sideMenuOpen = ref(true)
provide('side-menu-open', sideMenuOpen)
</script>

<template>
  <div :class="`${darkMode.value ? 'dark':''} flex h-full`"><!-- enables tailwind darkmode, toggle this  -->
    <dash-side-menu/>
      <div id="content" :class="`flex-col flex-grow ${sideMenuOpen ? 'ml-[270px]':''}`">
        <dash-top-menu/>
        <div class="bg-dash-light-300 dark:bg-dash-dark p-2 h-full">
          <NuxtPage/>
        </div>
      </div>
  </div>
</template>

<style scoped>
#content{
  transition: margin-left 0.3s ease-in-out;
}

/* html, body { */
/*   /* DISABLE ALL SCROLLING ON BODY */
/*   overflow-y: hidden; */
/*   overflow-x: hidden; */
/* } */
*{
  /* dark mode transition */
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; 
}
</style>
