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
      fadeInUI(1000);
      fadeInBackground(1500);
    })
    .catch((e) => {
      console.error("video play error: ", e);
      showVideo.value = false;
      fadeInUI(0);
      fadeInBackground(500);
      // video will not be allowed to play on IOS safari when battery save mode is turned on.
      // show image instead (DONE)
    });

  balanceText();
  //
  if (showUI.value) {
    fadeInUI(0);
    fadeInBackground(500);
  }
});

function fadeInBackground(delay) {
  setTimeout(() => {
    const fadeTarget = document.getElementsByClassName("background")[0];
    if (fadeTarget == null) console.error("fadeTarget is null");
    else {
      fadeTarget.style["background-color"] = "rgb(240, 242, 245)";
      fadeTarget.style["opacity"] = 1;
    }
  }, delay);
}

function fadeInUI(delay) {
  setTimeout(() => {
    const cardDiv = document.getElementsByClassName("cardDiv")[0];
    const card = document.getElementsByClassName("cardShow")[0];

    cardDiv.classList.add("cardAnimation")
    cardDiv.style.display = "block"
    card.style.opacity = 1;
    showUI.value = true;
    firstTime.value = false;
  }, delay);
}

</script>

<template>
  <div class="bg-[rgb(6,7,10)] fixed h-full w-full z-[-20]"/>

  <div class="">
    <!-- video container with overlay  -->

<!-- video and border easing layout, don't touch, soo fucking annoying to set up -->
    <div class="flex justify-center relative">
      <div class="bg-[rgb(6,7,10)] w-full h-full absolute z-[-10]"/>
      <div class="overflow-hidden flex justify-center relative">
<!-- navbar can be here instead of outside video divs if we want it to be not so wide on very wide screens -->
        <div v-if="showUI" class="absolute z-[10] top-0 w-full navbarAnimation"> 
          <base-navbar transparent="true" />
        </div>

        <div class="bg-video-gradient" />
        <video
          id="video"
          fetchpriority="high"
          src="~/assets/bridgestars/video/shortIntro-compressed.mp4"
          :class="`${!showVideo ? '!hidden' : ''} video-size`"
          muted
          playsInline
        />
        <img
          src="~/assets/bridgestars/images/shortIntroLastFrame.jpg"
          :class="`${showVideo ? 'hidden' : ''} video-size`"
        />

      </div>
    </div>

<!-- Button overlay on video -->
    <div v-if="showUI" class="flex justify-center overflow-hidden">
      <div class="bg-video-overlay">
        <NuxtLink to="/auth/sign-up">
          <button
            class="bg-[#EE6065] rounded-full px-5 hxs:py-4 hsm:py-5 text-[#FFFFFFEE] font-family font-bold tracking-wider text-[23.5px] leading-[23.5px] videoButtonAnimation hxs:-mb-1 hsm:mb-2"
          >
            {{ "Begin now" }}
          </button>
        </NuxtLink>
      </div>

    </div>

<!-- navbar was here before -->

  </div>


  <div class="cardDiv hidden">
    <base-card-page-layout
      hideNavbar="true"
      class="pt-5 hsm:-translate-y-[100px] hxs:-translate-y-[70px] opacity-0 cardShow"
      backdropClass="background"
      imgSrc="../assets/bridgestars/art/home_page.svg"
    >
      <div class="xs:px-0 sm:px-5 text-center flex flex-col items-center">
        <h1
          class="mb-6 balance-text xs:text-[23px] xs:leading-[29px] sm:text-[40px] sm:leading-[44px] max-w-[700px]"
        >
          {{ "Revolutionizing the Bridge Learning Experience" }}
        </h1>

        <span class="text2 px-3 text-[20px] leading-[24px] max-w-[700px]">
          {{
            "With Bridgestars we aim to stimulate a shift away from obsolete IT-solutions in favor of more integrated and modern solutions. "
          }}
        </span>
      </div>

      <!-- quote -->
      <div class="flex flex-wrap p-1 quote-bg w-full mt-[75px]">
        <div class="sm:py-3 px-3 sm:w-[30%] flex justify-center items-center">
          <img
            class="bg-dark xs:w-[55%] sm:w-[100%] object-scale-down rounded-[25px] xs:translate-y-[-50px] sm:translate-y-0"
            src="~/assets/bridgestars/images/castor-square.jpg"
          />
        </div>

        <div
          class="opacity-[90%] xs:w-full sm:w-[70%] flex flex-col justify-center self-center pl-3 pr-7 lg:pr-[100px] lg:pl-[50px] sm:py-4 xs:-translate-y-5 sm:translate-y-0"
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

      <div
        class="xs:px-0 sm:px-5 text-center flex flex-col items-center py-[10px] mt-[20px] overflow-hidden"
      >
        <span
          class="rounded-full text-[12px] uppercase py-[4px] px-[10px] text-[#d23759] bg-[#f8b3ca] font-bold mb-[2px]"
        >
          Contact Us</span
        >
        <h1
          class="mb-[6px] balance-text xs:text-[20px] xs:leading-[30px] sm:text-[30px] sm:leading-[40px] max-w-[700px] bg-green"
        >
