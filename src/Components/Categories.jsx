//External Imports
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// --------------Internal Imports
import CategoryItem from '../Reuseable Components/CategoryItem';
import Styles from './Categories.module.css';
import { useEShopData } from '../Contexts/EShopDataProvider';
import { Skeleton } from './ui/skeleton';

function Categories() {
  let { categories ,isLoading} = useEShopData();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 700 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={`${Styles.display_Category} `}>


      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        className='mt-4'
      >
        {isLoading ? (
          'dumyString'.split('').map((item ,index) => (
            <div className="items-center w-[90%]  " key={index}>
              <Skeleton
                className={`image-fluid h-[160px] w-[100%]  bg-[#e2e8f0] `}
              />

              <Skeleton
                className={` ${Styles.name}  mt-2 h-[40px]  w-[100%] bg-[#e2e8f0]`}
              />
            </div>
          ))
        ) : (
          categories.map((category, index) => (
            <CategoryItem category={category} key={index} />
          ))
        )}
      </Carousel>
    </div>
  );
}

export default Categories;
