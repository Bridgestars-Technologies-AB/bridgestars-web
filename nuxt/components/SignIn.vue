<script setup></script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
  >
    <div class="flex flex-col items-center w-screen h-screen">
      <TextInputField
        class=""
        placeholder="Username/Email"
        id="usernameEmail"
      />
      <TextInputField placeholder="Password" type="password" id="password" />
      <button class="btn btn-active btn-primary" type="submit">SIGN IN</button>
    </div>
  </AuthForm>
</template>

<style>
.btn {
  padding: 5px 15px;
  margin: 5px;
}
</style>
