import { useState, useRef } from "react";

/**
 * A custom hook used to manage input state and validity
 * @param {Function} validity function that sets the validity condition
 * @param {Function} setStateWizzard function that sets state inside the wizzard
 * @param {string} enteredValue Input value stored in wizzard page state
 * @returns Object of data used to handle input's state
 */

const useInput = (validity, setStateWizzard, enteredValue) => {
  const [isTouched, setIsTouched] = useState(false);
  const ref = useRef();

  const isValid = validity(enteredValue);
  const isInvalid = !isValid && isTouched;

  const onChangeFunc = (val) => {
    setIsTouched(true);
    setStateWizzard(val);
  };

  const onBlurFunc = (val) => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
  };
  return {
    enteredValue,
    isTouched,
    isValid,
    isInvalid,
    onChangeFunc,
    onBlurFunc,
    reset,
    ref,
  };
};

export default useInput;
