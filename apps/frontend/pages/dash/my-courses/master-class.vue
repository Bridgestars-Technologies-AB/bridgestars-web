<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-chapter-page
    :items="CourseUtil.masterClass"
    header="Master Class"
  ></courses-chapter-page>
</template>
