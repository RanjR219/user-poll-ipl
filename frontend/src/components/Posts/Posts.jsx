import React, { useState, useEffect } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

import "./Posts.css";

import Typography from "@material-ui/core/Typography";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Posts(props) {
  const [seeMore, setSeeMore] = useState(false);
  const [formattedContent, setFormatContent] = useState("");
  const [userVoted, setUserVoted] = useState(false);

  function thumbsUp(e) {
    setUserVoted(true);

    props.onUserVote("like", props.id);
  }

  function thumbsDown(e) {
    props.onUserVote("dislike", props.id);
    setUserVoted(true);
  }

  function dateFormatter(timeStamp) {
    var d = new Date(timeStamp);

    return `${d.getDate()} ${
      d.toString().split(" ")[1]
    } ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  }
  useEffect(() => {
    if (seeMore) {
      setFormatContent(props.post.content);
    } else {
      if (props.post.content.length > 400) {
        const toShow = props.post.content.substring(0, 400) + "...";
        setFormatContent(toShow);
      } else {
        setFormatContent(props.post.content);
      }
    }
  }, [seeMore, props.post]);

  function readChanges() {
    setSeeMore(!seeMore);
  }

  return (
    <div>
      <div className="post ">
        <Typography variant="h4" gutterBottom>
          {props.post.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {formattedContent}
          {props.post.content.length > 400 ? (
            <a
              style={{
                color: "blueviolet",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={readChanges}
            >
              {!seeMore ? "See More" : "See Less"}
            </a>
          ) : null}
        </Typography>
      </div>
      <div className="properties">
        {dateFormatter(props.post.timeStamp)}
        <div>
          <IconButton
            disabled={userVoted ? true : false}
            name="likebtn"
            onClick={thumbsUp}
            color="primary"
          >
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton disabled={userVoted ? true : false} color="primary">
            <ThumbDownIcon name="dislikebtn" onClick={thumbsDown} />
          </IconButton>

          <LinearProgressWithLabel
            value={
              props.post.like === 0
                ? 0
                : (props.post.like / (props.post.like + props.post.dislike)) *
                  100
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Posts;
