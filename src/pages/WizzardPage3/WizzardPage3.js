import { useState, useRef, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./WizzardPage3.module.scss";
import InputRadio from "../../components/Wizzard/InputRadio/InputRadio";
import useRadio from "../../hooks/useRadio";
import InputCheckbox from "../../components/Wizzard/InputCheckbox/InputCheckbox";
import Input from "../../components/Wizzard/Input/Input";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import WizzardButtonsLayout from "../../layout/WizzardButtonsLayout/WizzardButtonsLayout";
import { Contex } from "../../store/Store";

const WizzardPage3 = (props) => {
  const applicationData = useContext(Contex);
  const { onForm3Submit } = props;

  let arrayOfValue = [];
  let arrayOfValue2 = [];
  let arrayOfValue3 = [
    { what: "", when: "" },
    { what: "", when: "" },
    { what: "", when: "" },
  ];

  for (let i = 0; i < localStorage.length; i++) {
    for (let j = 0; j < localStorage.length; j++) {
      if (localStorage.key(i) === `what${j}`) {
        arrayOfValue[j] = localStorage.getItem(localStorage.key(i));
      }
      if (localStorage.key(i) === `when${j}`) {
        arrayOfValue2[j] = localStorage.getItem(localStorage.key(i));
      }
    }
  }

  let localStorageLength = localStorage.length;

  for (let i = 0; i < arrayOfValue.length; i++) {
    if (i === 0 && arrayOfValue3.length === 1) {
      arrayOfValue3 = [{ what: arrayOfValue[i], when: arrayOfValue2[i] }];
      continue;
    }
    arrayOfValue3 = [
      ...arrayOfValue3,
      { what: arrayOfValue[i], when: arrayOfValue2[i] },
    ];
  }

  let removeStorageItems = () => {
    for (let i = 0; i < localStorageLength; i++) {
      for (let j = 0; j < localStorageLength; j++) {
        if (localStorage.key(i) === `what${j}`) {
          localStorage.removeItem(localStorage.key(i));
        }
        if (localStorage.key(i) === `when${j}`) {
          localStorage.removeItem(localStorage.key(i));
        }
      }
    }
  };

  const { page } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    agriculturalSkills: localStorage.getItem("agriculturalSkills")
      ? localStorage.getItem("agriculturalSkills")
      : "No",
    agriculturalSkillsDetails: localStorage.getItem("agriculturalSkillsDetails")
      ? localStorage.getItem("agriculturalSkillsDetails")
      : "",
    metalworkSkills: localStorage.getItem("metalworkSkills")
      ? localStorage.getItem("metalworkSkills")
      : "No",
    metalworkSkillsDetails: localStorage.getItem("metalSkills"),
    Marking: localStorage.getItem("Marking") === "true",
    markingValue: localStorage.getItem("markingValue"),
    Cutting: localStorage.getItem("Cutting") === "true",
    cuttingValue: localStorage.getItem("cuttingValue"),
    Drilling: localStorage.getItem("Drilling") === "true",
    drillingValue: localStorage.getItem("drillingValue"),
    CuttingThreads: localStorage.getItem("CuttingThreads") === "true",
    cuttingThreadsValue: localStorage.getItem("cuttingThreadsValue"),
    Filling: localStorage.getItem("Filling") === "true",
    fillingValue: localStorage.getItem("fillingValue"),
    Joining: localStorage.getItem("Joining") === "true",
    joiningValue: localStorage.getItem("joiningValue"),
    convicted: localStorage.getItem("convicted")
      ? localStorage.getItem("convicted")
      : "No",
    reasons: arrayOfValue3,
    airplaneSkills: localStorage.getItem("airplaneSkills")
      ? localStorage.getItem("airplaneSkills")
      : "No",
    carSkills: localStorage.getItem("carSkills")
      ? localStorage.getItem("carSkills")
      : "No",
    bicycleSkills: localStorage.getItem("bicycleSkills")
      ? localStorage.getItem("bicycleSkills")
      : "No",
  });

  const agriRef = useRef();

  const agriculturalSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, agriculturalSkills: e.target.value }));
    localStorage.setItem("agriculturalSkills", e.target.value);
    if (e.target.value == "No") {
      localStorage.removeItem("agriculturalSkills");
      localStorage.removeItem("agriculturalSkillsDetails");
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

  const onBlurTextarea = () => {
    localStorage.setItem("agriculturalSkillsDetails", agriRef.current.value);
    setState((prev) => ({
      ...prev,
      agriculturalSkillsDetails: agriRef.current.value,
    }));
  };
  const onChangeTextarea = (e) => {
    const { value } = e.target;

    localStorage.setItem("agriculturalSkillsDetails", value);
  };
  // --------------------------------------------------------
  const metalworkSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, metalworkSkills: e.target.value }));
    localStorage.setItem("metalworkSkills", e.target.value);
    if (e.target.value === "No") {
      localStorage.removeItem("Marking");
      localStorage.removeItem("markingValue");
      localStorage.removeItem("Cutting");
      localStorage.removeItem("cuttingValue");
      localStorage.removeItem("Joining");
      localStorage.removeItem("joiningValue");
      localStorage.removeItem("Drilling");
      localStorage.removeItem("drillingValue");
      localStorage.removeItem("Filling");
      localStorage.removeItem("fillingValue");
      localStorage.removeItem("CuttingThreads");
      localStorage.removeItem("cuttingThreadsValue");

      setState((prev) => ({ ...prev, marking: false }));
      setState((prev) => ({ ...prev, markingValue: "" }));
      setState((prev) => ({ ...prev, cutting: false }));
      setState((prev) => ({ ...prev, cuttingValue: "" }));
      setState((prev) => ({ ...prev, joining: false }));
      setState((prev) => ({ ...prev, joiningValue: "" }));
      setState((prev) => ({ ...prev, drilling: false }));
      setState((prev) => ({ ...prev, drillingValue: "" }));
      setState((prev) => ({ ...prev, filling: false }));
      setState((prev) => ({ ...prev, fillinValue: "" }));
      setState((prev) => ({ ...prev, cuttingThreads: false }));
      setState((prev) => ({ ...prev, cuttingThreadsValue: "" }));
    }
  };

  const onMetalworkHandler = (e) => {
    const { name, value, checked } = e.target;

    localStorage.removeItem(value);
    localStorage.removeItem(name);
    setState((prev) => {
      const newObj = { ...prev };
      newObj[value] = !newObj[value];
      return newObj;
    });
    if (checked === true) {
      localStorage.setItem(value, "true");
      localStorage.setItem(name, value);
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
    setState((prev) => ({ ...prev, covicted: e.target.value }));
    localStorage.setItem("convicted", e.target.value);
    if (e.target.value === "No") {
      removeStorageItems();
      localStorage.removeItem("convicted");
      setState((prev) => ({ ...prev, convicted: "No" }));
      setState((prev) => ({
        ...prev,
        reasons: [
          { what: "", when: "" },
          { what: "", when: "" },
          { what: "", when: "" },
        ],
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

  const onAddHandler = () => {
    setState((prev) => ({
      ...prev,
      reasons: [...prev.reasons, { what: "", when: "" }],
    }));
  };

  const onRemoveHandler = () => {
    setState((prev) => ({
      ...prev,
      reasons: [...prev.reasons].slice(0, prev.reasons.length - 1),
    }));
  };

  let buttonsContent;
  if (state.reasons.length == 1) {
    buttonsContent = (
      <div className={classes.convicted_details_buttons_wrapper}>
        <button onClick={onAddHandler}>+</button>
      </div>
    );
  }

  const handleChange = (i, e) => {
    const { name, value } = e.target;

    localStorage.setItem(`${name}${i}`, value);
    setState((prev) => {
      let reasonsUpdated = [...prev.reasons];
      reasonsUpdated[i] = { ...reasonsUpdated[i], [name]: value };
      return {
        ...prev,
        reasons: reasonsUpdated,
      };
    });
  };

  const airplaneSkillsInputHandler = (e) => {
    setState((prev) => ({ ...prev, airplaneSkills: e.target.value }));
    localStorage.setItem("airplaneSkills", e.target.value);
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
    localStorage.setItem("carSkills", e.target.value);
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
    localStorage.setItem("bicycleSkills", e.target.value);
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

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("metalSkills", state.metalworkSkillsDetails);
    onForm3Submit(state);
    applicationData.dispatch({
      type: "ADD_FORM3_DATA",
      payload: {
        agriculturalSkills: state.agriculturalSkills,
        agriculturalSkillsDetails: state.agriculturalSkillsDetails,
        metalworkSkills: state.metalworkSkills,
        Marking: state.Marking,
        Cutting: state.Cutting,
        Drilling: state.Drilling,
        CuttingThreads: state.CuttingThreads,
        Filling: state.Filling,
        Joinin: state.Joining,
        convicted: state.convicted,
        reasons: state.reasons,
        airplaneSkills: state.airplaneSkills,
        carSkills: state.airplaneSkills,
        bicycleSkills: state.bicycleSkills,
      },
    });
    localStorage.clear();
    navigate("/");
    localStorage.setItem("isWizzardOpen", "false");
  };

  const onBackHandler = () => {
    navigate(`/application/${page * 1 - 1}`);
  };

  return (
    <WizzardFormLayout>
      <form onSubmit={onSubmit} id="form3" className={classes.form}>
        <div className={classes.input_field}>
          <div>
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
                  ref={agriRef}
                  onBlur={onBlurTextarea}
                  defaultValue={state.agriculturalSkillsDetails}
                  onChange={onChangeTextarea}
                ></textarea>
              </div>
            )}
          </div>
          <div className={classes.container}>
            <InputRadio
              label="Do you have any metalwork skills?"
              value1="Yes"
              value2="No"
              isRadioSelected={isRadioSelectedMetalwork}
              handleRadioClick={handleRadioClickMetalwork}
              name="metalwork"
              id1="yes-metalwork"
              id2="no-metalwork   "
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
          </div>
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
                <div className={classes.convicted_details_container}>
                  {state.reasons.map((e, i, arr) => {
                    if (i === 0) {
                      return (
                        <div
                          key={i * 100}
                          className={classes.convicted_details_wrapper}
                        >
                          <div
                            className={classes.convicted_details_input_wrapper}
                          >
                            <Input
                              label="For what?"
                              id={`whatconv${Math.random() + i}`}
                              name={`what`}
                              onChange={(e) => handleChange(i, e)}
                              value={state.reasons[i].what}
                            />
                            <Input
                              label="When?"
                              id={`whenconv${Math.random() + i}`}
                              name={`when`}
                              onChange={(e) => handleChange(i, e)}
                              value={state.reasons[i].when}
                            />
                          </div>
                          {buttonsContent}
                        </div>
                      );
                    }
                    if (i === arr.length - 1) {
                      return (
                        <div
                          key={i * 100}
                          className={classes.convicted_details_wrapper}
                        >
                          <div
                            className={classes.convicted_details_input_wrapper}
                          >
                            <Input
                              label="For what?"
                              id={`whatconv${Math.random() + i}`}
                              name={`what`}
                              onChange={(e) => handleChange(i, e)}
                              value={state.reasons[i].what}
                            />
                            <Input
                              label="When?"
                              id={`whenconv${Math.random() + i}`}
                              name={`when`}
                              onChange={(e) => handleChange(i, e)}
                              value={state.reasons[i].when}
                            />
                          </div>

                          <div
                            className={
                              classes.convicted_details_buttons_wrapper
                            }
                          >
                            <button onClick={onRemoveHandler}>-</button>
                            <button onClick={onAddHandler}>+</button>
                          </div>
                        </div>
                      );
                    }
                    if (i > 0 && i < arr.length - 1) {
                      return (
                        <div
                          key={i}
                          className={classes.convicted_details_wrapper}
                        >
                          <div
                            className={classes.convicted_details_input_wrapper}
                          >
                            <Input
                              label="For what?"
                              id={`whatconv${Math.random() + i}`}
                              name={`what`}
                              onChange={(e) => handleChange(i, e)}
                              value={state.reasons[i].what}
                            />
                            <Input
                              label="When?"
                              id={`whenconv${Math.random() + i}`}
                              name={`when`}
                              onChange={(e) => handleChange(i, e)}
                              value={state.reasons[i].when}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
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
      <WizzardButtonsLayout>
        <div className={classes.button_back}>
          <button type="button" onClick={onBackHandler}>
            BACK
          </button>
        </div>
        <div className={classes.button_continue}>
          <button disabled={false} form="form3" type="submit">
            CONTINUE
          </button>
        </div>
      </WizzardButtonsLayout>
    </WizzardFormLayout>
  );
};

export default WizzardPage3;
