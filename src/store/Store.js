import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer/Reducer";

/**
 * A centralized store to store app wide state data
 */

const initialState = {
  isWizzardOpen: false,
  read: false,
  agree: false,
  applicationInfo: {
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    postalCode: "",
    howManyYearsLived: "",
    agriculturalSkills: "",
    agriculturalSkillsDetails: "",
    metalworkSkills: "",
    Marking: "",
    Cutting: "",
    Drilling: "",
    CuttingThreads: "",
    Filling: "",
    Joining: "",
    convicted: "",
    reasons: [],
    airplaneSkills: "",
    carSkills: "",
    bicycleSkills: "",
  },
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Contex.Provider value={{ state, dispatch }}>{children}</Contex.Provider>
  );
};

export const Contex = createContext(initialState);
export default Store;
