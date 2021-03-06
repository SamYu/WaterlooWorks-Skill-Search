import React, { useState } from 'react';
import classNames from 'classnames';
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
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginRight: '50px',
  },
  button: {
    marginTop: '20px',
    maxWidth: 200,
    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
  },
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
          <div className={classes.buttonsWrapper}>
            <Button variant="contained" className={classNames(classes.submitButton, classes.button)} type="submit">Login</Button>
            <Button variant="contained" href="/register" className={classes.button}>New User?</Button>
          </div>
        </Paper>
      </form>
    </div>
  );
}

export default withStyles(styles)(LoginBox);
