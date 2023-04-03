import { createContext, useReducer } from "react";
import asyncstorage from "../utils/asyncstorage";
import { data } from "../utils/data";

const initialState = {
  darkMode: false,
  hydropinics_user: asyncstorage.getItem("hydropinics_user")
    ? asyncstorage.getItem("hydropinics_user")
    : null,
  signed_in: true,
  search_query: "",
  current_temp: data.OPTIMAL_TEMP,
  current_humid: data.OPTIMAL_HUMID
};

export const Store = createContext();

function reducer(state = initialState, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "USER_LOGIN":
      asyncstorage.setItem("hydropinics_user", action.payload);
      return { ...state, hydropinics_user: action.payload };
    case "USER_SIGNED_IN":
      return { ...state, signed_in: action.payload };
    case "USER_LOGOUT":
      asyncstorage.removeItem("hydropinics_user");
      return { ...state, hydropinics_user: null };
    case "CHANGE_TEMP":
      return { ...state, current_temp: action.payload };
      case "CHANGE_HUMID":
        return { ...state, current_humid: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, search_query: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
