import { H3Event } from "h3";

export async function post(event: H3Event<Request>, path: string) {
  return $fetch(process.env.BACKEND_URL + path, {
    method: "POST",
    body: await readBody(event),
    // @ts-expect-error accept is apparently not a valid header, according to ofetch
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + parseCookies(event)["auth"],
      "X-Api-Key": process.env.API_KEY,
    },
  });
}

export function get(event: H3Event<Request>, path: string) {
  return $fetch(process.env.BACKEND_URL + path, {
    method: "GET",
    // @ts-expect-error accept is apparently not a valid header, according to ofetch
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + parseCookies(event)["auth"],
      "X-Api-Key": process.env.API_KEY,
    },
  });
}
