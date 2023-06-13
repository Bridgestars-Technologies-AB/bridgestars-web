<script setup>
const router = useRouter();
function submit(res) {
  console.log(res);
}
</script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
    @submit="submit"
  >
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Username/Email"
      id="usernameEmail"
    />
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Password"
      type="password"
      id="password"
    />

    <SubmitButton
      wrapperClass="w-[100%] !mt-6"
      id="submit"
      text="SIGN IN"
    ></SubmitButton>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2">Don't have an account? </span>
      <button
        @click="router.push({ path: '/auth/sign-up' })"
        class="textButton buttonText normal-case"
      >
        Sign Up
      </button>
    </div>
    <div>
      <button class="textButton buttonText normal-case translate-y-[-12px]">
        Forgot your password?
      </button>
    </div>
  </AuthForm>
</template>

<style scoped>
@media (min-width: 992px) {
  /* Change sizes of elements to fit with picture!*/
}
</style>
