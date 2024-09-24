<script setup>
defineProps({
  hasEntered: { type: Boolean, default: false },
});

const seated = ref(false);
const emit = defineEmits(["update:hasEntered"]);
function takeSeat() {
  emit("update:hasEntered", true);
  seated.value = true;
}
</script>

<template>
  <!-- <button @click="emit('update:hasEntered', false)">Hej</button> -->
  <!-- I use v-show here instead of v-if, because of a strange DOM error -->
  <div :class="`flex flex-col ${$attrs.class}`">
    <button
      v-show="!hasEntered"
      class="w-[70px] h-[30px] bg-dark-100 text-white rounded-xl mb-[5px]"
      @click="takeSeat"
    >
      Ta Plats
    </button>
    <button
      v-if="!seated"
      class="w-[70px] h-[30px] bg-dark-100 text-white rounded-xl"
    >
      Bjud in
    </button>
    <game-lobby-player
      v-else
      class="rounded-xl w-[120px] h-[30px]"
    ></game-lobby-player>
  </div>
</template>
