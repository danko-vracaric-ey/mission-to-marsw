import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer/Reducer";

/**
 * A centralized store to store app wide state data
 */

export const initialState = {
  applicationInfo: {
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    postalCode: "",
    howManyYearsLived: "",
    agriculturalSkills: "No",
    agriculturalSkillsDetails: "",
    metalworkSkills: "No",
    metalworkSkillsDetails: [],
    Marking: false,
    markingValue: "",
    Cutting: false,
    cuttingValue: "",
    Drilling: false,
    drillingValue: "",
    CuttingThreads: false,
    cuttingThreadsValue: "",
    Filling: false,
    fillingValue: "",
    Joining: false,
    convicted: "No",
    reasons: [{ whatName: "", whenName: "" }],
    airplaneSkills: "No",
    carSkills: "No",
    bicycleSkills: "No",
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
