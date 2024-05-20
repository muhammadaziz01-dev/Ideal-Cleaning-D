import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  Paper,
  Skeleton,
} from "@mui/material";
import { useSearchParams } from 'react-router-dom';

import {Props} from "@globol-interface"
import{ ModalServicesEdit} from '@ui';
import {OrderModalEdit , OrderStatus}from "@modals"
// import { services } from "@services";



function index({ heders, body , skelatonLoader , deletIdData  , dataIds , setDataIds}:Props) {

  const [searchPaams] = useSearchParams();
  const page = Number(searchPaams.get("page")) || 1;
  const limit = Number(searchPaams.get("limit")) || 8;
 


 // Deleted cheng datas <--------------------------------
 const dataIdisChanged = (id:string) => {
  // console.log(id);
  if(dataIds.length){
    if(dataIds.includes(id)){
        setDataIds(dataIds.filter((item:string) => item!== id))
        // console.log(dataIds);
        
      }else{
        setDataIds([...dataIds, id])
        // console.log(dataIds);
      }
  }else{
    setDataIds([...dataIds , id])
    // console.log(dataIds);
  } 
}

 //-------------------------------------------------------



  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {
                    heders?.map((heder , index)=>{
                        return <TableCell key={index}>
                            <TableSortLabel>
                                {heder.title}
                            </TableSortLabel>
                        </TableCell>
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  skelatonLoader ? Array.from(new Array(5)).map((_, index)=>{
                    return <TableRow key={index}>
                      {
                        heders?.map((_, index2)=>{
                          return <TableCell key={index2}><Skeleton /></TableCell>
                        })
                      }
                    </TableRow>
                  })

                  : body?.map((body, index)=>{
                    return <TableRow key={index}>
                      {
                        heders?.map((heder, index2)=>{
                          return <TableCell key={index2}>{
                            heder.value == "action" ? <div className="flex items-center gap-2">
                                <button className=' text-gray-500' onClick={()=>deletIdData(body?.id)}><DeleteIcon/></button>
                                <ModalServicesEdit data={body} />
                            </div>
                            :heder.value == "action2" ? <div className="flex items-center gap-2">
                            <button className=' text-gray-500' onClick={()=>deletIdData(body?.id)}><DeleteIcon/></button>
                            <OrderModalEdit propsData = {body}/>
                            </div>
                            :heder.value == "action3" ? <div className="flex items-center gap-2">
                            <button className=' text-gray-500' onClick={()=>deletIdData(body?.id)}><DeleteIcon/></button>
                            {/* <OrderModalEdit propsData = {body}/> */}
                            </div>
                            : heder.value == "id" ? <input type="checkbox" onChange={()=>{dataIdisChanged(body?.id)}} />
                            : heder.value == "t/r" ? <p>{page * limit -(limit - 1) +index }</p>
                            : heder.value == "created_at" ? <p>{body?.created_at?.slice(0, 10)}</p>
                            : heder.value == "status" ? <div className='flex items-center gap-2'>
                               <p className={body?.status == "in_process" ? " text-red-500 font-medium text-[16px] " : body?.status == "done" ? " text-cyan-500 font-medium text-[16px] " : body?.status == "taken" ? " text-lime-500 font-medium text-[16px] " :""}>{body?.status}</p>
                               <OrderStatus orderId={body?.id}/>
                            </div>
                            : (body[heder.value])
                          }</TableCell>
                        })
                      }
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default index;
