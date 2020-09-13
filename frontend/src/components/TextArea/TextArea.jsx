import React, { useState } from "react";
import "./TextArea.css";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

function TextArea(props) {
  const [text, setCreateText] = useState({
    title: "",
    content: "",
  });

  function handleClick(event) {
    if (text.title === "" || text.content === "") {
      return null;
    } else {
      console.log(props.like);
      fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: text.title,
          content: text.content,
          timeStamp: Date(),

          user: props.user,
          like: 0,
          dislike: 0,
        }),
      })
        .then((results) => results.json())
        .then((data) => {
          console.log(data);
          props.onAdd(data);
        });

      // props.onAdd({
      //   title: text.title,
      //   content: text.content,
      //   timeStamp: Date(),
      //   user: props.user,
      //   like: 0,
      //   dislike: 0,
      // });
      setCreateText({
        title: "",
        content: "",
      });
    }

    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setCreateText((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  }

  return (
    <div style={{ textAlign: "right" }}>
      <TextField
        name="title"
        value={text.title}
        onChange={handleChange}
        fullWidth={true}
        id="outlined-basic"
        label="Title"
        variant="outlined"
      />
      <TextField
        style={{ marginTop: 8 }}
        fullWidth={true}
        id="outlined-multiline-static"
        label="Content"
        multiline
        rows={3}
        variant="outlined"
        value={text.content}
        onChange={handleChange}
        name="content"
      />

      <Button
        style={{ marginTop: 8 }}
        variant="contained"
        color="secondary"
        href="#contained-buttons"
        onClick={handleClick}
      >
        Post
      </Button>
    </div>
  );
}

export default TextArea;
