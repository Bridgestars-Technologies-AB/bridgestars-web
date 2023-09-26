<script setup>
const props = defineProps(["modelValue", "options"]);
const emits = defineEmits(["update:modelValue"]);

function resize() {
  moveLine({ target: document.getElementById(props.modelValue) });
}

onMounted(() => {
  moveLine({ target: document.getElementById(props.modelValue) });
  window.addEventListener("resize", resize);
});
onUnmounted(() => {
  window.removeEventListener("resize", resize);
});

function moveLine(event) {
  if (!event.target.id) return;

  const name = event.target.id;
  emits("update:modelValue", name);

  const button = event.target;
  var line = document.querySelector(".line");

  // Calculate the left position of the active button
  var activeButtonRect = button.getBoundingClientRect();
  var containerRect = button.parentNode.getBoundingClientRect();
  var offsetLeft = activeButtonRect.left - containerRect.left;
  var offsetTop = activeButtonRect.top - containerRect.top;

  // Apply the transform to move the line
  if (containerRect.height == 50) {
    line.style.transform = `translate(${offsetLeft + 3}px,  ${0}px)`;
    line.style.width = `${activeButtonRect.width - 6}px`;
  } else {
    line.style.transform = `translate(${3}px,  ${offsetTop + 3}px)`;
    line.style.width = `${containerRect.width - 6}px`;
  }
}
</script>

<template>
  <div
    class="relative bg-dash-light-400 rounded-lg h-fit min-h-[50px] w-full flex xs:flex-col sm:flex-row items-center text-center"
  >
    <div
      v-for="o in options"
      :id="o.toLowerCase()"
      class="h-[50px] flex items-center justify-center z-10 flex-auto"
      @click="moveLine"
    >
      <span
        class="z-10 text1 text-dark font-family2 [pointer-events:none] xs:mx-4 sm:mx-0 w-full"
        >{{ o }}</span
      >
    </div>
    <div
      class="z-0 line bg-white h-[44px] w-[25%] transition-[transform,width] absolute rounded-xl duration-500 left-0"
    ></div>
  </div>
</template>
