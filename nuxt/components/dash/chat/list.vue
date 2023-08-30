<!-- 
::this component is only used client side::

Lists all the chats the user is in. 

emits:
  openChat(id): when the user opens a chat
  close: when the user closes the chat
-->
<script setup lang="ts">
defineEmits(["openChat", "close"])
const manager = await useChatManager();

//we could do this when getting the chats but I want to fetch the chat names dynamically when they are shown instead so we keep the logic here for later
manager.sortedChats().forEach(c => { 
  c.getName();
  c.getLatestMessage();
});

function getTime(c) {
  const time = c.latestMessage?.createdAt;
  return time ? useTimeAgo().format(time, "twitter-minute-now") : "";
}

const searchTerm = ref("");
//this will not work if not all chats are downloaded, maybe keep it like this for now
const filterUsers = (c) => {
  if (!searchTerm.value) return true;
  return c.name.toLowerCase().includes(searchTerm.value.toLowerCase()); 
};

/**
 * Search for users, not yet used
 **/
async function searchUsers(){
  Parse.Cloud.run("searchUsers", {username:searchTerm, page:0, perPage:10}).then((users) => {
    console.log(users)
  })
}


</script>

<template>
  <div class="flex flex-col h-[500px] w-[350px] rounded-xl overflow-clip">


     <!-- Top bar with close button -->
    <div class="flex justify-between items-center px-3 h-[50px] bg-dash-light-500 dark:bg-dash-dark-300">
      <!-- <button @click="$emit('close')"> -->
      <!--   <span -->
      <!--     class="i-ic-round-close bg-dash-dark-500 dark:bg-dash-light-300 h-[30px] w-[30px] rounded-full scale-[1.2] translate-y-[2px]" /> -->
      <!-- </button> -->

      <!-- new chat -->
        <div class="flex items-center justify-center h-[38px] w-[38px] rounded-full">
          <span class="i-material-symbols-add-circle-outline-rounded bg-dark dark:bg-light text-[28px]"></span>
        </div>

      <!-- search field TODO: this could be an component -->
      <div class="flex justify-between items-center bg-dash-light-400 dark:bg-dash-dark-500 h-[38px] px-3 rounded-[12px]">
        <input
          type="söök"
          class="flex-grow text2 bg-transparent dark:text-light text-dark text-[16px] leading-[16px] placeholder-dark dark:placeholder-light focus:outline-none"
          placeholder="Search..."
          @input="searchTerm = $event.target.value"
        />
        <div class="flex items-center justify-center bg-dash-light-300 dark:bg-dash-dark-300 h-[30px] w-[30px] rounded-full">
          <span class="i-ic-round-search text-[24px] bg-dark dark:bg-light"></span>
        </div>
      </div>
      <!-- close --> 
      <div class="flex items-center justify-center h-[38px] w-[38px] rounded-full cursor-pointer" @click="$emit('close')">
          <span class="i-ic-round-close bg-dark dark:bg-light text-[28px]"></span>
        </div>

    </div>

    <div class="flex flex-col w-full h-full overflow-clip">
      <!-- messages field -->
      <div ref="scroller" class="flex-grow w-full overflow-x-hidden overflow-y-auto dark:bg-dash-dark-400 bg-dash-light-500 pb-2 pt-2">
        <!-- flex-1 expands this field to fill all remaining space of flexbox -->
        <!-- <hr class="border-dark dark:border-white opacity-[20%] my-1" /> -->
        <div v-for="c in manager.sortedChats()" class="px-1 cursor-pointer" @click="$emit('openChat', c)">
          <div v-if="filterUsers(c)">
          <div class="relative flex items-center group pl-1">
            <dash-chat-avatar :chat="c"/>
            <div class="flex flex-col w-full">
              <div class="flex items-center justify-between">

                <!-- Chat name -->
                <h4 class="flex-grow ml-2 text-[22px] leading-[22px] dark:text-light text-dark underline decoration-transparent group-hover:decoration-dark dark:group-hover:decoration-light transition-decoration-color duration-250"> {{ c?.name }}</h4>

                <!-- Chat last update -->
                <span class="ml-2 text2 text-[12px] leading-[12px] dark:text-light text-dark">{{ getTime(c) }}</span>
                <span class="i-material-symbols-arrow-forward-ios text-dark dark:text-light text-[16px] group-hover:translate-x-1 transition-transform break-words" />

              </div>

              <!-- Message text -->
              <div class="w-[280px] h-[24px] overflow-hidden"> <!-- this is a hack to make the flexbox work -->
                <span class="ml-2 mt-1 text-[18px] leading-[18px] dark:text-light text-dark opacity-[80%]">{{ c?.latestMessage?.text }}</span>
              </div>

            </div>
          </div>
          <hr class="border-dark dark:border-white opacity-[20%] my-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
