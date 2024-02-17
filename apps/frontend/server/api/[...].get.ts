import * as laravel from "~/server/util/laravel";

export default defineEventHandler(async (event) => {
  console.log("GET REQUEST")
  return laravel.get(event, event.node.req.originalUrl)
});
