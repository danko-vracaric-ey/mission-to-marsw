import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer/Reducer";

const initialState = {};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Contex.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </Contex.Provider>
  );
};

export const Contex = createContext(initialState);
export default Store;
