<script setup>
defineProps({
  chatId: {
    type: String,
    required: true
  }
})

const open = ref(false)

</script>

<template>
  <div class="absolute bottom-5 right-5 z-10">
    <div class="flex items-end space-x-3">
<!-- left column-->
      <div v-if="open" class="flex flex-col h-[500px] w-[350px] rounded-xl overflow-clip">
        <div class="flex items-center px-3 h-[70px] bg-dash-light-500 dark:bg-dash-dark-300">
          <dash-chat-avatar />  
          <h4 class="flex-1 ml-2 text-[22px] dark:text-light text-dark">Castor</h4>
          <button @click="open = false">
            <span class="i-ic-round-close bg-dash-dark-500 dark:bg-dash-light-300 h-[35px] w-[35px] rounded-full"/>
          </button>
        </div>
        <dash-chat-messaging-window/>
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
    <!-- <div class="absolute bottom-3 right-3 z-10"> -->
    <!--   <h2>Chats</h2> -->
    <!--   <ul> -->
    <!--     <li v-for="c in useChats().chats"> -->
    <!--       <base-submit-button @click="useChats().sendMessage(c.id, 'test')" :text="c.get('users').filter(u => u !== useAuth().user.id)"> -->
    <!--       </base-submit-button> -->
    <!--     </li> -->
    <!--   </ul> -->
    <!-- </div> -->
</template>
<style scoped>
</style>
