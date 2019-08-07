import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    console.log("I am called to set the token");
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios("http://localhost:4000/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register a User
export const register = ({ email, password, name }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      "http://localhost:4000/api/users/",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAILURE
    });
  }
};

//Login User
export const loginUser = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth",
      body,
      config
    );
    console.log("Passes");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: LOGIN_FAILURE });
  }
};

//when the user logs Out

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
