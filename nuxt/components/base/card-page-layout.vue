<script setup lang="ts">
const props = defineProps(['imgSrc', "hideNavbar", "class", 'backdropClass'])
const imgWithDefault = props.imgSrc || "../assets/bridgestars/art/about_us.svg"
</script>

<template>
  <div :class="'backdrop ' + backdropClass">
    <div :class="`foreground ${props.class}`">
      <!-- navbar -->
      <base-navbar v-if="!hideNavbar"></base-navbar>

      <!-- title -->
      <img :src="imgWithDefault"
        class="mb-5 xs:w-[96%] sm:w-[80%] xl:w-[50%]">


      <!-- content -->
      <div class="w-full flex flex-col items-center">
        <slot></slot> 
      </div>

    </div>
    <base-footer/>
  </div>
</template>
<style scoped>
.backdrop{
  @apply h-fit w-[100%] bg-[#F0F2F5] xs:px-[0px] sm:px-[16px] py-[32px];
}
.foreground{
  @apply rounded-2xl shadow-xl bg-[#FFFFFF] flex flex-col items-center max-w-[1400px] mx-auto;
}
</style>
