import React from "react";
import Button from "react-bootstrap/esm/Button";

import store from "../util/Store";

import "../styles/Edit.css";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(store.getState());
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}></Button>
      </div>
    );
  }
}

export default Edit;
