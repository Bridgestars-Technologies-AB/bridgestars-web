<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-chapter-page
    :items="CourseUtil.advanced"
    header="Advanced"
  ></courses-chapter-page>
</template>
