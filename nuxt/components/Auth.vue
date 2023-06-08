<script>
const props = const props = defineProps(['title', 'subtitle', 'fields']);
defineEmits(["submit"])
fields = ['username', 'password']
</script>



<template>
  <div>
   <h1>{title}</h1> 
   <h2>{subtitle}</h1> 
    <EmailField v-if="fields.includes('email')"/>
    <UsernameField v-if="fields.includes('username')"/>
    <PasswordField v-if="fields.includes('password')"/>
   <slot></slot>
  </div>
</template>
