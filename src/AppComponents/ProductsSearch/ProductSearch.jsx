import SearchIcon from '@mui/icons-material/Search';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Link } from 'react-router-dom';

import Styles from './ProductSearch.module.css';
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '../../Components/ui/sheet';

import { useEShopData } from '@/Contexts/EShopDataProvider';
import { useEffect, useState } from 'react';
import SearchedSingleItem from './SearchedSingleItem';

function ProductSearch() {
  let { EshopData, SearchedProductsSetter } = useEShopData();
  let [itemToSearch, setItemToSearch] = useState('');
  let [filteredData, setFilteredData] = useState([]);
  let [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    if (!itemToSearch) {
      setDisplayItems([]);
      setFilteredData([]);
      return;
    }

    let data = EshopData.filter((item) => {
      if (item?.name.toLowerCase().includes(itemToSearch.toLowerCase()))
        return item;
    });

    setDisplayItems(data.slice(0, 3));
    if (data.length > 3) SearchedProductsSetter(data);
    setFilteredData(data);
  }, [itemToSearch]);


  return (
    <Sheet key={'top'}>
      <SheetTrigger className=' w-full h-full '>
   
        <>
          <SearchIcon sx={{ fontSize: 40 }} />
        </>
      
     
        {/* <div className='hidden md:block'>
        <SearchIcon  sx={{ fontSize: 45 }} />

        </div> */}
      </SheetTrigger>
      
      <SheetContent className="z-[2000] w-full " side="top">
        <SheetHeader>
          <SheetTitle className={`${Styles.title} text-lg text-[30px]`}>
            Search Products
          </SheetTitle>
          <div className="flex">
            <SearchIcon sx={{ fontSize: 40 }} />

            <input
              onChange={(e) => setItemToSearch(e.target.value)}
              value={itemToSearch}
              placeholder="Search Product"
              className={`w-[200px] h-8 border-[0px] border-l-2 border-l-black ml-2 pl-2 ${Styles.input}`}
            />
          </div>
          <div className="mt-[30px] flex flex-col gap-3 overflow-auto h-[400px] md:h-full">
            <hr />

            {/* --------------------------------------
                |Conditionally display the state Products will appear here =>if the itemTOserach is empty
                |Conditionally display the state No Result found if the itemTOsearch is not empty but filtereddat is empty array
                |otherwise show empty string
            */}
            {!itemToSearch && filteredData.length === 0 ? (
              <p className="text-base text-center w-[100%] mt-4">
                Products will appear here
              </p>
            ) : itemToSearch && filteredData.length === 0 ? (
              <p className="text-base mt-4">No Result Product found</p>
            ) : (
              ''
            )}

            {/* Display the products listing */}
            {displayItems?.length > 0 && (
              <h4 className="font-medium text-lg">Searched Products</h4>
            )}
            {
              displayItems?.map((item) => (
              <SearchedSingleItem element={item} />
            ))
            }

            {
              filteredData?.length > 2 && (
              <div>
                <Link to={'/AllResults?resultProducts=SearchedProducts'}>
                  <SheetClose className=" h-[40px] p-2 bg-black text-white w-auto z-30">
                    View All Results <ArrowRightAltIcon />
                  </SheetClose>
                </Link>
              </div>
              )
            }
          </div>

          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ProductSearch;
