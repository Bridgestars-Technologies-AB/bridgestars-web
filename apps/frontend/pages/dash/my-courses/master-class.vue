<script setup>
const items = [
  {
    header: "Olas kluringar",
    course: "bidding",
  },
];
</script>

<template>
  <courses-bidding-page
    :items="items"
    header="Master Class"
  ></courses-bidding-page>
</template>
