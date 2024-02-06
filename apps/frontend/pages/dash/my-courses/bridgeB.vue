<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-problems-page
    :items="CourseUtil.bridgeB"
    header="Bridge B"
  ></courses-bidding-problems-page>
</template>
