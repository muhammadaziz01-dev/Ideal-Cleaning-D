import axios from "axios";
import {getCookies}from "@cookie"

const http:any = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL  
})

 http.interceptors.request.use((config:any)=>{
    let token = getCookies("acses-token");//localStorage.getItem("token")
    if(token){
        config.headers.Authorization = ` ${token}`;
    }
    return config;
})


export  { http };

