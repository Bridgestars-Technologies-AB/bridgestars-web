<script setup>
const props = defineProps(['icon', 'keypath', 'selected', 'enabled', 'color'])

const iconColor = computed(() => "bg-dash-light-400 dark:bg-light");

const bgColor = computed(() => props.selected ? "dark:bg-dash-dark-200 bg-dash-light-400" : "dark:bg-dash-dark-100 bg-dash-light-300 dark:hover:bg-dash-dark-300 hover:bg-dash-light-400");

const textColor = computed(() => `text-dark dark:text-light ${props.selected ? 'opacity-100' : 'opacity-80'}`);
</script>

<template>
  <div :class="`flex items-center pl-5 py-2 group hover:cursor-pointer ${bgColor} color-transition`">

    <div class="bg-sky-500 p-[5px] rounded-xl ar-1 flex items-center mr-[10px] group-hover:animate-shake">
      <span id="icon" :class="`text-[22px]  ${icon} ${iconColor}`">
      </span>
    </div>

    <span :class="`font-family text-[15px] font-light tracking-wide ${enabled ? '' : 'line-through'} ${textColor}`">
        {{ $t(props.keypath) }}
    </span>

  </div>
</template>

<style scoped>
.color-transition{
  transition: background-color 0.2s ease-in-out;
}
</style>
