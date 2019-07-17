import { REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions/types";

const initialstate = {
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: false,
  user: null
};

export default function(state = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false
      };
  }
}
