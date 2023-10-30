<script setup>
defineProps({
  hasEntered: Boolean,
});

const emit = defineEmits(["update:hasEntered"]);
</script>

<template>
  <button @click="emit('update:hasEntered', false)">Hej</button>
  <div class="flex flex-col">
    <button
      v-if="!hasEntered"
      class="w-[70px] h-[30px] bg-dash-dark-100 text-white rounded-xl"
      @click="emit('update:hasEntered', true)"
    >
      Ta Plats
    </button>
    <button
      class="w-[70px] h-[30px] bg-dash-dark-100 text-white rounded-xl mt-[5px]"
    >
      Bjud in
    </button>
  </div>
</template>
