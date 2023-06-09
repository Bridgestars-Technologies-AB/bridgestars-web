<script>
const props = const props = defineProps(['title', 'subtitle', 'fields']);

defineEmits(["submit"])

fields = ['username', 'password']
</script>



<template>
  <div>
   <h1>{title}</h1> 
   <h2>{subtitle}</h1> 
    <div class="btn" @click="submit"/>
   <slot></slot>
  </div>
</template>
