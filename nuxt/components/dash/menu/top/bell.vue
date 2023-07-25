
<script setup>
 import TimeAgo from 'javascript-time-ago' 
 import en from 'javascript-time-ago/locale/en'
 import sv from 'javascript-time-ago/locale/sv'
 const {i18} = useTranslate()

TimeAgo.addLocale(sv)
TimeAgo.addLocale(en)
let timeAgo = new TimeAgo(i18.language)


const common =
  "w-[30px] h-[30px] group-hover:bg-dash-accent dark:group-hover:bg-dash-accent group-hover:animate-shake "; //important keep space at the end
const colored = (b) =>
  b
    ? common + "bg-dash-accent dark:bg-dash-accent"
    : common + "bg-dark dark:bg-light";

const notificationsOpen = ref(false);
const hasUnreadNotifications = ref(true);
const notifications = [
  {title:"Welcome to Bridgestars", read:false, time: new Date() },
  {title:"Message from Rasmus", read:false, time: new Date().setMinutes(new Date().getMinutes()-5) },
  {title:"Bridgestars recived an update", read:true, time: new Date().setMinutes(new Date().getMinutes()-75) },
  {title:"You've got mail", read:true, time: new Date().setMinutes(new Date().getMinutes()-175) },
  {title:"test", read:true, time: new Date().setMinutes(new Date().getMinutes()-11175) },
]

 import {initPopovers} from 'flowbite'
 let popover = null;
onMounted(()=>{
  initPopovers()
    // set the popover content element
  const $targetEl = document.getElementById('notifications-popover');
  // set the element that trigger the popover using hover or click
  const $triggerEl = document.getElementById('popover-trigger');
  const options = {
    placement: 'bottom',
    triggerType: 'none',
    onHide: () => {
      notificationsOpen.value = false;
       notifications.forEach(n => n.read = true)
    },
    onShow: () => {
      notificationsOpen.value = true;
       hasUnreadNotifications.value = false;
    },
  };
   popover = new Popover($targetEl, $triggerEl, options);
})
function formatTime(time){
   if(!time) return ""
   return timeAgo.format(time)
}

</script>
<template>
  <base-tooltip text="Notiser" position="bottom">
    <div class="group flex items-center" id="popover-trigger" @click="popover.toggle()">
        <span
          :class="`relative i-material-symbols-notifications-outline ${colored(
            notificationsOpen
          )}`"
        />
      <!-- one alternative is to have this quite annopying flashing thing, otherwise we could add a red dot or even one with a number in it -->
      <div v-if="hasUnreadNotifications" class="absolute translate-x-[18px] -translate-y-[12px]">
        <span class="absolute animate-ping rounded-full bg-dark opacity-75 h-[10px] w-[10px]"></span>
        <span class="absolute rounded-full h-[10px] w-[10px] bg-info"></span>
      </div>
    </div>
  </base-tooltip>

  <div data-popover id="notifications-popover" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm transition-opacity duration-300  rounded-lg shadow-sm dark:bg-dash-dark-300 bg-dash-light-500">
    <div class="px-3 py-2 border-b border-dark dark:border-white border-opacity-40 rounded-t-lg">
        <h3 class="">Notifications</h3>
    </div>
    <div v-for="n in notifications" :class="`px-3 py-2`">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="text font-family2 text-[16px] dark:text-light">{{n.title}}</span>
                <span class="text-xs dark:text-light opacity-70">{{formatTime(n.time)}}</span>
            </div>
            <span v-if="!n.read" class="flex-shrink-0 w-2 h-2 bg-info rounded-full"></span>
        </div>
    </div>
    <div data-popper-arrow></div>
  </div>
</template>

<style scoped>
/* REMOVE IF WE WANT TO ADD BORDER */
div[data-popper-arrow]:before{
  border: 0px solid transparent !important;
}
div[data-popper-arrow]:after{
  border: 0px solid transparent !important;
}
</style>
