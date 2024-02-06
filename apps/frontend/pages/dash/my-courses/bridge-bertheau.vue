<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-chapter-page
    :items="CourseUtil.bridgeBertheau"
    header="BridgeBertheau-NT"
  ></courses-chapter-page>
</template>
