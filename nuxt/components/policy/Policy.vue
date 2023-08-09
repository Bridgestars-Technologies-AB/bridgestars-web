<script setup lang="ts">
const policy = ref("terms");
const { data } = await useAsyncData("policy", () =>
  queryContent("/policy").find()
);

onMounted(() => {
  moveLine({ target: document.getElementById("terms") });
});

function moveLine(event) {
  console.log("selecting " , event.target);
  if(!event.target.id) return
  policy.value = event.target.id;
  const button = event.target;
  var line = document.querySelector(".line");

  // Calculate the left position of the active button
  var activeButtonRect = button.getBoundingClientRect();
  var containerRect = button.parentNode.getBoundingClientRect();
  var offsetLeft = activeButtonRect.left - containerRect.left + 3;
  var offsetTop = activeButtonRect.top - containerRect.top;
  console.log(activeButtonRect)

  // Apply the transform to move the line
  line.style.transform = `translate(${offsetLeft}px,  ${offsetTop}px)`;
  line.style.width = `${activeButtonRect.width-6}px`;
}
</script>

<template>
  <base-card-page-layout>
    <div class="p-5 w-[90%] max-w-[1200px] flex flex-col items-center">
      <!-- Maybe make a navigateBar component -->
      <div
        class="navigateBar bg-dash-light-400 rounded-lg h-fit min-h-[50px] w-full flex flex-col sm:flex-row items-center text-center sm:space-y-0 md:space-y-0"
      >
        <div @click="moveLine" id="terms" class="h-[50px] flex items-center justify-center z-10 sm:w-[100%] md:w-[25%]">
          <span
            class="z-10 text1 text-dark font-family2 [pointer-events:none]"
            >Terms</span
          >
        </div>

        <div @click="moveLine" id="privacy" class="h-fit z-10 flex-auto sm:w-[100%] md:w-[25%]">
          <span
            class="z-10 text1 text-dark font-family2 [pointer-events:none]"
            >Privacy</span
          >
        </div>
        <div @click="moveLine" id="disclaimer" class="h-fit z-10 flex-auto sm:w-[100%] md:w-[25%]">
          <span
            class="z-10 text1 text-dark font-family2 [pointer-events:none]"
            >Disclaimer</span
          >
        </div>
        <div @click="moveLine" id="copyright" class="h-fit z-10 flex-auto sm:w-[100%] md:w-[25%]">
          <span
            class="z-10 text1 text-dark font-family2 [pointer-events:none]"
            >Copyright</span
          >
        </div>

        <div
          class="z-0 line bg-white h-[44px] w-[25%] transition-transform absolute rounded-xl duration-500"
        ></div>
      </div>
    <div
      class="bg-[#313135] flex flex-col items-center justify-center w-full h-[100px] sm:h-[150px] rounded-xl mt-[40px]"
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
    </div>
  </base-card-page-layout>
</template>

<style scoped></style>
