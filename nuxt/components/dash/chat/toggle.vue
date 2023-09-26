<!-- this component is only used client side -->
<!--
This component is the chat toggleChatApp button, it is always visible and allows the user to open the chat window.

emits: none
props: none

-->
<script setup>
const chatManager = await useChatManager();

const open = ref(false);
const currentChat = ref(null);

function openChat(chat) {
  currentChat.value = chat.id;
}

function toggleChatApp() {
  if (open.value) {
    open.value = false;
    currentChat.value = null;
  } else open.value = true;
}
</script>

<template>
  <div class="absolute bottom-5 right-5 z-10">
    <div class="flex items-end space-x-3">
      <!-- left column-->
      <dash-chat-window
        v-if="open && currentChat"
        :chat-id="currentChat"
        @sendMessage=""
        @close="currentChat = null"
      />
      <dash-chat-list
        v-if="open && !currentChat"
        @openChat="openChat"
        @close="
          open = false;
          currentChat = null;
        "
      />

      <!-- right column-->
      <div class="flex flex-col space-y-1 items-center">
        <div class="bg-dash-light-400 dark:bg-dash-dark-200 rounded-full">
          <!-- hack to let avatar find right color for status border without obstructing view -->
          <base-tooltip text="temp for show" position="left">
            <dash-chat-avatar :chat="chatManager.get(currentChat)" />
          </base-tooltip>
        </div>
        <base-tooltip :text="$t('chat.tooltip.open')" position="left">
          <div
            class="cursor-pointer rounded-full dark:bg-dash-dark-100 bg-dash-light-300 p-2 hover:bg-dash-light-500 dark:hover:bg-dash-dark-300"
            @click="toggleChatApp"
          >
            <div v-if="!open">
              <NuxtImg
                width="45"
                height="45"
                src="/icon/chat-light.png"
                class="w-[45px] h-[45px] dark:block hidden scale-x-[-1]"
                alt="chat"
              />
              <NuxtImg
                width="45"
                height="45"
                src="/icon/chat-dark.png"
                class="w-[45px] h-[45px] dark:hidden scale-x-[-1]"
                alt="chat"
              />
            </div>
            <div v-else class="h-[45px]">
              <span
                class="i-ic-round-close w-[45px] h-[45px] scale-x-[-1] dark:text-light text-dash-light-500"
              ></span>
            </div>
          </div>
        </base-tooltip>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
