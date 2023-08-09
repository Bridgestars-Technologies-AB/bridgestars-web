<script setup lang="ts">
const policy = ref("terms");
const { data } = await useAsyncData("policy", () =>
  queryContent("/policy").find()
);

onMounted(() => {
  moveLine({ target: document.getElementById("terms") });
});

function moveLine(event) {
  policy.value = event.target.id;
  const button = event.target;
  var line = document.querySelector(".line");

  // Calculate the left position of the active button
  var activeButtonRect = button.getBoundingClientRect();
  var containerRect = button.parentNode.getBoundingClientRect();
  var offsetLeft = activeButtonRect.left - containerRect.left;

  // Apply the transform to move the line
  line.style.transform = `translate(${offsetLeft}px,  ${0}px)`;
  line.style.width = `${activeButtonRect.width}px`;
}
</script>

<template>
  <base-card-page-layout>
    <div class="p-5 w-full">
      <!-- Maybe make a navigateBar component -->
      <div
        class="navigateBar bg-dash-light-100 rounded-lg h-[50px] w-full flex flex-col sm:flex-row items-center text-center"
      >
        <span
          @click="moveLine"
          id="terms"
          class="z-10 text1 font-family2 flex-auto"
          >Terms</span
        >
        <span
          @click="moveLine"
          class="z-10 text1 font-family2 flex-auto"
          id="privacy"
          >Privacy</span
        >
        <span
          @click="moveLine"
          class="z-10 text1 font-family2 flex-auto"
          id="disclaimer"
          >Disclaimer</span
        >
        <span
          @click="moveLine"
          class="z-10 text1 font-family2 flex-auto"
          id="copyright"
          >Copyright</span
        >
        <div
          class="z-0 line bg-white h-[44px] w-[25%] transition-transform absolute rounded-xl duration-500"
        ></div>
      </div>
    </div>
    <div
      class="bg-[#313135] flex flex-col items-center justify-center w-[90%] h-[100px] sm:h-[150px] rounded-xl mt-[40px]"
    >
      <span
        class="text-white text-[25px] sm:text-[40px] font-bold font-family2 leading-7 sm:leading-10"
        >{{ data?.filter((e) => e.id === policy)[0].title }}</span
      >
      <span
        class="text-white text-[16px] sm:text-[20px] font-family2 leading-4 sm:leading-10"
      >
        Last modified: {{ data?.filter((e) => e.id === policy)[0].date }}
      </span>
    </div>
    <div class="bg-white prose prose-lg sm:prose-xl prose-policy px-[40px]">
      <ContentRenderer :value="data?.filter((e) => e.id === policy)[0]" />
    </div>
  </base-card-page-layout>
</template>

<style scoped></style>
