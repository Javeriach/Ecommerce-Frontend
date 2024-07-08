import Carousel from 'react-bootstrap/Carousel';
function CarouselCreater({ images }) {
  return (
    <Carousel data-bs-theme="dark">
      {images.map((item, index) =>
(
        <Carousel.Item>
          <img className="d-block w-100" src={item} alt={`${index + 1} slide`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselCreater;
