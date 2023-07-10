<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const toast = useToast();
const email = ref("test");
const password = ref("");

onMounted(() => {
  if (route.params.email) {
    //get email from url param
    email.value = route.params.email;
  }
  if (Parse.User.current()) {
    //temp
    toast("dev: You are already signed in, sign out at profile page");
    //go directly to profile page or temp. show: you are signed in, sign out?
    router.push({ path: "/profile" });
  }
});

watch(email, () => {
  //for debugging to see if email is updated when changed in field
});

function submit(res) {
  //try sign in server side first to migrate from firebase if sign in is not successfull
  Parse.Cloud.run("signIn", {
    email: res.usernameEmail,
    password: res.password,
  })
    .catch(() => {
      //could not sign in server side, ignore and try client side to get error
    })
    //sign in client side
    .then(() => Parse.User.logIn(res.usernameEmail, res.password))
    //success
    .then((user) => {
      toast.success("You are signed in!");
      // disable profile since it does not exist
      router.push({ path: "/profile" });
    })
    //error
    .catch((e) => toast.error(e.message));
}
</script>

<template>
  <AuthForm
    header="Sign In"
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
    @submit="submit"
  >
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Username/Email"
      type="email"
      v-model="email"
      id="username-email"
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
        type="button"
        @click="router.push({ path: '/auth/sign-up' })"
        class="normal-case text-blue font-bold normal-case tracking-[0.5px]"
      >
        Sign Up
      </button>
    </div>
    <div>
      <!-- path below is a little bit shady, nuxt reads the param perfectly fine but url looks a little bit wierd "/resettheodor@mail.com" -->
      <button
        @click="router.push({ path: '/auth/reset' + email })"
        class="text-blue font-bold normal-case tracking-[0.5px] translate-y-[-12px]"
        type="button"
      >
        Forgot your password?
      </button>
    </div>
  </AuthForm>
</template>

<style scoped></style>
