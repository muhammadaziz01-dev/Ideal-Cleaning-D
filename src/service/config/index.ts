import axios from "axios";
import {getCookies, setCookies}from "@cookie"

const http:any = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL  
})

async function  refreshAccsesToken (){
     try{
    const refresh_token = getCookies("refresh-token")
    // console.log(refresh_token);
    
    if(!refresh_token){
        throw new Error ("Refresh token not found in cookie ") 
    }else{
        const response = await axios.post(`https://app.olimjanov.uz/v1/auth/refresh-accesstoken/${refresh_token}`)
        const {access_token} = response.data;
        console.log(access_token);
        setCookies("acses-token", access_token)
        return access_token;
    }
     }catch(error){
       console.log(error);
       
     }
}

 http.interceptors.request.use((config:any)=>{
    let token = getCookies("acses-token");
    if(token){
        config.headers.Authorization = ` ${token}`;
    }
    return config;
})

http.interceptors.response.use((response:any)=>{
    return response
}, async (error :any)=>{
    if(error.response && error.response.status === 401){
       const access_token =  await refreshAccsesToken();
    //    console.log(access_token);
       
       if(access_token){
          const originalRequest = error.config
          originalRequest.headers["Authorization"] = access_token
       }else{
         console.error("Access token not found in config file " + error.config)
         return Promise.reject(error)
       }
    }
})



export  { http };

