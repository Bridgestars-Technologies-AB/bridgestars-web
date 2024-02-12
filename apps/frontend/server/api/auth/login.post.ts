import jwt from "jsonwebtoken";

const SECRET = "dummy";

export default defineEventHandler(async (event) => {
  return $fetch(process.env.BACKEND_URL + "/api/internal/login", {
    body: await readBody(event),
    method: "POST",
  })
    .then((data) => {
      console.log("SUCCCES")
      const token = jwt.sign({ token: data.token }, SECRET, {
        expiresIn: "30d",
      });
      return {
        token:  token,
      };
    })
    .catch((response) => {
      throw new Error(response.statusText);
    });
});
