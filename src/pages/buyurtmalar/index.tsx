
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {  useLocation , useNavigate} from "react-router-dom";
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';


import { orders } from "@orders";
import{ useOrderStore }from "@store";
import {OrdersMadal}from "@modals";
import {GlobalPagination , TestTable , GlobalSearch}from "@ui"
import "./style.scss";


const index = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const {getOrderData , data , isLoader , deleteOrderData, totleCuont} = useOrderStore()
    // console.log(data);
    
    const [search , setSearch]= useState("")
    const [params , setParams]= useState({ page:1, limit:8, name: search })
    
    const totleCuont2 = Math.ceil(totleCuont / params?.limit) 

    
    // theder uchun kegan malumotga mos data 
    const theader = [
        {title: "" , value:"id"},
        {title: "T/R" , value:"t/r"},
        {title: "Mijozning ismi" , value:"client_name"},
        {title: "Xizmat turi" , value:"service_name"},
        {title: "Xizmat narxi" , value:"price"},
        {title: "Miqdori" , value:"amount"},
        {title: "Buyurtirildi" , value:"created_at"},
        {title: "Xolati" , value:"status"},
        {title: "Action" , value:"action2"}
      ]
    

    // Functions useEffects to get data <--------
    useEffect(()=>{
        getOrderData(params)
    },[params, search]);

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
        
    },[location.search]);
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
 

     //--- pagination tett mui <----
     const changePage = (value:number)=>{
        setParams(preParams=>({
            ...preParams,
            page:value
        }));
     }
     //=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-


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
        {/* <div className="w-96">
           <Paper 
           component="form"
           sx={{p:"2px 4px", width:400 , alignItems: "center" , display: "flex"}}>
            <InputBase
             sx={{ml:1 , flex :1}}
             placeholder="Qidiruv"
             value={search}
             onChange={hendelChange}
             inputProps={{"aria-label":"serch google maps"}}/>
            <IconButton type="button" sx={{p: "10px"}} aria-label="search" >
                <SearchIcon/>
            </IconButton>

           </Paper>
        </div> */}
        <GlobalSearch search={search}  hendelChange={hendelChange}/>
        <div className="flex items-center gap-2">
          {
            dataIds.length > 1 ? <button onClick={()=>deletDataIds(dataIds)} className="bg-red-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 active:bg-red-500 duration-200">O'chirish</button> : null
          }
          <OrdersMadal  />
        </div>
    </div>
    <TestTable heders={theader} body={data} skelatonLoader={isLoader} deletIdData={deleteOrderData}  setDataIds={setDataIds} dataIds={dataIds}  />
    
    <GlobalPagination totleCuont={totleCuont2} page={params.page} setParams={changePage} />
    
    </>
};

export default index;













