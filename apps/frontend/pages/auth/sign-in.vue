<script setup lang="ts">
// for types
import { api } from "~/composables/api";

const toast = useToast();
const query = useRoute().query;
const showLoading = ref(false);
await loadTranslations("auth");



async function submit(res: { email: string; password: string }) {
  showLoading.value = true;
  useAuth()
    .login({username:res.email, password:res.password, password_confirmation: res.password})
    .then(() => {
        toast.success("Du har loggats in");
        if (query.to) navigateTo({ path: query.to as string });
        else navigateTo({ path: "/dash" });
    })
    .catch(error => {
        showLoading.value = false;
        toast.error(error.response.data.message);
    })
}
</script>

<template>
  <auth-form
    :header="$t('auth:common.signIn')"
    :title="$t('auth:demo.title')"
    :subtitle="$t('auth:signIn.subtitle')"
    @submit="submit"
  >
    <base-input-field
      id="username-email"
      v-model="query.email"
      wrapperClass="w-[100%]"
      placeholder="Email"
    />
    <base-input-field
      id="password-signin"
      wrapperClass="w-[100%]"
      placeholder="Lösenord"
      type="password"
    />

    <base-submit-button
      id="submit"
      wrapperClass="w-[100%] !mt-6"
      :text="$t('auth:common.signIn')"
      :loading="showLoading"
    ></base-submit-button>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2 mr-1">{{ $t("auth:signIn.footer") }}</span>
      <button
        type="button"
        class="text-blue font-bold normal-case tracking-[0.5px]"
        @click="navigateTo({ path: '/auth/sign-up', query })"
      >
        {{ $t("auth:common.signUp") }}
      </button>
    </div>
    <div>
      <button
        class="text-blue font-bold normal-case tracking-[0.5px] translate-y-[-12px]"
        type="button"
        @click="navigateTo({ path: '/auth/forgot', query })"
      >
        {{ $t("auth:signIn.forgot") }}
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
