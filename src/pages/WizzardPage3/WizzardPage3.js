import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./WizzardPage3.module.scss";
import InputRadio from "../../components/Wizzard/InputRadio/InputRadio";
import useRadio from "../../hooks/useRadio";
import InputCheckbox from "../../components/Wizzard/InputCheckbox/InputCheckbox";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import useInput from "../../hooks/useInput";
import WizzardButtons from "../../components/Wizzard/WizzardButtons/WizzardButtons";
import ConvictedDetails from "../../components/Wizzard/ConvictedDetails/ConvictedDetails";

const WizzardPage3 = (props) => {
  const { onForm3Submit, setInWizzard, setStep, wizzard3Data } = props;
  const {
    agriculturalSkills,
    agriculturalSkillsDetails,
    metalworkSkills,
    metalworkSkillsDetails,
    Marking,
    markingValue,
    Cutting,
    cuttingValue,
    Drilling,
    drillingValue,
    CuttingThreads,
    cuttingThreadsValue,
    Filling,
    fillingValue,
    Joining,
    joiningValue,
    convicted,
    reasons,
    airplaneSkills,
    carSkills,
    bicycleSkills,
  } = wizzard3Data;

  const navigate = useNavigate();

  const [state, setState] = useState({
    agriculturalSkills: agriculturalSkills,
    agriculturalSkillsDetails: agriculturalSkillsDetails,
    metalworkSkills: metalworkSkills,
    metalworkSkillsDetails: metalworkSkillsDetails,
    Marking: Marking,
    markingValue: markingValue,
    Cutting: Cutting,
    cuttingValue: cuttingValue,
    Drilling: Drilling,
    drillingValue: drillingValue,
    CuttingThreads: CuttingThreads,
    cuttingThreadsValue: cuttingThreadsValue,
    Filling: Filling,
    fillingValue: fillingValue,
    Joining: Joining,
    joiningValue: joiningValue,
    convicted: convicted,
    reasons: reasons,
    errorMessageReasons: [],
    airplaneSkills: airplaneSkills,
    carSkills: carSkills,
    bicycleSkills: bicycleSkills,
  });

  const [formIsValid, setFormIsValid] = useState(true);

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
      return val.trim() !== "" && val.length < 50;
    },
    agriculturalSkillsDetailsInputHandler,
    state.agriculturalSkillsDetails
  );

  const metalworkSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, metalworkSkills: e.target.value }));

    if (e.target.value === "No") {
      setState((prev) => ({ ...prev, Marking: false }));
      setState((prev) => ({ ...prev, markingValue: "" }));
      setState((prev) => ({ ...prev, Cutting: false }));
      setState((prev) => ({ ...prev, cuttingValue: "" }));
      setState((prev) => ({ ...prev, Joining: false }));
      setState((prev) => ({ ...prev, joiningValue: "" }));
      setState((prev) => ({ ...prev, Drilling: false }));
      setState((prev) => ({ ...prev, drillingValue: "" }));
      setState((prev) => ({ ...prev, Filling: false }));
      setState((prev) => ({ ...prev, fillinValue: "" }));
      setState((prev) => ({ ...prev, CuttingThreads: false }));
      setState((prev) => ({ ...prev, cuttingThreadsValue: "" }));
    }
  };

  const onMetalworkHandler = (e) => {
    const { name, value, checked } = e.target;

    setState((prev) => {
      const newObj = { ...prev };
      newObj[value] = !newObj[value];
      return newObj;
    });
    if (checked === true) {
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
        reasons: [{ whatName: "", whenName: "" }],
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
    let errorMessage = state.reasons.map((user, key) => {
      let error = {};
      let valid = true;

      if (!user.whatName) {
        error.errorwhatName = "What required";
        valid = false;
      } else {
        error.errorwhatName = "";
      }
      if (!user.whenName) {
        error.errorwhenName = "When required";
        valid = false;
      } else {
        error.errorwhenName = "";
      }

      if (state.reasons.length - 1 === key && valid && actionType === "add") {
        setState((prev) => {
          return {
            ...prev,
            reasons: [...prev.reasons, { whatName: "", whenName: "" }],
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

    if (["whatName", "whenName"].includes(e.target.name)) {
      let reasonDetail = [...state.reasons];
      reasonDetail[e.target.dataset.id][e.target.name] = e.target.value;
      setState((prev) => {
        return {
          ...prev,
          reasons: reasonDetail,
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
    var reasons = state.reasons.filter((user, key) => key !== id);
    setState((prev) => {
      return {
        ...prev,
        reasons,
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
    setFormIsValid(true);
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
      state.reasons.some((e, i, arr) => e.whatName === "" || e.whenName === "")
    ) {
      setFormIsValid(false);
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
    state.reasons,
  ]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    onForm3Submit(state);
    setInWizzard(false);
    navigate("/");
  };

  const onBackHandler = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <WizzardFormLayout>
      <form id="form3" className={classes.form}>
        <div className={classes.input_field}>
          <InputRadio
            label="Do you have any agricultural skills?"
            value1="Yes"
            value2="No"
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
                <p>Please enter more details</p>
              )}
            </div>
          )}

          <InputRadio
            label="Do you have any metalwork skills?"
            value1="Yes"
            value2="No"
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
                  value="Marking"
                  id="marking"
                  name="markingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Marking}
                  label="Marking"
                />
                <InputCheckbox
                  value="Cutting"
                  id="cutting"
                  name="cuttingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Cutting}
                  label="Cutting"
                />
                <InputCheckbox
                  value="Drilling"
                  id="drilling"
                  name="drillingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Drilling}
                  label="Drilling"
                />
                <InputCheckbox
                  value="CuttingThreads"
                  id="cuttingThreads"
                  name="cuttingThreadsValue"
                  onChange={onMetalworkHandler}
                  checked={state.CuttingThreads}
                  label="Cutting internal and external threads"
                />
                <InputCheckbox
                  value="Filling"
                  id="filling"
                  name="fillingValue"
                  onChange={onMetalworkHandler}
                  checked={state.Filling}
                  label="Filling"
                />
                <InputCheckbox
                  value="Joining"
                  id="joining"
                  name="joiningValue"
                  onChange={onMetalworkHandler}
                  checked={state.Joining}
                  label="Joining"
                />
              </div>
            </div>
          )}

          <div className={classes.convicted_container}>
            <InputRadio
              label="Have you ever been convicted?"
              value1="Yes"
              value2="No"
              isRadioSelected={isRadioSelectedConvicted}
              handleRadioClick={handleRadioClickConvicted}
              name="conviction"
              id1="yes-conviction"
              id2="no-conviction   "
            />
            {affirmativeAnswerConvicted && (
              <div className={classes.convicted_bottom}>
                <ConvictedDetails
                  reasons={state.reasons}
                  errorMessageReasons={state.errorMessageReasons}
                  reasonsListHandleChange={reasonsListHandleChange}
                  reasonsListRemoveField={reasonsListRemoveField}
                  reasonsListAddField={reasonsListAddField}
                />
              </div>
            )}
          </div>
          <InputRadio
            label="Do you know how to fly an airplane?"
            value1="Yes"
            value2="No"
            isRadioSelected={isRadioSelectedAirplane}
            handleRadioClick={handleRadioClickAirplane}
            name="Airplane"
            id1="yes-airplane"
            id2="no-airplane"
          />
          <InputRadio
            label="Do you know how to drive a car?"
            value1="Yes"
            value2="No"
            isRadioSelected={isRadioSelectedCar}
            handleRadioClick={handleRadioClickCar}
            name="Car"
            id1="yes-car"
            id2="no-car"
          />
          <InputRadio
            label="Do you know how to fly an bicycle?"
            value1="Yes"
            value2="No"
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
        buttonText="SUBMIT"
      />
    </WizzardFormLayout>
  );
};

export default WizzardPage3;
