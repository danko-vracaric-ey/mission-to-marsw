import { useState } from "react";
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
