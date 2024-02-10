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
  },
  {
    name: "courses",
    icon: "i-material-symbols-school",
  },
  {
    name: "bidding-problems",
    icon: "i-material-symbols-sports-esports",
  },
  {
    name: "documents",
    icon: "i-material-symbols-library-books",
  },
  {
    name: "help",
    icon: "i-material-symbols-info",
  },
  {
    name: "sign-out",
    icon: "i-tabler-logout-2",
    action: () => {
      logoutModalOpen.value = true;
    },
  },
];
items.map((x) => {
  x.enabled =
    x.action || router.getRoutes().some((r) => r.name == "dash-" + x.name);
}); // add enabled property

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
    class="absolute w-full h-full overflow-y-scroll overflow-x-hidden no-scrollbar"
  >
    <div
      id="side-menu"
      :class="`bg-white dark:bg-dark-100 flex flex-col ${
        isOpen ? 'open' : 'closed'
      } ${$attrs.class} min-h-full pb-[200px]`"
    >
      <!-- profile section -->
      <div
        :class="`text-center flex relative items-center pt-7 flex-wrap profile-section ${
          isOpen ? 'open' : 'closed'
        }`"
      >
        <img
          width="50"
          class="object-cover object-top w-[50px] aspect-square rounded-full cursor-pointer"
          src="/bridgestars/images/castor.jpg"
          @click="navigateTo({ name: 'dash-profile' })"
        />
        <div class="flex flex-col text-start pl-2 space-y-1 justify-center">
            <h6
              class="top-0 text-[20px] leading-[20px] font-medium -mr-12 max-w-[120px] overflow-x-clip font-family tracking-tighter"
              @click="navigateTo({ name: 'dash-profile' })"
            > 
              {{ auth.user?.username }}
            </h6>
          <h6
            class="text-[#14C6A4] text-[18px] leading-[18px] dark:text-[#14C6a4] font-light tracking-normal"
            @click="navigateTo({ name: 'dash-profile' })"
          >
            Premium
          </h6>
        </div>
        <div class="[flex-basis:100%] h-0" />
        <dash-menu-side-level
          :user="null"
          :class="`mt-5 pl-2 pr-5 ${isOpen ? 'block' : 'hidden'}`"
        />
        <div :class="`h-[40px] ${isOpen ? 'hidden' : 'block'}`" />
      </div>

      <!-- menu items -->
      <div class="flex flex-col mt-6">
        <div v-for="item in items" :key="item.key" @click="() => click(item)">
          <div
            v-if="item.divider"
            class="font-family font-light text-dark opacity-70 dark:text-light mb-1 ml-5 mt-5 tracking-wide text-[16px] cursor-default"
          >
            {{ $t("dashboard:side_menu." + item.name) }}
          </div>
          <dash-menu-side-item
            v-else
            :icon="item.icon"
            :keypath="`dashboard:side_menu.${item.name}`"
            :selected="route.name == 'dash-' + item.name"
            :enabled="item.enabled"
          />
        </div>
      </div>
    </div>
  </div>
  <base-modal-signout v-model:open="logoutModalOpen" class="border" />
</template>

<style scoped>
.profile-section {
  @apply ml-[20px];
}
.profile-section div {
  @apply cursor-pointer w-fit opacity-100;
}

.profile-section img {
  transition:
    margin-left 0.3s ease-in-out,
    margin-top 0.3s ease-in-out;
}
.profile-section.closed img {
  position: absolute;
  @apply ml-[196px] mt-[40px];
}

#side-menu {
  transition:
    left 0.3s ease-in-out,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
#side-menu.closed {
  @apply xs:-left-[277px] sm:-left-[204px];
}
#side-menu.open {
  @apply left-0;
}
</style>
