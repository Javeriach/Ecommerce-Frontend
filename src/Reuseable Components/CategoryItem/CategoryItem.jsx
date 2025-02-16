// -----------------External Imports
import { Link, useParams } from 'react-router-dom';

// --------------internal Imports
import Styles from './CategoryItem.module.css';

function CategoryItem({ category ,key}) {
  if (!category) return null; //first check categories exist or not


  return (
   
      <Link
        className={`h-[240px] w-[200px]   rounded  flex flex-col items-center justify-center   text-decoration-none `}
      to={`/Categories/${category.name}/${category._id}`}
      key={key}
      style={{backgroundColor:category.backgroundColor}}
          >
    
      <div className={`flex justify-center px-3 w-full  md:h-[170px] md:w-[170px]  rounded`}
      >
        <img
          src={category.imageurl}
          className={` image-fluid ${Styles.image} w-[220px] h-[200px] md:h-[150px] md:w-[150px]`}
        />

        </div>

        <div className="text-[20px] font-semibold">
          <label className={`text-white w-[100%] card-text `}>{category.name}</label>
       </div>
              
      </Link>
  );
}

export default CategoryItem;
