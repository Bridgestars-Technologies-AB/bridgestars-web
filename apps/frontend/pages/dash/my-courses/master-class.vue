<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-problems-page
    :items="CourseUtil.masterClass"
    header="Master Class"
  ></courses-bidding-problems-page>
</template>
