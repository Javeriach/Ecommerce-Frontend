import { Skeleton } from '@/Components/ui/skeleton';

function ProductDetailSkeleton() {
  return (
    <div className="w-screen flex content-center justify-center">
      <div className="w-[90%]  flex flex-col  w-[800px] lg:flex-row justify-center items-center h-auto ">
        {/* First box */}
        <Skeleton className={`md:w-[40%]  w-[100%] h-[300px] md:mr-[20px] `} />

        {/* second box=====Products Details */}

        <div
          className={
            'py-4 md:w-[45%]  w-[100%] h-[400px] ms-1  md:mt-12 items-center  md:items-around items-center flex flex-col'
          }
        >
          <div className='w-[100%]'>
            <Skeleton className={'w-[60%] h-[30px] mt-1'} /> {/* heading  */}
            <Skeleton className={'w-[80%] h-[120px] mt-1'} />{' '}
            {/* description */}
            <div>
              {' '}
              {/* category--price ---quatity */}
              <Skeleton className={'w-[50%] h-[20px] mt-1 '} />
              <Skeleton className={'w-[50%]  h-[20px] mt-1 '} />
              <Skeleton className={'w-[50%]  h-[20px] mt-1 '} />
            </div>
            <div className=" flex w-64 flex-wrap h-2 mt-1">
              <Skeleton className={'w-[50px] h-[30px] '} />
              <Skeleton className={'w-[50px] h-[30px] ml-[25px]'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
