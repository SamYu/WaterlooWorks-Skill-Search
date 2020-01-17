import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';


const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

function NavBar({ classes, isAuthenticated, onLogoutUser }) {
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6">
            WaterlooWorks Skill Search (Beta)
          </Typography>
          {isAuthenticated && <Button onClick={onLogoutUser} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>

  );
}

export default withStyles(styles)(NavBar);
