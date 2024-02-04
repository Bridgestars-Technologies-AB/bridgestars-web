<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-page
    :items="CourseUtil.advanced"
    header="Advanced"
  ></courses-bidding-page>
</template>
