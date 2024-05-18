
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import { ToastContainer, toast } from "react-toastify";

import { Modal1, TestTable , GlobalPagination } from "@ui";
import { services } from "@services";
import{ useServeceStore }from "@store"
import "./style.scss"


const index = () => {

    const {getData , data , isLoader , deleteData , totleCuont} = useServeceStore()
    
    
    const [parms , setParams] =useState({ page:1, limit:8 })
    
    const totleCuont2 = Math.ceil(totleCuont / parms?.limit) 

    // theder uchun kegan malumotga mos data 
    const theader = [
        {title: "" , value:"id"},
        {title: "T/R" , value:"t/r"},
        {title: "Xizmat nomi" , value:"name"},
        {title: "Narxi (so‘m)" , value:"price"},
        {title: "Action" , value:"action"}
      ]
    

    // Function useEfect ----------  
    useEffect(()=>{
        getData(parms)
    },[parms, getData])

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get("page");
        const pageNuber = page ? parseInt(page): 1;
        setParams(preParams=>({
           ...preParams,
            page:pageNuber
        }));
        
    },[location.search]);
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



    //--- pagination tett mui <----
    const changePage = (value:number)=>{
        setParams(preParams=>({
            ...preParams,
            page:value
        }));
     }
     //=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-



     // Delete data ids  --------------------------------
     const [dataIds , setDataIds] = useState([])
     const deletDataIds:(data:string[])=>void = async(data)=>{
          try{
             if(data.length){
                 data.forEach(async(id:string)=>{
 
                     const res = await services.servicesDelete(id)
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
          <Modal1  />
        </div>
    </div>
    <TestTable heders={theader} body={data} skelatonLoader={isLoader} deletIdData={deleteData}  setDataIds={setDataIds} dataIds={dataIds}  />
    <GlobalPagination totleCuont={totleCuont2} page={parms.page} setParams={changePage} />
    </>
};

export default index;

















