
import * as laravel from '~/server/util/laravel'


export default defineEventHandler(async (event) => {
  return laravel.post(event, "/api/auth/forgot-password")
});
