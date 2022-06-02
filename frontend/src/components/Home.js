import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

import store from "../util/Store";
import { uploadFile, uploadAudioData } from "../util/Actions";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleChange = (event) => {
    store.dispatch(uploadFile(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("file", store.getState().file);
    try {
      await axios
        .post("http://localhost:8000/audio/", formData)
        .then((response) => dispatch(uploadAudioData(response.data)));
      navigate("/Edit");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select an audio file</Form.Label>
            <Form.Control type="file" onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Home;
