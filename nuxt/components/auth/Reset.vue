<script setup lang="ts">
  const router = useRouter();
  const toast = useToast();
  
  const route = useRoute();
  const query = ref({})

  onMounted(() => {
    query.value = route.query;
    console.log(query)
  })


  function submit(res) {
    //Parse.User.requestPasswordReset(res.email)
        //.then(() => {
      toast.success("Your password has been reset. Please check your email.");
      query.value.email = res.email;
      router.push({ path: "/auth/sign-in", query:query.value});
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
    header="Reset Password"
    title="Reset your Bridgestars password"
    subtitle="Enter your email address to reset your password"
    @submit="submit"
  >
    <TextInputField
      wrapperClass="w-[100%]"
      placeholder="Email" 
      v-model="query.email"
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
        class="!text-[16px] normal-case text-blue font-bold normal-case tracking-[0.5px]"
      >
       Go Back 
      </button>
        
    </div>
  </AuthForm>
</template>

<style scoped></style>
