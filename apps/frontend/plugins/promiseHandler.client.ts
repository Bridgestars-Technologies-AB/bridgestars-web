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
    if(process.env.dev) useToast().error(error.reason);
    //handleParseError(error);
  };
  window.onrejectionhandled = (error) => {
    //handleParseError(error);
  };
});
