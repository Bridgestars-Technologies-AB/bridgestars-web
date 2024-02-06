<!-- This component renders a "page" for bidding practices for a given course -->

<script setup>
defineProps({
  header: String,
  items: Array,
});
</script>

<template>
  <div class="flex flex-col items-center space-y-5 w-full h-full">
    <span class="text-3xl text-dark dark:text-white font-semibold">{{
      header
    }}</span>

    <div class="w-full flex flex-row justify-center">
      <div
        :class="
          items.length > 1
            ? 'grid grid-cols-3 grid-flow-row gap-3'
            : 'flex flex-row space-x-3'
        "
      >
        <courses-chapter-template
          v-for="item in items"
          :key="item.header"
          :header="item.header"
          :url="item.url"
        ></courses-chapter-template>
      </div>
    </div>
  </div>
</template>
