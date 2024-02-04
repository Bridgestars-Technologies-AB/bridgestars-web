<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-page
    :items="CourseUtil.expert"
    header="Expert"
  ></courses-bidding-page>
</template>
