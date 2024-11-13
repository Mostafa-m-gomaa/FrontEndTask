import { ICase } from '../../types';
import { useState } from 'react';
import UpdateForm from './UpdateForm';

interface KanbanCardProps {
  caseItem: ICase;
  title : string;
}

export default function KanbanCard({ caseItem , title }: KanbanCardProps) {
    const [showCard, setShowCard] = useState(false);
    if(caseItem.status === title) {
        return (
          <div onClick={()=>setShowCard(true)} className='bg-white p-2 flex flex-col cursor-pointer transition hover:bg-gray-100 gap-2 items-start text-black w-[90%] mx-auto rounded-md'>
              <div className='flex w-full justify-between items-end'>
              <div className='capitalize text-[18px] font-bold  w-[70%] text-wrap flex justify-start overflow-hidden'>{caseItem.name}</div>
              <span className='text-[12px] text-gray-600'>{caseItem.age} yo</span>
              </div>
              <div className='w-[100%] text-[15px] text-wrap flex justify-start overflow-hidden' >{caseItem.email}</div>
              <div className='text-[14px] text-gray-600' >{caseItem.phone}</div>

              {showCard ? 
              <div  className="fixed w-full h-full bg-[#000000bd] top-0 left-0">
<div  className="bg-white w-[80%] lg:w-[50%]  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl py-4" >
    <UpdateForm item={caseItem} setShow={setShowCard} />
</div>
              </div>
              : null}
          </div>
        );
    }
}
