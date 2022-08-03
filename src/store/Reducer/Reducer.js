const Reducer = (state, action) => {
  if (action.type === "SOMETHING") {
    return {
      ...state,
    };
  }
  return state;
};

export default Reducer;
