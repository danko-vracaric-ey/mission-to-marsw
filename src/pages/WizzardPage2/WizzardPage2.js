import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./WizzardPage2.module.scss";
import Input from "../../components/Wizzard/Input/Input";
import Select from "../../components/Wizzard/Select/Select";
import useInput from "../../hooks/useInput";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import WizzardButtonsLayout from "../../layout/WizzardButtonsLayout/WizzardButtonsLayout";

const WizzardPage2 = (props) => {
  const { page } = useParams();
  const { onForm2Submit } = props;
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: localStorage.getItem("email"),
    address1: localStorage.getItem("address1"),
    address2: localStorage.getItem("address2"),
    state: localStorage.getItem("state") ? localStorage.getItem("state") : "",
    city: localStorage.getItem("city"),
    postalCode: localStorage.getItem("postalCode")
      ? localStorage.getItem("postalCode")
      : "",
    howManyYearsLived: localStorage.getItem("howManyYearsLived"),
  });

  let isFormValid = false;

  const emailInputHandler = (e) => {
    localStorage.setItem("email", state.email);

    setState((prev) => ({ ...prev, email: e.target.value }));
  };
  const {
    onChangeFunc: emailChangeFunc,
    onBlurFunc: emailBlurFunc,
    enteredValue: enteredEmailValue,
    reset: resetEmailValue,
    isValid: emailIsValid,
    isInvalid: emailInvalid,
  } = useInput((val) => {
    return val
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }, emailInputHandler);

  const address1InputHandler = (e) => {
    localStorage.setItem("address1", state.address1);

    setState((prev) => ({ ...prev, address1: e.target.value }));
  };
  const {
    onChangeFunc: address1ChangeFunc,
    onBlurFunc: address1BlurFunc,
    enteredValue: address1Value,
    reset: resetAddress1Value,
    isValid: address1IsValid,
    isInvalid: address1Invalid,
  } = useInput((val) => {
    return val.length !== 0;
  }, address1InputHandler);

  const address2InputHandler = (e) => {
    localStorage.setItem("address2", state.address2);
    setState((prev) => ({ ...prev, address2: e.target.value }));
  };
  const {
    onChangeFunc: address2ChangeFunc,
    onBlurFunc: address2BlurFunc,
    enteredValue: address2Value,
    reset: resetAddress2Value,
    isValid: address2IsValid,
    isInvalid: address2Invalid,
  } = useInput((val) => {
    return val.length !== 0;
  }, address2InputHandler);

  const selectHandler = (e) => {
    localStorage.setItem("state", state.state);
    setState((prev) => ({
      ...prev,
      state: e.target.value,
    }));
  };

  const cityInputHandler = (e) => {
    localStorage.setItem("city", state.city);
    setState((prev) => ({ ...prev, city: e.target.value }));
  };
  const {
    onChangeFunc: cityChangeFunc,
    onBlurFunc: cityBlurFunc,
    enteredValue: cityValue,
    reset: resetCityValue,
    isValid: cityIsValid,
    isInvalid: cityInvalid,
  } = useInput((val) => {
    return val.length !== 0;
  }, cityInputHandler);

  const postalCodeInputHandler = (e) => {
    localStorage.setItem("postalCode", state.postalCode);
    setState((prev) => ({ ...prev, postalCode: e.target.value }));
  };
  const {
    onChangeFunc: postalCodeChangeFunc,
    onBlurFunc: postalCodeBlurFunc,
    enteredValue: postalCodeValue,
    reset: resetPostalCodeValue,
    isValid: postalCodeIsValid,
    isInvalid: postalCodeInvalid,
  } = useInput((val) => {
    return val.length !== 0 && val !== "Zip";
  }, postalCodeInputHandler);

  const howLongLivedInputHandler = (e) => {
    localStorage.setItem("howManyYearsLived", state.howManyYearsLived);
    setState((prev) => ({ ...prev, howManyYearsLived: e.target.value }));
  };
  const {
    onChangeFunc: howLongLivedChangeFunc,
    onBlurFunc: howLongLivedBlurFunc,
    enteredValue: howLongLivedValue,
    reset: resetHowLongLivedValue,
    isValid: howLongLivedIsValid,
    isInvalid: howLongLivedInvalid,
  } = useInput((val) => {
    return val.length !== 0;
  }, howLongLivedInputHandler);

  if (
    !emailInvalid &&
    !address1Invalid &&
    !address2Invalid &&
    !state.state !== "" &&
    !cityInvalid &&
    !postalCodeInvalid
  ) {
    isFormValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    onForm2Submit(state);

    navigate(`/application/${page * 1 + 1}`);
  };

  const onBackHandler = () => {
    navigate(`/application/${page * 1 - 1}`);
  };

  return (
    <WizzardFormLayout>
      <form id="form2" className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.input_field}>
          <Input
            type="text"
            name="Email"
            id="email"
            value={state.email}
            label="What is your email address?"
            onChange={emailChangeFunc}
            onBlur={emailBlurFunc}
            className={classes.email}
          />

          <div className={classes.address_wrapper}>
            <div className={classes.address}>
              <Input
                type="text"
                name="Address1"
                id="address1"
                value={state.address1}
                label="Address line 1"
                onChange={address1ChangeFunc}
                onBlur={address1BlurFunc}
              />
            </div>
            <div className={classes.address}>
              <Input
                type="text"
                name="Address"
                id="address2"
                value={state.address2}
                label="Address line 2"
                notMandatory={true}
                onChange={address2ChangeFunc}
                onBlur={address2BlurFunc}
              />
            </div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.state_city}>
              <Select
                value={["Serbia", "Germany", "France"]}
                id="state"
                name="State"
                value2={state.state}
                notMandatory={false}
                label="State"
                className={classes.select_city}
                onChange={selectHandler}
              />
              <Input
                type="text"
                name="City"
                id="city"
                value={state.city}
                label="City/Town"
                className={classes.city}
                disabled={state.state === "" ? true : false}
                onChange={cityChangeFunc}
                onBlur={cityBlurFunc}
              />
              <Input
                type="text"
                name="Zip"
                id="postal"
                value={state.postalCode}
                label="Postal code"
                className={classes.postal}
                disabled={state.city !== "" ? false : true}
                onChange={postalCodeChangeFunc}
                onBlur={postalCodeBlurFunc}
              />
            </div>
            <Input
              type="text"
              name="Time"
              id="time"
              value={state.howManyYearsLived}
              label="How many years have you lived here?"
              className={classes.time}
              onChange={howLongLivedChangeFunc}
              onBlur={howLongLivedBlurFunc}
            />
          </div>
        </div>
      </form>
      <WizzardButtonsLayout>
        <div className={classes.button_back}>
          <button type="button" onClick={onBackHandler}>
            BACK
          </button>
        </div>
        <div className={classes.button_continue}>
          <button disabled={false} form="form2" type="submit">
            CONTINUE
          </button>
        </div>
      </WizzardButtonsLayout>
    </WizzardFormLayout>
  );
};

export default WizzardPage2;
