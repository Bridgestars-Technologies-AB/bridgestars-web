<script setup lang="ts">
const toast = useToast();
const query = useRoute().query;
const { t } = await loadTranslations("auth");
const showLoading = ref(false);

const termsModalOpen = ref(false);
onBeforeRouteUpdate(() => {
  termsModalOpen.value = false;
});

async function submit(res: {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) {
  showLoading.value = true;
  showLoading.value = true;

  await useAuth()
    .register({ ...res, password_confirmation: res.password })
    .then((user) => {
      toast.success("Du har loggats in");
      if (query.to) navigateTo({ path: query.to as string });
      else navigateTo({ path: "/dash" });
    })
    .catch((e) => {
      showLoading.value = false;
      toast.error(e.response.data.message);
      return;
    });
}
</script>

<template>
  <div>
    <auth-form
      :header="$t('auth:common.signUp')"
      :title="$t('auth:demo.signUp')"
      :subtitle="$t('auth:signUp.subtitle')"
      @submit="submit"
    >
      <!-- <div class="flex text-left"> -->
      <!-- <span class="text2 pl-3 -pt-1 leading-6">Ditt användarnamn kan du använda istället för din mail när du loggar in.</span> -->
      <!-- </div> -->
      <div class="flex justify-between -mt-4 sm:mt-0">
        <base-input-field
          id="first-name"
          wrapperClass="w-[49%]"
          placeholder="Förnamn"
          type="first-name"
        />
        <base-input-field
          id="last-name"
          wrapperClass="w-[49%]"
          placeholder="Efternamn"
          type="last-name"
        />
      </div>
      <base-input-field
        id="email"
        wrapperClass="w-[100%]"
        :placeholder="$t('auth:placeholder.email')"
        type="email"
      />
      <base-input-field
        id="username"
        wrapperClass="w-[100%]"
        :placeholder="$t('auth:placeholder.username')"
        type="username"
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
              <button
                type="button"
                class="normal-case text2 text-[15px] text-blue font-bold tracking-[0.5px]"
                @click="termsModalOpen = true"
              >
                Användarvillkoren
              </button>
              <!--   </template> -->
              <!-- </i18next> -->
            </span>
          </p>
        </div>
        <small class="[color:red] text-[16px] w-full"></small>
      </div>

      <base-submit-button
        id="submit"
        wrapperClass="w-[100%] !mt-4 sm:!mt-3"
        type="submit"
        :text="$t('auth:common.signUp')"
        :loading="showLoading"
        @submit="submit"
      ></base-submit-button>

      <div class="flex text-center !mt-3 sm:!mt-4">
        <div class="mb-5">
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
  </div>
  <base-modal v-model:open="termsModalOpen" class="w-full sm:p-10 mx-auto">
    <Policy :hideNavbar="true" :hideFooter="true" />
  </base-modal>
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
