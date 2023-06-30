<script setup lang="ts">
  import MaterialSymbolsFormatQuoteRounded from '~icons/material-symbols/format-quote-rounded'
  const firstTime = inject("first_time_at_home");
  const showUI = ref(!firstTime.value); //when visiting home page for second time we can show UI immediately

  onMounted(() => {
    balanceText();
    if(showUI) fadeInUI();
    setTimeout(() => {
      showUI.value = true;
      firstTime.value = false;
    }, 1000);

    setTimeout(() => {
      fadeOutEffect();
      fadeInUI();
    }, 1500);
  })

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
  <video src="~/assets/bridgestars/video/shortIntro-compressed.mp4" class="muted w-sreen" muted autoPlay playsInline=true></video>
    <div class="bg-video-overlay fadeIn">
        <button class="bg-[#EE6065] rounded-full px-5 py-5 text-[#FFFFFFEE] font-family font-bold tracking-wider text-[23.5px] leading-[23.5px]">JOIN THE WAITING LIST</button>
    </div>
    <div class="absolute top-0 w-full fadeIn">
      <navbar transparent=true />
    </div>
</div>

  <div class='background' />

  <div class="fadeIn">
  <CardPageLayout hideNavbar=true class="pt-5 translate-y-[-70px]" imgSrc="../assets/bridgestars/art/home_page.svg">
      <div class="px-5">

    <h1 class="balance-text xs:text-[27px] xs:leading-[29px] sm:text-[40px] sm:leading-[44px]"> {{"Revolutionizing the Bridge Learning Experience"}}  </h1>
      
      <span class="text2 pt-3 px-3 !text-[18px]"> {{"With Bridgestars we aim to stimulate a shift away from obsolete IT-solutions in favor of more integrated modern solutions. "}} </span>
      </div>


      <!-- quote -->
      <div class="flex flex-wrap quote-bg h-80 w-full mt-[75px]">

        <img class="absolute w-[35%] min-w-[200px] translate-y-[-50px] translate-x-[25px] rounded-2xl" src="~/assets/bridgestars/images/castor.png"/>

        <div class="flex p-5 min-w-[200px]">
          <MaterialSymbolsFormatQuoteRounded style="color:white;"/>
        </div>

      </div>

  </CardPageLayout>
  </div>

<!-- footer -->
</template>


<style scoped>
.quote-bg{
background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
}
video{

  width:100%;
  max-width: 2000px;

  height:80vh;
  min-height: min(45vw, 700px);
  max-height:1000px;

  object-fit:cover;
  display: block;
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
  height:2500px;
  max-height:2500px;
  width:100%;
  align-items: flex-end;
  padding-bottom: 75px;
  justify-content: center;
  top:0;
}
</style>
