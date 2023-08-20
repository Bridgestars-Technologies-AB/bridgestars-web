<script setup>
import {storeToRefs} from 'pinia'
const auth = useAuth()
const chatManager = await useChatManager()

const open = ref(false)


const currentChat = ref("4uqF0UBznJ")
const currentChatName = ref("Loading...")

onMounted(async () => {
  console.log(chatManager)
  currentChatName.value = await chatManager.chats[currentChat.value].getName();
})

</script>

<template>
  <div class="absolute bottom-5 right-5 z-10">
    <div class="flex items-end space-x-3">
<!-- left column-->
      <div v-if="open" class="flex flex-col h-[500px] w-[350px] rounded-xl overflow-clip">
        <div class="flex items-center px-3 h-[70px] bg-dash-light-500 dark:bg-dash-dark-300">
          <dash-chat-avatar />  
          <h4 class="flex-1 ml-2 text-[22px] dark:text-light text-dark">{{currentChatName}}</h4>
          <button @click="open = false">
            <span class="i-ic-round-close bg-dash-dark-500 dark:bg-dash-light-300 h-[35px] w-[35px] rounded-full"/>
          </button>
        </div>
        <dash-chat-messaging-window :chatId="currentChat" @sendMessage=""/>
      </div>

<!-- right column-->
      <div class="flex flex-col space-y-1 items-center">
        <dash-chat-avatar/>
        <base-tooltip :text="$t('chat.tooltip.open')" position="left">
          <div @click="open=!open" class="cursor-pointer rounded-full dark:bg-dash-dark-100 bg-dash-light-300 p-2 hover:bg-dash-light-500 dark:hover:bg-dash-dark-300" >
            <img src="~/assets/icon/chat-light.png" class="w-[45px] h-[45px] dark:block hidden scale-x-[-1]" alt="chat">
            <img src="~/assets/icon/chat-dark.png" class="w-[45px] h-[45px] dark:hidden scale-x-[-1]" alt="chat">
          </div>
        </base-tooltip>
      </div>

    </div>
  </div>


<!-- for testing -->
    <div class="absolute top-3 right-3 z-10">
      <h2>Chats</h2>
      <ul>
        <li v-for="c in chatManager.chats">
        <base-submit-button @click.stop="() => {chatManager.sendMessage(c.id, 'test'); console.log('testing message send')}" :text="c.users.filter(u => u !== useAuth().user.id).toString()">
          </base-submit-button>
        </li>
      </ul>
    </div>
</template>
<style scoped>
</style>
