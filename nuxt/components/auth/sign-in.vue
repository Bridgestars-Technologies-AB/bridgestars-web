<script setup lang="ts">
const toast = useToast();
const query = useRoute().query;
const showLoading = ref(false);

const auth = useAuth();

function submit(res: { usernameEmail: string; password: string }) {
  showLoading.value = true;
  auth
    .signIn(res.usernameEmail, res.password)
    .then(() => {
      toast.success("You have been signed in!"); //TODO: translate this
      if (query.to) navigateTo({ path: query.to });
      else navigateTo({ path: "/dash" });
    })
    .catch((e) => {
      showLoading.value = false;
      toast.error(e.message);
    });
}
</script>

<template>
  <auth-form
    :header="$t('auth:common.signIn')"
    :title="$t('auth:signIn.title')"
    :subtitle="$t('auth:signIn.subtitle')"
    @submit="submit"
  >
    <base-input-field
      id="username-email"
      v-model="query.email"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.usernameEmail')"
    />
    <base-input-field
      id="password-signin"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.password')"
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
