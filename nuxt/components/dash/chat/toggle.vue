<!-- this component is only used client side -->
<script setup>
import {storeToRefs} from 'pinia'
const auth = useAuth()
const chatManager = await useChatManager()

const open = ref(false)


const currentChat = ref("4uqF0UBznJ")

onMounted(async () => {
  console.log(chatManager)
})
function openChat(chat){
  console.log(chat)
  currentChat.value = chat.id
}

</script>

<template>
  <div class="absolute bottom-5 right-5 z-10">
    <div class="flex items-end space-x-3">
<!-- left column-->
      <dash-chat-window v-if="open && currentChat" :chatId="currentChat" @sendMessage="" @close="currentChat=null"/>
      <dash-chat-list v-if="open && !currentChat" @openChat="openChat" @close="open = false;currentChat=null"/>

<!-- right column-->
      <div class="flex flex-col space-y-1 items-center">
        <div class="bg-dash-light-400 dark:bg-dash-dark-200 rounded-full"> <!-- hack to let avatar find right color for status border without obstructing view -->
          <base-tooltip text="temp for show" position="left">
            <dash-chat-avatar/>
            </base-tooltip>
        </div>
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
    <div class="absolute top-[100px] right-3 z-10">
      <h2>Chats</h2>
      <ul>
        <li v-for="c in chatManager.chats">
        <div class="flex items-center border border-white flex-col">
          <h3 class="text-sm">{{c.id}}</h3>
          <h3 class="text-sm">{{c.name}}</h3><!-- Will start the fetch and then when c.name is updated everything will be redrawn and c.getName() will do nothing this time, not optimal maybe  -->
          <h3 class="text-sm">{{c.getLatestMessage() && c.latestMessage?.text}}</h3>
        </div>

        <!-- <base-submit-button @click.stop="() => {chatManager.sendMessage(c.id, 'test'); console.log('testing message send')}" :text="c.users.filter(u => u !== useAuth().user.id).toString()"> -->
          <!-- </base-submit-button> -->
        </li>
      </ul>
    </div>
</template>
<style scoped>
</style>
