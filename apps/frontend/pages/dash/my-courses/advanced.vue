<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-problems-page
    :items="CourseUtil.advanced"
    header="Advanced"
  ></courses-bidding-problems-page>
</template>
