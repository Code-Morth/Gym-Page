export default function apisPeticion() {
  const url ="https://powergym-api-eex9.onrender.com/api/v1"
    const login = `${url}/user/login`
    const postUser = `${url}/user`
    const allUser = `${url}/user`


    
    return { login , postUser , allUser, url}
  }