<script setup lang="ts">
const props = defineProps(['imgSrc'])
const imgWithDefault = props.imgSrc || "../assets/bridgestars/art/about_us.svg"
</script>

<template>
  <div class="backdrop">
    <div class="foreground">
      <!-- navbar -->
      <Navbar ></Navbar>

      <!-- title -->
      <img :src="imgWithDefault"
        class="mb-5 xs:w-[100%] sm:w-[80%] xl:w-[50%]">


      <!-- content -->
      <slot class="p-[16px]"></slot> 

    </div>
  </div>
</template>
<style scoped>
.backdrop{
  @apply h-[100vh] w-screen bg-[#F0F2F5] px-[16px] py-[32px];
}
.foreground{
  @apply rounded-2xl shadow-xl bg-[#FFFFFF] flex flex-col text-center items-center;
}
</style>
