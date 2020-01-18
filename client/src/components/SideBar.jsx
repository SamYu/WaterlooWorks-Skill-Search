import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WorkIcon from '@material-ui/icons/Work';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const styles = {
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
};

function SideBar({ classes, open, toggleSideBar }) {
  return (
    <Drawer
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      onClose={() => toggleSideBar(false)}
    >
      <List>
        <ListItem onClick={() => toggleSideBar(false)} button key="All Jobs">
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="Browse Jobs" />
        </ListItem>
        <ListItem onClick={() => toggleSideBar(false)} button key="Saved Jobs">
          <ListItemIcon><BookmarksIcon /></ListItemIcon>
          <ListItemText primary="Saved Jobs" />
        </ListItem>
      </List>
    </Drawer>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideBar);
