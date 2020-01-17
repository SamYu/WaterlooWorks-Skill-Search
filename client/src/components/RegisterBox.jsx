import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme) => ({
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
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


function RegisterBox({ classes, onRegisterUser, errorMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorLabel, setErrorLabel] = useState(errorMessage);

  useEffect(() => {
    setErrorLabel(null);
  }, [email, password, confirmPassword]);

  useEffect(() => {
    if (errorMessage && errorMessage !== errorLabel) setErrorLabel(errorMessage);
  }, [errorMessage]);

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleChangeConfirmPassword = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      onRegisterUser(email, password);
    } else {
      setErrorLabel('Passwords do not match. Please confirm your password');
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={submitForm}>
        <Paper elevation="5" className={classes.formWrapper}>
          <Typography variant="h3">Register</Typography>
          <TextField
            className={classes.formInput}
            value={email}
            onChange={handleChangeEmail}
            label="Email"
            type="email"
            error={errorLabel}
            helperText={errorLabel}
            required
          />
          <TextField
            className={classes.formInput}
            value={password}
            onChange={handleChangePassword}
            error={errorLabel}
            label="Password"
            type="password"
            required
          />
          <TextField
            className={classes.formInput}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            error={errorLabel}
            label="Confirm Password"
            type="password"
            required
          />
          <div className={classes.buttonsWrapper}>
            <Button variant="contained" className={classNames(classes.submitButton, classes.button)} type="submit">Register</Button>
            <Button variant="contained" href="/login" className={classes.button}>Returning User?</Button>
          </div>
        </Paper>
      </form>
    </div>
  );
}

export default withStyles(styles)(RegisterBox);
