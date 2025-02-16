import { useEffect, useReducer, useState } from 'react';
import Style from './AddProducts.module.css';
import Buttons from '@/Reuseable Components/Buttons/Buttons';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import toast from 'react-hot-toast';
import {
  categoriesHandler,
  product_To_UpdateHandler,
  productAdditionHandler,
  productsUpdationHandler,
} from '@/Redux/Slices/eshopSlice';
import { setShowOverlay } from '@/Redux/Slices/handlersSlice';
import imageCompression from 'browser-image-compression';

let reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payLoad };

    case 'description':
      return { ...state, description: action.payLoad };

    case 'image':
      return { ...state, imageFile: action.payload };

    case 'price':
      return { ...state, price: action.payLoad };

    case 'discount':
      return {
        ...state,
        discount:Number(action.payLoad),
      };

    case 'category': {
      console.log(action.payload);
      return { ...state, category: action.payload };
    }

    default:
      return state;
  }
};

function AddProducts() {
  let fetchCategories = async () => {
    try {
      let response = await axios.get(BASE_URL + '/categories', {
        withCredentials: true,
      });
      console.log(response.data.categories);
      //DISPATHC THE SAVED THE PRODUCT TO THE REDUX STORE
      reduxDispath(categoriesHandler(response.data.categories));
    } catch (error) {
      throw new Error('Something went wrong');
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  let { categories, productToUpdate } = useSelector((store) => store.eshopData);

  // ===================Reducer state
  let initialState = {
    name: productToUpdate ? productToUpdate?.name : '',
    description: productToUpdate ? productToUpdate?.description : '',
    imageFile: [],
    price: productToUpdate ? productToUpdate?.price : '0',
    category:productToUpdate?.name ? productToUpdate.category._id:"",
    id: productToUpdate?._id ? productToUpdate?._id : '',
    discount:productToUpdate?.name ? productToUpdate?.discount :0
  };

  // ===================states
  let [state, dispatch] = useReducer(reducer, initialState);
  let { name, description, imageFile, price, category, _id, discount } = state;
  let [isLoading, setLoading] = useState(false);
  let reduxDispath = useDispatch();
  // ====================functions

  //=================ImagesUrl Handlers=============

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    console.log(files);
    dispatch({ type: 'image', payload: files });
  };

  //==========================================PRODUCT ADDITION HANDLER============================================
  const ProductAdditionHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Log form data for debugging
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Category:", category);
    console.log("Image Files:", imageFile);
  
    // Append text fields to FormData
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
  
    // Ensure imageFile is an array
    const files = Array.isArray(imageFile) ? imageFile : [imageFile];
  
    // Validate number of images
    if (files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }
  
    try {
      setLoading(true);
  
      // Compress images
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          const options = {
            maxSizeMB: 0.5, // Maximum size in MB
            maxWidthOrHeight: 800, // Maximum width or height
            useWebWorker: true, // Use web workers for better performance
          };
          return await imageCompression(file, options);
        })
      );
  
      // Append compressed images to FormData
      compressedFiles.forEach((file, index) => {
        formData.append("images", file); // Append compressed files
      });
  
      // Log FormData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      // Send data to the backend
      const response = await axios.post(
        BASE_URL + "/add-product", // Endpoint URL
        formData, // Request body (FormData)
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
          withCredentials: true, // Include credentials (cookies, authorization headers)
        }
      );
  
      // Handle backend errors
      if (response.data.error) {
        throw new Error(response.data.error);
      }
  
      // Dispatch the saved product to the Redux store
      reduxDispath(productAdditionHandler(response.data.product));
      toast.success("Product Added Successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  //==========================================PRODUCTS UPDATION HANDLER==========================================

  const ProductUpdationHandler = async (e) =>
  {
    try {
      setLoading(true);
      let response = await axios.patch(BASE_URL + "/update-product", {
        name,description,price,category,discount,_id:productToUpdate._id
      }, { withCredentials: true });
      console.log(response.data.product);
      reduxDispath(productsUpdationHandler(response.data.product));
      reduxDispath(setShowOverlay(false));

      toast.success("Product Updated Successfully");
    } catch (error)
    {
      console.log(error);
      throw new Error("Something went worng!");
    } finally {
      setLoading(false);
    }
  }

  let submitButtonHandler = async (e) => {
    e.preventDefault();
    if (productToUpdate?.name) {
     ProductUpdationHandler()
      return;
    } else ProductAdditionHandler(e);
  };

  let CloseBtnHandler = () => {
    reduxDispath(setShowOverlay(false));
    reduxDispath(product_To_UpdateHandler());
  };

  return (
    <section className={`${Style.AddProductSection} bg-emu_eg rounded-lg`}>
      <div className="d-flex justify-content-end">
        <label className="fs-5 btn border-0" onClick={CloseBtnHandler}>
          x
        </label>
      </div>
      <div className="mt-1">
        <h1 className={`text-[25px] text-center font-bold text-white`}>Add Product</h1>
        {/* Name */}
        <label htmlFor="" className='text-white'>Product Name</label> <br />
        <input
          required
          className="ps-2  rounded-sm border border-black text-black"
          type="text"
          value={name}
          onChange={(e) => dispatch({ type: 'name', payLoad: e.target.value })}
        />
        {/* Product Description */}
        <div className="mt-1">
          <label htmlFor="" className='text-white'>Product Description</label> <br />
          <textarea
            required
            onChange={(e) =>
              dispatch({ type: 'description', payLoad: e.target.value })
            }
            value={description}
            cols={70}
            rows={5}
            className="ps-2  rounded-sm border border-black"
          ></textarea>
        </div>
        <div className="mt-1">{/* Category section */}</div>
        <table className={Style.table}>
          <thead>
            <td className="d-none text-white">name</td>
            <td className="d-none text-white" >data</td>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="" className='text-white'>Select Category:</label>
              </td>
              <td>
                {categories && categories.length > 0 ? (
                  <select
                    value={category?category:  ''} // Set the default value
                    onChange={(e) =>
                      dispatch({ type: 'category', payload: e.target.value })
                    }
                  >
                    <option value="" >Select a category</option>
                    {categories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: 'category', payload: e.target.value })
                    }
                      value={category || ''}
                      className='ps-2  rounded-sm border border-black text-black'
                  />
                )}
              </td>
            </tr>
            <tr className="mt-1">
              <td>
                {' '}
                <label htmlFor="" className='text-white'>Price </label>
              </td>
              <td>
                {' '}
                <input
                  required
                  value={price}
                  type="text"
                  className={`ps-2  rounded-sm border border-black text-black`}
                  onChange={(e) =>
                    dispatch({ type: 'price', payLoad: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr className="mt-1">
              <td>
                {' '}
                <label htmlFor="" className='text-white'>Product Discount</label>
              </td>
              <td>
                <input
                  required
                  value={discount?discount:0}
                  type="number"
                  className={`ps-2  rounded-sm border border-black text-black`}
                  onChange={(e) =>
                    dispatch({ type: 'discount', payLoad: e.target.value })
                  }
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {/* Price */}
        <div></div>
        {/* Image Section */}
        <div className="mt-1">
          <label htmlFor="" className='text-white'>
            {productToUpdate?.name ? (
              <div className='text-white'>
                <b>Note:</b> Image Can't be Updated ! if you want to update
                images <br />
                then Delete product and re add it.
              </div>
            ) : (
              'Choose Image     '
            )}
          </label>

          {!productToUpdate?.name && (
            <input required type="file" onChange={handleImageUpload} multiple />
          )}
        </div>
        {/* Buttons section=>add or cancel */}
        <div className="d-flex justify-content-end mt-1">
          <div>
            {/* Conditionally  displaying the text of the button depends on the itemWrittenOperationmessage and
             and productToUpdate if exit  */}
            <Buttons type={'Add'} className="bg-blue-600" onClick={submitButtonHandler}>
              {isLoading ? (
                <Spinner />
              ) : productToUpdate?.name ? (
                'Update Product'
              ) : (
                'Add Product'
              )}
            </Buttons>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddProducts;
