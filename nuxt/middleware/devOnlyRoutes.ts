
const authRoutes = ["/db-docs"];
export default defineNuxtRouteMiddleware((to, from) => {
  // if(process.server) return;
  // going from not dash to dash checks for auth
  if(!process.dev && authRoutes.includes(to.fullPath)){
     abortNavigation() 
  }
  else return to; 
})
