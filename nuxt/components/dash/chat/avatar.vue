<script setup lang="ts">
import {Status} from "~/js/db/user/User"
const props = defineProps({
  userId: {
    type: String,
    required: false
  },
  chat: {
    type: Object,
    required: false
  }
})
// if(!props.chat && !props.userId) throw new Error("chat or userId is required");
const userId = computed(() => {
  if(props.userId) return props.userId;
  if(props.chat) return props.chat?.users?.find(id => id != useAuth().user.id);
}) 

const manager = await useUserManager()
const statusElement = ref();

onMounted(() => {
  setStatusBorderColor();
})

useDarkMode().$subscribe(() => {
  setStatusBorderColor();
})

function setStatusBorderColor(){
  statusElement.value.style.borderColor = getBackgroundColor(statusElement.value)
}
function getBackgroundColor(el){
  const parent = el?.parentElement;
  if(!parent) return "white";
  let color = window.getComputedStyle(parent).backgroundColor;
  if(color == "rgba(0, 0, 0, 0)") color = null;
  if(color) return color;
  return getBackgroundColor(parent);
}
const statusColor = () => {
  const status = manager.getStatus(userId.value);
  switch (status) {
    case Status.Online:
     return  "bg-[#22FF06]";
      break;

    default:
      return "bg-gray-500";
      break;
  }
}
</script>

<template>
  <div class="aspect-square h-[50px] w-[50px]">
        <img src="~/assets/bridgestars/images/castor.jpg" class="rounded-full object-cover object-top aspect-square cursor-pointer"/>
    <div ref="statusElement" :class="`absolute translate-x-[38px] translate-y-[-19px] rounded-full h-[16px] w-[16px] ${statusColor()} border-[3px]`"/>
  </div>
</template>
