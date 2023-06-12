<script setup>
  function submit(){
    
  }
</script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
    btnText="SIGN UP"
    @submit="submit"
  >
    <TextInputField
      wrapperClass="w-[70%] max-w-[350px] mb-4"
      placeholder="Username"
      type="username"
      id="username"
    />
    <TextInputField
      wrapperClass="w-[70%] max-w-[350px] mb-4"
      placeholder="Email"
      type="email"
      id="email"
    />
    <TextInputField
      wrapperClass="w-[70%] max-w-[350px] mb-4"
      placeholder="Password"
      type="password"
      id="password"
    />
    <TextInputField
      wrapperClass="w-[70%] max-w-[350px] mb-6"
      placeholder="Confirm password"
      type="password"
      id="confirm-password"
    />
  </AuthForm>
</template>

<style>
/* .input-field input {
  width: 80%; 
}*/
</style>
