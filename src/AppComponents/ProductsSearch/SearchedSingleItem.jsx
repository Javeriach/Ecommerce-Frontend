import { Link } from 'react-router-dom';
import { SheetClose } from '@/Components/ui/sheet';
function SearchedSingleItem({ element }) {
  if (!element.name) return;
  return (
    <Link to={`/ProductDetails?itemId=${element._id}`} className='w-full  flex items-start'>
      <SheetClose className="w-[80%] h-[90px] ">
        <div className='flex h-[90px]'>
          <img src={element.images[0]} className="rounded w-[90px] h-[90px] " />
          <div className="h-[100%] w-[full] ml-1 flex flex-col justify-around items-start">
            <p className="font-semibold">{element.name}</p>
            <p>Price:${element.price}</p>
          </div>
        </div>
      </SheetClose>
    </Link>
  );
}

export default SearchedSingleItem;
