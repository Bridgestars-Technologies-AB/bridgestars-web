<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const toast = useToast();
const email = ref(""); 

onMounted(() => {
  if(route.params.email) {
    email.value = route.params.email;
    console.log("FOUND EMAIL IN QUERY")
  }
  if (Parse.User.current()) {
    //temp
    toast("dev: You are already signed in, sign out at profile page");
    //go directly to profile page or temp. show: you are signed in, sign out?
    router.push({ path: "/profile" });
  }
});
watch(email, () => {
  console.log("email changed", email);
});

function submit(res) {
  Parse.User.logIn(res.usernameEmail, res.password)
    //success
    .then((user) => {
      toast.success("You are signed in!");
      // disable profile since it does not exist
      router.push({ path: "/profile" });
    })
    //error
    .catch((e) => toast.error(e.message));

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
  <AuthForm
    header=" / Sign In"
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
    @submit="submit"
  >
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Username/Email"
      v-model="email"
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
      <button @click="router.push({path:'/auth/reset'})" class="textButton buttonText normal-case translate-y-[-12px]">
        Forgot your password?
      </button>
    </div>
  </AuthForm>
</template>

<style scoped></style>
