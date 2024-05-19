import { http } from "../config";
import {getCookies} from "@cookie"

// ----------------> Instance Clients <-------------------------------------

export interface getData{
    page:number;
    limit:number;
    name?:string;
}



export interface Clients{
    clientsDelete : (id:string)=> any,
    clientsGet : (data:getData)=> any,
}

// ---------> Interface Srore Clients <--------------------
export interface StoreClients {
    isLoader:boolean;
    data:any[];
    totleCuont: number;
    getClientsData: (data:getData)=> Promise <any>;
    deleteClientsData: (id:string)=> Promise <any>;
}




// ----------------> Instance Services <----------------------------
export const clients:Clients = {
    clientsGet: (data)=> http.get(`/client/all?page=${data.page}&limit=${data.limit}`),//&name=${data.name}
    clientsDelete: (id)=> {
        const owner_id = getCookies("user-id") ;
       return http.delete(`/v1/client?client_id=${id}&owner_id=${owner_id}`)
    }
}