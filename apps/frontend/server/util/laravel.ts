export async function post(event, path){
  return $fetch(process.env.BACKEND_URL + path, {
    method: "POST",
    body: await readBody(event),
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "Authorization": "Bearer " + parseCookies(event)["auth"],
      "X-Api-Key": process.env.API_KEY,
    },
  });
}

export function get(event, path){
  return $fetch(process.env.BACKEND_URL + path, {
    method: "GET",
    //body: await readBody(event),
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "Authorization": "Bearer " + parseCookies(event)["auth"],
      "X-Api-Key": process.env.API_KEY,
    },
  });
}
