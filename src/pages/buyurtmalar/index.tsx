
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import { ToastContainer, toast } from "react-toastify";

import {  TestTable } from "@ui";
import { orders } from "@orders";
import{ useOrderStore }from "@store"
import {OrdersMadal}from "@modals"
import "./style.scss"


const index = () => {

    const {getOrderData , data , isLoader , deleteOrderData} = useOrderStore()
    
    
    const [parms] =useState({ page:1, limit:10 })

    data.forEach((item, index)=>{
        item.index = parms.page * parms.limit - (parms.limit-1)+ index;
    })

    // theder uchun kegan malumotga mos data 
    const theader = [
        {title: "" , value:"id"},
        {title: "T/R" , value:"index"},
        {title: "Xizmat turi" , value:"service_id"},
        {title: "Xizmat narxi" , value:"price"},
        {title: "Miqdorint" , value:"amount"},
        {title: "Buyurtirildi" , value:"created_at"},
        {title: "Xolati" , value:"status"},
        {title: "Action" , value:"action2"}
      ]
    

    // Functions useEffects to get data <--------
    useEffect(()=>{
        getOrderData(parms)
    },[parms, getOrderData]);
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    


     // Delete data ids  --------------------------------
     const [dataIds , setDataIds] = useState([])
     const deletDataIds:(data:string[])=>void = async(data)=>{
          try{
             if(data.length){
                 data.forEach(async(id:string)=>{
 
                     const res = await orders.ordersDelete(id)
                     if(res.status === 200){
                         toast.success("deleted full")
                        //  getServese()
                     }
                 })
             }
             setDataIds([])
         }catch(error){
             toast.error("Couldn't delete")
             console.log(error)
         }
     }
     //=====================================================
 


    return <>
    <ToastContainer/>
    <div className="flex items-center justify-between mb-5">
        <div className="w-96">
           <Paper 
           component="form"
           sx={{p:"2px 4px", width:400 , alignItems: "center" , display: "flex"}}>
            <InputBase
             sx={{ml:1 , flex :1}}
             placeholder="Qidiruv"
             inputProps={{"aria-label":"serch google maps"}}/>
            <IconButton type="button" sx={{p: "10px"}} aria-label="search">
                <SearchIcon/>
            </IconButton>

           </Paper>
        </div>
        <div className="flex items-center gap-2">
          {
            dataIds.length > 1 ? <button onClick={()=>deletDataIds(dataIds)} className="bg-red-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 active:bg-red-500 duration-200">O'chirish</button> : null
          }
          <OrdersMadal  />
        </div>
    </div>
    <TestTable heders={theader} body={data} skelatonLoader={isLoader} deletIdData={deleteOrderData}  setDataIds={setDataIds} dataIds={dataIds}  />
    </>
};

export default index;













