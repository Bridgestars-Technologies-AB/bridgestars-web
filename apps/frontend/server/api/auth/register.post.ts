import * as laravel from "~/server/util/laravel";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event<Request>) => {
  return laravel.post(event, "/api/auth/register").then((data) => {
    if (data && data.token) {
      setCookie(event, "auth", data.token as string, {
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "strict",
        httpOnly: true,
      });
    } else {
      throw new Response("Unathorized", 403);
    }
  });
});
