import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import { set } from "mongoose";

//get current user profile
export const getCurrentUserProfile = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:4000/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

//Create or update Profile
export const createProfile = (
  formData,
  edit = false,
  history
) => async dispatch => {
  try {
    console.log("Action reaching here" + edit);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      "http://localhost:4000/api/profile",
      formData,
      config
    );
    console.log("I am going to call the dispatch");
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(
        edit ? "Profile Updated" : "Profile Created Successfully",
        "success"
      )
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//Add Experience to the profile
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(
      "http://localhost:4000/api/profile/experience",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience is updated", "success"));
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
