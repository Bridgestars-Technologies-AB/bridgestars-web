<script setup>
</script>

<template>
  <footer class="mt-[100px] space-y-5 px-3">
      <div class="flex space-x-5 justify-center">
      <NuxtLink class="" href="/">{{$t("common:home")}}</Nuxtlink>
      <NuxtLink class="" href="/auth/sign-in">{{$t("common:profile")}}</Nuxtlink>
      <NuxtLink class="" href="/download">{{$t("common:downloads")}}</Nuxtlink>
      <NuxtLink class="" href="/policy">{{$t("common:policy")}}</Nuxtlink>
      </div>

      <div class="flex space-x-5 justify-center">
        <base-tooltip text="Facebook" position="bottom">
          <a class="bottom" href="https://www.facebook.com/BridgestarsTechnologies" target="_blank" rel="noreferrer" >
            <img class="h-[20px] hover:animate-shake" src="~/assets/logo/facebook-dark.svg"/>
          </a>
        </base-tooltip>

        <base-tooltip text="Instagram" position="bottom">
          <a class="bottom" href="https://www.instagram.com/bridgestars/"  target="_blank" rel="noreferrer" >
            <img class="h-[20px] hover:animate-shake" src="/assets/logo/instagram-dark.svg">
          </a>
        </base-tooltip>

        <base-tooltip text="Discord" position="bottom">
          <a class="bottom" href="https://discord.gg/YhwRDgtSX2" target="_blank" rel="noreferrer" >
            <img class="h-[20px] hover:animate-shake" src="/assets/logo/discord-dark.svg">
          </a>
        </base-tooltip>

        <base-tooltip text="Email" position="bottom">
          <a href="mailto: info@bridgestars.net" target="_blank" rel="noreferrer">
            <span class="i-material-symbols-mail-rounded h-[20px] w-[20px] hover:animate-shake" style="color:#3A3A40;"/>
          </a>
        </base-tooltip>
      </div>

      <div class="flex justify-center text-center">
      <span class="text2 !text-[14px]">{{$t("misc.copyright", {year:new Date().getFullYear()})}}</span>
      </div>
  </footer>
</template>
<style scoped>

a[data-tooltip].top {
  &:before,
  &:after {
    transform: translateY(10px);
  }
  
  &:hover:after,
  &:hover:before {
    transform: translateY(0px);
  }
}

a[data-tooltip].right {
  &:before,
  &:after {
    transform: translateX(0px);
  }
  
  &:hover:after,
  &:hover:before {
    transform: translateX(10px);
  }
}

a[data-tooltip].bottom {
  &:before,
  &:after {
    transform: translateY(-10px);
  }
  
  &:hover:after,
  &:hover:before {
    transform: translateY(0px);
  }
}

a[data-tooltip].left {
  &:before,
  &:after {
    transform: translateX(0px);
  }
  
  &:hover:after,
  &:hover:before {
    transform: translateX(-10px);
  }
}

a[data-tooltip] {
  position: relative;

  &:after,
  &:before {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transition: transform 200ms ease, opacity 200ms;
    box-shadow: 0 0 10px rgba(black,0.3);
    z-index: 99;
  }

  &:before {
    content: attr(data-tooltip);
    background: #000;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 5px;
    white-space: nowrap;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &:after {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    content: '';
  }

  &:hover:after,
  &:hover:before {
    visibility: visible;
    opacity: 0.85;
    transform: translateY(0px);
  }
}

a[data-tooltip][data-position="top"]:before {
  bottom: 100%;
  left: -130%;
  margin-bottom: 10px;
}

a[data-tooltip][data-position="top"]:after {
  border-top-color: #000;
  border-bottom: none;
  bottom: 101%;
  left: calc(50% - 6px);
  margin-bottom: 4px;
}
a[data-tooltip][data-position="left"]:before {
  top: -12%;
  right: 100%;
  margin-right: 10px;
}

a[data-tooltip][data-position="left"]:after {
  border-left-color: #000;
  border-right: none;
  top: calc(50% - 3px);
  right: 100%;
  margin-top: -6px;
  margin-right: 4px;
}
a[data-tooltip][data-position="right"]:before {
  top: -5%;
  left: 100%;
  margin-left: 10px;
}

a[data-tooltip][data-position="right"]:after {
  border-right-color: #000;
  border-left: none;
  top: calc(50% - 6px);
  left: calc(100% + 4px);
}

a[data-tooltip][data-position="bottom"]:before {
  top: 100%;
  left: -130%;
  margin-top: 10px;
}

a[data-tooltip][data-position="bottom"]:after {
  border-bottom-color: #000;
  border-top: none;
  top: 100%;
  left: 5px;
  margin-top: 4px;
}
</style>
