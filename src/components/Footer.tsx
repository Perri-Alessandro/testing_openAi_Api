import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  const [scriptResult, setScriptResult] = useState("");

  useEffect(() => {
    let annoCorrente = new Date().getFullYear();
    let eccolo =
      "©" +
      annoCorrente +
      " Polkadot Assistant. All rights reserved. Created by Perri Alessandro";

    setScriptResult(eccolo);
  }, []);

  return (
    <Row className="fixed-bottom bg-secondary text-light">
      <Col>{scriptResult}</Col>
    </Row>
  );
};

export default Footer;
