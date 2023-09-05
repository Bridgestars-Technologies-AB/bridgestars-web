<script setup>
const toast = useToast();
const query = useRoute().query;
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

function submit(res) {
  showLoading.value = true;
  useAuth()
    .signUp(res.username, res.password, res.email)
    .then((user) => {
      toast.success(t("auth:signUp:toast.signedUp"));
      if (query.to) navigateTo({ path: query.to });
      else navigateTo({ path: "/dash" });
    })
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
    :subtitle2="$t('auth:signUp.subtitle2')"
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
    <div class="flex flex-col items-center text-center">
      <div class="flex flex-row items-center">
        <input
          class="mr-2 w-5 h-5 rounded-md text-blue border-dark"
          id="terms-accept"
          type="checkbox"
        />
        <p><!-- to add space between texts  -->

          
        <span class="normal-case text2 text-dark tracking-[0.5px]">
          <i18next :translation="$t('auth:signUp:agree')">
            <template #terms>
                  <NuxtLink to="/policy" class="normal-case text2 text-blue font-bold tracking-[0.5px]">{{$t("auth:signUp:terms")}}</NuxtLink>
            </template>
          </i18next>
        </span>
        </p>
      </div>
        <small class="[color:red] text-[16px] w-full"></small>
    </div>

    <base-submit-button
      wrapperClass="w-[100%] xs:!mt-2 sm:!mt-4"
      id="submit"
      type="submit"
      :text="$t('auth:common.signUp')"
      :loading="showLoading"
      @submit="submit"
    ></base-submit-button>

    <div class="flex text-center">
      <div class="xs:!mt-1 sm:!mt-1 xl:!mt-5 xs:!mb-3">
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
