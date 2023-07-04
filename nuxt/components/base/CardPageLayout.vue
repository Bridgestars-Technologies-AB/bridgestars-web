<script setup lang="ts">
const props = defineProps(['imgSrc', "hideNavbar", "class"])
const imgWithDefault = props.imgSrc || "../assets/bridgestars/art/about_us.svg"
</script>

<template>
  <div class="backdrop">
    <div :class="'foreground ' + props.class">
      <!-- navbar -->
      <Navbar v-if="!hideNavbar"></Navbar>

      <!-- title -->
      <img :src="imgWithDefault"
        class="mb-5 xs:w-[100%] sm:w-[80%] xl:w-[50%]">


      <!-- content -->
      <slot class="p-[16px]"></slot> 

    </div>
    <Footer/>
  </div>
</template>
<style scoped>
.backdrop{
  @apply h-fit w-[100wh] bg-[#F0F2F5] xs:px-[0px] sm:px-[16px] py-[32px];
}
.foreground{
  @apply rounded-2xl shadow-xl bg-[#FFFFFF] flex flex-col text-center items-center;
}
</style>
