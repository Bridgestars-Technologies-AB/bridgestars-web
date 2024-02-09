<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-problems-page
    :items="CourseUtil.bridgeA"
    header="Bridge A"
  ></courses-bidding-problems-page>
</template>
