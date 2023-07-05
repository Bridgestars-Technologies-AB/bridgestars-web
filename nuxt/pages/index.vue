
 <!-- TODO: fetch all images from js so that video is fetched first to speed up loading time -->


<script setup lang="ts">
  const firstTime = inject("first_time_at_home");
  const showUI = ref(!firstTime.value); //when visiting home page for second time we can show UI immediately
  const showVideo = ref(true);

  onMounted(() => {
    const video = document.getElementById('video');
    video.play().then(() => {
      console.log("video playing")
      video.addEventListener('ended', () => {
        console.log("video ended")
        showVideo.value = false;
      });
      fade(1500)
    }).catch((e) => {
      console.error("video play error: ", e)
      showVideo.value = false;
      fade(0)
      // video will not be allowed to play on IOS safari when battery save mode is turned on.
      // show image instead (DONE)
    });

    balanceText();
    //
    if(showUI.value) fadeInUI();

  })
  function fade(delay){
    setTimeout(() => {
      fadeOutEffect();
      fadeInUI();
      showUI.value = true;
      firstTime.value = false;
    }, delay);
  }

  function fadeOutEffect() {
    const fadeTarget = document.getElementsByClassName('background')[0];
    if(fadeTarget == null) console.error("fadeTarget is null")
    else {
      fadeTarget.style.opacity = '0';
    }
  }
  function fadeInUI(){
    const fadeInTarget = document.getElementsByClassName('fadeIn');
    if(fadeInTarget == null) console.error("fadeInTarget is null")
    else for (let i = 0; i < fadeInTarget.length; i++) {
      fadeInTarget[i].style.opacity = '1';
    }
  }

</script>



<template>

<div><!-- video container with overlay  -->
    
  <video id="video" fetchpriority="high" src="~/assets/bridgestars/video/shortIntro-compressed.mp4" :class="`w-screen ${!showVideo ? '!hidden':''}`" muted playsInline></video>
    <img id="video" src="~/assets/bridgestars/images/shortIntroLastFrame.jpg" :class="`w-screen ${showVideo ? 'hidden':'block'}`"/>

    <div class="bg-video-overlay fadeIn">
      <button class="bg-[#EE6065] rounded-full px-5 py-5 text-[#FFFFFFEE] font-family font-bold tracking-wider text-[23.5px] leading-[23.5px]">
        {{"click here to play"}}
      </button>
    </div>
    <div class="absolute top-0 w-full fadeIn">
      <navbar transparent=true />
    </div>
</div>
<div class='background' />

  <div class="fadeIn">
  <CardPageLayout hideNavbar=true class="pt-5 translate-y-[-70px]" imgSrc="../assets/bridgestars/art/home_page.svg">
    <div class="px-5">

      <h1 class="mb-4
        balance-text xs:text-[27px] xs:leading-[29px]
        sm:text-[40px] sm:leading-[44px]"> 
        {{"Revolutionizing the Bridge Learning Experience"}}  </h1>
      
      <span class="text2 px-3 !text-[18px] !leading-[18px]"> 
        {{"With Bridgestars we aim to stimulate a shift away from obsolete IT-solutions in favor of more integrated and modern solutions. "}} </span>
    </div>


    <!-- quote -->
    <div class="flex flex-wrap p-1 quote-bg w-full mt-[75px]">

      <div class="sm:py-3 px-3 sm:w-[40%] flex justify-center items-center">
        <img class="bg-dark xs:w-[75%] object-scale-down rounded-2xl xs:translate-y-[-50px] sm:translate-y-0" src="~/assets/bridgestars/images/castor.jpg"/>
      </div>

      <div class="xs:w-full sm:w-1/2 flex justify-center items-center">
        <div class="opacity-80 w-full">
          <span class="i-material-symbols-quoute-rounded translate-y-1" style="color:white;height:40px;width:40px;"/>
          <span class="text-white text-[18px] leading-[18px] px-3"> 
            {{"In a world of rapid technological advancements, the Bridge world has not been able to keep up. There is a lack of a clean and modern solution for playing Bridge online that is fun, easy, and engaging. Our vision for the future contains a unified platform for Bridge players on which they are able to play and watch Bridge as well as catch up with the latest news about Bridge. Bridgestars is an attempt of bringing that vision to life, in a way that is free and accessible for everyone. "}} 
          </span>
          <!--   <div class="flex justify-end"> -->
          <!-- <MaterialSymbolsFormatQuoteRounded style="color:white;height:40px;width:40px;"/> -->
          <!--   </div> -->
          <div class="mt-3">
            <span class="text-white !font-family2 !font-bold">Castor Mann </span>
            <span class="text-white !font-family2">
  - Bridgestars CEO, Founder and Junior World Champion 2018
            </span>
          </div>

        </div>
      </div>
    </div>

  <!-- text or other quote -->


  </CardPageLayout>
    </div>

<!-- footer -->
</template>


<style scoped>
.quote-bg{
  background: linear-gradient(195deg, rgb(90, 90, 100), rgb(25, 25, 25));
}
#video{

  width:100%;
  max-width: 2000px;

  height:80vh;
  min-height: min(45vw, 700px);
  max-height:1000px;
  object-fit:cover;
  margin:0 auto;
  /* position:'relative'; */
  background-color: black;
}
.bg-video-overlay{
  position: absolute;
  display:flex;
  align-items: flex-end;
  justify-content: center;
  /* padding-bottom: min(75px, 6vh); */
  /* padding-top: min(35vw, min(40vw, 600px)); */
  top:0px;

  height:80vh;
  min-height: min(45vw, 700px);
  padding-bottom: 15vh;
  max-height:1000px;

  width: 100%;
  /* max-height:1000px; */
  /* min-height: min(45vw, 750px); */
  background-color: rgba(200,0,200,0.03);
  text-align: center;
}
.fadeIn{
  opacity:0;
  transition: opacity 1s ease-in-out;
}
.background{
  position:absolute;
  display: flex;
  transition: opacity 1s ease-in-out;
  background-color: 'rgb(5,0,5)';
  z-index: -1;
  background-color: black;
  height:100%;
  width:100%;
  align-items: flex-end;
  padding-bottom: 75px;
  justify-content: center;
  top:0;
}
</style>
