export default function handleInvalidSessionError(error, signedOutCallback) {
  if (error?.message?.includes("Invalid session token") ?? false) {
    console.log("Invalid session token, signing out...")
    Parse.User._clearCache(); signedOutCallback()
    return true;
  }
  else return false;
}