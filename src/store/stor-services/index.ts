
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { services, StoreServices } from '@services';

const useServeceStore = create <StoreServices> ((set)=>({
    isLoader: false,
    data: [],
    totleCuont: 0,
    getData : async(data)=>{
        try{
           set({isLoader: true})
           const respons = await services.servicesGet(data)
        //    console.log(respons)
           if(respons.status === 200){
               set({data: respons?.data?.services});
               set({totleCuont: respons?.data?.total});
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        // set({isLoader: false})
       }
       
    },
    postData: async(data)=>{
        try{
           const respons = await services.servicesPost(data)
           console.log(respons)
           if(respons.status === 201){
               set((state)=>({data: state.data.length > 8 ? [...state.data, respons.data ] : [...state.data]})) 
               set((state)=>({totleCuont: state.totleCuont += 1}))
               return respons?.status
           }
        }catch(error){
            console.log(error)
        }
    },
    deleteData: async(id)=>{
        try{
           const respons = await services.servicesDelete(id)
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
    updateData: async(data)=>{
        try{
        const respons = await services.servicesUpdate(data)
        if(respons?.status ===200){
            set((state)=>({data: state.data.map((el:any)=>el.id === data.id? data : el)}))
            toast.success("Updated successfully")
            return respons?.status
        }
        
        }catch(error:any){
            console.log(error)
            toast.error("Error : " + error?.message)
        }
    }

}))

export default useServeceStore