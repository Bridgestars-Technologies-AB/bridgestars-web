function handleParseError(error) {
  if(error.reason.code == 209){
    useAuth().signOut().catch(e => {});
    navigateTo("/auth/sign-in")
    useToast().error("You were signed out because somebody else is using this account",{timeout: false});
  }
}

export default defineNuxtPlugin((nuxtContext) => {
  window.onunhandledrejection = (error) => {
    handleParseError(error)
    console.log("via plugin: ", error)

  }
  window.onrejectionhandled = (error) => {
    handleParseError(error)
    console.log("via plugin: ", error)
  }
})
