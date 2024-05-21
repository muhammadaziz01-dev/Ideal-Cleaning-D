// import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { CommonlyUsedComponents, PieActiveArc } from "@ui";
import { getCookies } from "@cookie";
import { useMainStore } from "@store";
import "./style.scss";
// import CommonlyUsedComponents from '../../components/ui/data-piker/index';

const index = () => {
  const navigate = useNavigate();
  const { getMainData, data, getOrderData, dataOrder } = useMainStore();
  const date = new Date();
  const end = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const propsDataStatus = [
    {id:0 , value: data?.client_count , label: ` ${data?.client_count} ta foydalanuvchi`, color: "#0066ff"},
    {id:1 , value: data?.order_count , label: ` ${data?.order_count} ta buyurtma` , color: "#009900"},
    {id:2 , value: data?.sms_count , label: ` ${data?.sms_count} ta SMS jo‘natildi`},
    {id:3 , value: data?.service_count , label: ` ${data?.service_count} xil xizmat` , color: "#9966ff"},
  ];
  const propsDataStatus2 = [
    {id:0 , value: dataOrder?.all_orders , label: ` ${dataOrder?.all_orders} ta barcha buyurtmalar` , color: "#ccccff"},
    {id:1 , value: dataOrder?.in_process , label: ` ${dataOrder?.in_process} ta tozalanmoqda` , color: "#ff5050"},
    {id:2 , value: dataOrder?.done , label: ` ${dataOrder?.done} ta tayyor` , color: "#ccff33"},
    {id:3 , value: dataOrder?.taken , label: ` ${dataOrder?.taken} ta olib ketildi` , color: "#66ff66"},
  ];

 
  console.log(end);

  console.log(getCookies("start")?.slice(0, 10));

  const [params, setParams] = useState({
    start: getCookies("start")?.slice(0, 10),
    end: end,
  });

  // Cantrol User token <-------------------------------------
  useEffect(() => {
    if (getCookies("acses-token")) {
      navigate("/main");
    } else {
      navigate("/signin");
    }
  }, []);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const changeParams = (start: string, end: string) => {
    setParams({
      start: start,
      end: end,
    });
  };

  useEffect(() => {
    getMainData();
    getOrderData(params);
  }, [params]);

  console.log(dataOrder);

  return (
    <>
      <div className="">
        <CommonlyUsedComponents changeParams={changeParams} />
        <div className="flex items-center justify-between  mt-[50px]">
            <PieActiveArc data={propsDataStatus} />
            <PieActiveArc data={propsDataStatus2} />
        </div>

        {/* <div className="flex items-center justify-between flex-wrap gap-y-4 mt-5 ">
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center">
              <CountUp end={data.client_count} duration={1} /> ta
            </h1>
            <p className="text-[30px] font-semibold text-center">
              Foydalanuvchi
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center">
              <CountUp end={data.order_count} duration={1} /> ta
            </h1>
            <p className="text-[30px] font-semibold text-center">Buyurtma</p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center">
              <CountUp end={data.sms_count} duration={1} /> ta
            </h1>
            <p className="text-[30px] font-semibold text-center">
              SMS jo‘natildi
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-[280px] h-[300px] rounded-[50px] shadow-lg">
            <h1 className="text-[50px] text-[#2389DA] font-semibold text-center">
              <CountUp end={data.service_count} duration={1} /> xil
            </h1>
            <p className="text-[30px] font-semibold text-center">Xizmat</p>
          </div>
        </div>

        <div className="py-10 px-10 rounded-[30px] shadow-lg mt-[40px]">
          <h1 className="text-[44px] font-semibold mb-4">Buyurtmalar:</h1>
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <p className="text-[30px] font-semibold">Barchasi</p>
              <h1 className="text-[45px] font-semibold text-[#2389DA]">
                <CountUp end={dataOrder?.all_orders} duration={1} /> ta
              </h1>
            </div>
            <div>
              <p className="text-[30px] font-semibold">Tayyor</p>
              <h1 className="text-[45px] font-semibold text-[#2389DA]">
                <CountUp end={dataOrder?.done} duration={1} /> ta
              </h1>
            </div>
            <div>
              <p className="text-[30px] font-semibold">Tozalanmoqda</p>
              <h1 className="text-[45px] font-semibold text-[#2389DA]">
                <CountUp end={dataOrder?.in_process} duration={1} /> ta
              </h1>
            </div>
            <div>
              <p className="text-[30px] font-semibold">Olib ketildi</p>
              <h1 className="text-[45px] font-semibold text-[#2389DA]">
                <CountUp end={dataOrder?.taken} duration={1} /> ta
              </h1>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default index;
