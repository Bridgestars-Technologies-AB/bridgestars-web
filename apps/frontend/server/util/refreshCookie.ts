export default function refreshCookie(event){
  const cookies = parseCookies(event);
  if (cookies["XSRF-TOKEN"]) {
  }
    console.log(JSON.stringify((cookies)))
  return cookies["XSRF-TOKEN"] 
}
