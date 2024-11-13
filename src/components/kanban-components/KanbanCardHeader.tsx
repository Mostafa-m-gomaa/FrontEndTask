
type KanbanCardHeaderProps = {
    title: string;
    count: number;
}

export default function KanbanCardHeader  ( {title, count} : KanbanCardHeaderProps) {
   
  return (
    <div className="flex w-[90%] mx-auto  justify-between py-4 ">
    <b className="capitalize text-[12px] lg:text-[16px]">{title}</b>
    <div className="bg-white rounded-[50%] text-black font-bold px-1 lg:px-2 text-[13px] max-h-fit">{count}</div>
    </div>
  )
}

