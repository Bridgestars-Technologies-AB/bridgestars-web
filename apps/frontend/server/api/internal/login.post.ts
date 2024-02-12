
export default defineEventHandler(async(event) =>{
  console.log(event)
  // return $fetch(process.env.BACKEND_URL + "/api/internal/login", {
  //   method: "POST",
  //   body: await readBody(event),
  // })
});
