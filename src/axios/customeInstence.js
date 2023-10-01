import axios from "axios";

const url='http://localhost:8000'
const token=sessionStorage.getItem('token')

export const fetchBlogs=axios.create({
    method:"get",
    baseURL:`${url}/blogs`,
    headers:{
        Accept:"application/json"
    }
})

export const authFetch=axios.create({
    method:"post",
    baseURL:`${url}`,
    headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
    }
})

export const authFetchDel=axios.create({
    method:"delete",
    baseURL:`${url}`,
    headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
    }
})