
export default defineNuxtRouteMiddleware((to, from) => {
  // if(process.server) return;
  // going from not dash to dash checks for auth
  if(!process.dev && to.fullPath.startsWith("/dev")){
     abortNavigation() 
  }
  else return to; 
})
