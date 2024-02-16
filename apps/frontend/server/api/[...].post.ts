import * as laravel from "~/server/util/laravel";

export default defineEventHandler(async (event) => {
  console.log("POST REQUEST")
  return laravel.post(event, event.node.req.originalUrl)
});

