<!-- 
::this component is only used client side::

A chat window component,
props:
  chatId: the id of the chat to display
emits:
  sendMessage(text): when the user sends a message
  close: when the user closes the chat
-->
<script setup>
const props = defineProps({
  chatId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["sendMessage", "close"]);
const auth = useAuth();

const chatManager = await useChatManager();
const chat = chatManager.get(props.chatId);

if (chat.messages.length < 10) {
  chat.fetchOlderMessages(10);
}

watch(chat.messages, () => {
  // new messages has come, if they are older then we must reset the date counter so that we get a date divider
  lastDate = new Date(0);
  nextTick(() => {
    // doesn't work if we don't wait a tick , I'm not really sure why.
    scroller.value.scrollTop = scroller.value.scrollHeight;
  });
});

const minInputHeight = 40;
const maxInputHeight = 150;
// resize the input field to fit the text
function calculateInputFieldSize(e) {
  //found on google
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  const oField = e.target;
  if (oField.scrollHeight > oField.clientHeight) {
    oField.style.height =
      clamp(oField.scrollHeight, minInputHeight, maxInputHeight) + "px";
  } else {
    oField.style.height = 0 + "px";
    oField.style.height =
      clamp(oField.scrollHeight, minInputHeight, maxInputHeight) + "px";
  }
}

const scroller = ref();
const textarea = ref();
onMounted(() => {
  // scroll to bottom
  scroller.value.scrollTop = scroller.value.scrollHeight;
});

const myMessageColor = "dark:bg-green-500 bg-green-500";
const otherMessageColor = "dark:bg-blue-500 bg-blue-500"; // what colors should we use?

function sendMessage() {
  const text = textarea.value.value.trim();
  if (text.length > 0) {
    emit("sendMessage", text);
    chat.sendMessage(text);
    textarea.value.value = "";
    textarea.value.style.height = minInputHeight + "px"; //reset height of input field
  }
}

// add a date divider between messages from different days
let lastDate = new Date(0);
const isNewDate = (d) => {
  if (
    lastDate?.getFullYear() === d?.getFullYear() &&
    lastDate?.getMonth() === d?.getMonth() &&
    lastDate?.getDate() === d?.getDate()
  )
    return false;
  lastDate = d;
  return true;
};
const isMe = (m) => m.sender == auth.user()?.id;
</script>

<template>
  <div class="flex flex-col h-[500px] w-[350px] rounded-xl overflow-clip">
    <!-- Top bar , image and name  -->
    <div
      class="flex items-center px-3 h-[70px] bg-dash-light-500 dark:bg-dash-dark-300"
    >
      <dash-chat-avatar :chat="chat" />
      <h4 class="flex-1 ml-2 text-[22px] dark:text-light text-dark">
        {{ chat.name }}
      </h4>
      <button @click="$emit('close')">
        <span
          class="i-ic-round-close bg-dash-dark-500 dark:bg-dash-light-300 h-[35px] w-[35px] rounded-full"
        />
      </button>
    </div>

    <div class="flex flex-col w-full h-full overflow-clip">
      <!-- messages field -->
      <div
        ref="scroller"
        class="flex-1 overflow-y-auto dark:bg-dash-dark-400 bg-dash-light-300 pb-2"
      >
        <!-- flex-1 expands this field to fill all remaining space of flexbox -->
        <div v-for="m in chat.messages" :key="m.id" class="w-full px-1 mt-2">
          <!-- Date divider -->
          <div v-if="isNewDate(m.createdAt)">
            <div
              class="flex justify-between items-center text-xs text-dash-light-500 dark:text-dash-dark-300 my-4"
            >
              <div
                class="w-[60px] h-[1px] mx-auto bg-dash-dark-500 opacity-[50%] dark:bg-dash-light-300"
              ></div>
              <span
                class="mx-2 text2 text-[14px] leading-[14px] text-dark dark:text-light"
                >{{ useTimeAgo().format(m.createdAt) }}</span
              >
              <div
                class="w-[60px] h-[1px] mx-auto bg-dash-dark-500 opacity-[50%] dark:bg-dash-light-300"
              />
            </div>
          </div>
          <!-- chat bubble -->
          <div
            :class="`flex items-center text-xs text-dash-light-500 dark:text-dash-dark-300 ${
              isMe(m) ? 'justify-end' : 'justify-start'
            } mb-1`"
          >
            <div
              :class="`relative ${
                isMe(m) ? myMessageColor : otherMessageColor
              } max-w-[70%] rounded-xl px-3 py-2 mx-2`"
              @click="console.log(m)"
            >
              <span
                class="text2 text-[16px] leading-[16px] dark:text-light text-light break-words"
                >{{ m.text }}</span
              >
              <div
                :class="`absolute ${
                  isMe(m)
                    ? 'right-0 translate-x-[4px] ' + myMessageColor
                    : 'left-0 translate-x-[-4px] ' + otherMessageColor
                } top-2.5 h-3 w-3 rotate-45  rounded-[2px]`"
              ></div>
            </div>
          </div>
        </div>

        <!-- Date divider, Add a date divider after the last message "today" -->
        <!-- <div v-if="isNewDate(new Date())"> -->
        <!--   <div class="flex justify-between items-center text-xs text-dash-light-500 dark:text-dash-dark-300 my-4"> -->
        <!--     <div class="w-[60px] h-[1px] mx-auto bg-dash-dark-500 opacity-[50%] dark:bg-dash-light-300"></div> -->
        <!--     <span class="mx-2 text2 text-[14px] leading-[14px] text-dark dark:text-light">{{new Date().toLocaleDateString('sv-SE', { -->
        <!--       weekday: 'long', -->
        <!--       })}}</span> -->
        <!--     <div class="w-[60px] h-[1px] mx-auto bg-dash-dark-500 opacity-[50%] dark:bg-dash-light-300"/> -->
        <!--   </div> -->
        <!-- </div> -->
      </div>
      <!-- input field and send button -->
      <div
        :class="`flex justify-between items-center p-2 bg-dash-light-500 dark:bg-dash-dark-300`"
      >
        <textarea
          ref="textarea"
          class="flex-grow rounded-[20px] dark:bg-dash-dark-400 bg-dash-light-400 mr-2 px-3 py-1.5 h-[40px] text-[22px] no-scrollbar leading-[22px] dark:text-light text-dark"
          placeholder="Aa"
          @keyup="calculateInputFieldSize"
        />
        <button
          class="self-start rounded-full bg-blue-400 w-[40px] h-[40px] p-1"
          @click="sendMessage"
        >
          <span
            class="i-material-symbols-send-rounded bg-dash-light-500 translate-x-[2px] h-full w-full"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
textarea {
  resize: none;
}
</style>
