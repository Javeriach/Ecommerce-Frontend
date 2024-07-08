import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import LatestProducts from '@/Components/LatestProducts';
import ItemCard from '@/Reuseable Components/ItemCard';

function ProductSearch() {
  let { EshopData } = useEShopData();
  let [itemToSearch, setItemToSearch] = useState('');

  let [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!itemToSearch) {
      setFilteredData([]);
      return;
    }

    let data = EshopData.filter((item) => {
      if (item?.name.toLowerCase().includes(itemToSearch.toLowerCase()))
        return item;
    });

    setFilteredData(data);
  }, [itemToSearch]);

  return (
    <Sheet key={'top'}>
      <SheetTrigger>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SheetTrigger>
      <SheetContent className="z-[2000] w-screen" side="top">
        <SheetHeader>
          <SheetTitle className={`${Styles.title} text-lg text-[30px]`}>
            Search Products
          </SheetTitle>
          <div className="flex">
            <FontAwesomeIcon
              className="text-[30px] ml-[20px]"
              icon={faMagnifyingGlass}
            />
            <input
              onChange={(e) => setItemToSearch(e.target.value)}
              value={itemToSearch}
              placeholder="Search Product"
              className={`w-[200px] h-8 border-[0px] border-l-2 border-l-black ml-2 pl-2 ${Styles.input}`}
            />
          </div>
          <div className="mt-[30px] flex">
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
            {filteredData.map((item) => (
              <ItemCard element={item} />
            ))}
                      
          </div>

          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ProductSearch;
