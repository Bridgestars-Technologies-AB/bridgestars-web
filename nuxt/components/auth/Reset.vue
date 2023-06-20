<script setup lang="ts">
  const router = useRouter();
  const toast = useToast();

  onMounted(() => {


  })


  function submit(res) {
    //Parse.User.requestPasswordReset(res.email)
        //.then(() => {
          toast.success("Your password has been reset. Please check your email.");
          router.push({ path: "/auth/sign-in", query: { email: res.email } });
      //})
      //error
      //.catch((e) => toast.error(e.message));

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
    header=" / Reset Password"
    title="Reset your Bridgestars password"
    subtitle="Enter your email address to reset your password"
    @submit="submit"
  >
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Email" 
      id="email"
    />

    <SubmitButton
      wrapperClass="w-[100%] !mt-6"
      id="submit"
      text="Reset Password"
    ></SubmitButton>

    <div class="!mt-6 whitespace-nowrap">
      <span class="text2">Changed your mind? </span>

      <!-- type button to prevent submit form  -->
      <button
        @click="router.go(-1)"
        type="button" 
        class="textButton buttonText !text-[16px] normal-case"
      >
       Go Back 
      </button>
        
    </div>
  </AuthForm>
</template>

<style scoped></style>
