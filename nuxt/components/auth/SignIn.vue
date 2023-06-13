<script setup lang="ts">
const router = useRouter();
const toast = useToast();
toast("hjej");

function submit(res) {
//test
  /*Parse.User.logIn(res.usernameEmail, res.password)
    .then((user) => console.log(user))
    .catch((e) => console.log(e))*/
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
      id="password-signin"
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
