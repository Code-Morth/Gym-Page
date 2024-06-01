export default function apisPeticion() {
  const url ="https://powergym-api-eex9.onrender.com/api/v1"
  // const url = "https://localhost:8000"
    const login = `${url}/user/login`
    const postUser = `${url}/user`
    const allUser = `${url}/user?page=0&size=9999`


    
    return { login , postUser , allUser , url}
  }