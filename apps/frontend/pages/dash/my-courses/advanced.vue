<script setup>
const items = [
  {
    header: "2 Klöver",
    course: "bidding",
  },
  {
    header: "Fjärde färg",
    course: "bidding",
  },
  {
    header: "Hand typ, Hand typ, Hand typ",
    course: "bidding",
  },
];
</script>

<template>
  <courses-bidding-page :items="items" header="Advanced"></courses-bidding-page>
</template>
