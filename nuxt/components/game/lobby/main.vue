<script setup></script>

<template>
  <div
    class="flex flex-col items-center w-[500px] h-[500px] bg-dash-dark-200 rounded-xl"
  >
    <span class="text1 mt-[60px]"> Spelare </span>
    <game-lobby-button class="mt-[35px]"></game-lobby-button>
    <div
      class="flex flex-row justify-center items-center mt-[5px] w-full h-[150px]"
    >
      <div class="flex h-full justify-center">
        <game-lobby-button class="mt-[35px]"></game-lobby-button>
      </div>

      <div class="bg-[#075B0E] w-[100px] h-[100px] mx-[35px]"></div>
      <div class="flex h-full justify-center">
        <game-lobby-button class="mt-[35px]"></game-lobby-button>
      </div>
    </div>
    <div class="flex items-center">
      <game-lobby-button></game-lobby-button>
    </div>
  </div>
</template>
