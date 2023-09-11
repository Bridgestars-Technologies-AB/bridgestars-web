const authRoutes = ["/dash"];
export default defineNuxtRouteMiddleware((to, from) => {
  // if(process.server) return;
  // going from not dash to dash checks for auth
  for (const route of authRoutes) {
    // console.log(from.path, to.path)
    if (to.path.startsWith(route)) {
      if (!useAuth().authenticated()) {
        return {
          path: "/auth/sign-in",
          query: {
            redirect: to.fullPath,
          },
        };
      }
    }
  }
})
