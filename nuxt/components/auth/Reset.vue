<script setup lang="ts">
const router = useRouter();
const toast = useToast();

const route = useRoute();
const query = ref({});
const { t } = await loadTranslations("auth");

onMounted(() => {
  query.value = route.query;
  console.log(query);
});

function submit(res) {
  //Parse.User.requestPasswordReset(res.email)
  //.then(() => {
  toast.success(t("auth:reset:toast.passwordReset"));
  query.value.email = res.email;
  router.push({ path: "/auth/sign-in", query: query.value });
  //})
  //error
  //.catch((e) => toast.error(e.message));

  //firebase migration, this will be needed later
  /*Parse.Cloud.run('signIn', { res.usernameEmail, res.password})
    .catch(() => { })
    .then(() => Parse.User.logIn(res.usernameEmail, res.password))
    .then((user) => {
      // console.log('SIGNED IN USING FIREBASE MIGRATION');
      // Signed in
      alert("you are signed in")
    })
    .catch((error) => {
       console.log(error)
    })*/
}
</script>

<template>
  <auth-form
    header="Reset Password"
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
    ></base-submit-button>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2 mr-1">{{ $t("auth:reset.footer") }} </span>

      <!-- type button to prevent submit form  -->
      <button
        @click="router.go(-1)"
        type="button"
        class="!text-[16px] normal-case text-blue font-bold normal-case tracking-[0.5px]"
      >
        {{ $t("auth:reset.button") }}
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
