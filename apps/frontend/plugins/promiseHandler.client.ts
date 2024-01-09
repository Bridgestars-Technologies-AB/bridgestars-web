async function handleParseError(error: { reason: { code: number } }): void {
  if (error.reason.code == 209) {
    useAuth()
      .signOut()
      .catch(() => {});
    await navigateTo("/auth/sign-in");
    useToast().error("You have been signed out", { timeout: false });
  }
}

export default defineNuxtPlugin(() => {
  window.onunhandledrejection = (error) => {
    handleParseError(error);
  };
  window.onrejectionhandled = (error) => {
    handleParseError(error);
  };
});
