<script setup lang="ts">
const toast = useToast();
const router = useRouter();
const query = useRoute().query;
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

async function submit(res) {
  showLoading.value = true;
  await useFetch("/backend/sanctum/csrf-cookie", {
    credentials: "include",
  });
  const { data, error } = await useFetch("/backend/forgot-password", {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
      "x-xsrf-token": useCookie("XSRF-TOKEN"),
    },
    body: JSON.stringify({
      email: res.email,
    }),
  });
  if(error.value) {
    showLoading.value = false;
    toast.error(error.value?.data.message);
    return;
  }
  if(data.value) {
    toast.success("Vi har skickat ett mail till dig med instruktioner för att återställa ditt lösenord.");
    navigateTo({ path: "/auth/sign-in", query });
    //if (query.to) navigateTo({ path: query.to as string });
    //else navigateTo({ path: "/dash" });
  }

  // useAuth()
  //   .requestPasswordReset(res.email)
  //   .then(() => {
  //     toast.success(t("auth:reset:toast.passwordReset"));
  //     query.email = res.email;
  //     navigateTo({ path: "/auth/sign-in", query });
  //   })
  //   .catch((e) => {
  //     showLoading.value = false;
  //     toast.error(e.message);
  //   });
}
</script>

<template>
  <auth-form
    :header="$t('auth:reset.resetPassword')"
    :title="$t('auth:demo.reset')"
    :subtitle="$t('auth:reset.subtitle')"
    @submit="submit"
  >
    <base-input-field
      id="email"
      v-model="query.email"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.email')"
    />

    <base-submit-button
      id="submit"
      wrapperClass="w-[100%] !mt-6"
      :text="$t('auth:reset.resetPassword')"
      :loading="showLoading"
    ></base-submit-button>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2 mr-1">{{ $t("auth:reset.footer") }} </span>

      <!-- type button to prevent submit form  -->
      <button
        type="button"
        class="!text-[16px] normal-case text-blue font-bold normal-case tracking-[0.5px]"
        @click="router.go(-1)"
      >
        {{ $t("auth:reset.goBack") }}
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
