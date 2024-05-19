
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { clients , StoreClients } from '@clients';

const useClientsStore = create <StoreClients> ((set)=>({
    isLoader: false,
    data: [],
    totleCuont: 0,
    getClientsData : async(data)=>{
        try{
           set({isLoader: true})
           const respons = await clients.clientsGet(data)
        //    console.log(respons)
           if(respons.status === 200){
               set({data: respons?.data?.clients_list})
               set({totleCuont:respons?.data?.total})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        // set({isLoader: false})
       }
       
    },
    deleteClientsData: async(id)=>{
        try{
           const respons = await clients.clientsDelete(id)
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

}))

export default useClientsStore