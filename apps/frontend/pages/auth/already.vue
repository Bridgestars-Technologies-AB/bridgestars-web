<script setup>
const query = useRoute().query;
await loadTranslations("auth");
const logoutModalOpen = ref(false);

function signOut() {
  logoutModalOpen.value = true;
}

//custom action replaces route so that <back> doesn't direct us to "you are already signed in" since we are not anymore signed in
const redirect = () => useRouter().replace("/auth/sign-in");

onMounted(async () => {
  await useAuth()
    .update()
    .catch((e) => {
      if (e.response?.status === 401) {
        useToast().info("Din session har löpt ut, vänligen logga in igen.");
        redirect();
      } else {
        useToast().error("Något gick fel, vänligen försök igen.");
      }
    });
});
</script>

<template>
  <auth-form
    :header="$t('auth:already.already')"
    :title="$t('auth:already.title', { name: useAuth().user?.username })"
    :subtitle="$t('auth:already.subtitle')"
    :subtitle2="$t('auth:already.subtitle2')"
  >
    <div class="flex xs:flex-col sm:flex-row xs:flex-reverse">
      <button class="buttons" type="button" @click="signOut">
        {{ $t("auth:already.signOut") }}
      </button>
      <button
        class="buttons"
        type="button"
        @click="navigateTo({ path: '/dash', query })"
      >
        {{ $t("auth:already.dash") }}
      </button>
    </div>
  </auth-form>
  <base-modal-signout
    v-model:open="logoutModalOpen"
    :customSignOutAction="redirect"
  />
</template>

<style scoped>
.buttons {
  @apply xs:leading-4 border-[1px] border-[#49A3F1] bg-[#49A3F1] m-3 p-2 rounded-lg text-white font-family text-[18px] mt-[-5px] tracking-[2px];
}
</style>
