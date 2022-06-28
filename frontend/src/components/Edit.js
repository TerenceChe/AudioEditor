import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "../styles/Edit.css";

import store from "../util/Store";
import { useSelector } from "react-redux";

//https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
function Edit() {
  const data = useSelector((state) => state);
  const newArr = new Array(Object.keys(data.audioData).length).fill(true);
  const [isActive, setActive] = useState(newArr);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    var audio = new Audio(URL.createObjectURL(data.file));
    setAudio(audio);
    console.log(audio);
  }, [data.file]);

  const renderObject = (data) => {
    return Object.entries(data).map(([key, value], i) => {
      return (
        <div
          className="selected"
          data-id={key}
          key={key}
          onClick={handleTextClick}
        >
          {value[0]}
        </div>
      );
    });
  };

  const handlePlay = (event) => {
    audio.play();
  };

  const handlePause = (event) => {
    audio.pause();
  };

  const handleTextClick = (event) => {
    const index = event.target.dataset.id;
    var tmpArr = isActive;
    isActive[index] = !isActive[index];
    setActive(tmpArr);
    event.target.classList.toggle("selected");
  };

  const handleSubmit = (event) => {
    const formData = new FormData();

    formData.append("file", store.getState().file);
    var startNewGroup = false;
    var index = isActive.indexOf(true);
    var start = data.audioData[index][1];
    var end = data.audioData[index][2];
    console.log(data.audioData);
    for (let i = index; i < Object.keys(data.audioData).length + 1; i++) {
      if (isActive[i]) {
        if (startNewGroup) {
          startNewGroup = !startNewGroup;
          start = data.audioData[i][1];
        }
        end = data.audioData[i][2];
      } else if (!isActive[i] && isActive[i - 1]) {
        startNewGroup = true;
        formData.append("times", [start, end]);
      }
    }
    try {
      axios
        .post("http://localhost:8000/audio/submit/", formData)
        .then((response) => console.log(typeof response.data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <p>{data.file.name}</p>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Row>
      <br />
      <div>{renderObject(data.audioData)}</div>
    </Container>
  );
}

export default Edit;
