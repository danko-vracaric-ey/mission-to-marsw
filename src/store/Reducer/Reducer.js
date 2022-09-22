/**
 * A reducer function used for computing logic of the Store
 * @param {object} state Current state of the app
 * @param {object} action Information about the type of action and any payload it might carry
 * @returns  New State or previous if there are no changes in the state
 */

const Reducer = (state, action) => {
  if (action.type === "CLEAR_FORM_DATA") {
    return {
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
  }
  if (action.type === "ADD_FORM1_DATA") {
    return {
      ...state,

      title: action.payload.title,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      dateOfBirth: action.payload.dateOfBirth,
    };
  }
  if (action.type === "ADD_FORM2_DATA") {
    return {
      ...state,

      email: action.payload.email,
      address1: action.payload.address1,
      address2: action.payload.address2,
      country: action.payload.country,
      city: action.payload.city,
      postalCode: action.payload.postalCode,
      howManyYearsLived: action.payload.howManyYearsLived,
      countries: action.payload.countries,
      selectedCountries: action.payload.selectedCountries,
      selectedStateTLA: action.payload.selectedStateTLA,
      selectedCities: action.payload.selectedCities,
      postalCodes: action.payload.selectedCities,
      selectedPostalCodes: action.payload.selectedPostalCodes,
      selectedPostalCodeNumber: action.payload.selectedPostalCodeNumber,
    };
  }
  if (action.type === "ADD_FORM3_DATA") {
    return {
      ...state,

      agriculturalSkills: action.payload.agriculturalSkills,
      agriculturalSkillsDetails: action.payload.agriculturalSkillsDetails,
      metalworkSkills: action.payload.metalworkSkills,
      metalworkSkillsDetails: action.payload.metalworkSkillsDetails,
      Marking: action.payload.Marking,
      Cutting: action.payload.Cutting,
      Drilling: action.payload.Drilling,
      CuttingThreads: action.payload.CuttingThreads,
      Filling: action.payload.Filling,
      Joining: action.payload.Joining,
      convicted: action.payload.convicted,
      convictions: action.payload.convictions,
      airplaneSkills: action.payload.airplaneSkills,
      carSkills: action.payload.carSkills,
      bicycleSkills: action.payload.bicycleSkills,
    };
  }
  if (action.type === "ADD_FORM_VALIDITY") {
    return {
      ...state,
      formIsValid: action.payload.formIsValid,
    };
  }

  return state;
};

export default Reducer;
