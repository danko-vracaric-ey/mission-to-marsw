import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./WizzardPage3.module.scss";
import InputRadio from "../../components/Wizzard/InputRadio/InputRadio";
import useRadio from "../../hooks/useRadio";
import InputCheckbox from "../../components/Wizzard/InputCheckbox/InputCheckbox";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import useInput from "../../hooks/useInput";
import WizzardButtons from "../../components/Wizzard/WizzardButtons/WizzardButtons";
import ConvictedDetails from "../../components/Wizzard/ConvictedDetails/ConvictedDetails";
import { Contex } from "../../store/Store";
import { metalworkSkillsInitialState } from "../../store/Store";
import {
  WIZARD_PAGE_3_AGRICULTURAL_SKILLS_LABEL,
  WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING,
  WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING_THREADS_LABEL,
  WIZARD_PAGE_3_INPUT_CHECKBOX_DRILLING,
  WIZARD_PAGE_3_INPUT_RADIO_VALUE_1,
  WIZARD_PAGE_3_INPUT_RADIO_VALUE_2,
  WIZARD_PAGE_3_METALWORK_SKILLS_LABEL,
  WIZARD_PAGE_3_TEXT_AREA_ERROR_MESSAGE,
  WIZARD_PAGE_3_INPUT_CHECKBOX_FILLING,
  WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING_THREADS,
  WIZARD_PAGE_3_INPUT_CHECKBOX_JOINING,
  WIZARD_PAGE_3_INPUT_CHECKBOX_MARKING,
  WIZARD_PAGE_3_CONVICTED_LABEL,
  WIZARD_PAGE_3_AIRPLANE_LABEL,
  WIZARD_PAGE_3_CAR_LABEL,
  WIZARD_PAGE_3_BICYCLE_LABEL,
  WIZARD_BUTTON_SUBMIT,
} from "../../static";
import useAxios from "../../hooks/useAxios";
import SubmitModal from "../../components/Wizzard/SubmitModal/SubmitModal";

/**
 * Third page that users lands on after successfully submitting data in second page and makes final sign up submission
 *
 * @param {object} props A function handling wizard rendering path
 * @returns {JSX} Wizard page three form and submit modal
 */

