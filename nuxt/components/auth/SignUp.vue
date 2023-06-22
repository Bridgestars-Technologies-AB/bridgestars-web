<script setup>
const router = useRouter();
const toast = useToast();

//implement sign out logic on mounted

function submit(res) {
  console.log(res);
  //not sure if this is the function, copilot suggested it
  Parse.User.signUp(res.username, res.password, { email: res.email })
    .then((user) => {
      toast.success("You are signed up!");
      router.push({ path: "/profile" });
    })
    //error
    .catch((e) => toast.error(e.message));
}
</script>

<template>
  <AuthForm
    header="Sign Up"
    title="Join the Bridgestars waiting list"
    subtitle="Enter your desired details below to create an account."
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
      id="password-confirm"
    />
    <SubmitButton
      wrapperClass="w-[100%] xs:!mt-3 sm:!mt-6"
      id="submit"
      type="submit"
      text="SIGN UP"
      @submit="submit"
    ></SubmitButton>

    <div class="flex text-center">
    <div class="xs:!mt-1 sm:!mt-6 xs:!mb-3">
      <span class="text2">Already have an account? </span>
      <button
        @click="router.push({ path: '/auth/sign-in' })"
        class="buttonText normal-case text-blue font-bold normal-case tracking-[0.5px]"
        type="button"
      >
        Sign In
      </button>
    </div>
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
