import { useEffect } from "react"
import { useState } from "react"
import CardContainer from "./kanban-components/CardContaner"
export const Kanban = () => {
const [cases, setCases] = useState([])
useEffect(()=>{
setCases(JSON.parse(localStorage.getItem('cases') || '[]'))
} ,[cases])
  return (
    <div className="flex flex-col w-full text-center  max-h-[95%]">
    <div className=" min-h-[400px] flex overflow-x-scroll lg:overflow-hidden flex-row max-w-full  lg:min-h-full justify-between gap-2 ">
      <CardContainer cases={cases} title="unclaimed" />
      <div className=" bg-[#bad1e0] border-[1px]  border-[#2c80b9] h-full mt-2 rounded-lg" />
      <CardContainer cases={cases} title="first contact" />
      <CardContainer cases={cases} title="preparing work offer" />
      <CardContainer cases={cases} title="sent to therapists" />
    </div>
  </div>
  )
}
