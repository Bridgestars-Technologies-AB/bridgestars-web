import * as Sentry from "@sentry/vue";

function handleParseError(error: { reason: { code: number } }) {
  if (error.reason.code == 209) {
    useAuth()
      .logout()
      .catch(() => {});
    //await navigateTo("/auth/sign-in");
    useToast().error("You have been signed out", { timeout: false });
  }
}

/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
export default defineNuxtPlugin(() => {
  window.onunhandledrejection = (error: PromiseRejectionEvent) => {
    //if(process.env.dev)
    if (error && error.reason) {
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
      Sentry.captureException(error);
    }

    //handleParseError(error);
  };
  window.onrejectionhandled = (error) => {
    //handleParseError(error);
  };
});
/* @eslint-enable */
