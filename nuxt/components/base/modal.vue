<script setup>
// Basically a wrapper for
// https://flowbite.com/docs/components/modal/

import { Modal, initModals } from "flowbite";

// v-model:open
const props = defineProps({ open: Boolean });
const emit = defineEmits(["update:open"]);

const modalRef = ref(null);
let modal = null;

// watch for changes in v-model:open
watch(
  () => props.open,
  (open) => {
    if (!modal) return;
    if (open && modal.isHidden()) modal.show();
    else if (!open && modal.isVisible()) modal.hide();
  },
);

// create modal on mount
onMounted(() => {
  initModals();
  modal = new Modal(modalRef.value, {
    onHide: () => {
      emit("update:open", false);
    },
    onShow: () => {
      emit("update:open", true);
    },
  });
});
</script>

<template>
  <div
    ref="modalRef"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-[50] hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- x-button -->
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="modal.hide()"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>

        <!-- Content -->
        <slot />
      </div>
    </div>
  </div>
</template>
