// import ded from "/ded.png";
import polkadot from "../assets/polkadot.webp";
import Gpt from "./Gpt";
import { Col, Container, Row } from "react-bootstrap";

const Main = () => {
  return (
    <Container>
      <Row className="mt-2">
        {" "}
        <h1 className="text-white text-with-black-border">Polkadot Gpt</h1>
      </Row>
      <Row>
        <Col>
          <a href="https://vitejs.dev" target="_blank">
            {/* <img src={ded} className="logo" alt="Vite logo" /> */}
          </a>
          <a href="https://wiki.polkadot.network/" target="_blank">
            <img src={polkadot} className="logo react" alt="Polkadot logo" />
          </a>
        </Col>
      </Row>

      <Row>
        {" "}
        <Gpt />
      </Row>
    </Container>
  );
};

export default Main;
