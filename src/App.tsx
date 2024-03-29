import polkadot from "./assets/polkadot.webp";
import ded from "/ded.png";
import "./App.css";
import Gpt from "./components/Gpt.jsx";
import NavBar from "./components/NavBar.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer.js";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {
  return (
    <div className="w-100 justify-content-between d-flex flex-column">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow-1">
        <Container>
          <Row>
            <Col>
              <a href="https://vitejs.dev" target="_blank">
                <img src={ded} className="logo" alt="Vite logo" />
              </a>
              <a href="https://wiki.polkadot.network/" target="_blank">
                <img
                  src={polkadot}
                  className="logo react"
                  alt="Polkadot logo"
                />
              </a>
            </Col>
          </Row>
        </Container>
        <h1>Polkadot Gpt</h1>
        <Gpt />
      </main>
      <Footer />
    </div>
  );
};

export default App;
