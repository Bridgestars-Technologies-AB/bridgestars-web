<script setup>
const router = useRouter();
const route = useRoute();

const toast = useToast();
const auth = useAuth();

const logoutModalOpen = ref(false);

// name is both the key for the translation and the route name, keep them in sync!
const items = [
  {
    name: "overview",
    icon: "i-material-symbols-home-rounded",
    color: "bg-[#aaC107]", //icon color, but looks like shit because I couldn't select good colors, these are replaced with bg-teal-400 in side2.vue
  },
  {
    divider: true,
    name: "analysis",
  },
  {
    name: "deal-editor",
    icon: "i-material-symbols-sports-esports",
    color: "bg-[#95b687]",
  },
  // {
  //   name: "dealhistory",
  //   icon:"i-material-symbols-history"
  // },
  {
    name: "contract-calc",
    icon: "i-material-symbols-score",
    color: "bg-[#f48fb1]",
  },
  {
    name: "simulator",
    icon: "i-material-symbols-analytics",
    color: "bg-[#4fc3f7]",
  },
  {
    divider: true,
    name: "exercise",
  },
  {
    name: "contracting",
    icon: "i-material-symbols-sports-esports",
    color: "bg-[#a5d6a7]",
  },
  {
    name: "gambit",
    icon: "i-material-symbols-play-circle",
    color: "bg-[#f48fb1]",
  },
  {
    name: "suit-treatments",
    icon: "i-material-symbols-hive",
    color: "bg-[#4fc3f7]",
  },
  {
    name: "play",
    icon: "i-material-symbols-play-circle",
    color: "bg-[#5f350c]",
  },
  {
    divider: true,
    name: "other",
  },
  {
    name: "results",
    icon: "i-material-symbols-text-snippet",
    color: "bg-[#839202]",
  },
  {
    name: "help",
    icon: "i-material-symbols-info",
    color: "bg-[#2f357f]",
  },
  {
    name: "sign-out",
    icon: "i-tabler-logout-2",
    color: "bg-[#324465]",
    action: () => {
      logoutModalOpen.value = true;
    },
  },
];
items.map(
  (x) =>
    (x.enabled =
      x.action || router.getRoutes().some((r) => r.name == "dash-" + x.name))
); // add enabled property

const isOpen = inject("side-menu-open");

function click(item) {
  if (item.divider) return;
  if (item.action) return item.action();
  if (item.enabled) navigateTo({ name: "dash-" + item.name });
  else toast.error("Not implemented yet.");
}
</script>

<template>
  <div
    id="side-menu"
    :class="`bg-dash-light-300 dark:bg-dash-dark-100 flex flex-col z-[10] ${
      isOpen ? 'open' : 'closed'
    } h-full overflow-x-visible absolute`"
  >
    <div class="overflow-y-scroll w-[270px] no-scrollbar">
      <div
        :class="`text-center flex relative items-center pt-7 flex-wrap profile-section ${
          isOpen ? 'open' : 'closed'
        }`"
      >
        <NuxtImg
          width="50"
          class="object-cover object-top w-[50px] aspect-square rounded-full cursor-pointer"
          src="/bridgestars/images/castor.jpg"
          @click="navigateTo({ name: 'dash-profile' })"
        />
        <div class="flex flex-col text-start pl-2 justify-center">
          <h6
            class="text-[24px] leading-[24px] font-family tracking-tighter"
            @click="navigateTo({ name: 'dash-profile' })"
          >
            {{ auth.username() }}
          </h6>
          <h6
            class="text-[#14C6A4] text-[18px] leading-[18px] dark:text-[#14C6a4] font-light tracking-normal"
            @click="navigateTo({ name: 'dash-profile' })"
          >
            Premium
          </h6>
        </div>
        <div class="[flex-basis:100%] h-0"/> <!-- break to new row -->
        <dash-menu-side-level :user="auth.user()" :class="`mt-5 pl-2 pr-5 ${isOpen ? 'block' : 'hidden'}`" />
        <div :class="`h-[40px] ${isOpen ? 'hidden' : 'block'}`" />
      </div>

      <div class="flex flex-col mt-6 mb-[200px] h-full">
        <div
          v-for="item in items"
          :key="item.key"
          @click="() => click(item)"
          class="overflow-x-clip"
        >
          <div
            v-if="item.divider"
            class="font-family font-light text-dark opacity-70 dark:text-light mb-1 ml-5 mt-5 tracking-wide text-[16px] cursor-default"
          >
            {{ $t("dashboard:side_menu." + item.name) }}
          </div>
          <dash-menu-side-item2
            v-else
            :icon="item.icon"
            :keypath="`dashboard:side_menu.${item.name}`"
            :selected="route.name == 'dash-' + item.name"
            :enabled="item.enabled"
            :color="item.color"
          />
        </div>
      </div>
    </div>
  </div>

  <base-modal-signout v-model:open="logoutModalOpen" />
</template>

<style scoped>
.profile-section {
  margin-left: 20px;
}
.profile-section div {
  @apply cursor-pointer w-fit opacity-100;
}

.profile-section img {
  transition: margin-left 0.3s ease-in-out, margin-top 0.3s ease-in-out;
}
.profile-section.closed img {
  position: absolute;
  @apply ml-[192px] mt-[40px];
}

#side-menu {
  transition: left 0.3s ease-in-out,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
#side-menu.closed {
  @apply xs:-left-[270px] sm:-left-[203px];
}
#side-menu.open {
  @apply left-0;
}
</style>
