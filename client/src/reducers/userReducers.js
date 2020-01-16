import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/userActions';

// eslint-disable-next-line import/prefer-default-export
export function auth(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  user: null,
  errorMessage: '',
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.email,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
