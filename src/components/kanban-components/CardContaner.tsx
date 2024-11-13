import KanbanCard from './KanbanCard'
import KanbanCardHeader from './KanbanCardHeader'
import { ICase } from '../../types'
import { useEffect , useState } from 'react';

type IContainerProps={
    cases : ICase [] ;
    title : string;
}

export default function CardContainer ({cases , title} : IContainerProps)  {
const [statusCount, setStatusCount] = useState(0)
    useEffect(()=>{
        setStatusCount(cases.filter(c => c.status === title).length)

    } ,[cases])
  return (
    <div className={`min-w-[50%] lg:min-w-[24%] lg:max-w-[24%] ${title === "unclaimed" ? "bg-[#d3e5ed] border-[0.2px]  border-black":"bg-[#bad1e0]" } max-h-[400px] lg:h-[98%] lg:max-h-[98%] mt-2 rounded-lg  overflow-hidden pb-3`}>
        <div className='h-full overflow-y-scroll'>
    <KanbanCardHeader title={title} count={statusCount} />
       <div className=" flex flex-col gap-2 rounded-md">
           {cases.map((c : ICase , i) => <KanbanCard key={i} caseItem={c} title={title}/> )}
       </div>
        </div>
     </div>
  )
}
