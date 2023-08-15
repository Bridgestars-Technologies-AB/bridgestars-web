<script setup>
//since this component has been instantiated through a toast it does not have access to vue instance and can therefore not use "useTranslation", didn't have time to fix
// const {t} = useTranslate()
// needs auth translation namespace to be loaded 
async function signOut(){
  const toast = useToast()
  useAuth().signOut().then(() => {
    // toast.success(t("auth:common.toast.signed_out"))
    toast.success("You have been signed out");
  })
  .catch((e) => toast.error(e.message))
}
</script>
<template>
  <div class="flex space-x-2 items-center">
    <span>You are already signed in!</span>
    <button class="px-1 py-1.5 border-white border-[2px] rounded-xl"
   @click="signOut" >Sign out</button>
    <button class="px-1 py-1.5 border-white border-[2px] rounded-xl"
      @click="navigateTo('/dash')">Go to dashboard</button>
  </div>
</template>
