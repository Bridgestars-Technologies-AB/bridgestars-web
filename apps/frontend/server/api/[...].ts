import * as laravel from "~/server/util/laravel";

export default defineEventHandler(async (event) => {
  return laravel.get(event, event.node.req.originalUrl)
});
