<script setup lang="ts">
 const props = defineProps(["level", "xp"]) 
 const bar = ref(null)
 onMounted(() => {
   bar.value.style.width = "0%"
   setTimeout(() => {
     bar.value.style.width = `${(props.xp ?? 0) * 100}%` 
   }, 100);
 })
</script>

<template>
  <div class="flex px-4 space-x-3 items-center">
    <span class="text-white text-[14px] font-bold">Lv.{{level ?? 0}}</span>
      <div class="grow bg-dash-dark-300 w-full h-[10px] rounded-full">
        <div ref="bar" class="bg-dash-accent h-full rounded-full transition-[width] w-0">
        </div>
      </div>
    <span class="text-white text-[14px] font-bold">Lv.{{(level ?? 0)+1}}</span>
  </div>
</template>
