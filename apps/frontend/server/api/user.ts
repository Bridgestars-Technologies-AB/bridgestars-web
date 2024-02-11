
export default defineEventHandler(async(event) =>{
  const cookies = parseCookies(event)
  const auth_token_cookie = cookies['auth']
  return $fetch(process.env.BACKEND_URL + "/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    }
  })
});
