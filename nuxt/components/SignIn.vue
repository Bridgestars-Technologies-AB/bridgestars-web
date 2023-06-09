<script setup></script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
  >
    <div class="flex flex-col items-center">
      <TextInputField placeholder="Username/Email" id="usernameEmail" />
      <TextInputField placeholder="Password" type="password" id="password" />
      <button type="submit">SIGN IN</button>
    </div>
  </AuthForm>
</template>

<style></style>
