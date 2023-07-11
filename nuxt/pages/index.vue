<!-- TODO: fetch all images from js so that video is fetched first to speed up loading time -->

<script setup lang="ts">
const firstTime = inject("first_time_at_home"); //issue exists for this one
const showUI = ref(!firstTime.value); //when visiting home page for second time we can show UI immediately
const showVideo = ref(true);
const { t } = await loadTranslations("home");

onMounted(() => {
  const video = document.getElementById("video");
  video
    .play()
    .then(() => {
      console.log("video playing");
      video.addEventListener("ended", () => {
        console.log("video ended");
        showVideo.value = false;
      });
      fade(1500);
    })
    .catch((e) => {
      console.error("video play error: ", e);
      showVideo.value = false;
      fade(0);
      // video will not be allowed to play on IOS safari when battery save mode is turned on.
      // show image instead (DONE)
    });

  balanceText();
  //
  if (showUI.value) fadeInUI();
});
function fade(delay) {
  setTimeout(() => {
    fadeOutEffect();
    fadeInUI();
    showUI.value = true;
    firstTime.value = false;
  }, delay);
}

function fadeOutEffect() {
  const fadeTarget = document.getElementsByClassName("background")[0];
  if (fadeTarget == null) console.error("fadeTarget is null");
  else {
    fadeTarget.style.opacity = "0";
  }
}
function fadeInUI() {
  const fadeInTarget = document.getElementsByClassName("fadeIn");
  if (fadeInTarget == null) console.error("fadeInTarget is null");
  else
    for (let i = 0; i < fadeInTarget.length; i++) {
      fadeInTarget[i].style.opacity = "1";
    }
}
</script>

<template>
  <div class="bg-[rgb(6,7,10)]">
    <!-- video container with overlay  -->

    <div class="flex justify-center">
      <video
        id="video"
        fetchpriority="high"
        src="~/assets/bridgestars/video/shortIntro-compressed.mp4"
        :class="`${!showVideo ? '!hidden' : ''} video-size`"
        muted
        playsInline
      ></video>
      <img
        src="~/assets/bridgestars/images/shortIntroLastFrame.jpg"
        :class="`${showVideo ? 'hidden' : ''} video-size`"
      />
    </div>

    <div class="flex justify-center">
      <div class="bg-video-gradient" />
      <div class="bg-video-overlay fadeIn">
        <NuxtLink to="/auth/sign-up">
          <button
            class="bg-[#EE6065] rounded-full px-5 py-5 text-[#FFFFFFEE] font-family font-bold tracking-wider text-[23.5px] leading-[23.5px]"
          >
            {{ "Begin now" }}
          </button>
        </NuxtLink>
      </div>
    </div>

    <div class="absolute top-0 w-full fadeIn">
      <base-navbar transparent="true" />
    </div>
  </div>
  <div class="background" />

  <div class="fadeIn">
    <base-card-page-layout
      hideNavbar="true"
      class="pt-5 translate-y-[-70px]"
      imgSrc="../assets/bridgestars/art/home_page.svg"
    >
      <div class="px-5 text-center flex flex-col items-center">
        <h1
          class="mb-6 balance-text xs:text-[27px] xs:leading-[29px] sm:text-[40px] sm:leading-[44px] max-w-[700px]"
        >
          {{ "Revolutionizing the Bridge Learning Experience" }}
        </h1>

        <span class="text2 px-3 text-[18px] leading-[18px] max-w-[700px]">
          {{
            "With Bridgestars we aim to stimulate a shift away from obsolete IT-solutions in favor of more integrated and modern solutions. "
          }}
        </span>
      </div>

      <!-- quote -->
      <div class="flex flex-wrap p-1 quote-bg w-full mt-[75px]">
        <div class="sm:py-3 px-3 sm:w-[40%] flex justify-center items-center">
          <img
            class="bg-dark xs:w-[75%] object-scale-down rounded-2xl xs:translate-y-[-50px] sm:translate-y-0"
            src="~/assets/bridgestars/images/castor.jpg"
          />
        </div>

        <div
          class="opacity-[90%] xs:w-full sm:w-1/2 flex flex-col justify-center self-center pl-3 pr-7"
        >
          <div class="flex">
            <div class="flex flex-col items-center px-1 pt-[6px] space-y-[5px]">
              <div class="bg-white h-[40%] w-[3px]" />
              <span
                class="i-material-symbols-format-quote-rounded"
                style="color: white; height: 20px; width: 20px"
              />
              <div class="bg-white h-[40%] w-[3px]" />
            </div>
            <span
              class="text1 italic text-white text-[18px] leading-[25px] text-justify"
            >
              {{ $t("home:quote.desc1") }}
            </span>
          </div>
          <div class="w-full flex flex-col pl-[29px]">
            <div class="mt-5">
              <span class="text-white font-family2 font-bold text-[18px]"
                >Castor Mann,
              </span>
              <span class="text-white font-light font-family2 ml-2">
                Bridgestars CEO, Founder and Junior World Champion 2018.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[10px] mt-[100px]">
        <span class="text-blue font-family2 font-bold text-[18px]"
          >Contact Us</span
        >
      </div>
      <div class="h-[200px] mt-[10px]">
        <span class="text-gray font-family2 font-bold text-[10px]">
          {{ $t("home:quote.desc2") }}
        </span>
      </div>
      <!-- text or other quote -->
    </base-card-page-layout>
  </div>
</template>

<style scoped>
.quote-bg {
  background: linear-gradient(195deg, rgb(90, 90, 100), rgb(25, 25, 25));
}
.video-size {
  max-width: 2000px;

  height: 80vh;
  min-height: min(45vw, 700px);
  max-height: 1000px;
  /* object-fit: cover; */
  /* -o-object-fit: cover; */
  /* position:'relative'; */
  background-color: rgb(6, 7, 10);
  aspect-ratio: 16/9;

  @apply !mx-auto !my-0;
}

.bg-video-overlay {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  /* padding-bottom: min(75px, 6vh); */
  /* padding-top: min(35vw, min(40vw, 600px)); */
  top: 0px;

  height: 80vh;
  min-height: min(45vw, 700px);
  padding-bottom: 15vh;
  max-height: 1000px;

  aspect-ratio: 16/9;
  /* width: 100%; */
  /* max-height:1000px; */
  /* min-height: min(45vw, 750px); */
  /* background-color: rgba(200,0,200,0.03); */
  text-align: center;
}
.bg-video-gradient {
  position: absolute;
  top: 0px;
  height: 80vh;
  min-height: min(45vw, 700px);
  padding-bottom: 15vh;
  max-height: 1000px;
  aspect-ratio: 16/9;
  background: rgb(6, 7, 10);
  background: linear-gradient(
      90deg,
      rgba(6, 7, 10, 1) 0%,
      rgba(6, 7, 10, 0) 10%,
      rgba(6, 7, 10, 0) 90%,
      rgba(6, 7, 10, 1) 100%
    ),
    linear-gradient(0deg, rgba(6, 7, 10, 1) 0%, rgba(6, 7, 10, 0) 15%);
  /* background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(255,0,0,1) 100%),  */
  /*   linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(0,0,0,0) 15%); */
}
.fadeIn {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
.background {
  position: absolute;
  display: flex;
  transition: opacity 1s ease-in-out;
  z-index: -1;
  background-color: rgb(6, 7, 10);
  height: 100%;
  width: 100%;
  align-items: flex-end;
  padding-bottom: 75px;
  justify-content: center;
  top: 0;
}
</style>
