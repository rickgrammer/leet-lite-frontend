import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  // baseURL: 'https://jsonplaceholder.typicode.com/',
  withCredentials: true
})

export default api
