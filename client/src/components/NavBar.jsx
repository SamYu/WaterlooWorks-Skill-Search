import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import SideBar from './SideBar';


const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

function NavBar({ classes, isAuthenticated, onLogoutUser }) {
  const [sideBarState, setSideBarState] = useState(false);

  function toggleSideBar(newState) {
    setSideBarState(newState);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={toggleSideBar} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            WaterlooWorks Skill Search (Beta)
          </Typography>
          {isAuthenticated && <Button onClick={onLogoutUser} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
      <SideBar open={sideBarState} toggleSideBar={toggleSideBar} />
    </div>

  );
}

export default withStyles(styles)(NavBar);
