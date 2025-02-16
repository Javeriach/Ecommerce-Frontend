import { useEffect, useState } from 'react';
import Style from './AddCategory.module.css';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setShowOverlay } from '@/Redux/Slices/handlersSlice';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import toast from 'react-hot-toast';
import { categoryAdditionHandler } from '@/Redux/Slices/eshopSlice';
import imageCompression from 'browser-image-compression';
import { colors } from '@mui/material';

function AddCategory() {
  const [ImageFile, setImageFile] = useState(null); // Store the File object
  const [CategoryName, setCategoryName] = useState('');
  const [isLoading, setLoadingg] = useState(false);
  const [color, setColor] = useState('#000000');
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const dispatch = useDispatch();


  const AddCategoryHandler = async () => {
    console.log(ImageFile); // Log the original file
    console.log(CategoryName);
    console.log(color);
  
    // Validate required fields
    if (!ImageFile || !CategoryName || !color) {
      toast.error('Please fill all fields and select an image');
      return;
    }
  
    try {
      setLoadingg(true);
  
      // Compress the image
      const options = {
        maxSizeMB: 0.5, // Maximum size in MB
        maxWidthOrHeight: 800, // Maximum width or height
        useWebWorker: true, // Use web workers for better performance
      };
  
      const compressedFile = await imageCompression(ImageFile, options);
  
      // Ensure the compressed file is a Blob or File object
      if (!(compressedFile instanceof Blob)) {
        throw new Error('Compressed file is not a valid Blob or File object');
      }
  
      // Create FormData object
      const formData = new FormData();
      formData.append('name', CategoryName);
      formData.append('imageurl', compressedFile, compressedFile.name); // Append compressed file
      formData.append('backgroundColor', color);
  
      // Log FormData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      // Send data to the backend
      const response = await axios.post(
        BASE_URL + '/category/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type for file upload
          },
          withCredentials: true,
        }
      );
  
      // Handle backend errors
      if (response.data.error) {
        throw new Error(response.data.error);
      }
  
      // Dispatch the saved category to the Redux store
      dispatch(categoryAdditionHandler(response.data.categories));
      toast.success('Category Added Successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error(error.message || 'Failed to add category');
    } finally {
      setLoadingg(false);
      dispatch(setShowOverlay(''));
    }
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error('No file selected');
      return;
    }

    // Set the File object in state
    setImageFile(file);

    // Generate a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
  };

  return (
    <section className={`${Style.AddCategory} bg-emu_eg text-white`}>
      <div className="d-flex justify-content-end">
        <label
          htmlFor=""
          className="fw-bold fs-5 cursor-pointer border-0 "
          onClick={() => dispatch(setShowOverlay(''))}
        >
          x
        </label>
      </div>

      <h1 className={"mt-1 mb-3 text-center text-[27px] font-semibold"}>Add Category</h1>

      <div className="flex justify-center items-center ">
        {previewUrl && (
          <div
            className={`w-[150px] h-[150px]  flex justify-center items-center rounded`}
            style={{ backgroundColor: color }}
          >
            <img className="w-[150px] h-[150px]" src={previewUrl} alt="Preview" />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="">Category Name</label>
        <br />
        <input
          className="p-1 w-[200px] h-[30px] text-black"
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
        />
        <div>
          <input type="file" onChange={imageHandler} className="mt-3" />
        </div>
        <div className="flex gap-2 mt-3">
          <label className="text-white">Select Background Color</label>
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
          ></input>
        </div>
        <br /> <br />
        <div className="d-flex justify-content-end">
          {/* ---------Add button */}
          <button
            type="Add"
            className="bg-black text-white font-medium p-2 px-4 rounded"
            onClick={AddCategoryHandler}
          >
            {isLoading ? <Spinner /> : 'Add'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddCategory;