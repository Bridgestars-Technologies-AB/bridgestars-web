<script setup>
const nuxtApp = useNuxtApp()

const downloads = [
  {
    title: nuxtApp.$i18n.t("download.mac.title"),
    description: nuxtApp.$i18n.t("download.mac.description"),
    size: "60MB",
    link: "https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/launcher/mac/bridgestars-macos-1.1.8.zip"
  },
  {
    title: nuxtApp.$i18n.t("download.win.title"),
    description: nuxtApp.$i18n.t("download.win.description"),
    size: "60MB",
    link: "https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/launcher/win/bridgestars-win-1.1.8.zip"
  }
]


</script>

<template>
  <CardPageLayout>
    <div class="flex flex-col text-justify sm:p-8 xs:p-3">
      <LangSwitcher class="mb-4"/>
      <h3>{{$t("download.title")}}</h3> 
      <i18n-n tag="span" path="download.desc1">

      </i18n-n>
      <span class="text2 mt-4">
        {{$t("download.desc2")}}
      </span>
      <span class="text2 mt-4">
        {{$t("download.desc3")}}
      </span>
      <span class="text2 mt-4">
        {{$t("download.desc4")}}
      </span>

      <div v-for="d in downloads" class="px-6 py-4 mt-10 rounded-3xl shadow-2xl bg-[#FFFFFF]  text-start flex items-center">
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
  </CardPageLayout>
</template>

<style scoped>
  
</style>
