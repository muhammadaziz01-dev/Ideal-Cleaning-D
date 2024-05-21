import { http } from "../config";

// ----------------> Instance Mian <-------------------------------------


export interface Main{
    mainGet : ()=> any,
    orderGet : (data:GetOrderData)=> any,
}

interface MainData{
    client_count: number,
    order_count: number,
    sms_count: number,
    service_count: number
}

interface GetOrderData {
    start:string | undefined;
    end:string;
}

interface DataOrder {
  all_orders: number,
  done:number,
  in_process:number,
  taken:number
}

// ---------> Interface Srore Mian <--------------------
export interface StoreMain {
    isLoader:boolean;
    data:MainData;
    dataOrder: DataOrder ;
    getMainData: ()=> Promise <any>;
    getOrderData: (data:GetOrderData)=> Promise <any>;
}




// ----------------> Instance Services <----------------------------
export const main:Main = {
    mainGet: ()=> http.get(`/main`),
    orderGet: (data)=> http.get(`https://app.olimjanov.uz/v1/orders?start=${data.start}&end=${data.end}`)
}