<script setup lang="ts">
//import { Status } from "~/js/db/user/User";
const props = defineProps({
  userId: {
    type: String,
    required: false,
  },
  chat: {
    type: Object,
    required: false,
  },
});
// if(!props.chat && !props.userId) throw new Error("chat or userId is required");
const userId = computed(() => {
  ""
  // if (props.userId) return props.userId;
  // if (props.chat)
  //   return props.chat?.users?.find((id) => id != useAuth().user?.id);
});

//const manager = await useUserManager();
const statusElement = ref();

onMounted(() => {
  setStatusBorderColor();
});

useDarkMode().$subscribe(() => {
  setStatusBorderColor();
});

function setStatusBorderColor() {
  statusElement.value.style.borderColor = getBackgroundColor(
    statusElement.value,
  );
}

/**
 * Find the right color to use for the border of the status element.
 * Iterates through the parents of the element and returns the first background color that is not transparent,
 **/
function getBackgroundColor(el: HTMLElement) {
  const parent = el?.parentElement;
  if (!parent) return "white";
  let color = window.getComputedStyle(parent).backgroundColor;
  if (color == "rgba(0, 0, 0, 0)") color = "";
  if (color) return color;
  return getBackgroundColor(parent);
}
const statusColor = () => {
  return "bg-[#22FF06]";
  // switch (manager.getStatus(userId.value)) {
  //   case Status.Online:
  //     return "bg-[#22FF06]";
  //   default:
  //     return "bg-gray-500";
  // }
};
</script>

<template>
  <div class="aspect-square h-[50px] w-[50px]">
    <NuxtImg
      width="50"
      height="50"
      format="webp"
      src="/bridgestars/images/castor.jpg"
      class="rounded-full object-cover object-top aspect-square cursor-pointer"
    />
    <div
      ref="statusElement"
      :class="`absolute translate-x-[38px] translate-y-[-19px] rounded-full h-[16px] w-[16px] ${statusColor()} border-[3px]`"
    />
  </div>
</template>
