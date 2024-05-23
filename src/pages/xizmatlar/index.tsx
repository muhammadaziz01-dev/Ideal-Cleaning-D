
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Modal1, TestTable , GlobalPagination , GlobalSearch } from "@ui";
import { services } from "@services";
import{ useServeceStore }from "@store"
import "./style.scss"
import { useLocation, useNavigate } from "react-router-dom";


const index = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {getData , data , isLoader , deleteData , totleCuont} = useServeceStore()
    const [search , setSearch] =useState("")
    const [parms , setParams] =useState({ page:1, limit:8 , name: search})
    
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
    },[parms, search])

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get("page");
        const pageNuber = page ? parseInt(page): 1;
        const search = params.get("search");
        const searchString = search ? search : "";
        setParams(preParams=>({
           ...preParams,
            page:pageNuber,
            name: searchString
        }));
        setSearch(searchString)
        
    },[location.search ]);
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
 

     const hendelChange = (e:any)=>{
        const search = e.target.value
        setSearch(search)
        setParams(preParams=>({
           ...preParams,
            name:search
        }))
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("search", search)
        navigate (`?${searchParams}`)

     }

    return <>
    <ToastContainer/>
    <div className="flex items-center justify-between mb-5">
       <GlobalSearch search={search} hendelChange={hendelChange} />
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

















