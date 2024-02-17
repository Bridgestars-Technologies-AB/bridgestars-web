import jwt from "jsonwebtoken";
import * as crypto from '~/server/util/crypto'
import * as laravel from '~/server/util/laravel'

const SECRET = "dummy";
const ENCRYPTION_SECRET = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

export default defineEventHandler(async (event) => {
  return laravel.post(event, "/api/auth/login")
  .then((data) => {
      setCookie(event, "auth", data.token, {
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        httpOnly: true 
      })
    })

  // return $fetch(process.env.BACKEND_URL + "/api/internal/login", {
  //   body: await readBody(event),
  //   method: "POST",
  // })
  //   .then((data) => {
  //     console.log(data)
  //     const token = jwt.sign({ token: data.token }, SECRET, { expiresIn: "30d"});
  //
  //     const cookie = crypto.encryptCookie(token, {
  //       algorithm: crypto.defaultAlgorithm,
  //       key: ENCRYPTION_SECRET,
  //     })
  //
  //     setCookie(event, "auth", data.token, {
  //       maxAge: 60 * 60 * 24 * 30,
  //       sameSite: 'strict'
  //     })
  //
  //     return;
  //   })
});
