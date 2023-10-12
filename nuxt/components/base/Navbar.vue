<script setup lang="ts">
const props = defineProps({
  transparent: Boolean,
});

// const { t, i18 } = useTranslate();
const auth = useAuth();
// const { locale, locales, setLocale } = useI18n()
// const nuxtApp = useNuxtApp()

//https://icones.js.org/

const routes: Array<any> = reactive([
  {
    key: "home",
    path: "/",
    icon: "i-material-symbols-home-rounded",
  },
  {
    key: "profile",
    path: "/auth/sign-in",
    icon: "i-ic-baseline-account-circle",
  },
]);
if (process.dev) {
  routes.push({
    key: "Dev",
    path: "/dev",
    icon: "i-material-symbols-code-blocks",
  });
}

const success = "#59BA83";
const isOpen = ref(false);

const bgColor = props.transparent ? "bg-[#FFFFFF00]" : "bg-white";
const textColor = props.transparent ? "!text-white" : "!text-dark";
const menuIconColor = props.transparent ? "bg-white" : "bg-dark";
const iconColor = props.transparent ? "#FFFFFF" : "rgb(120,120,120)";

//runs on both client and server
if (auth.authenticated()) {
  const account = routes.find((route) => route.key === "profile");
  account!.name = auth.username();
  account!.path = "/dash";
  account!.success = true;
}
</script>

<template>
  <header class="w-full">
    <nav
      :class="
        'flex xs:flex-wrap sm:flex-nowrap justify-between items-center w-[100%] py-4 px-2 mb-2 rounded-2xl ' +
        bgColor
      "
    >
      <!-- Logo -->
      <div class="flex items-center sm:w-auto">
        <NuxtLink to="/">
          <NuxtImg
            src="/bridgestars/logo/logo-trans-128px.png"
            width="32"
            height="32"
            format="webp"
            loading="lazy"
            alt="Bridgestars logo"
            class="h-[32px] w-[32px] mx-2"
          />
        </NuxtLink>
        <NuxtLink to="/">
          <h3 :class="'text-[22px] ' + textColor">Bridgestars</h3>
        </NuxtLink>
      </div>

      <!-- Open Menu Button -->
      <div class="flex items-center sm:hidden mr-2">
        <base-hamburger-menu-button
          :isOpen="isOpen"
          class="!scale-[0.3]"
          :innerClass="menuIconColor"
          @click="isOpen = !isOpen"
        />
        <span
          v-if="auth.authenticated()"
          class="i-ic-baseline-account-circle !scale-[1.35]"
          :style="'color: ' + success"
          @click="isOpen = !isOpen"
        />
        <!-- <NavbarLangSwitcher/> -->
      </div>

      <!-- Menu -->
      <div :class="`w-full sm:w-auto sm:block ${!isOpen ? 'xs:hidden' : ''}`">
        <ul class="sm:flex sm:justify-end sm:p-0 xs:p-1">
          <li v-for="route in routes" :key="route.key" class="block mx-2">
            <nuxt-link :to="route.path" class="text-[14px]">
              <div class="flex items-center space-x-2 mx-1 xs:mt-3 sm:mt-0">
                <div
                  :class="`scale-[1.3] ${route.icon}`"
                  :style="`color:${route.success ? success : iconColor};`"
                />

                <span
                  :class="`text2 !text-[18px] !font-medium
                    ${route.success ? '!text-[#59BA83]' : textColor}`"
                >
                  {{ route.name || $t("common:" + route.key) }}
                </span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
