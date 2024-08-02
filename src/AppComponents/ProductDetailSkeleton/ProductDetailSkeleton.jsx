import { Skeleton } from '@/Components/ui/skeleton';

function ProductDetailSkeleton() {
  return (
    <div className="p-3 md:p-5 flex  flex-col md:flex-row md:gap-6">
      {/* =========Images Section */}
      <div
        className={`w-[auto] mt-2  border-0 rounded  flex flex-col justify-center`}
      >
        <Skeleton
          className={`w-[300px] h-[300px] min-[400px]:w-[390px] min-[400px]:h-[400px] bg-gray-400  md:w-[500px]  md:h-[500px]`}
        />

        <div className={`flex  w-[auto] gap-2 mt-3`}>
          <Skeleton className={`w-[80px] h-[70px]  md:w-[110px] md:h-[100px] bg-gray-400  rounded-none`} />
          <Skeleton className={`w-[80px] h-[70px]  md:w-[110px] md:h-[100px]  bg-gray-400 rounded-none`} />
          <Skeleton className={`w-[80px] h-[70px]  md:w-[110px] md:h-[100px]  bg-gray-400 rounded-none`} />
        </div>
      </div>

      {/* Products Details */}
      <div className={`w-[100%] md:w-[60%] mt-4 md:mt-0 `}>
        <Skeleton className={` text-[30px] md:text-[40px] text-center w-[300px] h-[40px] bg-gray-400 rounded-none`}>
         
        </Skeleton>

        <div>
          <ul className="mt-2  md:p-0">
            <Skeleton className=" bg-gray-400 flex  w-[250px] h-[40px] mt-1 rounded-none ">
            </Skeleton>

            <Skeleton className={ `bg-gray-400 flex  w-[250px] h-[40px] mt-1 rounded-none`}>
             
            </Skeleton>

            <Skeleton className={ `bg-gray-400 flex  w-[250px] h-[40px] mt-1  rounded-none`}>
              
            </Skeleton>
          </ul>
        </div>
        <div>
         
        </div>

        <Skeleton
          className="bg-gray-400 mt-[20px]  w-[100%] h-[40px]  rounded-none"

        >

        </Skeleton>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
