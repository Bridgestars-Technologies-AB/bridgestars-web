<script setup lang="ts">
defineEmits(["openChat", "close"])
const manager = await useChatManager();
manager.getChats().forEach(c => {
  c.getName();
});
  
</script>

<template>
<div class="flex flex-col h-[500px] w-[350px] rounded-xl overflow-clip">

  <div class="flex justify-end items-center px-3 h-[40px] bg-dash-light-500 dark:bg-dash-dark-300">
    <button @click="$emit('close')">
      <span class="i-ic-round-close bg-dash-dark-500 dark:bg-dash-light-300 h-[30px] w-[30px] rounded-full scale-[1.2] translate-y-[2px]"/>
    </button>
  </div>

  <div class="flex flex-col w-full h-full overflow-clip">
<!-- messages field -->
    <div ref="scroller" class="flex-1 overflow-y-auto dark:bg-dash-dark-400 bg-dash-light-500 pb-2"> <!-- flex-1 expands this field to fill all remaining space of flexbox -->
      <hr class="border-dark dark:border-white opacity-[20%]"/>
      <div v-for="c in manager.chats" class="w-full px-1 mt-2" @click="$emit('openChat', c)">
          <div class="flex items-center">
            <dash-chat-avatar :chat="c" />
            <div class="flex flex-col  w-full">
            <div class="flex w-full items-center">
              <h4 class="flex-grow ml-2 text-[22px] leading-[22px] dark:text-light text-dark">{{c?.name}}</h4>
              <span class="ml-2 text2 dark:text-light text-dark">{{c?.latestMessage?.date || "today"}}</span>
              <span class="i-ic-baseline-navigate-next text2 dark:text-light text-dark"></span>
            </div>
              <span class="flex-1 ml-2 text-[22px] dark:text-light text-dark">{{c?.latestMessage?.text}}</span>
            </div>
          </div>
          <hr class="border-dark dark:border-white opacity-[20%]"/>
      </div>
    </div>
<!-- input field and send button -->
  </div>
</div>
</template>
