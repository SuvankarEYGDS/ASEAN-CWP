import Carousel from 'react-bootstrap/Carousel';

export default function  CarouselComponent(props) {
  const carouselData=props.data;
  const carousel = carouselData;
  const items = carouselData[":items"];

  const renderCarouselItems = () => {
    
    return items && Object.values(items).map((item, index) => (

      <Carousel.Item  key={item.id} interval={1000}>
      <img
        className="d-block w-100"
        style={{height: '500px',objectFit:'cover'}}
       
        src={`http://localhost:4502/${item.imagePath}`}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>{item.title}</h3>
        <p  dangerouslySetInnerHTML={{ __html: item.description }}></p>
      </Carousel.Caption>
    </Carousel.Item>

    ));
  };


  return (
    <Carousel>
      {renderCarouselItems()}
    </Carousel>
  );
}