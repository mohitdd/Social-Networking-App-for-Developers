import { GET_PROFILE, PROFILE_ERROR } from "./types";
import axios from "axios";

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
