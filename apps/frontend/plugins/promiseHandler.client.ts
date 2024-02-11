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
    const response = error?.reason?.response;
    if (response){
      const data = response.data;
      if(data?.data?.message){
        useToast().error(data?.data?.message);
      }
      else if(data?.message){
        useToast().error(data?.message);
      }
    }

    //handleParseError(error);
  };
  window.onrejectionhandled = (error) => {
    //handleParseError(error);
  };
});
