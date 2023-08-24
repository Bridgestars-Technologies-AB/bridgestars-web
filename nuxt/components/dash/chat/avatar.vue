<script setup lang="ts">
defineProps({
  user: { // we need a userManager, chatmanager shouldnt hold information about user status (online/offline)
    type: Object,
    required: false
  },
  userId: {
    type: String,
    required: false
  }
})

const status = ref(false);
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
</script>

<template>
  <div class="aspect-square h-[50px] w-[50px]">
        <img src="~/assets/bridgestars/images/castor.jpg" class="rounded-full object-cover object-top aspect-square cursor-pointer"/>
        <div ref="statusElement" class="absolute translate-x-[38px] translate-y-[-19px] rounded-full h-[16px] w-[16px] bg-[#22FF06] border-[3px]"/>
  </div>
</template>
