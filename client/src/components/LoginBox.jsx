import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    width: '400px',
    margin: '20vh auto 0',
    padding: 40,
  },
  formInput: {
    margin: '20px 0',
  },
  submitButton: {
    marginTop: '20px',
    width: 200,
    margin: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  }
});


function LoginBox({ classes, onLoginUser, errorMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    onLoginUser(email, password);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={submitForm}>
        <Paper elevation="5" className={classes.formWrapper}>
          <Typography variant="h3">Log In</Typography>
          <TextField
            className={classes.formInput}
            value={email}
            onChange={handleChangeEmail}
            label="Email"
            type="email"
            error={errorMessage}
            helperText={errorMessage}
            required
          />
          <TextField
            className={classes.formInput}
            value={password}
            onChange={handleChangePassword}
            error={errorMessage}
            label="Password"
            type="password"
            required
          />
          <Button variant="contained" className={classes.submitButton} type="submit">Log In</Button>
        </Paper>
      </form>
    </div>
  );
}

export default withStyles(styles)(LoginBox);
