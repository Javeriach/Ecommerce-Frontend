// ---------External Imports
import { useEffect, useState } from 'react';

// -----------Internal Imports
import Style from './AddCategory.module.css';
import Buttons from '@/Reuseable Components/Buttons/Buttons';
import { useEShopData } from '@/Contexts/EShopDataProvider';
// import Spinner from "../../Reuseable Components/Spinner/Spinner";
import { Spinner } from 'react-bootstrap';

// How to store images
// 1--Create ref of the folder for this import the ref from firestore

function AddCategory({ setShowOverlay }) {
  let [ImageFile, setImageFile] = useState(null);
  let [CategoryName, setCategoryName] = useState('');
  let { addCategoryToDB } = useEShopData();
  let [isLoading, setLoading] = useState(false);
  let [categoryAddedMessage, setCategoryAdded] = useState(false);

  let AddCategoryHandler = async () => {
    if (!ImageFile) return;
    try {
      setLoading(true);
      await addCategoryToDB(CategoryName, ImageFile);
      setCategoryAdded(true);
    } finally {
      setLoading(false);
      setShowOverlay(false);

    }
  };

  useEffect(() => {
    setLoading(false);
    setCategoryAdded(false);
  }, []);

  return (
    <section className={`${Style.AddCategory} bg-lightPink text-black`}>
      <div className="d-flex justify-content-end">
        <label
          htmlFor=""
          className="fw-bold fs-5 btn border-0"
          onClick={() => setShowOverlay('')}
        >
          x
        </label>
      </div>
      <div>
        <h1 className={Style.heading}>Add Category</h1>
        <label htmlFor="">Category Name</label>
        <br />
        <input
          className={Style.CategoryNameInput}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
        />
        <div>
          <br />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <br />
        </div>
        <br /> <br />
        <div className="d-flex justify-content-end">
               
           

        {/* ---------Add button */}
            <button type="Add" className='bg-black text-white font-medium p-2 px-4 rounded' onClick={AddCategoryHandler}>
              {isLoading ? <Spinner /> :'Add'}
            </button>
       
        </div>
      </div>
    </section>
  );
}

export default AddCategory;
