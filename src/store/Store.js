import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer/Reducer";

/**
 * A centralized store to store app wide state data
 */

export const metalworkSkillsInitialState = {
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
};

export const initialState = {
  ...metalworkSkillsInitialState,
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
  agriculturalSkills: "",
  agriculturalSkillsDetails: "",
  metalworkSkills: "",
  metalworkSkillsDetails: [],
  convicted: "",
  convictions: [{ forWhat: "", convictionDate: "" }],
  airplaneSkills: "",
  carSkills: "",
  bicycleSkills: "",
  countries: [],
  selectedCountries: [],
  selectedStateTLA: "",
  selectedCities: ["City"],
  postalCodes: [],
  selectedPostalCodes: [],
  selectedPostalCodeNumber: "",
  formIsValid: false,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Contex.Provider value={{ state, dispatch }}>{children}</Contex.Provider>
  );
};

export const Contex = createContext(initialState);
export default Store;
