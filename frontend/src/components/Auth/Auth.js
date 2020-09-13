import React from "react";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import "./Auth.css";

function Auth(props) {
  const responseGoogleSucces = (response) => {
    props.setIsLoggedIn(true);
    props.setUser(response.profileObj);
  };
  const responseGoogleFailure = (response) => {};

  return (
    <div className="login">
      <div className="inputArea">
        <TextField
          id="standard"
          style={{ marginBottom: "15px" }}
          defaultValue=""
          label="Email"
        />
        <TextField
          style={{ marginBottom: "10px" }}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary">
          Login
        </Button>
      </div>
      <Typography style={{ marginTop: "10px" }} variant="h6" gutterBottom>
        Login with Google
      </Typography>

      <GoogleLogin
        className="googleLogin"
        isSignedIn={true}
        clientId="142267753114-mvl2jf7ttild5rc0kbese982se6k4gpn.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogleSucces}
        onFailure={responseGoogleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Auth;
