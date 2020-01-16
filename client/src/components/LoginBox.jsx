import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function LoginBox({ onLoginUser, errorMessage }) {
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
    <div>
      <form onSubmit={submitForm}>
        <TextField
          value={email}
          onChange={handleChangeEmail}
          label="Email"
          type="email"
          error={errorMessage}
          helperText={errorMessage}
          required
        />
        <TextField
          value={password}
          onChange={handleChangePassword}
          error={errorMessage}
          label="Password"
          type="password"
          required
        />
        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}

export default LoginBox;
