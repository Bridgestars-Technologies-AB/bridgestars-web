async function handleParseError(error: { reason: { code: number } }) {
  if (error.reason.code == 209) {
    useAuth()
      .logout()
      .catch(() => {});
    //await navigateTo("/auth/sign-in");
    useToast().error("You have been signed out", { timeout: false });
  }
}

export default defineNuxtPlugin(() => {
  window.onunhandledrejection = (error) => {
    //if(process.env.dev) 
    if(error?.reason?.response?.data?.message)
      useToast().error(error.reason.response.data.message);
    //handleParseError(error);
  };
  window.onrejectionhandled = (error) => {
    //handleParseError(error);
  };
});
