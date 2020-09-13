import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "./Avatar.css";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function AvatarPic(props) {
  const classes = useStyles();

  function emailFormatter(emailid) {
    console.log(typeof emailid);

    const str = String(emailid);
    const name = str.split("@")[0];

    return `@${name}`;
  }

  return (
    <div className={classes.container}>
      <div>
        <Avatar src={props.user.imageUrl} alt="avatar" />
      </div>
      <Typography variant="body1" gutterBottom>
        {props.user.name}
      </Typography>
      <Typography color="primary" variant="body1" gutterBottom>
        {emailFormatter(props.user.email)}
      </Typography>
    </div>
  );
}

export default AvatarPic;
