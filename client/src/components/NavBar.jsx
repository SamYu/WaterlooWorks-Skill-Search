import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

function NavBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            WaterlooWorks Skill Search (Beta)
          </Typography>
          {/* <Button color="inherit">Logout</Button> */}
        </Toolbar>
      </AppBar>
    </div>

  );
}

export default NavBar;
