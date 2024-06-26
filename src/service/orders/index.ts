import { http } from "../config";

// ----------------> Instance Orders <-------------------------------------
export interface postData{
  amount: number|string,
  client_phone_number: string,
  client_full_name: string,
  service_id: string
}

export interface getData{
    page:number;
    limit:number;
    name?:string;
}

export interface UpdateData {
  amount: number |string,
  client_id: string,
  id: string,
  service_id: string,
  status: string
}

export interface updateStatus{
    order_id:string;
    status:string;
}

export interface Orders{
    ordersPost : (data:postData)=> any,
    ordersDelete : (id:string)=> any,
    ordersGet : (props:getData)=> any,
    ordersUpdate : (data:UpdateData)=> any,
    ordersStatusUpdate:(data:updateStatus)=> any
}

// ---------> Interface Srore Orders <--------------------
export interface StoreOrders {
    isLoader:boolean;
    data:any[];
    totleCuont: number;
    getOrderData: (props:getData)=> Promise <any>;
    postOrderData: (data:postData)=> Promise <any>;
    deleteOrderData: (id:string)=> Promise <any>;
    updateOrderData: (data:UpdateData)=> Promise <any>;
    updateOrderStatus: (data:updateStatus)=> Promise <any>;
}




// ----------------> Instance Services <----------------------------
export const orders:Orders = {
    ordersPost: (data)=> http.post("/order" , data),
    ordersDelete: (id)=> http.delete(`/order?id=${id}`),
    ordersGet: (props)=> http.get(`/order/search?page=${props.page}&limit=${props.limit}&name=${props.name}`),//&name=${data.name}
    ordersUpdate: (data)=> http.put(`/order`, data),
    ordersStatusUpdate: (data) => http.put(`/order/status?order_id=${data?.order_id}&status=${data?.status}`)
}