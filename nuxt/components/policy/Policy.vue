<!-- Header: Logo, Home, About Us, Sign In -->

<!-- Navbar: Terms, Privacy, Disclaimer, Copyright-->

<!-- White container: -->
<!-- Black container -->
<!-- Introduction as prop -->

<!-- to top -->

<template>
  <div class="w-screen h-screen opacity-20 fixed bg-[#344767]">
    <header
      class="policyHeader w-screen h-[70px] mt-[30px] mb-[30px] bg-[#FFFFFF]"
    >
      <button>Bridgestars</button>
      <div class="px-[30px] flex flex-row justify-end gap-[60px]">
        <button>Home</button>
        <button>About Us</button>
        <button>Sign In</button>
      </div>
    </header>

    <!-- Maybe make a navigateBar component -->
    <div class="navigateBar w-screen h-[50px]">
      <div>
        <button class="policyButton">Terms</button>
        <button class="policyButton">Privacy</button>
        <button class="policyButton">Disclaimer</button>
        <button class="policyButton">Copyright</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.policyButton {
  background-color: white;
}
</style>
