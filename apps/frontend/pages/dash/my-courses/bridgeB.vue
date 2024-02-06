<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-chapter-page
    :items="CourseUtil.bridgeB"
    header="Bridge B"
  ></courses-chapter-page>
</template>
