<script setup></script>

<template>
  <footer class="mt-[100px] space-y-5 px-3">
    <div class="flex space-x-5 justify-center flex-wrap">
      <NuxtLink class="" href="/">{{ $t("common:home") }}</NuxtLink>
      <NuxtLink class="" href="/auth/sign-in">{{
        $t("common:profile")
      }}</NuxtLink>
      <!-- <NuxtLink class="" href="/download">{{ -->
      <!--   $t("common:downloads") -->
      <!-- }}</NuxtLink> -->
      <NuxtLink class="" href="/policy">{{ $t("common:policy") }}</NuxtLink>
    </div>

    <div class="flex space-x-5 justify-center">
      <base-tooltip text="Facebook" position="bottom">
        <a
          class="bottom"
          href="https://www.facebook.com/BridgestarsTechnologies"
          target="_blank"
          rel="noreferrer"
        >
          <NuxtImg
            loading="lazy"
            alt="facebook logo"
            height="20"
            class="h-[20px] hover:animate-shake"
            src="/logo/facebook-dark.svg"
          />
        </a>
      </base-tooltip>

      <base-tooltip text="Instagram" position="bottom">
        <a
          class="bottom"
          href="https://www.instagram.com/bridgestars/"
          target="_blank"
          rel="noreferrer"
        >
          <NuxtImg
            loading="lazy"
            alt="instagram logo"
            height="20"
            class="h-[20px] hover:animate-shake"
            src="/logo/instagram-dark.svg"
          />
        </a>
      </base-tooltip>

      <base-tooltip text="Discord" position="bottom">
        <a
          class="bottom"
          href="https://discord.gg/YhwRDgtSX2"
          target="_blank"
          rel="noreferrer"
        >
          <NuxtImg
            loading="lazy"
            alt="discord logo"
            height="20"
            class="h-[20px] hover:animate-shake"
            src="/logo/discord-dark.svg"
          />
        </a>
      </base-tooltip>

      <base-tooltip text="Email" position="bottom">
        <a href="mailto: info@bridgestars.net" target="_blank" rel="noreferrer">
          <span
            class="i-material-symbols-mail-rounded h-[20px] w-[20px] hover:animate-shake"
            style="color: #3a3a40"
          />
        </a>
      </base-tooltip>
    </div>

    <div class="flex justify-center text-center">
      <span class="text2 !text-[14px]">{{
        $t("misc.copyright", { year: new Date().getFullYear() })
      }}</span>
    </div>
  </footer>
</template>
