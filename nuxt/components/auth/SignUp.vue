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
      placeholder="Username"
      type="username"
      id="username"
    />
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Email"
      type="email"
      id="email"
    />
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Password"
      type="password"
      id="password"
    />
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Confirm password"
      type="password"
      id="confirm-password"
    />
    <SubmitButton
      wrapperClass="w-[100%] !mt-6"
      id="submit"
      type="submit"
      text="SIGN UP"
      @submit="submit"
    ></SubmitButton>

    <div class="!mt-6">
      <span class="text2">Already have an account? </span>
      <button
        @click="router.push({ path: '/auth/sign-in' })"
        class="textButton buttonText normal-case"
      >
        Sign In
      </button>
    </div>
    <!-- <div> -->
    <!-- <button class="textButton buttonText normal-case translate-y-[-12px]"> -->
    <!--   Forgot your password? -->
    <!-- </button> -->
    <!-- </div> -->
  </AuthForm>
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
