<script setup lang="ts">
const props = defineProps({
  text:String, 
  position:{type:String, default:"bottom"},
  "class":String,
})  

import {initPopovers} from 'flowbite'
const tooltip = ref(null)
const tooltipTrigger = ref(null)
let popover = null;

onMounted(()=>{
  initPopovers()
  const options = {
    placement: props.position,
    triggerType: 'none',
    onHide: () => {
    },
    onShow: () => {
    },
  };
  popover = new Popover(tooltip.value, tooltipTrigger.value, options);
})
let debounce = new Date("1970");
let isTouch = false;

function show(e){
  if(isTouch) return;
  setTimeout(() => {
    if(new Date() - debounce < 250) return;
    popover.show()
  }, 250);
}
function hide(e){
  debounce = new Date()
  popover.hide()
}
</script>

<template>
  <div ref="tooltipTrigger" :class="props.class" @click="hide" @mouseleave="hide" @mouseenter="show" @touchstart="isTouch = true">
      <slot/>
  </div>
    <div data-popover ref="tooltip" role="tooltip" class="absolute z-10 invisible inline-block w-fit transition-opacity duration-300 rounded-lg shadow-sm opacity-0 dark:bg-dash-light-400 bg-dash-dark-400">
    <span v-if="text" class="text2 text-[18px] z-11 p-2 font-normal dark:text-dark text-light">
      {{text}}
    </span>
    <slot v-else name="content"/>
    <div data-popper-arrow></div>
</div>
  <!-- <div ref="tooltip" data-popover role="tooltip" class="w-fit absolute z-10 invisible py-1 inline-block transition-opacity duration-300  rounded-lg shadow-sm bg-dash-dark-300 dark:bg-dash-light-500 border border-gray-200" @hover="hide"> -->
  <!--   <div data-popper-arrow></div> -->
  <!-- </div> -->

</template>
<style scoped>
div[data-popper-arrow]:before{
  border: 0px solid transparent !important;
}
div[data-popper-arrow]:after{
  border: 0px solid transparent !important;
}

</style>
