<script setup>
import {storeToRefs} from 'pinia'
const props = defineProps({
  chatId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["sendMessage", "close"])
const auth = useAuth()
const userId = auth.user.id

const chatManager = await useChatManager()
const chat = computed(() => chatManager.chats[props.chatId])


chat.value.getName();
if(chat.value.messages.length < 10){
  chat.value.fetchOlderMessages(10);
}
watch(chat.value.messages, () => {
  // scroller.value.scrollTop = scroller.value.scrollHeight+200;
    nextTick(() => { // doesn't work if we don't wait a tick , I'm not really sure why.
      scroller.value.scrollTop = scroller.value.scrollHeight;
    })
})

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


const scroller = ref()
const textarea = ref()
onMounted(() => {
  scroller.value.scrollTop = scroller.value.scrollHeight;
})

const myMessageColor = "dark:bg-green-500 bg-green-500"
const otherMessageColor = "dark:bg-blue-500 bg-blue-500" // what colors should we use?

function sendMessage(){
  console.log(textarea.value)
  const text = textarea.value.value.trim()
  if(text.length > 0){
    emit('sendMessage',text)
    chat.value.sendMessage(text)
    textarea.value.value = ""
    textarea.value.style.height = minInputHeight + "px"
  }
}
</script>

<template>
<div class="flex flex-col h-[500px] w-[350px] rounded-xl overflow-clip">
 <!-- Top bar , image and name  -->
  <div class="flex items-center px-3 h-[70px] bg-dash-light-500 dark:bg-dash-dark-300">
    <dash-chat-avatar />  
    <h4 class="flex-1 ml-2 text-[22px] dark:text-light text-dark">{{chat.name}}</h4>
    <button @click="$emit('close')">
      <span class="i-ic-round-close bg-dash-dark-500 dark:bg-dash-light-300 h-[35px] w-[35px] rounded-full"/>
    </button>
  </div>

  <div class="flex flex-col w-full h-full overflow-clip">
<!-- messages field -->
    <div ref="scroller" class="flex-1 overflow-y-auto dark:bg-dash-dark-400 bg-dash-light-300 pb-2"> <!-- flex-1 expands this field to fill all remaining space of flexbox -->
      <div v-for="m in chat.messages" class="w-full px-1 mt-2">
        <div  :class="`flex items-center text-xs text-dash-light-500 dark:text-dash-dark-300 ${m.sender == userId ? 'justify-end' : 'justify-start'} mb-1`">

          <div @click="console.log(m)" :class="`relative ${m.sender == userId ? myMessageColor: otherMessageColor} max-w-[70%] rounded-xl px-3 py-2 mx-2`">
            <span class="text2 text-[16px] leading-[16px] dark:text-light text-light">{{m.text}}</span>
            <div :class="`absolute ${m.sender==userId ? 'right-0 translate-x-[4px] ' + myMessageColor : 'left-0 translate-x-[-4px] ' + otherMessageColor} top-2.5 h-3 w-3 rotate-45  rounded-[2px]`"></div>
          </div>

        </div>
      </div>
    </div>
<!-- input field and send button -->
    <div :class="`flex justify-between items-center p-2 bg-dash-light-500 dark:bg-dash-dark-300`">
      <textarea ref="textarea" class="flex-grow rounded-[20px] dark:bg-dash-dark-400 bg-dash-light-400 mr-2 px-3 py-1.5 h-[40px] text-[22px] no-scrollbar leading-[22px] dark:text-light text-dark" placeholder="Aa" @keyup="grow"/>
      <button @click="sendMessage" class="self-start rounded-full bg-blue-400 w-[40px] h-[40px] p-1">
        <span class="i-material-symbols-send-rounded bg-dash-light-500 translate-x-[2px] h-full w-full"/>
      </button>
    </div>

  </div>
</div>
</template>
<style scoped>
textarea{
  resize: none;
}
</style>
