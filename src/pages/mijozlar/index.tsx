import { useEffect , useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import { ToastContainer , toast } from "react-toastify";
import {  useLocation} from "react-router-dom";

import { TestTable , GlobalPagination} from "@ui"
import { useClientsStore} from "@store"
import {clients} from "@clients"
import "./style.scss"

const index = () => {
 
    const location = useLocation();
    const { getClientsData , data , isLoader , deleteClientsData , totleCuont} = useClientsStore()
    const [params , setParams] = useState({page:1 , limit:8} )
    const totleCuont2 = Math.ceil(totleCuont / params?.limit) 


    // Function useEffects <---------------------
    useEffect(() => {
        getClientsData(params)
    }, [params])
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get("page");
        const pageNuber = page ? parseInt(page): 1;
        setParams(preParams=>({
           ...preParams,
            page:pageNuber
        }));
        
    },[location.search]);
    //=-=-=-=-=-=-=-=-=-=-=-=-=----=---=-=-=-=-=-=-=-==-=-=-=

    //--- pagination tett mui <----
    const changePage = (value:number)=>{
        setParams(preParams=>({
            ...preParams,
            page:value
        }));
     }
     //=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-



    // theder uchun kegan malumotga mos data 
    const theader = [
        {title: "" , value:"id"},
        {title: "T/R" , value:"t/r"},
        {title: "Mijoz ismi" , value:"full_name"},
        {title: "Mijoz raqami" , value:"phone_number"},
        {title: "Action" , value:"action3"}
    ]



    // Delete data ids  --------------------------------
    const [dataIds , setDataIds] = useState([])
    const deletDataIds:(data:string[])=>void = async(data)=>{
         try{
            if(data.length){
                data.forEach(async(id:string)=>{

                    const res = await clients.clientsDelete(id)
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
            //  onChange={(e)=>setSearch(e.target.value)}
             inputProps={{"aria-label":"serch google maps"}}/>
            <IconButton type="button" sx={{p: "10px"}} aria-label="search" >
                <SearchIcon/>
            </IconButton>

           </Paper>
        </div>
        <div className="flex items-center gap-2">
          {
            dataIds.length > 1 ? <button onClick={()=>deletDataIds(dataIds)} className="bg-red-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 active:bg-red-500 duration-200">O'chirish</button> : null
          }
        </div>
    </div>
    <TestTable heders={theader} body={data} skelatonLoader={isLoader} deletIdData={deleteClientsData} dataIds={dataIds} setDataIds={setDataIds}/>
    <GlobalPagination totleCuont={totleCuont2} page={params.page} setParams={changePage} />
    </>
};

export default index;