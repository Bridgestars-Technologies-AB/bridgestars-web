<script setup>
const props = defineProps({
  icon: String,
  keypath: String,
  selected: Boolean,
  enabled: Boolean,
});

const bgColor = computed(() =>
  props.selected
    ? "bg-dash-accent-light"
    : "bg-dark dark:bg-light group-hover:bg-dash-accent",
);
const textColor = computed(() =>
  props.selected
    ? "text-dash-accent-light"
    : "text-dark dark:text-light group-hover:text-dash-accent",
);
</script>

<template>
  <div class="flex items-center px-2 py-2 group hover:cursor-pointer">
    <div class="flex items-center">
      <span
        id="icon"
        :class="`text-[24px] mr-[10px] group-hover:animate-shake ${icon} ${bgColor}`"
      >
      </span>
    </div>

    <span
      :class="`font-family text-[14px] font-light tracking-wide ${
        enabled ? '' : 'line-through'
      } ${textColor}`"
    >
      {{ $t(props.keypath) }}
    </span>
  </div>
</template>

<style scoped></style>
