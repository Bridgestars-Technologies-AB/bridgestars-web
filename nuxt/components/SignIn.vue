<script setup></script>

<template>
  <AuthForm
    title="Sign in to your Bridgestars account"
    subtitle="Enter your username and password"
  >
    <TextInputField
      wrapperClass="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] max-w-[450px] mb-3"
      placeholder="Username/Email"
      class="animate-fade-up animate-ease-in-out"
      id="usernameEmail"
    />
    <TextInputField
      wrapperClass="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] max-w-[450px] mb-3"
      placeholder="Password"
      type="password"
      class="animate-fade-up animate-ease-in-out animate-delay-100"
      id="password"
    />

    <SubmitButton
      wrapperClass="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] max-w-[450px]"
      class="animate-fade-up animate-ease-in-out animate-delay-200"
      id="submit"
    ></SubmitButton>
  </AuthForm>
</template>

<style>
/* .input-field input {
  width: 80%; 
}*/
</style>