<!-- eng translation shoul be uppercase on partnership while swedish would not -->
<!-- https://www.webucator.com/article/how-to-capitalize-headings-and-titles/ -->
          {{"Interested in a Partnership?"}}
        </h1>
        <span
          class="text2 px-3 text-[18px] leading-[22px] max-w-[700px] mb-[20px]"
        >
          <i18next :translation="$t('home:quote.desc2')">
            <template #email>
              <a
                class="text-blue font-normal underline"
                href="mailto: info@bridgestars.net"
                target="_blank"
                rel="noreferrer"
              >
                info@bridgestars.net</a
              >
            </template>
          </i18next>
        </span>
      </div>
      <!-- text or other quote -->
    </base-card-page-layout>
  </div>
</template>

<style scoped>
.quote-bg {
  background: linear-gradient(195deg, rgb(80, 80, 90), rgb(15, 15, 15));
}
.video-size {
  max-width: 2000px;
  position:relative;
  height: 80vh;
  min-height: min(45vw, 700px);
  max-height: 1000px;
  z-index: -1;

  /* object-fit: cover; */
  /* -o-object-fit: cover; */
  /* position:'relative'; */

  background-color: rgb(6, 7, 10);
  aspect-ratio: 16/9;
  /**/
  @apply !mx-auto !my-0;
}


.bg-video-overlay {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  top: 0px;

  height: 80vh;
  min-height: min(45vw, 700px);
  padding-bottom: 15vh;
  max-height: 1000px;
  /* aspect-ratio: 16/9; */
  text-align: center;
}
.bg-video-gradient {
  position: absolute;
  z-index: 0;
  /* width: 100%; */
  left: 0;
  right: 0;
  /* height: 100%; */
  background-color: rgba(0,0,0,0);

  height: 80vh;
  min-height: min(45vw, 700px);
  max-height: 1000px;
  /* max-width: 2000px; */
  /* position:relative; */
  /* height: 80vh; */
  /* min-height: min(45vw, 700px); */
  /* max-height: 1000px; */
  /* /* width:100%;  */ 
  /* aspect-ratio: 16/9; */
  /* top:0; */
  /* background: rgb(6, 7, 10); */
  background: linear-gradient(
      90deg,
      rgba(6, 7, 10, 1) 0%,
      rgba(6, 7, 10, 0) 10%,
      rgba(6, 7, 10, 0) 90%,
      rgba(6, 7, 10, 1) 100%
    ),
    linear-gradient(0deg, rgba(6, 7, 10, 1) 0%, rgba(6, 7, 10, 0) 15%);

  /* RED for visibility */
  /* background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(255,0,0,1) 100%),  */
  /*   linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(0,0,0,0) 15%); */
}

.fadeIn {
  opacity: 0;
  /* display:hidden; */
  transition: opacity 1s ease-in-out;
}

.navbarAnimation{
  animation: zoom-frames 750ms ease-out 0ms;
}
.videoButtonAnimation {
  animation: button-frames 750ms ease-out 0ms;
}
.cardAnimation{
  animation: card-frames 750ms ease-out 0ms;
}

@keyframes zoom-frames {
  0% {
    opacity: 0;
    transform: scaleY(0.8) scaleX(0.5) translateY(0px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
}

@keyframes button-frames {
  0% {
    opacity: 0;
    transform: scaleY(0.8) scaleX(0.01) translateY(100px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
}

@keyframes card-frames {
  0% {
    opacity: 0;
    transform:  translateY(500px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.background{
  background-color: rgb(6, 7, 10);
  opacity:0;
  transition: background-color 3s ease-in-out;
}
/* .background { */
/*   position: absolute; */
/*   display: flex; */
/*   transition: opacity 1s ease-in-out; */
/*   z-index: -2; */
/*   background-color: rgb(6, 7, 10); */
/*   height: 100%; */
/*   width: 100%; */
/*   align-items: flex-end; */
/*   padding-bottom: 75px; */
/*   justify-content: center; */
/*   top: 0; */
/* } */
</style>
