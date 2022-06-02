import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useSelector } from "react-redux";

import "../styles/Edit.css";

function Edit() {
  const data = useSelector((state) => state);

  const renderObject = (data) => {
    return Object.entries(data).map(([key, value], i) => {
      return (
        <div key={key}>
          {value[0]}: {value[1]} - {value[2]}
        </div>
      );
    });
  };

  return (
    <Container>
      <Row>
        <p>{data.file.name}</p>
      </Row>
      <Row>
        <p>{renderObject(data.audioData)}</p>
      </Row>
    </Container>
  );
}

export default Edit;
