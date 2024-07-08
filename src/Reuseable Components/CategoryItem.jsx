// -----------------External Imports
import { Link, useParams } from 'react-router-dom';

// --------------internal Imports
import Styles from './CategoryItem.module.css';

function CategoryItem({ category ,key}) {
  if (!category) return null; //first check categories exist or not

  //check your desired categories
  

  return (
   
      <Link
        className={`card  p-1  text-decoration-none ${Styles.card}`}
      to={`/Categories/${category.name}`}
      key={key}
          >
    
        <div className={`${Styles.image_div} flex justify-center`}>
        <img
          src={category.imageUrl}
          className={`card-img-top image-fluid ${Styles.image}`}
        />

        </div>

        <div className="card-body">
          <h4 className={` ${Styles.name} w-[100%] card-text`}>{category.name}</h4>
       </div>
              
      </Link>
  );
}

export default CategoryItem;
