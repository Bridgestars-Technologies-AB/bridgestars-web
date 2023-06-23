<template>
  <div class="backdrop">
    <div class="foreground">
      <!-- navbar -->
<img src="~/assets/bridgestars/art/about_us.svg" alt="logo" class="w-[150px] h-[150px]">
      <h1>Card Page Layout</h1>
      
    </div>
  </div>
</template>
<style scoped>
.backdrop{
  @apply h-[100vh] w-screen bg-[#F0F2F5] px-[16px] py-[32px];
}
.foreground{
  @apply p-[16px] rounded-2xl shadow-xl bg-[#FFFFFF] flex flex-col text-center;
}
</style>
