<!-- hover info tooltip styled -->


<script setup lang="ts">
import {initPopovers} from 'flowbite'

const props = defineProps({
  text:String, 
  position:{type:String, default:"bottom"},
  disabled: Boolean,
  "class":String, // class for styling the wrapper so that we can have different h-full, h-fit etc in different situations
})  


const tooltip = ref(null)
const tooltipTrigger = ref(null)
let popover:any = null;

//TODO for some reason tooltips are not displayed on top of popovers ex account in top bar

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

let debounce:number = new Date("1970").getTime(); // to prevent showing tooltip directly when hovering, only after 250ms
let isTouch = false; //touch devices don't have hover and when clicking the send the mouseenter event, so we need to prevent that

function show(e){
  if(props.disabled) return;
  if(isTouch) return;
  setTimeout(() => {
    if(Date.now() - debounce < 250) return;
    popover?.show()
  }, 250);
}
function hide(e){
  debounce = Date.now() 
  popover?.hide()
}
</script>

<template>
  <div ref="tooltipTrigger" :class="props.class" @click="hide" @mouseleave="hide" @mouseenter="show" @touchstart="isTouch = true">
    <slot/> <!-- content that is wrapper with tooltip functionality -->
  </div>
    <div data-popover ref="tooltip" role="tooltip" class="absolute z-100 invisible inline-block w-auto whitespace-nowrap transition-opacity duration-300 rounded-lg shadow-sm opacity-0 dark:bg-dash-light-400 bg-dash-dark-400">
    <span v-if="text" class="text2 text-[18px] z-101 p-2 font-normal dark:text-dark text-light">
      {{text}} <!-- tooltip text -->
    </span>
    <slot v-else name="content"/>  <!-- alternative tooltip content -->
    <div data-popper-arrow></div>
</div>

</template>
<style scoped>
/* remove border styling on arrow */
div[data-popper-arrow]:before{
  border: 0px solid transparent !important;
}
div[data-popper-arrow]:after{
  border: 0px solid transparent !important;
}

</style>
