<script setup>
const open = inject("side-menu-open");
const props = defineProps({
  icon: String,
  keypath: String,
  selected: Boolean,
  enabled: Boolean,
});

const iconColor = "bg-dash-light-400 dark:bg-white";

const bgColor = computed(() =>
  props.selected
    ? "dark:bg-dash-dark-200 bg-dash-light-400"
    : "dark:bg-dash-dark-100 bg-dash-light-300 dark:hover:bg-dash-dark-300 hover:bg-dash-light-400",
);

const textColor = computed(
  () =>
    `text-dark dark:text-light text-transition ${
      !open.value
        ? "opacity-0 hidden"
        : props.selected
        ? "opacity-100 ml-[0px]"
        : "opacity-80 ml-[0px]"
    }`,
);
</script>

<template>
  <base-tooltip :text="$t(props.keypath)" position="right" :disabled="open">
    <div class="relative h-[50px]">
      <div
        :class="`flex items-center relative group hover:cursor-pointer h-full ${bgColor} item-transition ${
          open || 'ml-[205px]'
        }`"
      >
        <div
          :class="`${selected ? 'bg-dash-accent' : ''} h-full  w-[3px] ${
            open || 'absolute ml-[-1px]'
          }`"
        />

        <div
          :class="`${'bg-dash-accent'} p-[5px] my-2 ml-4 rounded-xl ar-1 flex items-center mr-4 group-hover:animate-shake`"
        >
          <span id="icon" :class="`text-[25px]  ${icon} ${iconColor}`"> </span>
        </div>

        <span
          :class="`font-family text-[15px] my-2 pr-4 font-light tracking-wide ${
            enabled || 'line-through'
          } ${textColor} `"
        >
          {{ $t(props.keypath) }}
        </span>
      </div>
    </div>
  </base-tooltip>
</template>

<style scoped>
.item-transition {
  transition:
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    margin-left 0.3s ease-in-out;
}

.text-transition {
  transition:
    opacity 0.2s ease-in-out,
    font-size 0.3s ease-in-out,
    margin-left 0.3s ease-in-out,
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
