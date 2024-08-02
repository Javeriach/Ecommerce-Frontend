import { Skeleton } from '@/Components/ui/skeleton';

function ItemCardSkeleton({tempString}) {
  return (
    <div className="flex flex-wrap justify-around content-center ">
      {tempString?.split('').map((item, index) => (
        <div key={index} className=" w-[150px] h-[220px] md:h-[470px]  md:w-[300px]  mt-[10px]">
          <div className="flex justify-center">
            <Skeleton className={` w-[150px] h-[150px] md:w-[300px]  md:h-[290px] p-[10px] mt-2`} />
          </div>

          <div className='w-100% '>
            <Skeleton className={`h-[12px] md:h-[40px]  w-[100px] md:w-[200px]   mt-[2px] `} />

            <Skeleton className={`h-[12px] md:h-[40px]  w-[100px] md:w-[200px] mt-[2px] `} />


            <div className={` mt-1  flex justify-between w-[100%] `}>
            <Skeleton className={`h-[20px] md:h-[40px]  w-[40px] md:w-[200px]  mt-[2px] `} />
              <Skeleton className={ `w-[40px] md:w-[40px] h-[20px] md:h-[60px] md:ml-[10px] mt-[3px]  `} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemCardSkeleton;
