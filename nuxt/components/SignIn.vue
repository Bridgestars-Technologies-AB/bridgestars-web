<script setup>
</script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
  >
    <TextInputField
      wrapperClass="w-[70%] max-w-[350px] mb-4"
      placeholder="Username/Email"
      class="animate-fade-up animate-ease-in-out"
      id="usernameEmail"
    />
    <TextInputField
      wrapperClass="w-[70%] max-w-[350px] mb-5"
      placeholder="Password"
      type="password"
      class="animate-fade-up animate-ease-in-out animate-delay-100"
      id="password"
    />

    <button
      class="w-[70%] max-w-[350px] rounded-[6px] h-[30px] px-8 tracking-[1.5px] btn btn-active btn-primary 
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
