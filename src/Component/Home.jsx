import BackgroundLayer from "./BackgroundLayer";
import MountainLayer from "./MountainLayer";
import TextLayer from "./TextLayer";
import pic2 from "../assets/images/pic2.jpg";
import Fade from "react-reveal/Fade";
import { Container } from "react-bootstrap";
function Home() {
  return (
    <>
      <div className="home-container">
        <BackgroundLayer />
        <MountainLayer />
        <TextLayer />
      </div>
      <Container
        fluid
        style={{ marginTop: "0.1vh" }}
        className=" d-flex justify-content-center"
      >
        <Fade>
          <img
            src={pic2}
            alt="Your Alt Text"
            className="img-fluid"
            style={{ maxWidth: "110%", height: "auto" }}
          />
        </Fade>
      </Container>
    </>
  );
}

export default Home;
