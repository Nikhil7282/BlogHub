import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000'
// axios.defaults.baseURL="https://blohhub.onrender.com"
axios.defaults.headers.common['Authorization']=`Bearer ${sessionStorage.getItem("token")}`
axios.defaults.headers.common['Accept']="application/json"
