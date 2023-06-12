<script setup>
</script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
  >
    <TextInputField
      wrapperClass="w-1/2 max-w-[250px]"
      placeholder="Username/Email"
      class="animate-fade-up animate-ease-in-out"
      id="usernameEmail"
    />
    <TextInputField
      wrapperClass="w-1/2 max-w-[250px]"
      placeholder="Password"
      type="password"
      class="animate-fade-up animate-ease-in-out animate-delay-100"
      id="password"
    />
    <button
      class="w-1/2 max-w-[250px] rounded-[12px] h-[35px] px-8 btn btn-active btn-primary 
      animate-fade-up animate-ease-in-out animate-delay-200"
      type="submit"
    >
      SIGN IN
    </button>
  </AuthForm>
</template>

<style>
/* .input-field input {
  width: 80%; 
}*/
</style>
