import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import classes from "./WizzardPage1.module.scss";
import Input from "../../components/Wizzard/Input/Input";
import Select from "../../components/Wizzard/Select/Select";
import useInput from "../../hooks/useInput";
import WizzardButtons from "../../components/Wizzard/WizzardButtons/WizzardButtons";
import { Contex } from "../../store/Store";

const WizzardPage1 = (props) => {
  const { onForm1Submit } = props;
  const navigate = useNavigate();
  const ctx = useContext(Contex);
  const wizardData = ctx.state.applicationInfo;

  const [state, setState] = useState({
    title: wizardData.title,
    firstName: wizardData.firstName,
    lastName: wizardData.lastName,
    dateOfBirth: wizardData.dateOfBirth,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const selectHandler = (e) => {
    setState((prev) => ({ ...prev, title: e.target.value }));
  };
  const {
    onChangeFunc: onSelectChangeFunc,
    onBlurFunc: onSelectBlurFunc,
    isValid: selectIsValid,
    isInvalid: selectInvalid,
  } = useInput(
    (val) => {
      return val.trim() !== "Title" && val.trim() !== "";
    },
    selectHandler,
    state.title
  );

  const nameInputHandler = (e) => {
    setState((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const {
    onChangeFunc: onNameChangeFunc,
    onBlurFunc: onNameBlurFunc,
    isValid: nameIsValid,
    isInvalid: nameInvalid,
  } = useInput(
    (val) => {
      return val.trim() !== "" && val.length < 12;
    },
    nameInputHandler,
    state.firstName
  );

  const lastNameInputHandler = (e) => {
    setState((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const {
    onChangeFunc: onLastNameChangeFunc,
    onBlurFunc: onLastNameBlurFunc,
    isValid: lastNameIsValid,
    isInvalid: lastNameInvalid,
  } = useInput(
    (val) => {
      return val.length !== 0 && val.length < 15;
    },
    lastNameInputHandler,
    state.lastName
  );

  const dateInputHandler = (e) => {
    setState((prev) => ({ ...prev, dateOfBirth: e.target.value }));
  };

  const {
    onChangeFunc: onDateChangeFunc,
    onBlurFunc: onDateBlurFunc,
    isValid: dateIsValid,
    isInvalid: dateInvalid,
  } = useInput(
    (val) => {
      return val.trim() !== "";
    },
    dateInputHandler,
    state.dateOfBirth
  );

  useEffect(() => {
    if (nameIsValid && lastNameIsValid && selectIsValid && dateIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [selectIsValid, nameIsValid, lastNameIsValid, dateIsValid]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    ctx.dispatch({
      type: "ADD_FORM1_DATA",
      payload: {
        title: state.title,
        firstName: state.firstName,
        lastName: state.lastName,
        dateOfBirth: state.dateOfBirth,
      },
    });

    onForm1Submit(state);
    setFormIsValid(true);
  };

  const onBackHandler = () => {
    navigate(`/application/intro`);
  };

  return (
    <WizzardFormLayout>
      <form id="form1" className={classes.input_field} autoComplete="off">
        <div className={classes.top}>
          <Select
            value2={state.title}
            value={["Title", "Mr", "Miss", "Dr"]}
            name="Title"
            id="title"
            label="Please provide your title and name"
            notMandatory={false}
            className={classes.select_input_wrapper}
            onChange={onSelectChangeFunc}
            onBlur={onSelectBlurFunc}
            isInvalid={selectInvalid}
            errorMessage="Please select your title!"
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
              isInvalid={nameInvalid}
              errorMessage="Please enter a valid name!"
            />

            <Input
              className={classes.input_last_name_wrapper}
              type="text"
              name="Last Name"
              id="last"
              onChange={onLastNameChangeFunc}
              onBlur={onLastNameBlurFunc}
              value={state.lastName}
              isInvalid={lastNameInvalid}
              errorMessage="Please enter a valid last name!"
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
              onChange={onDateChangeFunc}
              onBlur={onDateBlurFunc}
              value={state.dateOfBirth}
              isInvalid={dateInvalid}
              errorMessage="Please enter a valid date!"
              min="1960-12-31"
              max="2000-12-31"
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

export default WizzardPage1;
