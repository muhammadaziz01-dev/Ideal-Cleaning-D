import { http } from "../config";

// ----------------> Instance Orders <-------------------------------------
export interface postData{
  amount: number|string,
  client_phonenumber: string,
  cliet_full_name: string,
  service_id: string
}

export interface getData{
    page:number;
    limit:number;
}

export interface UpdateData {
  amount: number |string,
  client_id: string,
  id: string,
  service_id: string,
  status: string
}

export interface Orders{
    ordersPost : (data:postData)=> any,
    ordersDelete : (id:string)=> any,
    ordersGet : (data:getData)=> any,
    ordersUpdate : (data:UpdateData)=> any,
}

// ---------> Interface Srore Orders <--------------------
export interface StoreOrders {
    isLoader:boolean;
    data:any[];
    totleCuont: number;
    getOrderData: (data:getData)=> Promise <any>;
    postOrderData: (data:postData)=> Promise <any>;
    deleteOrderData: (id:string)=> Promise <any>;
    updateOrderData: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Services <----------------------------
export const orders:Orders = {
    ordersPost: (data)=> http.post("/order" , data),
    ordersDelete: (id)=> http.delete(`/order?id=${id}`),
    ordersGet: (data)=> http.get(`/order/all?page=${data.page}&limit=${data.limit}`),
    ordersUpdate: (data)=> http.put(`/order`, data)
}