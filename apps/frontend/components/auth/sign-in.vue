<script setup lang="ts">
import axios from "axios";

const toast = useToast();
const query = useRoute().query;
const showLoading = ref(false);
await loadTranslations("auth");

//const auth = useAuth();

async function submit(res: { email: string; password: string }) {
  showLoading.value = true;

  await useAuth()
    .login(res)
    .then((response) => {
      toast.success("Du har loggats in");
      if (query.to) navigateTo({ path: query.to as string });
      else navigateTo({ path: "/dash" });
    })
    .catch((error) => {
      if (error.response) {
        showLoading.value = false;
        toast.error(error.response.data.message);
      } else {
        showLoading.value = false;
        toast.error("Något gick fel, försök igen");
      }
    });
  // await axios.get("/db/sanctum/csrf-cookie")
  //   .then(() => axios.post("/db/login", res))
  //   .then(({data, status}) => {
  //     toast.success("Du har loggats in");
  //     if (query.to) navigateTo({ path: query.to as string });
  //     else navigateTo({ path: "/dash" });
  //   })
  //   .catch((error) => {
  //     if(error.response){
  //        showLoading.value = false;
  //        toast.error(error.response.data.message);
  //     }
  //     else {
  //       showLoading.value = false;
  //       toast.error("Något gick fel, försök igen");
  //     }
  // })
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
