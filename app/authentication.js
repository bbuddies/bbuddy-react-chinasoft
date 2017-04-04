class Authentication{
  signedIn(){
    return false
  }
}

let auth = new Authentication()

export default function requireAuth(nextState, replace){
  if (!auth.signedIn()){
    replace({
      pathname: "/signin",
      state: {nextPathname: nextState.location.pathname}
    })
  }
}
