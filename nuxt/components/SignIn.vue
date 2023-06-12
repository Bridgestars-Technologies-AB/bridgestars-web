<script setup></script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
  >
    <TextInputField
      wrapperClass="w-1/2 max-w-[250px]"
      placeholder="Username/Email"
      id="usernameEmail"
    />
    <TextInputField
      wrapperClass="w-1/2 max-w-[250px]"
      placeholder="Password"
      type="password"
      id="password"
    />
    <button
      class="w-1/2 max-w-[250px] btn btn-active btn-primary"
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
