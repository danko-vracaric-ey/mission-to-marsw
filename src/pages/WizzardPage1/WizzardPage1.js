import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import WizzardButtonsLayout from "../../layout/WizzardButtonsLayout/WizzardButtonsLayout";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import classes from "./WizzardPage1.module.scss";
import Input from "../../components/Wizzard/Input/Input";
import Select from "../../components/Wizzard/Select/Select";
import useInput from "../../hooks/useInput";
import { Contex } from "../../store/Store";

const WizzardPage1 = (props) => {
  const { page } = useParams();
  const { onForm1Submit } = props;
  const navigate = useNavigate();
  const applicationData = useContext(Contex);

  const [state, setState] = useState({
    title: localStorage.getItem("title"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    dateOfBirth: localStorage.getItem("dateOfBirth"),
  });

  let isFormValid = false;

  const selectHandler = (e) => {
    localStorage.setItem("title", state.title);
    setState((prev) => ({ ...prev, title: e.target.value }));
  };

  const nameInputHandler = (e) => {
    localStorage.setItem("firstName", state.firstName);
    setState((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const {
    onChangeFunc: onNameChangeFunc,
    onBlurFunc: onNameBlurFunc,
    enteredValue: enteredValueNameValue,
    reset: resetNameValue,
    isValid: nameIsValid,
    isInvalid: nameInvalid,
  } = useInput((val) => {
    return val.length !== 0;
  }, nameInputHandler);

  const lastNameInputHandler = (e) => {
    localStorage.setItem("lastName", state.lastName);
    setState((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const {
    onChangeFunc: onLastNameChangeFunc,
    onBlurFunc: onLastNameBlurFunc,
    enteredValue: enteredValueLastNameValue,
    reset: resetLastNameValue,
    isValid: lastNameIsValid,
    isInvalid: lastNameInvalid,
  } = useInput((val) => {
    return val.length !== 0 && val.length < 15;
  }, lastNameInputHandler);

  const dateInputHandler = (e) => {
    localStorage.setItem("dateOfBirth", state.dateOfBirth);
    setState((prev) => ({ ...prev, dateOfBirth: e.target.value }));
  };

  if (!nameInvalid && !lastNameInvalid) {
    isFormValid = true;
  }

  const onSubmitHanlder = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    onForm1Submit(state);
    applicationData.dispatch({
      type: "ADD_FORM1_DATA",
      payload: {
        title: state.title,
        firstName: state.firstName,
        lastName: state.lastName,
        dateOfBirth: state.dateOfBirth,
      },
    });
    navigate(`/application/${page * 1 + 1}`);
  };

  const onBackHandler = () => {
    navigate(`/application/intro`);
  };

  return (
    <WizzardFormLayout>
      <form
        id="form1"
        onSubmit={onSubmitHanlder}
        className={classes.input_field}
      >
        <div className={classes.top}>
          <Select
            value2={state.title}
            value={["Mr", "Miss", "Dr"]}
            name="Title"
            id="title"
            label="Please provide your title and name"
            notMandatory={false}
            className={classes.select_input_wrapper}
            onChange={selectHandler}
          />

          <div className={classes.first_last_wrapper}>
            <Input
              type="text"
              name="First Name"
              id="first"
              onChange={onNameChangeFunc}
              onBlur={onNameBlurFunc}
              className={classes.input_name_wrapper}
              value={state.firstName}
            />
            <Input
              className={classes.input_last_name_wrapper}
              type="text"
              name="Last Name"
              id="last"
              onChange={onLastNameChangeFunc}
              onBlur={onLastNameBlurFunc}
              value={state.lastName}
            />
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.input_date_wrapper}>
            <Input
              type="date"
              name="date"
              label="What is your date of birth?"
              id="date"
              onChange={dateInputHandler}
              value={state.dateOfBirth}
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
          <button disabled={!isFormValid} form="form1" type="submit">
            CONTINUE
          </button>
        </div>
      </WizzardButtonsLayout>
    </WizzardFormLayout>
  );
};

export default WizzardPage1;
