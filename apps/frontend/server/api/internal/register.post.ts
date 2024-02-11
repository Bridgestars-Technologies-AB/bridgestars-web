export default defineEventHandler(async(event) =>{
  return $fetch(process.env.BACKEND_URL + "/api/internal/register", {
    method: "POST",
    body: await readBody(event),
  })
});
