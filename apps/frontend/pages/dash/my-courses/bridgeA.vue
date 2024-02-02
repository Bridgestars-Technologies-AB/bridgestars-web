<script setup>
const items = [
  {
    header: "Öppningsbudet 1 NT",
    course: "bidding",
  },
  {
    header: "Öppningsbudet 1 i färg",
    course: "bidding",
  },
  {
    header: "Öppningsbudet 2 NT",
    course: "bidding",
  },
  {
    header: "SH:s 1:a bud och ÖH:s 2:a bud",
    course: "bidding",
  },
  {
    header: "2-över 1 och HANDTYP",
    course: "bidding",
  },
  {
    header: "Inkliv",
    course: "bidding",
  },
  {
    header: "Sammanfattning",
    course: "bidding",
  },
];
</script>

<template>
  <courses-bidding-page :items="items" header="Bridge A"></courses-bidding-page>
</template>
