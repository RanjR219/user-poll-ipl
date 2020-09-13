import React from "react";
import { GoogleLogout } from "react-google-login";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  function logout() {
    props.setIsLoggedIn(false);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            USER POLL
          </Typography>

          {props.loginStatus ? (
            <GoogleLogout
              clientId="142267753114-mvl2jf7ttild5rc0kbese982se6k4gpn.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
