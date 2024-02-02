<script setup>
const items = [
  {
    header: "2 över 1",
    course: "bidding",
  },
  {
    header: "SKROT",
    course: "bidding",
  },
  {
    header: "Spärrbud på 2-läget",
    course: "bidding",
  },
];
</script>

<template>
  <courses-bidding-page :items="items" header="Expert"></courses-bidding-page>
</template>
