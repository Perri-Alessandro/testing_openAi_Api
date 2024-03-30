import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  const [scriptResult, setScriptResult] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const annoCorrente = new Date().getFullYear();
    const eccolo =
      "©" +
      annoCorrente +
      " Polkadot Assistant. All rights reserved. Created by Perri Alessandro";

    setScriptResult(eccolo);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopBottomStyles = { fontSize: "1em" };
  const mobileBottomStyles = { fontSize: "0.6em" };

  return (
    <Row className="fixed-bottom bg-success text-light py-2 md-py-0">
      <Col style={isMobile ? mobileBottomStyles : desktopBottomStyles}>
        {scriptResult}
      </Col>
    </Row>
  );
};

export default Footer;
