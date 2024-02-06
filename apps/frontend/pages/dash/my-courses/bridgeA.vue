<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-chapter-page
    :items="CourseUtil.bridgeA"
    header="Bridge A"
  ></courses-chapter-page>
</template>
