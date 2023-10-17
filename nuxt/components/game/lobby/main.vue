<script setup></script>

<template>
  <div
    class="flex flex-col items-center w-[500px] h-[500px] bg-dash-dark-200 rounded-xl"
  >
    <span class="player mt-[60px] !font-semibold"> Spelare </span>
    <game-lobby-button class="mt-[35px]"></game-lobby-button>

    <div
      class="flex flex-row justify-center items-center w-full h-[125px] mt-[20px] mb-[20px] space-x-[20px]"
    >
      <game-lobby-button></game-lobby-button>
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
      <game-lobby-button></game-lobby-button>
    </div>

    <game-lobby-button></game-lobby-button>
  </div>
</template>

<style scoped>
.player {
  @apply text1 !text-white;
}
</style>
