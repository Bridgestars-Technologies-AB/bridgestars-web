<!-- Account button and dropdown in top menu -->
<script setup>
const route = useRoute();

const common =
  "transition-colors duration-300 w-[30px] h-[30px] group-hover:bg-dash-accent dark:group-hover:bg-dash-accent group-hover:animate-shake "; //important keep space at the end
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";

const popoverTrigger = ref(null);
const popoverElement = ref(null);
let popover = null;

const logoutModalOpen = ref(false);
const open = ref(false);

onMounted(() => {
  initPopovers();

  const options = {
    placement: "bottom",
    triggerType: "none", // 'click' | 'hover' | 'none', we handle click ourself instead
    onHide: () => {
      open.value = false;
    },
    onShow: () => {
      open.value = true;
    },
  };
  popover = new Popover(popoverElement.value, popoverTrigger.value, options);
});
</script>
<template>
  <base-tooltip :text="$t('dashboard:top_menu.tooltip.account')">
    <div class="group flex items-center" @click="popover.toggle()">
      <span
        ref="popoverTrigger"
        :class="`relative i-ic-baseline-account-circle ${colored(
          open ||
            route.path.startsWith('/dash/profile') ||
            route.path.startsWith('/dash/account'),
        )}`"
      />
    </div>
  </base-tooltip>

  <div
    ref="popoverElement"
    data-popover
    role="tooltip"
    class="fixed z-10 invisible inline-block w-[200px] text-sm transition-opacity duration-300 rounded-lg shadow-sm dark:bg-dash-dark-300 bg-dash-light-500"
  >
    <div
      class="px-3 py-2 border-b border-dash-dark dark:border-dash-light border-opacity-20 group cursor-pointer"
      @click="navigateTo('/dash/profile')"
    >
      <div class="flex flex-col space-y-1">
        <div class="flex flex-row space-x-1 items-center">
          <span
            class="text font-family2 font-medium text-[20px] dark:text-light underline decoration-transparent group-hover:decoration-dark dark:group-hover:decoration-light transition-decoration-color duration-250"
            >Min Profil</span
          >
          <span
            class="i-material-symbols-arrow-forward-ios text-dark dark:text-light text-[16px] group-hover:translate-x-1 transition-transform"
          />
        </div>
        <span class="text text-[16px] leading-[20px] dark:text-light opacity-70"
          >Se och ändra din profil.</span
        >
      </div>
    </div>

    <div
      class="px-3 py-2 border-b border-dash-dark dark:border-dash-light border-opacity-20 group cursor-pointer"
      @click="navigateTo('/dash/account')"
    >
      <div class="flex flex-col space-y-1">
        <div class="flex flex-row space-x-1 items-center">
          <span
            class="text font-family2 font-medium text-[20px] dark:text-light underline decoration-transparent group-hover:decoration-dark dark:group-hover:decoration-light transition-decoration-color duration-250"
            >Mina Uppgifter</span
          >
          <span
            class="i-material-symbols-arrow-forward-ios text-dark dark:text-light text-[16px] group-hover:translate-x-1 transition-transform"
          />
        </div>
        <span class="text text-[16px] leading-[20px] dark:text-light opacity-70"
          >Hantera abonnemang, lösenord och e-post.</span
        >
      </div>
    </div>

    <div class="px-3 py-2 group cursor-pointer" @click="logoutModalOpen = true">
      <div class="flex flex-col space-y-1">
        <div class="flex flex-row space-x-2 items-center">
          <span
            class="text font-family2 font-medium text-[20px] dark:text-light underline decoration-transparent group-hover:decoration-dark dark:group-hover:decoration-light transition-decoration-color duration-250"
            >Logga Ut</span
          >
        </div>
        <span
          class="text text-[16px] leading-[20px] dark:text-light opacity-70"
        ></span>
      </div>
    </div>

    <div data-popper-arrow></div>
  </div>

  <base-modal-signout v-model:open="logoutModalOpen" />
</template>

<style scoped>
/* REMOVE IF WE WANT TO ADD BORDER */
div[data-popper-arrow]:before {
  border: 0px solid transparent !important;
}
div[data-popper-arrow]:after {
  border: 0px solid transparent !important;
}
</style>
