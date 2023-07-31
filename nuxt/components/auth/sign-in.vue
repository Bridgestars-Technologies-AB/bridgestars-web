<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const toast = useToast();
const query = ref({});
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

const auth = useAuth();

onMounted(() => {
  query.value = route.query;

  if (auth.authenticated) {
    //temp
    toast(t("auth:signIn:toast.alreadyIn"));
    //go directly to profile page or temp. show: you are signed in, sign out?

    if (query.value.to) navigateTo({ path: query.value.to });
    else navigateTo({ path: "/dash" });
  }
});

watch(query, () => {
  //for debugging to see if email is updated when changed in field
});

function submit(res) {
  showLoading.value = true;
  //try sign in server side first to migrate from firebase if sign in is not successfull
  auth
    .signIn(res.usernameEmail, res.password)
    .then((user) => {
      showLoading.value = false;
      toast.success("You are signed in!");
      // disable profile since it does not exist
      if (query.value.to) navigateTo({ path: query.value.to });
      else navigateTo({ path: "/dash" });
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
    :header="$t('auth:common.signIn')"
    :title="$t('auth:signIn.title')"
    :subtitle="$t('auth:signIn.subtitle')"
    @submit="submit"
  >
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.usernameEmail')"
      v-model="query.email"
      id="username-email"
    />
    <base-input-field
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.password')"
      type="password"
      id="password-signin"
    />

    <base-submit-button
      wrapperClass="w-[100%] !mt-6"
      id="submit"
      :text="$t('auth:common.signIn')"
      :loading="showLoading"
    ></base-submit-button>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2 mr-1">{{ $t("auth:signIn.footer") }}</span>
      <button
        type="button"
        @click="navigateTo({ path: '/auth/sign-up', query })"
        class="text-blue font-bold normal-case tracking-[0.5px]"
      >
        {{ $t("auth:common.signUp") }}
      </button>
    </div>
    <div>
      <button
        @click="navigateTo({ path: '/auth/reset', query })"
        class="text-blue font-bold normal-case tracking-[0.5px] translate-y-[-12px]"
        type="button"
      >
        {{ $t("auth:signIn.forgot") }}
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
