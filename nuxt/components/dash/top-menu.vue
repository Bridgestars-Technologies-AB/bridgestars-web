<script setup>
const route = useRoute();
const darkMode = useDarkMode();

const common =
  "w-[24px] h-[24px] hover:bg-dash-accent dark:hover:bg-dash-accent hover:animate-shake "; //important keep space at the end
const notificationsOpen = ref(false);

const isSelected = (item) => route.name == "dash-" + item;
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";
// import {initPopover} from 'flowbite'
import {Popover, initFlowbite} from 'flowbite'

onMounted(()=>{
  initFlowbite()
    // set the popover content element
  const $targetEl = document.getElementById('notifications-popover');

  // set the element that trigger the popover using hover or click
  const $triggerEl = document.getElementById('popover-trigger');

  // options with default values
  const options = {
    placement: 'bottom',
    triggerType: 'click',
    // offset: 10,
    onHide: () => {
        console.log('popover is shown');
    },
    onShow: () => {
        console.log('popover is hidden');
    },
    onToggle: () => {
        console.log('popover is toggled');
    }
  };
  const popover = new Popover($targetEl, $triggerEl, options);
  //popover.show()
  // initPopover()
})
//import {Popover} from 'flowbite'
// onMounted(()=>{
//   const popover = new Popover(document.getElementById('popover-target'), {
//     placement: 'bottom-end',
//     content: document.getElementById('popover-description'),
//     trigger: 'click',
//     offset: [0, 10],
//     interactive: true,
//     arrow: true,
//     theme: 'light-border',
//     appendTo: document.body,
//     allowHTML: true,
//     zIndex: 1000,
//     onShow: () => {
//       notificationsOpen.value = true
//     },
//     onHide: () => {
//       notificationsOpen.value = false
//     }
//   })
// })
</script>
<template>
  <div
    class="bg-dash-light-300 dark:bg-dash-dark flex justify-end flex-grow p-3 space-x-4 h-fit"
  >
    <span
      :class="`${
        !darkMode.enabled
          ? 'i-material-symbols-dark-mode-outline'
          : 'i-material-symbols-light-mode-outline'
      }  ${colored(false)}`"
      @click="darkMode.toggle()"
    />
    <span
      :class="`i-material-symbols-notifications-outline ${colored(
        notificationsOpen
      )}`"
      id="popover-trigger"
    />
    <span
      :class="`i-material-symbols-settings-outline ${colored(
        isSelected('settings')
      )}`"
    />
    <span
      :class="`i-ic-baseline-account-circle ${colored(isSelected('profile'))}`"
    />
  </div>

  <div data-popover id="notifications-popover" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 class="font-semibold text-gray-900 dark:text-white">Popover title</h3>
    </div>
    <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
    </div>
    <div data-popper-arrow></div>
  </div>
</template>

<style scoped></style>
