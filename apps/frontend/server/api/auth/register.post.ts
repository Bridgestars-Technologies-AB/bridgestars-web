import * as laravel from "~/server/util/laravel";

export default defineEventHandler(async (event) => {
  return laravel.post(event, "/api/auth/register").then((data) => {
    setCookie(event, "auth", data.token, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
      httpOnly: true,
    });
  });
});
