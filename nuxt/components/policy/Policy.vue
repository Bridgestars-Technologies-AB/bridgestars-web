<script setup lang="ts">
const options = ["Terms", "Privacy", "Disclaimer", "Copyright"];
const policy = ref("terms");
const { data } = await useAsyncData("policy", () =>
  queryContent("/policy").find(),
);
</script>

<template>
  <base-card-page-layout imgSrc="/bridgestars/art/about_us.png">
    <div class="p-5 w-[90%] max-w-[1200px] flex flex-col items-center">
      <!-- Maybe make a navigateBar component, yes -->
      <base-animated-select :options="options" v-model="policy" />
      <div
        class="bg-[#313135] flex flex-col items-center justify-center w-full h-[100px] sm:h-[150px] rounded-xl mt-[40px]"
      >
        <span
          class="text-white text-[25px] sm:text-[40px] font-bold font-family2 leading-7 sm:leading-10"
          >{{ data?.filter((e) => e.id === policy)[0].title }}</span
        >
        <span
          class="text-white text-[16px] sm:text-[20px] font-family2 leading-4 sm:leading-10"
        >
          Last modified: {{ data?.filter((e) => e.id === policy)[0].date }}
        </span>
      </div>
      <div class="bg-white prose prose-lg sm:prose-xl prose-policy px-[40px]">
        <ContentRenderer :value="data?.filter((e) => e.id === policy)[0]" />
      </div>
    </div>
  </base-card-page-layout>
</template>

<style scoped></style>
