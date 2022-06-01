import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";

import "../styles/Home.css";

import store from "../util/Store";
import { uploadFile, uploadAudioData } from "../util/Actions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    store.dispatch(uploadFile(event.target.files[0]));
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", store.getState().file);
    axios
      .post("http://localhost:8000/audio/", formData)
      .then((response) => this.updateAudioData(response.data));
  }

  updateAudioData(data) {
    store.dispatch(uploadAudioData(data));
    console.log(store.getState());
  }

  render() {
    return (
      <Container>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select an audio file</Form.Label>
              <Form.Control type="file" onChange={this.handleChange} />
            </Form.Group>
            {/* <Link to="/Edit"> */}
            <Button type="submit">Upload</Button>
            {/* </Link> */}
          </Form>
        </Row>
      </Container>
    );
  }
}

export default Home;
