import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import classes from "./WizzardPage1.module.scss";
import Input from "../../components/Wizzard/Input/Input";
import Select from "../../components/Wizzard/Select/Select";
import useInput from "../../hooks/useInput";
import WizzardButtons from "../../components/Wizzard/WizzardButtons/WizzardButtons";
import { Contex } from "../../store/Store";
import {
  WIZARD_PAGE_1_SELECT_TITLE,
  WIZARD_PAGE_1_SELECT_TITLE_1,
  WIZARD_PAGE_1_SELECT_TITLE_2,
  WIZARD_PAGE_1_SELECT_TITLE_3,
  WIZARD_PAGE_1_SELECT_TITLE_4,
  WIZARD_PAGE_1_SELECT_TITLE_5,
  WIZARD_PAGE_1_SELECT_LABEL,
  WIZARD_PAGE_1_ERROR_MESSAGE,
  WIZARD_PAGE_1_NAME_ERROR_MESSAGE,
  WIZARD_PAGE_1_LASTNAME_ERROR_MESSAGE,
  WIZARD_PAGE_1_DATE_LABEL,
  WIZARD_PAGE_1_DATE_ERROR_MESSAGE,
} from "../../static";

/**
 * First wizard page that users lands on after confirming terms and conditions
 *
 * @param {object} props A function handling wizard rendering path
 * @returns {JSX} Wizard page one form
 */

const WizzardPage1 = (props) => {
  const { onForm1Submit } = props;
  const navigate = useNavigate();
  const ctx = useContext(Contex);
  const wizardData = ctx.state;

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
            value={[
              WIZARD_PAGE_1_SELECT_TITLE,
              WIZARD_PAGE_1_SELECT_TITLE_1,
              WIZARD_PAGE_1_SELECT_TITLE_2,
              WIZARD_PAGE_1_SELECT_TITLE_3,
              WIZARD_PAGE_1_SELECT_TITLE_4,
              WIZARD_PAGE_1_SELECT_TITLE_5,
            ]}
            name="Title"
            id="title"
            label={WIZARD_PAGE_1_SELECT_LABEL}
            notMandatory={false}
            className={classes.select_input_wrapper}
            onChange={onSelectChangeFunc}
            onBlur={onSelectBlurFunc}
            isInvalid={selectInvalid}
            errorMessage={WIZARD_PAGE_1_ERROR_MESSAGE}
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
              errorMessage={WIZARD_PAGE_1_NAME_ERROR_MESSAGE}
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
              errorMessage={WIZARD_PAGE_1_LASTNAME_ERROR_MESSAGE}
            />
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.input_date_wrapper}>
            <Input
              type="date"
              name="date"
              label={WIZARD_PAGE_1_DATE_LABEL}
              id="date"
              onChange={onDateChangeFunc}
              onBlur={onDateBlurFunc}
              value={state.dateOfBirth}
              isInvalid={dateInvalid}
              errorMessage={WIZARD_PAGE_1_DATE_ERROR_MESSAGE}
              min="1960-12-31"
              max="2002-12-31"
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

WizzardPage1.propTypes = {
  props: PropTypes.shape({
    onForm1Submit: PropTypes.func,
  }),
};

export default WizzardPage1;
