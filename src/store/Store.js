import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer/Reducer";

/**
 * A centralized store to store app wide state data
 */

const initialState = {};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Contex.Provider value={{ state, dispatch }}>{children}</Contex.Provider>
  );
};

export const Contex = createContext(initialState);
export default Store;
