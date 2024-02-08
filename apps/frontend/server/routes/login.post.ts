import refreshCookie from "../util/refreshCookie";

export default defineEventHandler(async (event) => {
  const xsrfToken = refreshCookie(event);
  const body = await readBody(event)

  const {data, error} = await $fetch("/backend/login", {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
      "x-xsrf-token": xsrfToken 
    },
    body: body  });
})