const WizzardPage3 = (props) => {
  const { setInWizzard, setStep } = props;

  const ctx = useContext(Contex);
  const wizardData = ctx.state;

  const navigate = useNavigate();

  const [state, setState] = useState({
    agriculturalSkills: "",
    agriculturalSkillsDetails: "",
    metalworkSkills: "",
    metalworkSkillsDetails: [],
    Marking: false,
    markingValue: "",
    Cutting: false,
    cuttingValue: "",
    Drilling: false,
    drillingValue: "",
    CuttingThreads: false,
    cuttingThreadsValue: "",
    Filling: false,
    fillingValue: "",
    Joining: false,
    joiningValue: "",
    convicted: "",
    convictions: [{ forWhat: "", convictionDate: "" }],
    errorMessageReasons: [],
    airplaneSkills: "",
    carSkills: "",
    bicycleSkills: "",
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    ctx.dispatch({
      type: "ADD_FORM_VALIDITY",
      payload: {
        formIsValid: formIsValid,
      },
    });

    // eslint-disable-next-line
  }, [formIsValid]);

  const [candidateDataPostResponse, setCandidateDataPostResponse] = useState({
    request: { statusText: "" },
  });

  const agriculturalSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, agriculturalSkills: e.target.value }));

    if (e.target.value === "No") {
      setState((prev) => ({ ...prev, agriculturalSkills: "No" }));
      setState((prev) => ({ ...prev, agriculturalSkillsDetails: "" }));
    }
  };

  const {
    isYes: affirmativeAnswerAgricultural,
    isRadioSelected: isRadioSelectedAgricultural,
    handleRadioClick: handleRadioClickAgricultural,
  } = useRadio(
    (val) => {
      return val === "Yes";
    },
    agriculturalSkillsInputHandler,
    state.agriculturalSkills
  );

  const agriculturalSkillsDetailsInputHandler = (e) => {
    setState((prev) => ({
      ...prev,
      agriculturalSkillsDetails: e.target.value,
    }));
  };

  const {
    onChangeFunc: onAgriculturalSkillsDetailsChangeFunc,
    onBlurFunc: onAgriculturalSkillsDetailsBlurFunc,
    isInvalid: agriculturalSkillsDetailsInvalid,
  } = useInput(
    (val) => {
      return val.trim() !== "";
    },
    agriculturalSkillsDetailsInputHandler,
    state.agriculturalSkillsDetails
  );

  const metalworkSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, metalworkSkills: e.target.value }));

    if (e.target.value === "No") {
      setState((prev) => ({ ...prev, ...metalworkSkillsInitialState }));
    }
  };

  const onMetalworkHandler = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setState((prev) => {
        return {
          ...prev,
          metalworkSkillsDetails: [...prev.metalworkSkillsDetails, value],
        };
      });
    }

    if (!checked) {
      let newArr = [];

      newArr = state.metalworkSkillsDetails.filter((e, i, arr) => {
        return e !== value;
      });

      setState((prev) => {
        return {
          ...prev,
          metalworkSkillsDetails: newArr,
        };
      });
    }

    setState((prev) => {
      const newObj = { ...prev };
      newObj[value] = !newObj[value];
      return newObj;
    });
    if (checked) {
      setState((prev) => {
        const newObj = { ...prev };
        newObj[name] = value;
        return newObj;
      });
    }
  };

  const {
    isYes: affirmativeAnswerMetalwork,
    isRadioSelected: isRadioSelectedMetalwork,
    handleRadioClick: handleRadioClickMetalwork,
  } = useRadio(
    (val) => {
      return val === "Yes";
    },
    metalworkSkillsInputHandler,
    state.metalworkSkills
  );

  const convictedInputHandler = (e) => {
    setState((prev) => ({ ...prev, convicted: e.target.value }));

    if (e.target.value === "No") {
      setState((prev) => ({ ...prev, convicted: "No" }));
      setState((prev) => ({
        ...prev,
        convictions: [{ forWhat: "", convictionDate: "" }],
      }));
    }
  };
  const {
    isYes: affirmativeAnswerConvicted,
    isRadioSelected: isRadioSelectedConvicted,
    handleRadioClick: handleRadioClickConvicted,
  } = useRadio(
    (val) => {
      return val === "Yes";
    },
    convictedInputHandler,
    state.convicted
  );

  const reasonsListAddField = (actionType) => (event) => {
    event.preventDefault();
    let errorMessage = state.convictions.map((user, key) => {
      let error = {};
      let valid = true;

      if (!user.forWhat) {
        error.errorwhatName = "What required";
        valid = false;
      } else {
        error.errorwhatName = "";
      }
      if (!user.convictionDate) {
        error.errorwhenName = "When required";
        valid = false;
      } else {
        error.errorwhenName = "";
      }

      if (
        state.convictions.length - 1 === key &&
        valid &&
        actionType === "add"
      ) {
        setState((prev) => {
          return {
            ...prev,
            convictions: [
              ...prev.convictions,
              { forWhat: "", convictionDate: "" },
            ],
          };
        });
      }
      return error;
    });
    setState((prev) => ({
      ...prev,
      errorMessageReasons: errorMessage,
    }));
  };

  const reasonsListHandleChange = (e) => {
    let value = e.target.value;

    if (["forWhat", "convictionDate"].includes(e.target.name)) {
      let reasonDetail = [...state.convictions];
      reasonDetail[e.target.dataset.id][e.target.name] = e.target.value;
      setState((prev) => {
        return {
          ...prev,
          convictions: reasonDetail,
        };
      });
    } else {
      setState((prev) => {
        return { ...prev, [e.target.name]: value.trim() };
      });
    }
  };

  const reasonsListRemoveField = (id) => (e) => {
    e.preventDefault();
    var convictions = state.convictions.filter((user, key) => key !== id);
    setState((prev) => {
      return {
        ...prev,
        convictions,
      };
    });
  };

  const airplaneSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, airplaneSkills: e.target.value }));
  };
  const {
    isRadioSelected: isRadioSelectedAirplane,
    handleRadioClick: handleRadioClickAirplane,
  } = useRadio(
    (val) => {
      return val === "Yes";
    },
    airplaneSkillsInputHandler,
    state.airplaneSkills
  );

  const carSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, carSkills: e.target.value }));
  };

  const {
    isRadioSelected: isRadioSelectedCar,
    handleRadioClick: handleRadioClickCar,
  } = useRadio(
    (val) => {
      return val === "Yes";
    },
    carSkillsInputHandler,
    state.carSkills
  );

  const bicycleSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, bicycleSkills: e.target.value }));
  };

  const {
    isRadioSelected: isRadioSelectedBicycle,
    handleRadioClick: handleRadioClickBicycle,
  } = useRadio(
    (val) => {
      return val === "Yes";
    },
    bicycleSkillsInputHandler,
    state.bicycleSkills
  );

  useEffect(() => {
    if (
      state.agriculturalSkills === "Yes" &&
      state.agriculturalSkillsDetails === ""
    ) {
      setFormIsValid(false);
    }
    if (
      state.metalworkSkills === "Yes" &&
      !state.Cutting &&
      !state.Marking &&
      !state.Drilling &&
      !state.CuttingThreads &&
      !state.Joining &&
      !state.Filling
    ) {
      setFormIsValid(false);
    }

    if (
      state.convicted === "Yes" &&
      state.convictions.some(
        (e, i, arr) => e.forWhat === "" || e.convictionDate === ""
      )
    ) {
      setFormIsValid(false);
    }
    if (
      state.agriculturalSkills &&
      state.metalworkSkills &&
      state.convicted &&
      state.airplaneSkills &&
      state.carSkills &&
      state.bicycleSkills
    ) {
      setFormIsValid(true);
    }
  }, [
    state.agriculturalSkills,
    state.agriculturalSkillsDetails,
    state.metalworkSkills,
    state.Cutting,
    state.Marking,
    state.Drilling,
    state.CuttingThreads,
    state.Joining,
    state.Filling,
    state.convicted,
    state.convictions,
    state.bicycleSkills,
    state.carSkills,
    state.airplaneSkills,
  ]);

  const {
    error,
    isLoading,
    fetchData: postCandidateData,
  } = useAxios("http://det.api.rs.ey.com/api/applicants");

  const handleWizardExit = () => {
    setInWizzard(false);
    navigate("/");
  };

  const onSubmitHandler = () => {
    ctx.dispatch({
      type: "ADD_FORM3_DATA",
      payload: {
        agriculturalSkills: state.agriculturalSkills,
        agriculturalSkillsDetails: state.agriculturalSkillsDetails,
        metalworkSkills: state.metalworkSkills,
        metalworkSkillsDetails: state.metalworkSkillsDetails,
        Marking: state.Marking,
        markingValue: state.markingValue,
        Cutting: state.Cutting,
        cuttingValue: state.cuttingValue,
        Drilling: state.Drilling,
        drillingValue: state.drillingValue,
        CuttingThreads: state.CuttingThreads,
        cuttingThreadsValue: state.cuttingThreadsValue,
        Filling: state.Filling,
        fillingValue: state.fillingValue,
        Joining: state.Joining,
        joiningValue: state.joiningValue,
        convicted: state.convicted,
        convictions: state.convictions,
        airplaneSkills: state.airplaneSkills,
        carSkills: state.carSkills,
        bicycleSkills: state.bicycleSkills,
      },
    });

    const mojObjekat = {
      title: wizardData.title,
      firstName: wizardData.firstName,
      lastName: wizardData.lastName,
      dateOfBirth: wizardData.dateOfBirth,
      email: wizardData.email,
      residencyDuration: wizardData.howManyYearsLived * 1,
      doesHaveAgricultureSkills: state.agriculturalSkills === "Yes",
      agricultureSkills:
        state.agriculturalSkills === "Yes"
          ? state.agriculturalSkillsDetails
          : "false",
      doesHaveMetalworkSkills: state.metalworkSkills === "Yes",
      metalworkSkills:
        state.metalworkSkills === "Yes"
          ? state.metalworkSkillsDetails.join()
          : "false",
      isConvicted: state.convicted === "Yes",
      doesFlyAirplane: state.airplaneSkills === "Yes",
      doesDriveCar: state.carSkills === "Yes",
      doesDriveBicycle: state.bicycleSkills === "Yes",
      address: {
        addressLine1: wizardData.address1,
        addressLine2: wizardData.address2,
        state: wizardData.country,
        city: wizardData.city,
        postalCode: wizardData.postalCode,
      },
      convictions: state.convicted === "Yes" ? state.convictions : [],
    };
    postCandidateData(setCandidateDataPostResponse, true, mojObjekat);
    setIsModal(true);
  };

  const onBackHandler = () => {
    ctx.dispatch({
      type: "ADD_FORM_VALIDITY",
      payload: {
        formIsValid: false,
      },
    });

    setStep((prev) => prev - 1);
  };

  return (
    <WizzardFormLayout>
      <form id="form3" className={classes.form}>
        <div className={classes.input_field}>
          <InputRadio
            label={WIZARD_PAGE_3_AGRICULTURAL_SKILLS_LABEL}
            value1={WIZARD_PAGE_3_INPUT_RADIO_VALUE_1}
            value2={WIZARD_PAGE_3_INPUT_RADIO_VALUE_2}
            isRadioSelected={isRadioSelectedAgricultural}
            handleRadioClick={handleRadioClickAgricultural}
            name="agricultural"
            id1="yes-agricultural"
            id2="no-agricultural"
          />
          {affirmativeAnswerAgricultural && (
            <div className={classes.textarea_agri}>
              <textarea
                onBlur={onAgriculturalSkillsDetailsBlurFunc}
                onChange={onAgriculturalSkillsDetailsChangeFunc}
                value={state.agriculturalSkillsDetails}
              ></textarea>
              {agriculturalSkillsDetailsInvalid && (
                <p>{WIZARD_PAGE_3_TEXT_AREA_ERROR_MESSAGE}</p>
              )}
            </div>
          )}

          <InputRadio
            label={WIZARD_PAGE_3_METALWORK_SKILLS_LABEL}
            value1={WIZARD_PAGE_3_INPUT_RADIO_VALUE_1}
            value2={WIZARD_PAGE_3_INPUT_RADIO_VALUE_2}
            isRadioSelected={isRadioSelectedMetalwork}
            handleRadioClick={handleRadioClickMetalwork}
            name="metalwork"
            id1="yes-metalwork"
            id2="no-metalwork"
          />
          {affirmativeAnswerMetalwork && (
            <div className={classes.bottom}>
              <label htmlFor="checkbox">
                <span>*</span>
                What? Please select all that apply
              </label>
              <div className={classes.checkbox_container}>
                <InputCheckbox
                  value={WIZARD_PAGE_3_INPUT_CHECKBOX_MARKING}
                  id="marking"
                  name="markingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Marking}
                  label={WIZARD_PAGE_3_INPUT_CHECKBOX_MARKING}
                />
                <InputCheckbox
                  value={WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING}
                  id="cutting"
                  name="cuttingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Cutting}
                  label={WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING}
                />
                <InputCheckbox
                  value={WIZARD_PAGE_3_INPUT_CHECKBOX_DRILLING}
                  id="drilling"
                  name="drillingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Drilling}
                  label={WIZARD_PAGE_3_INPUT_CHECKBOX_DRILLING}
                />
                <InputCheckbox
                  value={WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING_THREADS}
                  id="cuttingThreads"
                  name="cuttingThreadsValue"
                  onChange={onMetalworkHandler}
                  checked={state.CuttingThreads}
                  label={WIZARD_PAGE_3_INPUT_CHECKBOX_CUTTING_THREADS_LABEL}
                />
                <InputCheckbox
                  value={WIZARD_PAGE_3_INPUT_CHECKBOX_FILLING}
                  id="filling"
                  name="fillingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Filling}
                  label={WIZARD_PAGE_3_INPUT_CHECKBOX_FILLING}
                />
                <InputCheckbox
                  value={WIZARD_PAGE_3_INPUT_CHECKBOX_JOINING}
                  id="joining"
                  name="joiningValue"
                  onChange={onMetalworkHandler}
                  checked={state.Joining}
                  label={WIZARD_PAGE_3_INPUT_CHECKBOX_JOINING}
                />
              </div>
            </div>
          )}

          <div className={classes.convicted_container}>
            <InputRadio
              label={WIZARD_PAGE_3_CONVICTED_LABEL}
              value1={WIZARD_PAGE_3_INPUT_RADIO_VALUE_1}
              value2={WIZARD_PAGE_3_INPUT_RADIO_VALUE_2}
              isRadioSelected={isRadioSelectedConvicted}
              handleRadioClick={handleRadioClickConvicted}
              name="conviction"
              id1="yes-conviction"
              id2="no-conviction   "
            />
            {affirmativeAnswerConvicted && (
              <div className={classes.convicted_bottom}>
                <ConvictedDetails
                  convictions={state.convictions}
                  errorMessageReasons={state.errorMessageReasons}
                  reasonsListHandleChange={reasonsListHandleChange}
                  reasonsListRemoveField={reasonsListRemoveField}
                  reasonsListAddField={reasonsListAddField}
                />
              </div>
            )}
          </div>
          <InputRadio
            label={WIZARD_PAGE_3_AIRPLANE_LABEL}
            value1={WIZARD_PAGE_3_INPUT_RADIO_VALUE_1}
            value2={WIZARD_PAGE_3_INPUT_RADIO_VALUE_2}
            isRadioSelected={isRadioSelectedAirplane}
            handleRadioClick={handleRadioClickAirplane}
            name="Airplane"
            id1="yes-airplane"
            id2="no-airplane"
          />
          <InputRadio
            label={WIZARD_PAGE_3_CAR_LABEL}
            value1={WIZARD_PAGE_3_INPUT_RADIO_VALUE_1}
            value2={WIZARD_PAGE_3_INPUT_RADIO_VALUE_2}
            isRadioSelected={isRadioSelectedCar}
            handleRadioClick={handleRadioClickCar}
            name="Car"
            id1="yes-car"
            id2="no-car"
          />
          <InputRadio
            label={WIZARD_PAGE_3_BICYCLE_LABEL}
            value1={WIZARD_PAGE_3_INPUT_RADIO_VALUE_1}
            value2={WIZARD_PAGE_3_INPUT_RADIO_VALUE_2}
            isRadioSelected={isRadioSelectedBicycle}
            handleRadioClick={handleRadioClickBicycle}
            name="Bicycle"
            id1="yes-bicycle"
            id2="no-bicycle"
          />
        </div>
      </form>
      <WizzardButtons
        onClickBackHandler={onBackHandler}
        onClickSubmitHandler={onSubmitHandler}
        disabled={!formIsValid}
        buttonText={WIZARD_BUTTON_SUBMIT}
      />
      {isModal && (
        <SubmitModal
          isLoading={isLoading}
          error={error}
          setIsModal={setIsModal}
          handleWizardExit={handleWizardExit}
          candidateDataPostResponse={candidateDataPostResponse}
        />
      )}
    </WizzardFormLayout>
  );
};

WizzardPage3.propTypes = {
  props: PropTypes.shape({
    setInWizzard: PropTypes.func,
    setStep: PropTypes.func,
  }),
};

export default WizzardPage3;
