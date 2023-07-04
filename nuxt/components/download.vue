<script setup>
const nuxtApp = useNuxtApp()

const downloads = ref([]) 

function update(){
  downloads.value = [{
    platform: "mac",
    title: nuxtApp.$i18n.t("download.mac.title"),
    description: nuxtApp.$i18n.t("download.mac.description"),
    size: "60MB",
    link: "https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/launcher/mac/bridgestars-macos-1.1.8.zip"
  },
  {
    platform: "win",
    title: nuxtApp.$i18n.t("download.win.title"),
    description: nuxtApp.$i18n.t("download.win.description"),
    size: "60MB",
    link: "https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/launcher/win/bridgestars-win-1.1.8.zip"
  }]
}

update();

const platform = reactive({
  isMac: false,
  isWindows: false,
  isMobile: false
})
const showOptions = ref(false)

onMounted(()=>{
  platform.isMobile = /Android|iPhone/i.test(navigator.userAgent);
  platform.isMac = navigator.platform.includes('Mac');
  platform.isWindows = navigator.platform.includes('Win');
  if(platform.isWindows){
    downloads.value.reverse()
  }
})
</script>

<template>
  <CardPageLayout>
    <div class="max-w-[800px] flex flex-col text-justify sm:p-8 xs:p-3">
      <LangSwitcher class="mb-4" @switched="update"/>

      <h3 class="text-start">{{$t("download.title")}}</h3> 
      <i18n-t tag="span" keypath="download.desc1" class="text2 mt-2">
        <template #here>
          <NuxtLink to="/auth/reset" class="text-blue font-normal underline">{{$t("w.here")}}</NuxtLink> 
        </template>
      </i18n-t>

      <span class="text2 mt-4">
        <i18n-t tag="span" keypath="download.desc2" class="text mt-2">
          <template #discord>
            <a class="text-blue font-normal underline" 
              href="https://discord.gg/YhwRDgtSX2" target="_blank" rel="noreferrer">
              discord</a> 
          </template>
          <template #email>
            <a class="text-blue font-normal underline" 
              href="mailto: info@bridgestars.net" target="_blank" rel="noreferrer">
              email</a> 
          </template>
        </i18n-t>
      </span>

      <span class="text2 mt-4">
        {{$t("download.desc3")}}
      </span>
      <span class="text2 mt-4">
        {{$t("download.desc4")}}
      </span>

      <!-- cards -->
      <div v-if="platform.isMac || platform.isWindows || showOptions" 
        v-for="(d, i) in downloads" 
        :key="i"
      >
        <div 
          v-if="showOptions || (!showOptions && i == 0)"
          class="px-6 py-4 mt-10 rounded-3xl shadow-2xl bg-[#FFFFFF]  text-start flex items-center">

          <div class="flex flex-col pr-6">
            <h3>{{d.title}}</h3>
            <span class="text2 mt-2">{{d.description}}</span>
          </div>

          <div class="flex flex-col text-center">
            <a :href="d.link" class="bg-[#EE6065] rounded-full px-4 py-4 text-[#FFFFFFEE] font-family font-bold tracking-wider text-[20px] leading-[20px] whitespace-nowrap">
              {{$t("download.download")}}
            </a>
            <span class="text2 !text-[14px] mt-1 whitespace-nowrap">{{$t("download.size", {size:d.size})}}</span>
          </div>
        </div>
      </div>

      <div v-else-if="platform.isMobile" class="text-center py-8">
        <h3>{{$t("download.isMobile")}}</h3>
      </div>
      <div v-else  class="text-center py-8">
        <h3>{{$t("download.isOtherOS")}}</h3>
      </div>

      <button
        v-if="!showOptions"
        @click="showOptions=true"
        type="button" 
        class="mt-10 !text-[16px] text-blue font-bold normal-case tracking-[0.5px]"
      >
        {{$t("download.showOptions")}} 
      </button>

    </div>
  </CardPageLayout>
</template>

<style scoped>
  
</style>
