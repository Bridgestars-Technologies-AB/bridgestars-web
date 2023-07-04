<script setup>
function capitalizeFirstLetter() {
  const str = this.valueOf();
  return str.charAt(0).toUpperCase() + str.slice(1);
}
String.prototype.firstUpper = capitalizeFirstLetter;
</script>

<template>
  <footer class="mt-[100px] space-y-5">
      <div class="flex space-x-5 justify-center">
      <NuxtLink class="" href="/">{{$t("w.home").firstUpper()}}</Nuxtlink>
      <NuxtLink class="" href="/profile">{{$t("w.profile").firstUpper()}}</Nuxtlink>
        <!-- <NuxtLink class="" href="/about">About</Nuxtlink> -->
      <NuxtLink class="" href="/policy">{{$t("w.policy").firstUpper()}}</Nuxtlink>
      </div>

      <div class="flex space-x-5 justify-center">
        <a class="" href="https://www.facebook.com/BridgestarsTechnologies" target="_blank" rel="noreferrer">
          <img class="h-[20px]" src="~/assets/logo/facebook-dark.svg"/>
        </a>
        <a class="" href="https://www.instagram.com/bridgestars/"  target="_blank" rel="noreferrer">
          <img class="h-[20px]" src="/assets/logo/instagram-dark.svg">
        </a>
        <a class="" href="https://discord.gg/YhwRDgtSX2" target="_blank" rel="noreferrer">
          <img class="h-[20px]" src="/assets/logo/discord-dark.svg">
        </a>
        <a class="" href="mailto: info@bridgestars.net" target="_blank" rel="noreferrer">
          <span class="i-material-symbols-mail-rounded h-[20px] w-[20px]" style="color:#3A3A40;"/>
        </a>
      </div>

      <div class="flex justify-center">
      <span class="text2 !text-[14px]">{{$t("misc.copyright", {year:new Date().getFullYear()})}}</span>
      </div>
  </footer>
</template>

