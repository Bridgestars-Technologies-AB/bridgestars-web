<!-- Header: Logo, Home, About Us, Sign In -->

<!-- Navbar: Terms, Privacy, Disclaimer, Copyright-->

<!-- White container: -->
<!-- Black container -->
<!-- Introduction as prop -->

<!-- to top -->

<template>
  <div class="w-screen h-screen opacity-100 fixed bg-[#C0C0C0]">
    <header
      class="policyHeader w-screen h-[70px] mt-[30px] mb-[30px] bg-[#FFFFFF]"
    >
      <button class="zoomIn text-[#3F516F] text-opacity-100 font-black">
        Bridgestars
      </button>
      <div class="px-[30px] flex flex-row justify-end gap-[60px]">
        <button class="zoomIn">Home</button>
        <button class="zoomIn">About Us</button>
        <button class="zoomIn">Sign In</button>
      </div>
    </header>

    <!-- Maybe make a navigateBar component -->
    <div
      class="navigateBar bg-[#E0E0E0] rounded-lg h-[50px] mx-[52px] flex flex-row justify-center"
    >
      <button class="policyButton zoomIn">Terms</button>
      <button class="policyButton zoomIn">Privacy</button>
      <button class="policyButton zoomIn">Disclaimer</button>
      <button class="policyButton zoomIn">Copyright</button>
    </div>

    <!-- Box with policy, toggle on button click-->
    <div
      class="w-[100 %] h-[100%] flex flex-row justify-center content-center mt-[40px]"
    >
      <div
        id="policyBox"
        class="bg-[#FFFFFF] w-[100%] ml-[70px] mr-[70px] overflow-auto"
      >
        <Terms></Terms>
      </div>
    </div>
  </div>
</template>

<style scoped>
.policyButton {
  @apply flex-auto p-0 m-0;
}

.policyButton:focus {
  @apply rounded-lg bg-[#FFFFFF] text-[#3A4C6B];
}

.zoomIn {
  animation: anim-zoom 500ms ease-in-out 0ms;
}

@keyframes anim-zoom {
  0% {
    opacity: 0;
    transform: scaleY(0.8) scaleX(0.3) translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
}
</style>
