<script setup>
definePageMeta({
  middleware:[
    function (to, from){
      // if(process.server) return;
      // going from not dash to dash checks for auth
      console.log("dev: ", process.dev)
      console.log("process: ", process)
      if(!process.dev && to.fullPath.startsWith("/dev")){
         abortNavigation() 
      }
      if(from.path !== to.path) return to; 
    }
  ]
})
</script>
<template>
  <NuxtPage/>
</template>
