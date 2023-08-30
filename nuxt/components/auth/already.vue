<script setup>
import { User } from "parse";

const query = useRoute().query;
const toast = useToast();
const { t } = await loadTranslations("auth");
const logoutModalOpen = ref(false);
const hej = "x";

function signOut() {
  logoutModalOpen.value = true;
}
</script>

<template>
  <auth-form
    :header="$t('auth:already.already')"
    :title="$t('auth:already.title', { name: useAuth().get('dispName') })"
    :subtitle="$t('auth:already.subtitle')"
    :subtitle2="$t('auth:already.subtitle2')"
  >
    <div>
      <button @click="signOut" class="buttons" type="button">
        {{ $t("auth:already.signOut") }}
      </button>
      <button
        @click="navigateTo({ path: '/dash', query })"
        class="buttons"
        type="button"
      >
        {{ $t("auth:already.dash") }}
      </button>
    </div>
  </auth-form>
  <base-modal-signout v-model:open="logoutModalOpen" />
</template>

<style scoped>
.buttons {
  @apply border-[1px] border-[#49A3F1] bg-[#49A3F1] m-3 p-2 rounded-lg text-white font-family text-[18px] mt-[-5px] tracking-[2px];
}
</style>
