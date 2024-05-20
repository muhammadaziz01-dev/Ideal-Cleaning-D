
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { orders ,StoreOrders} from '@orders';

const useOrderStore = create <StoreOrders> ((set)=>({
    isLoader: false,
    data: [],
    totleCuont: 0,
    getOrderData : async(data)=>{
        try{
           set({isLoader: true})
           const respons = await orders.ordersGet(data)
        //    console.log(respons)
           if(respons.status === 200){
               set({data: respons?.data?.orders_list})
               set({totleCuont:respons?.data?.total})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        // set({isLoader: false})
       }
       
    },
    postOrderData: async(data)=>{
        try{
           const respons = await orders.ordersPost(data)
        //    console.log(respons)
           if(respons.status === 201){
               set((state)=>({data: state.data.length < 8 ?[...state.data, respons?.data] : [...state.data]})) 
               set((state)=>({totleCuont: state.totleCuont += 1}))
               return respons?.status
           }
        }catch(error){
            console.log(error)
        }
    },
    deleteOrderData: async(id)=>{
        try{
           const respons = await orders.ordersDelete(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({data: state.data.filter((el:any)=>el.id!== id)})) 
               set((state)=>({totleCuont: state.totleCuont -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
            toast.error("Error : " + error?.message)
        }
    },
    updateOrderData: async(data)=>{
        try{
        const respons = await orders.ordersUpdate(data)
        if(respons?.status ===200){
            set((state)=>({data: state.data.map((el:any)=>el.id === data.id? data : el)}))
            toast.success("Updated successfully")
            return respons?.status
        }
        
        }catch(error:any){
            console.log(error)
            toast.error("Error : " + error?.message)
        }
    },
    updateOrderStatus: async (data)=>{
        try{
        const respons = await orders.ordersStatusUpdate(data)
        if(respons?.status ===200){
            set((state)=>({data: state.data.map((el:any)=>el.id === data.order_id ? respons.data : el)}))
            toast.success("Updated status successfully")
            return respons?.status
        }
        
        }catch(error:any){
            console.log(error)
            toast.error("Error : " + error?.message)
        }
    }

}))

export default useOrderStore