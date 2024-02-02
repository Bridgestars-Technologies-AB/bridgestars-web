<script setup>
const items = [
  {
    header: "Svarshanden 2:a bud",
    course: "bidding",
  },
  {
    header: "Trumfstöd, Stenberg oh Essfråga",
    course: "bidding",
  },
  {
    header: "Upplysningsdubbling",
    course: "bidding",
  },
];
</script>

<template>
  <courses-bidding-page :items="items" header="Bridge B"></courses-bidding-page>
</template>
