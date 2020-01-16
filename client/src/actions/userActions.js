import axios from 'axios';
import { receiveJobs } from './jobActions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin(email) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    email,
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    message,
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(requestLogin(email));
    const response = axios.post(
      '/api/login',
      { user: { email, password } },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response.then((res) => {
      const { user } = res.data;
      localStorage.setItem('jwtToken', user.token);
      dispatch(receiveLogin(user));
    }).catch((err) => {
      const { error } = err.response.data;
      dispatch(loginError(error));
    });
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('jwtToken');
    dispatch(receiveLogout());
  };
}
