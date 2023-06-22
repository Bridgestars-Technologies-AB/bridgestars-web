<script setup lang="ts">
  const firstTime = inject("first_time_at_home");
  const showUI = ref(!firstTime.value); //when visiting home page for second time we can show UI immediately

  onMounted(() => {
    setTimeout(() => {
      showUI.value = true;
      firstTime.value = false;
    }, 1000);

    setTimeout(() => {
      fadeOutEffect();
    }, 1500);
  })

  function fadeOutEffect() {
    const fadeTarget = document.getElementsByClassName('background')[0];
    if(fadeTarget == null) console.error("fadeTarget is null")
    else fadeTarget.style.opacity = '0';
  }

</script>



<template>

  <div>
  <video src="~/assets/bridgestars/video/shortIntro-compressed.mp4" class="muted" muted autoPlay playsInline={{true}}></video>
    <div class="bg-video-overlay"></div>
  </div>
  <div class='background' />
  <CardPageLayout/>
</template>


<style scoped>
video{
  width:100%;
  height:80vh;
  max-height:1000px;
  object-fit:cover;
  display: block;
  margin:0 auto;
  /* position:'relative'; */
  max-width: 2000px;
  min-height: min(45vw, 700px);
  background-color: black;
}
.bg-video-overlay{
  position: absolute;
  display:flex;
  align-items: flex-end;
  padding-bottom: min(75px, 6vh);
  padding-top: min(35vw, min(40vw, 600px));
  /* justify-content: flex-end; */
  top:0;
  width: 100%;
  height: 80vh;
  max-height:1000px;
  min-height: min(45vw, 750px);
  background-color: rgba(200,0,200,0.03);
  text-align: center;
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
