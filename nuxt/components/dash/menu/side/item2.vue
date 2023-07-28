<!-- new menu item, wanted to keep the old one if needed so this is temporarily named item2 -->
<script setup>
const open = inject('side-menu-open')
const props = defineProps(['icon', 'keypath', 'selected', 'enabled', 'color'])

const iconColor = "bg-dash-light-400 dark:bg-white";

const bgColor = computed(() => props.selected 
  ? "dark:bg-dash-dark-200 bg-dash-light-400" 
  : "dark:bg-dash-dark-100 bg-dash-light-300 dark:hover:bg-dash-dark-300 hover:bg-dash-light-400"
);

const textColor = computed(() => `text-dark dark:text-light text-transition ${!open.value ? 'opacity-0 text-[2px]' : (props.selected ? 'opacity-100' : 'opacity-80')}`);

</script>

<template>
  <base-tooltip :text="$t(props.keypath)" class="h-full" position="right">

    <div :class="`flex items-center group hover:cursor-pointer h-full ${bgColor} item-transition ${open || 'ml-[202px]'}`">

      <div :class="`${selected ? 'bg-[#04b694]' : ''} h-full w-[3px]`"/> 

      <div :class="`${'bg-[#04b694]'} p-[5px] my-2 ml-4 rounded-xl ar-1 flex items-center mr-4 group-hover:animate-shake`">
        <span id="icon" :class="`text-[25px]  ${icon} ${iconColor}`">
        </span>
      </div>

      <span :class="`font-family text-[15px] my-2 font-light tracking-wide ${enabled || 'line-through'} ${textColor} `">
          {{ $t(props.keypath) }}
      </span>

    </div>
  </base-tooltip>
</template>

<style scoped>
.item-transition{
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s ease-in-out;
}

.text-transition{
  transition: opacity 0.2s ease-in-out, font-size 0.3s ease-in-out, color .3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
