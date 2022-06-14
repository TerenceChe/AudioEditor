import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useSelector } from "react-redux";

import "../styles/Edit.css";

//https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
function Edit() {
  const data = useSelector((state) => state);
  const newArr = new Array(Object.keys(data.audioData).length).fill(false);
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

  return (
    <Container>
      <Row>
        <p>{data.file.name}</p>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
      </Row>
      <br />
      <div>{renderObject(data.audioData)}</div>
    </Container>
  );
}

export default Edit;
