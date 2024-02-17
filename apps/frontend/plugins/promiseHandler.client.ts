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
    console.log(error.reason);
    const response = error?.reason?.response;
    if (response) {
      const data = response.data;
      if (data?.data?.message) {
        useToast().error(data.data.message);
      } else if (data?.message) {
        useToast().error(data.message);
      } else if (response.message) {
        useToast().error(response.message);
      }
    } else if (error?.reason?.message) {
      useToast().error(error.reason.message);
    }

    //handleParseError(error);
  };
  window.onrejectionhandled = (error) => {
    //handleParseError(error);
  };
});
