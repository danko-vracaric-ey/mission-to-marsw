import { useState } from "react";

/**
 * A custom hook used to manage radio inputs state
 * @param {Function} check function that checks if the radio button Yes is selected
 * @param {Function} setStateWizzard function that sets state inside the wizzard
 * @param {string} enteredValue Input value stored in wizzard page state
 * @returns Object of data used to handle input's state
 */

const useRadio = (check, setStateWizzard, state) => {
  const [selectedRadioBtn, setSelectedRadioBtn] = useState(state);

  const isYes = check(selectedRadioBtn);

  const isRadioSelected = (value) => {
    return selectedRadioBtn === value;
  };

  const handleRadioClick = (e) => {
    setSelectedRadioBtn(e.currentTarget.value);
    setStateWizzard(e);
  };

  return {
    isRadioSelected,
    handleRadioClick,
    selectedRadioBtn,
    isYes,
  };
};

export default useRadio;
