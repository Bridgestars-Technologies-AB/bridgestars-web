<script setup>
const query = useRoute().query;
const toast = useToast();
const showLoading = ref(false);
const { t } = await loadTranslations("auth");

function submit(res) {
  Parse.User.setPassword()
    .then((user) => {
      toast.success("You are signed in!");
      // disable profile since it does not exist
      if (query.value.to) navigateTo({ path: query.value.to });
      else navigateTo({ path: "/dash" });
    })
    //error
    .catch((e) => toast.error(e.message));
}
</script>

<template>
  <auth-form
    :header="$t('auth:reset.resetPassword')"
    :title="$t('auth:reset.title')"
    :subtitle="$t('auth:reset.subtitle2')"
    @submit="submit"
  >
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.password')"
      type="password"
      id="password"
    />
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.confirmPassword')"
      type="password"
      id="password-confirm"
    />
    <base-submit-button
      wrapperClass="w-[100%] xs:!mt-3 sm:!mt-6"
      id="submit"
      type="submit"
      :text="$t('auth:reset.reset')"
      @submit="submit"
    ></base-submit-button>
  </auth-form>
</template>
