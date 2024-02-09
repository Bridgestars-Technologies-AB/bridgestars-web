<script setup lang="ts">
import axios from 'axios';

const toast = useToast();
const showLoading = ref(false);
const query = useRoute().query;
await loadTranslations("auth");

//const auth = useAuth();

async function submit(res: { password: string }) {
  showLoading.value = true;

  await useAuth().resetPassword({
    password: res.password, 
    "password-confirm": res.password, 
    token: query.token, 
    email: query.email
  })
    .then((response) => {
      toast.success("Ditt lösenord har återställs. Testa nu att logga in.");
      navigateTo({ path: "/auth/sign-in", query });
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
}
</script>

<template>
  <auth-form
    header="Lösenord"
    title="Återställ lösenord"
    subtitle="För att återställa ditt lösenord, ange ditt nya lösenord."
    @submit="submit"
  >
    <base-input-field
      id="password"
      wrapperClass="w-[100%]"
      placeholder="Nytt lösenord"
      type="password"
    />
    <base-input-field
      id="password-confirm"
      wrapperClass="w-[100%]"
      placeholder="Bekräfta lösenord"
      type="password"
    />

    <base-submit-button
      id="submit"
      wrapperClass="w-[100%] !mt-6"
      text="Byt lösenord"
      :loading="showLoading"
    ></base-submit-button>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2 mr-1">Vill du inte byta lösenord?</span>
      <button
        type="button"
        class="text-blue font-bold normal-case tracking-[0.5px]"
        @click="navigateTo({ path: '/auth/sign-up', query })"
      >
         Logga in
      </button>
    </div>
  </auth-form>
</template>

<style scoped></style>
