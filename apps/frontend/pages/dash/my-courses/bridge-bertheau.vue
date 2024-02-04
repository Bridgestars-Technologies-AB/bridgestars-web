<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <courses-bidding-page
    :items="CourseUtil.bridgeBertheau"
    header="BridgeBertheau-NT"
  ></courses-bidding-page>
</template>
