<script setup>
const common =
  "transition-colors duration-300  w-[30px] h-[30px] group-hover:bg-dash-accent dark:group-hover:bg-dash-accent group-hover:animate-shake "; //important keep space at the end
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";

const notificationsOpen = ref(false);
const hasUnreadNotifications = ref(true);
const notifications = [
  { title: "Welcome to Bridgestars", read: false, time: new Date() },
  {
    title: "Message from Rasmus",
    read: false,
    time: new Date().setMinutes(new Date().getMinutes() - 5),
  },
  {
    title: "Bridgestars recived an update",
    read: true,
    time: new Date().setMinutes(new Date().getMinutes() - 75),
  },
  {
    title: "You've got mail",
    read: true,
    time: new Date().setMinutes(new Date().getMinutes() - 175),
  },
  {
    title: "test",
    read: true,
    time: new Date().setMinutes(new Date().getMinutes() - 11175),
  },
];

import { initPopovers } from "flowbite";
const popoverTrigger = ref(null);
const popoverEl = ref(null);
let popover = null;
onMounted(() => {
  initPopovers();
  const options = {
    placement: "bottom",
    triggerType: "none", // 'click' | 'hover' | 'none', we handle click ourself instead
    onHide: () => {
      notificationsOpen.value = false;
      notifications.forEach((n) => (n.read = true));
    },
    onShow: () => {
      notificationsOpen.value = true;
      hasUnreadNotifications.value = false;
    },
  };
  popover = new Popover(popoverEl.value, popoverTrigger.value, options);
});
function formatTime(time) {
  if (!time) return "";
  return useTimeAgo().format(time);
}
</script>
<template>
  <base-tooltip :text="$t('dashboard:top_menu.tooltip.notifications')">
    <div
      ref="popoverTrigger"
      class="group flex items-center"
      @click="popover.toggle()"
    >
      <span
        :class="`relative i-material-symbols-notifications-outline ${colored(
          notificationsOpen,
        )}`"
      />
      <!-- one alternative is to have this quite annopying flashing thing, otherwise we could add a red dot or even one with a number in it -->
      <div
        v-if="hasUnreadNotifications"
        class="fixed translate-x-[18px] -translate-y-[12px]"
      >
        <span
          class="absolute animate-ping rounded-full bg-dark opacity-75 h-[10px] w-[10px]"
        ></span>
        <span class="absolute rounded-full h-[10px] w-[10px] bg-info"></span>
      </div>
    </div>
  </base-tooltip>

  <div
    ref="popoverEl"
    data-popover
    role="tooltip"
    class="fixed z-10 invisible inline-block w-64 text-sm transition-opacity duration-300 rounded-lg shadow-sm dark:bg-dash-dark-300 bg-dash-light-500"
  >
    <div
      class="px-3 py-2 border-b border-dark dark:border-white border-opacity-40 rounded-t-lg"
    >
      <h3 class="">Notifications</h3>
    </div>
    <div v-for="n in notifications" :key="n.title" :class="`px-3 py-2`">
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text font-family2 text-[16px] dark:text-light">{{
            n.title
          }}</span>
          <span class="text-xs dark:text-light opacity-70">{{
            formatTime(n.time)
          }}</span>
        </div>
        <span
          v-if="!n.read"
          class="flex-shrink-0 w-2 h-2 bg-info rounded-full"
        ></span>
      </div>
    </div>
    <div data-popper-arrow></div>
  </div>
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
