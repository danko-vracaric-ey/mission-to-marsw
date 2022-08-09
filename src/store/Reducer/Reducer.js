/**
 * A reducer function used for computing logic of the Store
 * @param {object} state Current state of the app
 * @param {object} action Information about the type of action and any payload it might carry
 * @returns  New State or previous if there are no changes in the state
 */
const Reducer = (state, action) => {
  if (action.type === "SOMETHING") {
    return {
      ...state,
    };
  }
  return state;
};

export default Reducer;
