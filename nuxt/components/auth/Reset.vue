<script setup lang="ts">
const toast = useToast();
const router = useRouter();
const query = useRoute().query;
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

//Implement showLoading doesn't make sense at this point since reset password lacks functionality
function submit(res) {
  showLoading.value = true;
  Parse.User.requestPasswordReset(res.email)
    .then(() => {
      showLoading.value = false;
      toast.success(t("auth:reset:toast.passwordReset"));
      query.email = res.email;
      navigateTo({ path: "/auth/sign-in", query });
    })
    //error
    .catch((e) => {
      showLoading.value = false;
      toast.error(e.message);
    });
}
</script>

<template>
  <auth-form
    :header="$t('auth:reset.resetPassword')"
    :title="$t('auth:reset.title')"
    :subtitle="$t('auth:reset.subtitle')"
    @submit="submit"
  >
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.email')"
      v-model="query.email"
      id="email"
    />

    <base-submit-button
      wrapperClass="w-[100%] !mt-6"
      id="submit"
      :text="$t('auth:reset.resetPassword')"
      :loading="showLoading"
    ></base-submit-button>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2 mr-1">{{ $t("auth:reset.footer") }} </span>

      <!-- type button to prevent submit form  -->
      <button
        @click="router.go(-1)"
        type="button"
        class="!text-[16px] normal-case text-blue font-bold normal-case tracking-[0.5px]"
      >
        {{ $t("auth:reset.goBack") }}
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
