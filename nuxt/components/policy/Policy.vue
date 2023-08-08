<!-- Header: Logo, Home, About Us, Sign In -->

<!-- Navbar: Terms, Privacy, Disclaimer, Copyright-->

<!-- White container: -->
<!-- Black container -->
<!-- Introduction as prop -->

<!-- to top -->
<script setup lang="ts">
const policy = ref(3);
const { data } = await useAsyncData("policy", () =>
  queryContent("/policy").find()
);

onMounted(() => {
  console.log(data);
  moveLine({ target: document.getElementById("terms") });
});

function moveLine(event) {
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
        class="navigateBar bg-dash-light-100 rounded-lg h-[50px] w-full flex flex-row items-center text-center"
      >
        <span
          @click="
            (event) => {
              moveLine(event);
              policy = 3;
            }
          "
          id="terms"
          value="3"
          class="z-10 text1 font-family2 flex-auto"
          >Terms</span
        >
        <span
          @click="
            (event) => {
              moveLine(event);
              policy = 2;
            }
          "
          class="z-10 text1 font-family2 flex-auto"
          >Privacy</span
        >
        <span
          @click="
            (event) => {
              moveLine(event);
              policy = 1;
            }
          "
          class="z-10 text1 font-family2 flex-auto"
          >Disclaimer</span
        >
        <span
          @click="
            (event) => {
              moveLine(event);
              policy = 0;
            }
          "
          class="z-10 text1 font-family2 flex-auto"
          >Copyright</span
        >
        <div
          class="z-0 line bg-white h-[44px] w-[25%] transition-transform absolute rounded-xl duration-500"
        ></div>
      </div>
    </div>
    <div
      class="bg-[#313135] flex flex-col items-center w-[90%] h-[150px] rounded-xl mt-[40px]"
    >
      <span class="text-white text-[45px] font-bold font-family2 mt-[20px]">{{
        data[policy]?.title
      }}</span>
      <span class="text-white text-[20px] font-family2">
        Last modified: {{ data[policy]?.date }}
      </span>
    </div>
    <div class="bg-white prose prose-xl prose-policy">
      <!-- <span>{{ data?.title }}</span> -->
      <ContentRenderer :value="data[policy]" />
    </div>
  </base-card-page-layout>
</template>

<style scoped></style>
