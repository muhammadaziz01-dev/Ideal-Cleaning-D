import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {getCookies}from "@cookie"
import {useMainStore } from "@store"
import "./style.scss";




const index = () => {

  const navigate = useNavigate();
  const {getMainData , data}= useMainStore();
  console.log(data);
  

  // Cantrol User token <-------------------------------------
  useEffect(() => {
    if (getCookies("acses-token")) {
      navigate("/main");
    } else {
      navigate("/signin");
    }
  }, []);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


  useEffect(()=>{
    getMainData()
  },[])

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between flex-wrap gap-y-4 ">
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={data.client_count} duration={1}/> ta</h1>
            <p className="text-[30px] font-semibold text-center">Foydalanuvchi</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={data.order_count} duration={1}/> ta</h1>
            <p className="text-[30px] font-semibold text-center">Buyurtma</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={data.sms_count} duration={1}/> ta</h1>
            <p className="text-[30px] font-semibold text-center">SMS jo‘natildi</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center"><CountUp end={data.service_count} duration={1}/> xil</h1>
            <p className="text-[30px] font-semibold text-center">Xizmat</p>
          </div>
        </div>
        <div className='py-10 px-10 rounded-[30px] shadow-lg mt-[50px]'> 
              <h1 className='text-[44px] font-semibold mb-4'>Buyurtmalar:</h1>
              <div className="flex items-center justify-between flex-wrap">
                <div>
                  <p className='text-[30px] font-semibold'>Barchasi</p>
                  <h1 className='text-[45px] font-semibold text-[#2389DA]'><CountUp end={423} duration={2}/> ta</h1>
                </div>
                <div>
                  <p className='text-[30px] font-semibold'>Tayyor</p>
                  <h1 className='text-[45px] font-semibold text-[#2389DA]'><CountUp end={100} duration={2}/> ta</h1>
                </div>
                <div>
                  <p className='text-[30px] font-semibold'>Tozalanmoqda</p>
                  <h1 className='text-[45px] font-semibold text-[#2389DA]'><CountUp end={200} duration={2}/> ta</h1>
                </div>
                <div>
                  <p className='text-[30px] font-semibold'>Olib ketildi</p>
                  <h1 className='text-[45px] font-semibold text-[#2389DA]'><CountUp end={123} duration={2}/> ta</h1>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default index;
