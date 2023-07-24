<!-- Header: Logo, Home, About Us, Sign In -->

<!-- Navbar: Terms, Privacy, Disclaimer, Copyright-->

<!-- White container: -->
<!-- Black container -->
<!-- Introduction as prop -->

<!-- to top -->
<script setup>
  function moveLine(event) {
    const button = event.target
    var tabButtons = document.querySelectorAll('.policyButton');
    var line = document.querySelector('.line');

    // Remove 'active' class from all buttons
    tabButtons.forEach(function(tabButton) {
      tabButton.classList.remove('active');
    });

    // Add 'active' class to the clicked button
    button.classList.add('active');

    // Calculate the left position of the active button
    var activeButtonRect = button.getBoundingClientRect();
    var containerRect = button.parentNode.getBoundingClientRect();
    var offsetLeft = activeButtonRect.left - containerRect.left;
    const offset = offsetLeft;

    // Apply the transform to move the line
    line.style.transform = `translate(${offset}px,  ${0}px)`;
    line.style.width = `${activeButtonRect.width}px`;
    
  }
</script>

<template>
  <base-card-page-layout>


    <div class="p-5 w-full">
    <!-- Maybe make a navigateBar component -->
      <div
        class="navigateBar bg-dash-light-100 rounded-lg h-[50px] w-full flex flex-row items-center text-center"
      >
        <span @click="moveLine" class="z-10 text1 font-family2 flex-auto">Terms</span>
        <span @click="moveLine" class="z-10 text1 font-family2 flex-auto">Privacy</span>
        <span @click="moveLine" class="z-10 text1 font-family2 flex-auto">Disclaimer</span>
        <span @click="moveLine" class="z-10 text1 font-family2 flex-auto">Copyright</span>
        <div class="z-0 line bg-white h-[44px] w-[25%] transition-transform absolute rounded-xl duration-500"></div>
      </div>
    </div>
  </base-card-page-layout>

</template>

<style scoped>
</style>
