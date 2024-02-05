<script setup lang="ts">
const toast = useToast();
const query = useRoute().query;
const showLoading = ref(false);
await loadTranslations("auth");

const auth = useAuth();

async function submit(res: { email: string; password: string }) {
  showLoading.value = true;
  await useFetch("/backend/sanctum/csrf-cookie", {
    credentials: "include"
  });
  const {data, error} = await useFetch("/backend/login", {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
      "x-xsrf-token": useCookie("XSRF-TOKEN")
    },
    body: JSON.stringify({
      email: res.email,
      password: res.password
    })
  });

  if (error.value) {
    showLoading.value = false;
    console.log(error.value?.data.message)
    toast.error(error.value?.data.message);
    return;
  }

  if (data.value) {
    toast.success("Du har loggats in");
    if (query.to) navigateTo({ path: query.to as string });
    else navigateTo({ path: "/dash" });
  }
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
      id="email"
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
        @click="navigateTo({ path: '/auth/reset', query })"
      >
        {{ $t("auth:signIn.forgot") }}
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
