<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-page
    :items="CourseUtil.bridgeA"
    header="Bridge A"
  ></courses-bidding-page>
</template>
