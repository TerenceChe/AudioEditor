import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import "../styles/Home.css";

function Home() {
  return (
    <Container>
      <Row>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select an audio file</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Home;
