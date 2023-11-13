<script setup>
const hasEntered = ref(false);
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-full h-full bg-dash-dark-200 space-y-[20px]"
  >
    <span class="player !font-semibold mb-[15px]"> Spelare </span>
    <game-lobby-button
      v-model:hasEntered="hasEntered"
      class="mt-[35px]"
    ></game-lobby-button>

    <div
      class="flex flex-row justify-center items-center w-full h-[125px] space-x-[20px]"
    >
      <div class="h-full w-[25%] flex items-center justify-end">
        <game-lobby-button v-model:hasEntered="hasEntered"></game-lobby-button>
      </div>

      <div
        class="flex items-center justify-center bg-[#075B0E] w-[125px] h-full rounded-xl"
      >
        <div class="flex flex-col w-[90%] h-[90%]">
          <div class="w-full h-1/3 flex justify-center items-start">
            <span class="player">N</span>
          </div>
          <div class="flex flex-row w-full h-1/3 justify-between items-center">
            <span class="player">W</span> <span class="player">E</span>
          </div>
          <div class="w-full h-1/3 flex justify-center items-end">
            <span class="player">S</span>
          </div>
        </div>
      </div>

      <div class="h-full w-[25%] flex items-center justify-start">
        <game-lobby-button v-model:hasEntered="hasEntered"></game-lobby-button>
      </div>
    </div>

    <game-lobby-button v-model:hasEntered="hasEntered"></game-lobby-button>
  </div>
</template>

<style scoped>
.player {
  @apply text1 !text-white;
}
</style>
