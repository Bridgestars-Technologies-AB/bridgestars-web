<script setup>
const minInputHeight = 40;
const maxInputHeight = 150;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function grow(e){
  const oField = e.target;
  if (oField.scrollHeight > oField.clientHeight) {
      oField.style.height = clamp(oField.scrollHeight,minInputHeight, maxInputHeight) +"px";
  }else{
      oField.style.height = 0+"px";
      oField.style.height = clamp(oField.scrollHeight, minInputHeight, maxInputHeight) +"px";
  }
}

const messages = [
  {sender: "other", text:"This is a text message that is quite long and I dont know what to write here", time: new Date()},
  {sender: "me", text:"ok", time: new Date()},
  {sender: "other", text:"heellloo", time: new Date()},
  {sender: "other", text:"This is a text message that is quite long and I dont know what to write here", time: new Date()},
  {sender: "me", text:"ok", time: new Date()},
  {sender: "other", text:"heellloo", time: new Date()},
  {sender: "other", text:"This is a text message that is quite long and I dont know what to write here", time: new Date()},
  {sender: "me", text:"This is a text message that is quite long and I dont know what to write here", time: new Date()},
  {sender: "me", text:"ok", time: new Date()},
  {sender: "other", text:"heellloo", time: new Date()},
  {sender: "me", text:"ok", time: new Date()},
  {sender: "other", text:"heellloo", time: new Date()},
]
const scroller = ref()
onMounted(() => {
  scroller.value.scrollTop = scroller.value.scrollHeight;
})

</script>

<template>
  <div class="flex flex-col w-full h-full overflow-clip">
<!-- messages field -->
    <div ref="scroller" class="flex-1 overflow-y-auto dark:bg-dash-dark-400 bg-dash-light-300 pb-2"> <!-- flex-1 expands this field to fill all remaining space of flexbox -->
      <div v-for="m in messages" class="w-full mt-2">
        <div :class="`flex items-center text-xs text-dash-light-500 dark:text-dash-dark-300 ${m.sender == 'me' ? 'justify-end' : 'justify-start'} mb-1`">

          <div :class="`relative ${m.sender == 'me' ? 'bg-green-500' : 'bg-green-500'} max-w-[70%] rounded-xl px-3 py-2 mx-2`">
            <span class="text2 text-[16px] leading-[16px] dark:text-light text-light">{{m.text}}</span>
            <div :class="`absolute ${m.sender=='me' ? 'right-0 translate-x-[4px] bg-green-500' : 'left-0 translate-x-[-4px] bg-green-500'} top-2.5 h-3 w-3 rotate-45  rounded-[2px]`"></div>
          </div>

        </div>
      </div>
    </div>
<!-- input field and send button -->
    <div :class="`flex justify-between items-center p-2 bg-dash-light-500 dark:bg-dash-dark-300`">
      <textarea class="flex-grow rounded-[20px] dark:bg-dash-dark-400 bg-dash-light-400 mr-2 px-3 py-1.5 h-[40px] text-[22px] dark:text-light text-dark" placeholder="Aa" @keyup="grow"/>
      <button class="rounded-full bg-blue-400 w-[40px] h-[40px] p-1">
        <span class="i-material-symbols-send-rounded bg-dash-light-500 translate-x-[2px] h-full w-full"/>
      </button>
    </div>

  </div>
</template>
<style scoped>
textarea{
  resize: none;
}
</style>
