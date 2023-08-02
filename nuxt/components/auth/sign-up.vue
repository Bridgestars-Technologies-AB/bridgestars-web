<script setup>
const toast = useToast();
const query = useRoute().query;
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

function submit(res) {
  //not sure if this is the function, copilot suggested it
  showLoading.value = true;
  useAuth()
    .signUp(res.username, res.password, res.email)
    .then((user) => {
      showLoading.value = false;
      toast.success(t("auth:signUp:toast.signedUp"));
      if (query.to) navigateTo({ path: query.to });
      else navigateTo({ path: "/dash" });
    })
    //error
    .catch((e) => {
      showLoading.value = false;
      toast.error(e.message);
    });
}
</script>

<template class="overflow-y-scroll">
  <auth-form
    :header="$t('auth:common.signUp')"
    :title="$t('auth:signUp.title')"
    :subtitle="$t('auth:signUp.subtitle')"
    @submit="submit"
  >
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.username')"
      type="username"
      id="username"
    />
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.email')"
      type="email"
      id="email"
    />
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
      :text="$t('auth:common.signUp')"
      :loading="showLoading"
      @submit="submit"
    ></base-submit-button>

    <div class="flex text-center">
      <div class="xs:!mt-1 sm:!mt-3 xl:!mt-5 xs:!mb-3">
        <span class="text2 mr-1">{{ $t("auth:signUp.footer") }} </span>
        <button
          @click="navigateTo({ path: '/auth/sign-in', query })"
          class="normal-case text-blue font-bold tracking-[0.5px]"
          type="button"
        >
          {{ $t("auth:common.signIn") }}
        </button>
      </div>
    </div>
    <!-- <div> -->
    <!-- <button class="textButton buttonText normal-case translate-y-[-12px]"> -->
    <!--   Forgot your password? -->
    <!-- </button> -->
    <!-- </div> -->
  </auth-form>
</template>

<style>
/* .input-field input {
  width: 80%; 
}*/
/*.textButton {
  background-clip: text;
  cursor: pointer;
  margin: 0;
  background-image: linear-gradient(
    195deg,
    rgb(73, 163, 241),
    rgb(26, 115, 232)
  );
  -webkit-text-fill-color: transparent;
}*/
</style>
