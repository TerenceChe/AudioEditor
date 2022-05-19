import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import "../styles/Home.css";

import store from "../util/Store";
import { uploadFile } from "../util/Actions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    store.dispatch(uploadFile(event.target.files[0]));
  }

  render() {
    return (
      <Container>
        <Row>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select an audio file</Form.Label>
              <Form.Control type="file" onChange={this.handleChange} />
            </Form.Group>
            <Link to="/Edit">
              <Button type="submit">Upload</Button>
            </Link>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default Home;
