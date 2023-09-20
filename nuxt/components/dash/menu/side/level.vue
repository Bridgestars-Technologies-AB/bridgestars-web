<script setup lang="ts">
 const props = defineProps(["user"]) 
 const bar = ref(null)


 // random calculation, increasing xp needed to level up
 // level steps are: 0, 100, 400, 900, 1600, 2500, 3600, 4900, 6400
 // maybe that curve is a little steep
 const xp = props.user.data.get("xp") || 550; // temp, should be 0 here 
 const level = computed(() => (xp/100) ** 0.5);
 const levelFloored = computed(() => Math.floor(level.value));
 const levelProgressPercent = computed(() => (level.value - levelFloored.value) * 100);

 onMounted(() => {
   bar.value.style.width = "0%"
   setTimeout(() => {
     bar.value.style.width = `${levelProgressPercent.value}%` 
   }, 100);
 })
</script>

<template>
  <div class="flex grow space-x-3 items-center">
    <span class="text-white text-[14px] font-bold">Lv.{{levelFloored}}</span>
    <div class="grow bg-dash-dark-300 h-[10px] rounded-full">
      <div ref="bar" class="bg-dash-accent h-full rounded-full transition-[width] w-0">
      </div>
    </div>
    <span class="text-white text-[14px] font-bold">Lv.{{levelFloored+1}}</span>
  </div>
</template>
