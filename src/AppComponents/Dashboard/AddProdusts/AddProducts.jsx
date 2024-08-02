import { useEffect, useReducer, useState } from 'react';
import Style from './AddProducts.module.css';
import Buttons from '@/Reuseable Components/Buttons/Buttons';
import { useEShopData } from '@/Contexts/EShopDataProvider';
import { v4 } from 'uuid';
import { Spinner } from 'react-bootstrap';

let reducer = (state, action) => {
  console.log(action.payLoad);
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payLoad };

    case 'description':
      return { ...state, description: action.payLoad };

    case 'image':
      return { ...state, imageFile: action.payLoad };

    case 'price':
      return { ...state, price: action.payLoad };

    case 'rating':
      return { ...state, rating: action.payLoad > 5 ? 5 : Number(action.payLoad) };

    case 'category':
      return { ...state, category: action.payLoad };

    default:
      return state;
  }
};

function AddProducts({ setShowOverlay }) {
  let { categories, AddProductHandler, elementToUpdate, UpdateProductHandler } =
    useEShopData();

  // ===================Reducer state
  let initialState = {
    name: elementToUpdate ? elementToUpdate?.name : '',
    description: elementToUpdate ? elementToUpdate?.description : '',
    imageFile: [],
    price: elementToUpdate ? elementToUpdate?.price : '0',
    category: elementToUpdate ? elementToUpdate?.category : categories?categories[0].name:"",
    id: elementToUpdate?.id ? elementToUpdate?.id : v4(),
    rating: elementToUpdate? elementToUpdate?.rating : 1,
  };

  // ===================states
  let [state, dispatch] = useReducer(reducer, initialState);
  let { name, description, imageFile, price, category, id, rating } = state;
  let [isLoading, setLoading] = useState(false);
  let [itemWrittenMessage, setitemWrittenMessage] = useState("");

  // ====================functions
  let AddProductCorrdinator = async () => {

    setitemWrittenMessage("");
    if (elementToUpdate?.name) {
      try {
        setLoading(true);
        await UpdateProductHandler('updateProduct', {
          ...state,
          image: elementToUpdate.image,
        });
        
        setitemWrittenMessage('ItemUpdated');
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
        setShowOverlay(false);
      }

      return;
    }

    try {
      setLoading(true);
      console.log(state);
      await AddProductHandler({...state,category:state.category ? state.category:categories[0].name});
      setitemWrittenMessage('ItemAdded');
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setShowOverlay(false);
    }
  };

  let CloseBtnHandler = () => {
    setShowOverlay(false);
    UpdateProductHandler('RemoveElementFronted');
  };

  console.log(categories);

  return (
    <section className={Style.AddProductSection}>
      <div className="d-flex justify-content-end">
        <label className="fs-5 btn border border-0" onClick={CloseBtnHandler}>
          x
        </label>
      </div>
      <div className="mt-1">
        <h1 className={Style.heading}>Add Product</h1>
        {/* Name */}
        <label htmlFor="">Product Name</label> <br />
        <input
          required
          className="ps-2"
          type="text"
          value={name}
          onChange={(e) => dispatch({ type: 'name', payLoad: e.target.value })}
        />
        {/* Product Description */}
        <div className="mt-1">
          <label htmlFor="">Product Description</label> <br />
          <textarea
            required
            onChange={(e) =>
              dispatch({ type: 'description', payLoad: e.target.value })
            }
            value={description}
            cols={70}
            rows={5}
            className="rounded ps-1"
          ></textarea>
        </div>
        <div className="mt-1">{/* Category section */}</div>
        <table className={Style.table}>
          <thead>
            <td className="d-none">name</td>
            <td className="d-none">data</td>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="">Select Category:</label>
              </td>
              <td>
                {categories ? (
                  <select
                    onChange={(e) =>
                      dispatch({ type: 'category', payLoad: e.target.value })
                    }
                    value={category}
                  >
                    {categories.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                ) : (
                    <input
                    onChange={(e) =>
                      dispatch({ type: 'category', payLoad: e.target.value })
                    }
                    value={category}
                  />
                )}
              </td>
            </tr>
            <tr className="mt-1">
              <td>
                {' '}
                <label htmlFor="">Price </label>
              </td>
              <td>
                {' '}
                <input
                  required
                  value={price}
                  type="text"
                  className={`${Style.input} `}
                  onChange={(e) =>
                    dispatch({ type: 'price', payLoad: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr className="mt-1">
              <td>
                {' '}
                <label htmlFor="">Product Rating</label>
              </td>
              <td>
                <input
                  required
                  value={rating}
                  type='number'
                  className={`${Style.input} `}
                  onChange={(e) =>
                    dispatch({ type: 'rating', payLoad: e.target.value })
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
          <label htmlFor="">
            {elementToUpdate?.name ? (
              <div>
                <b>Note:</b> Image Can't be Updated ! if you want to update
                images <br />
                then Delete product and re add it.
              </div>
            ) : (
              'Choose Image'
            )}
          </label>

          {!elementToUpdate?.name && (
            
            <input
            required
              type="file"
              onChange={(e) =>
                dispatch({ type: 'image', payLoad: e.target.files })
              }
              multiple
            />
          )}
        </div>
        {/* Buttons section=>add or cancel */}
        <div className="d-flex justify-content-end mt-1">
          <div>
           
            {/* Conditionally  displaying the text of the button depends on the itemWrittenOperationmessage and
             and elementtoUpdate if exit  */}
            <Buttons type={'Add'} onClick={AddProductCorrdinator}>
              {isLoading ? (
                <Spinner />
              ) : elementToUpdate?.name && itemWrittenMessage == ""? (
                'Update Product'
              ) : "Add Product"}
            </Buttons>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddProducts;
