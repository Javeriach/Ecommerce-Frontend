// -----------------External Imports
import { Link, useParams } from 'react-router-dom';

// --------------internal Imports
import Styles from './CategoryItem.module.css';

function CategoryItem({ category ,key}) {
  if (!category) return null; //first check categories exist or not

  //check your desired categories
  

  return (
   
      <Link
        className={`h-auto w-[220px]    flex flex-col items-center justify-center   text-decoration-none `}
      to={`/Categories/${category.name}`}
      key={key}
          >
    
        <div className={`${Styles.image_div} border flex justify-center px-3 w-[210px]  h-[220px]  md:h-[170px] md:w-[170px]  bg-lightPink rounded-[100px]`}>
        <img
          src={category.imageUrl}
          className={` image-fluid ${Styles.image} w-[220px] h-[200px] md:h-[150px] md:w-[150px]`}
        />

        </div>

        <div className="text-[24px] font-bold">
          <h4 className={` ${Styles.name} w-[100%] card-text`}>{category.name}</h4>
       </div>
              
      </Link>
  );
}

export default CategoryItem;
