<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-page
    :items="CourseUtil.bridgeB"
    header="Bridge B"
  ></courses-bidding-page>
</template>
