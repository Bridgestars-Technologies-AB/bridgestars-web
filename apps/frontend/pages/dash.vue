<script setup>
await loadTranslations("dashboard"); // load translation

const route = useRoute();

if (route.name === "dash") {
  useRouter().replace("dash/overview"); //without replace "dash" will be in history and we won't be able to go back to the login page
}

onMounted(() => {
  useAuth()
    .update()
    .catch((e) => {
      if (e.response?.status === 401) {
        useToast().info("Din session har löpt ut, vänligen logga in igen.");
        navigateTo({ path: "/auth/sign-in" });
      } else {
        useToast().error("Något gick fel, fungerar ditt internet?");
      }
    });
  //find html and body elements and set their overflow to hidden
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
});

onUnmounted(() => {
  //find html and body elements and set their overflow to auto
  document.getElementsByTagName("html")[0].style.overflow = "auto";
  document.getElementsByTagName("body")[0].style.overflow = "";
});

const darkMode = useDarkMode();
const sideMenuOpen = ref(true);
provide("side-menu-open", sideMenuOpen);
</script>

<template>
  <div
    :class="`${
      darkMode.value ? 'dark [color-scheme:dark]' : ''
    }  h-full w-full overflow-x-clip `"
  >
    <div
      class="flex bg-transparent dark:bg-dark-200 transition-colors duration-300 w-full h-full"
    >
      <!-- dash overlay -->
      <div
        :class="`fixed bg-black w-full z-[1] h-full sm:hidden ${
          sideMenuOpen ? 'opacity-60' : 'opacity-0 [pointer-events:none]'
        } transition-opacity duration-1000 `"
        @click="sideMenuOpen = false"
      />

      <!-- side -->
      <dash-menu-side class="absolute opacity-100 z-[1]" />

      <!-- side menu mock for displacing content -->
      <div
        id="sideMock"
        :class="` ${
          sideMenuOpen ? 'sm:w-[268px]' : 'sm:w-[70px]'
        } shrink-0 grow-0`"
      />

      <!-- top and content -->
      <div id="content" class="grow flex flex-col">
        <!-- top -->
        <dash-menu-top />

        <div class="relative w-full px-3 pb-3 h-full">
          <!-- content -->
          <NuxtPage class="overflow-y-scroll h-full no-scrollbar" />
          <!-- chat -->
          <ClientOnly>
            <!-- <dash-chat-toggle /> -->
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#content {
  transition:
    /* all 0.3s ease-in-out, */ background-color 0.3s
    cubic-bezier(0.4, 0, 0.2, 1);
}
#sideMock {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
