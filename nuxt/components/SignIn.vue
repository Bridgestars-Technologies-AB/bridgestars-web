<script setup></script>

<template>
  <!-- <AuthForm -->
  <!--   :title="Do you want to sign in?" -->
  <!--   :subtitle="Enter your username and password" -->
  <!-- > -->
  <!--   <UsernameEmailField /> -->
  <!--   <PasswordField /> -->
  <!--   <div class="btn" /> -->
  <!-- </AuthForm> -->
  <form class="signInForm" action="">
    <TextInput placeholder="Username" autofocus />
    <TextInput placeholder="Password" type="password" />
    <div class="form-group">
      <input
        class="userInp"
        type="text"
        placeholder="Username/Email"
        autofocus
      />
    </div>
    <div class="form-group">
      <input class="userInp" type="password" placeholder="Password" />
    </div>
    <button type="submit">SIGN IN</button>
  </form>
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
