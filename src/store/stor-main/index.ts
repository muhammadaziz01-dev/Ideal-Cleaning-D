
import { create } from 'zustand' ;
// import { toast } from 'react-toastify'; 
import {StoreMain ,main} from '@main';

const useMainStore = create <StoreMain> ((set)=>({
    isLoader: false,
    data:{client_count: 0, order_count: 0, sms_count: 0, service_count: 0,},
    getMainData : async()=>{
        try{
           set({isLoader: true})
           const respons = await main.mainGet()
           console.log(respons)
           if(respons.status === 200){
               set({data: respons?.data})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        // set({isLoader: false})
       }
       
    }

}))

export default useMainStore