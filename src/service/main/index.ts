import { http } from "../config";

// ----------------> Instance Mian <-------------------------------------


export interface Main{
    mainGet : ()=> any,
}

interface MainData{
    client_count: number,
    order_count: number,
    sms_count: number,
    service_count: number
}

// ---------> Interface Srore Mian <--------------------
export interface StoreMain {
    isLoader:boolean;
    data:MainData;
    getMainData: ()=> Promise <any>;
}




// ----------------> Instance Services <----------------------------
export const main:Main = {
    mainGet: ()=> http.get(`/main`),
}