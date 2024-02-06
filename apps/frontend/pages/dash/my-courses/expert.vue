<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-chapter-page
    :items="CourseUtil.expert"
    header="Expert"
  ></courses-chapter-page>
</template>
