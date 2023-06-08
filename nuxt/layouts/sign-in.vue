<template>
  <div class="SignInLayout">
    <p>sign in layout</p>
    <slot></slot>
  </div>
</template>

<style>
.SignInLayout {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.5;
}

body {
  padding: 1rem;
}

button[type="submit"] {
  background-color: #0d6efd;
  color: #fff;
  border: 0;
  width: 10rem;
  font-size: smaller;
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  outline: 0;
}

input[type="text"],
input[type="password"] {
  border: 0.5px solid #ccc;
  width: 10rem;
  border-radius: 5px;
  color: black;
  padding-left: 0.5rem;
  transition: border-color 0.15s;
}

input[type="text"]:focus,
input[type="password"] {
  border-color: #7db0fb;
  outline: 0;
}

.form-group {
  margin-bottom: 0.5rem;
}

.userInp::-webkit-input-placeholder {
  color: gray;
}
</style>
