import Carousel from 'react-bootstrap/Carousel';
import img1 from "../assets/images/madhyamaheshwar.jpg";

function Carousell() {
  return (
    <Carousel className="carousel-container" fade>
      <Carousel.Item>
        <img
        width={1600}
          src="https://heavenhillscamp.com/wp-content/uploads/2021/04/IMG_20201008_072418-01-scaled.jpeg"
          alt="First slide"
          className="carousel-image"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default Carousell;
