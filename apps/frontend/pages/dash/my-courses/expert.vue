<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-problems-page
    :items="CourseUtil.expert"
    header="Expert"
  ></courses-bidding-problems-page>
</template>
