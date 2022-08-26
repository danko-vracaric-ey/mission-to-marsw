/**
 * A reducer function used for computing logic of the Store
 * @param {object} state Current state of the app
 * @param {object} action Information about the type of action and any payload it might carry
 * @returns  New State or previous if there are no changes in the state
 */

const Reducer = (state, action) => {
  if (action.type === "HANDLE_FOOTER_LINKS") {
    return {
      ...state,
      shouldShow: action.payload.shouldShow,
    };
  }

  if (action.type === "ADD_FORM_INTRO_DATA") {
    return {
      ...state,
      isWizzardOpen: action.payload.isWizzardOpen,
      read: action.payload.read,
      agree: action.payload.agree,
    };
  }
  if (action.type === "ADD_FORM1_DATA") {
    return {
      ...state,
      applicationInfo: {
        ...state.applicationInfo,
        title: action.payload.title,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
      },
    };
  }
  if (action.type === "ADD_FORM2_DATA") {
    return {
      ...state,
      applicationInfo: {
        ...state.applicationInfo,
        email: action.payload.email,
        address1: action.payload.address1,
        address2: action.payload.address2,
        state: action.payload.state,
        city: action.payload.city,
        postalCode: action.payload.postalCode,
        howManyYearsLived: action.payload.howManyYearsLived,
      },
    };
  }
  if (action.type === "ADD_FORM3_DATA") {
    return {
      ...state,
      applicationInfo: {
        ...state.applicationInfo,
        agriculturalSkills: action.payload.agriculturalSkills,
        agriculturalSkillsDetails: action.payload.agriculturalSkillsDetails,
        metalworkSkills: action.payload.metalworkSkills,
        Marking: action.payload.Marking,
        Cutting: action.payload.Cutting,
        Drilling: action.payload.Drilling,
        CuttingThreads: action.payload.CuttingThreads,
        Filling: action.payload.Filling,
        Joining: action.payload.Joining,
        convicted: action.payload.convicted,
        reasons: action.payload.reasons,
        airplaneSkills: action.payload.airplaneSkills,
        carSkills: action.payload.carSkills,
        bicycleSkills: action.payload.bicycleSkills,
      },
    };
  }

  return state;
};

export default Reducer;
