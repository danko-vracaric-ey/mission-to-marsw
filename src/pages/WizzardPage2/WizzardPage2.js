import { useEffect, useState } from "react";

import classes from "./WizzardPage2.module.scss";
import Input from "../../components/Wizzard/Input/Input";
import Select from "../../components/Wizzard/Select/Select";
import useInput from "../../hooks/useInput";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import WizzardButtons from "../../components/Wizzard/WizzardButtons/WizzardButtons";

const WizzardPage2 = (props) => {
  const { onForm2Submit, setStep, wizzard2Data } = props;
  const {
    email,
    address1,
    address2,
    country,
    city,
    postalCode,
    howManyYearsLived,
  } = wizzard2Data;

  const [state, setState] = useState({
    email: email,
    address1: address1,
    address2: address2,
    country: country,
    city: city,
    postalCode: postalCode,
    howManyYearsLived: howManyYearsLived,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputHandler = (e) => {
    setState((prev) => ({ ...prev, email: e.target.value }));
  };
  const {
    onChangeFunc: emailChangeFunc,
    onBlurFunc: emailBlurFunc,
    isValid: emailIsValid,
    isInvalid: emailInvalid,
  } = useInput(
    (val) => {
      return val.trim() !== "" && val.includes("@");
    },
    emailInputHandler,
    state.email
  );

  const address1InputHandler = (e) => {
    setState((prev) => ({ ...prev, address1: e.target.value }));
  };
  const {
    onChangeFunc: address1ChangeFunc,
    onBlurFunc: address1BlurFunc,
    isValid: address1IsValid,
    isInvalid: address1Invalid,
  } = useInput(
    (val) => {
      return val.length !== 0;
    },
    address1InputHandler,
    state.address1
  );

  const address2InputHandler = (e) => {
    setState((prev) => ({ ...prev, address2: e.target.value }));
  };
  const {
    onChangeFunc: address2ChangeFunc,
    onBlurFunc: address2BlurFunc,
    isValid: address2IsValid,
    isInvalid: address2Invalid,
  } = useInput(
    (val) => {
      return val.length !== 0;
    },
    address2InputHandler,
    state.address2
  );

  const selectHandler = (e) => {
    setState((prev) => ({
      ...prev,
      country: e.target.value,
    }));
  };

  const {
    onChangeFunc: selectChangeFunc,
    onBlurFunc: selectBlurFunc,
    isValid: selectIsValid,
    isInvalid: selectInvalid,
  } = useInput(
    (val) => {
      return val.trim() !== "Country" && val.trim() !== "";
    },
    selectHandler,
    state.country
  );

  const cityInputHandler = (e) => {
    setState((prev) => ({ ...prev, city: e.target.value }));
  };
  const {
    onChangeFunc: cityChangeFunc,
    onBlurFunc: cityBlurFunc,
    isValid: cityIsValid,
    isInvalid: cityInvalid,
  } = useInput(
    (val) => {
      return val.length !== 0;
    },
    cityInputHandler,
    state.city
  );

  const postalCodeInputHandler = (e) => {
    setState((prev) => ({ ...prev, postalCode: e.target.value }));
  };
  const {
    onChangeFunc: postalCodeChangeFunc,
    onBlurFunc: postalCodeBlurFunc,
    isValid: postalCodeIsValid,
    isInvalid: postalCodeInvalid,
  } = useInput(
    (val) => {
      return val.length !== 0 && val !== "Zip";
    },
    postalCodeInputHandler,
    state.postalCode
  );

  const howLongLivedInputHandler = (e) => {
    setState((prev) => ({ ...prev, howManyYearsLived: e.target.value }));
  };
  const {
    onChangeFunc: howLongLivedChangeFunc,
    onBlurFunc: howLongLivedBlurFunc,
    isValid: howLongLivedIsValid,
    isInvalid: howLongLivedInvalid,
  } = useInput(
    (val) => {
      return val.length !== 0;
    },
    howLongLivedInputHandler,
    state.howManyYearsLived
  );

  useEffect(() => {
    if (
      emailIsValid &&
      address1IsValid &&
      address2IsValid &&
      selectIsValid &&
      cityIsValid &&
      postalCodeIsValid &&
      howLongLivedIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    emailIsValid,
    address1IsValid,
    address2IsValid,
    cityIsValid,
    selectIsValid,
    postalCodeIsValid,
    howLongLivedIsValid,
  ]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    onForm2Submit(state);
  };

  const onBackHandler = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <WizzardFormLayout>
      <form id="form2" className={classes.form} autoComplete="off">
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
            isInvalid={emailInvalid}
            errorMessage="Please enter a valid email!"
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
                isInvalid={address1Invalid}
                errorMessage="Please enter a valid address"
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
                isInvalid={address2Invalid}
                errorMessage="Please enter a valid adress"
              />
            </div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.state_city}>
              <Select
                value={["Country", "Serbia", "Germany", "France"]}
                id="state"
                name="State"
                value2={state.country}
                notMandatory={false}
                label="State"
                onChange={selectChangeFunc}
                onBlur={selectBlurFunc}
                className={classes.select_city}
                isInvalid={selectInvalid}
                errorMessage="Please, select a state!"
              />
              <Input
                type="text"
                name="City"
                id="city"
                value={state.city}
                label="City/Town"
                className={classes.city}
                disabled={state.country === "" ? true : false}
                onChange={cityChangeFunc}
                onBlur={cityBlurFunc}
                isInvalid={cityInvalid}
                errorMessage="Please enter a city"
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
                isInvalid={postalCodeInvalid}
                errorMessage="Please enter a valid postal code"
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
              isInvalid={howLongLivedInvalid}
              errorMessage="Please enter how long you lived here"
            />
          </div>
        </div>
      </form>
      <WizzardButtons
        onClickBackHandler={onBackHandler}
        onClickSubmitHandler={onSubmitHandler}
        disabled={!formIsValid}
      />
    </WizzardFormLayout>
  );
};

export default WizzardPage2;
