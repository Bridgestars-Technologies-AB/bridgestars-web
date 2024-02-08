<script setup lang="ts">
const toast = useToast();
const query = useRoute().query;
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

async function submit(res) {
  showLoading.value = true;
  showLoading.value = true;
  // move to nuxt interal api call, (server/api/auth/register)
  await useFetch("/backend/sanctum/csrf-cookie", {
    credentials: "include"
  });
  const {error, status} = await useFetch("/backend/register", {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
      "x-xsrf-token": useCookie("XSRF-TOKEN")
    },
    body: JSON.stringify({
      username: res.username,
      email: res.email,
      password: res.password,
      password_confirmation: res.password, // :S
      name: res.name,
    })
  });

  if (error.value) {
    showLoading.value = false;
    toast.error(error.value?.data.message);
    return;
  }

  if (status.value) {
    toast.success("Du har loggats in");
    if (query.to) navigateTo({ path: query.to as string });
    else navigateTo({ path: "/dash" });
  }
  // useAuth()
  //   .signUp(res.username, res.password, res.email)
  //   .then((user) => {
  //     toast.success(t("auth:signUp:toast.signedUp"));
  //     if (query.to) navigateTo({ path: query.to });
  //     else navigateTo({ path: "/dash" });
  //   })
  //   .catch((e) => {
  //     showLoading.value = false;
  //     toast.error(e.message);
  //   });
}
</script>

<template class="overflow-y-scroll">
  <auth-form
    :header="$t('auth:common.signUp')"
    :title="$t('auth:demo.signUp')"
    :subtitle="$t('auth:signUp.subtitle')"
    @submit="submit"
  >
    <base-input-field
      id="username"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.username')"
      type="username"
    />
    <!-- <div class="flex text-left"> -->
    <!-- <span class="text2 pl-3 -pt-1 leading-6">Ditt användarnamn kan du använda istället för din mail när du loggar in.</span> -->
    <!-- </div> -->
    <base-input-field
      id="email"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.email')"
      type="email"
    />
    <base-input-field
      id="name"
      wrapperClass="w-[100%]"
      placeholder="Namn"
      type="name"
    />
    <base-input-field
      id="password"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.password')"
      type="password"
    />
    <base-input-field
      id="password-confirm"
      wrapperClass="w-[100%]"
      :placeholder="$t('auth:placeholder.confirmPassword')"
      type="password"
    />
    <div class="flex flex-col items-center text-center">
      <div class="flex flex-row items-center">
        <input
          id="terms-accept"
          class="mr-2 w-5 h-5 rounded-md text-blue border-dark"
          type="checkbox"
        />
        <p>
          <!-- to add space between texts  -->

          <span class="normal-case text2 text-dark tracking-[0.5px]">
            <!-- <i18next :translation="$t('auth:signUp:agree')"> -->
            <!--   <template #terms> -->
            Jag godkänner 
                <NuxtLink
                  to="/policy"
                  class="normal-case text2 text-[15px] text-blue font-bold tracking-[0.5px]"
                  >Användarvillkoren</NuxtLink
                >
            <!--   </template> -->
            <!-- </i18next> -->
          </span>
        </p>
      </div>
      <small class="[color:red] text-[16px] w-full"></small>
    </div>

    <base-submit-button
      id="submit"
      wrapperClass="w-[100%] xs:!mt-2 sm:!mt-4"
      type="submit"
      :text="$t('auth:common.signUp')"
      :loading="showLoading"
      @submit="submit"
    ></base-submit-button>

    <div class="flex text-center">
      <div class="xs:!mb-3">
        <span class="text2 mr-1">{{ $t("auth:signUp.footer") }} </span>
        <button
          class="normal-case text-blue font-bold tracking-[0.5px]"
          type="button"
          @click="navigateTo({ path: '/auth/sign-in', query })"
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
