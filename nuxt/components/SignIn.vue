<script setup>
</script>

<template>
  <AuthForm>
    <TextInputField
      placeholder="Username/Email"
      id="usernameEmail"
      class="animate-fade-up animate-ease-in-out"
    />
    <TextInputField
      placeholder="Password"
      type="password"
      id="password"
      class="animate-fade-up animate-ease-in-out animate-delay-100"
    />
    <button
      type="submit"
      class="rounded-[12px] h-[35px] px-8 bg-infoabc
      animate-fade-up animate-ease-in-out animate-delay-200"
    >
      Sign In
    </button>
  </AuthForm>
</template>

<style>
/*.signInForm {
  background-color: gray;
  padding: 1px;
  text-align: left;
  margin: auto;
  display: table;
}*/
</style>
