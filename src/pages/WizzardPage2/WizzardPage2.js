import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

import classes from "./WizzardPage2.module.scss";
import Input from "../../components/Wizzard/Input/Input";
import Select from "../../components/Wizzard/Select/Select";
import useInput from "../../hooks/useInput";
import WizzardFormLayout from "../../layout/WizzardFormLayout/WizzardFormLayout";
import WizzardButtons from "../../components/Wizzard/WizzardButtons/WizzardButtons";
import { Contex } from "../../store/Store";
import useAxios from "../../hooks/useAxios";
import {
  WIZARD_PAGE_2_EMAIL_LABEL,
  WIZARD_PAGE_2_EMAIL_ERROR_MESSAGE,
  WIZARD_PAGE_2_ADDRESS_1_ERROR_MESSAGE,
  WIZARD_PAGE_2_ADDRESS_1_LABEL,
  WIZARD_PAGE_2_ADDRESS_2_LABEL,
  WIZARD_PAGE_2_COUNTRY_LABEL,
  WIZARD_PAGE_2_COUNTRY_ERROR_MESSAGE,
  WIZARD_PAGE_2_CITY_LABEL,
  WIZARD_PAGE_2_CITY_ERROR_MESSAGE,
  WIZARD_PAGE_2_POSTAL_CODE_LABEL,
  WIZARD_PAGE_2_POSTAL_CODE_ERROR_MESSAGE,
  WIZARD_PAGE_2_HOW_LONG_LIVED_LABEL,
  WIZARD_PAGE_2_HOW_LONG_LIVED_ERROR_MESSAGE,
} from "../../static";

/**
 * Second page that users lands on after successfully submitting data in first page
 *
 * @param {object} props A function handling wizard rendering path
 * @returns {JSX} Wizard page two form
 */

const WizzardPage2 = (props) => {
  const { onForm2Submit, setStep } = props;
  const ctx = useContext(Contex);
  const wizardData = ctx.state;

  const [state, setState] = useState({
    email: wizardData.email,
    address1: wizardData.address1,
    address2: wizardData.address2,
    country: wizardData.country,
    city: wizardData.city,
    postalCode: wizardData.postalCode,
    howManyYearsLived: wizardData.howManyYearsLived,
  });

  const [countries, setCountries] = useState(wizardData.countries);
  const [selectedCountries, setSelectedCountries] = useState(
    wizardData.selectedCountries
  );
  const [selectedStateTLA, setSelectedStateTLA] = useState(
    wizardData.selectedStateTLA
  );

  const [selectedCities, setSelectedCities] = useState(
    wizardData.selectedCities
  );

  const [postalCodes, setPostalCodes] = useState(wizardData.postalCodes);
  const [selectedPostalCodes, setSelectedPostalCodes] = useState(
    wizardData.selectedPostalCodes
  );
  const [selectedPostalCodeNumber, setSelectedPostalCodeNumber] = useState(
    wizardData.selectedPostalCodeNumber
  );

  const { fetchData: getStates } = useAxios(
    "http://det.api.rs.ey.com/api/states"
  );

  useEffect(() => {
    getStates(setCountries);
  }, [getStates]);

  const { fetchData: getCities } = useAxios(
    `http://det.api.rs.ey.com/api/states/${selectedStateTLA}/cities/${state.city}`
  );

  const { fetchData: getPostalCodes } = useAxios(
    `http://det.api.rs.ey.com/api/states/${selectedStateTLA}/cities/${state.city}/postalcodes`
  );

  useEffect(() => {
    if (state.city) {
      getPostalCodes(setPostalCodes);
    }
  }, [state.city, getPostalCodes]);

  useEffect(() => {
    if (selectedStateTLA) {
      const mapCities = (data) => {
        let Cities = ["City"];
        let newCities = [];
        let a;
        newCities = data
          .map((e, i, arr) => {
            if (e.name !== a) {
              a = e.name;
              return a;
            } else {
              return "";
            }
          })
          .filter((e) => e !== "");

        const finalArr = Cities.concat(newCities);

        setSelectedCities(finalArr);
      };

      getCities(mapCities);
    }
  }, [selectedStateTLA, getCities]);

  const manageCountriesHandler = (el, index) => {
    setState((prev) => ({
      ...prev,
      country: el.tla,
    }));

    setSelectedStateTLA(el.tla);
  };

  const managePostalCodesHandler = (el) => {
    setState((prev) => ({
      ...prev,
      postalCode: el.code,
    }));
    setSelectedPostalCodeNumber(el.code);
  };

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
      return val.trim() !== "" && val.includes("@") && val.includes(".");
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
      return val.length;
    },
    address1InputHandler,
    state.address1
  );

  const selectHandler = (event) => {
    setState((prev) => {
      return {
        ...prev,
        city: "",
      };
    });
    setState((prev) => {
      return {
        ...prev,
        postalCode: "",
      };
    });
    setSelectedStateTLA("");
    setSelectedPostalCodeNumber("");
    setSelectedPostalCodes([]);
    setState((prev) => ({
      ...prev,
      country: event.target.value,
    }));
    let cntrs;
    cntrs = countries.filter((e, i, arr) =>
      e.name.includes(event.target.value)
    );
    if (cntrs) {
      setSelectedCountries(cntrs);
    }
  };

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
      return !val.length;
    },
    address2InputHandler,
    state.address2
  );

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
      return val.length;
    },
    cityInputHandler,
    state.city
  );

  const postalCodeInputHandler = (event) => {
    setState((prev) => {
      return {
        ...prev,
        postalCode: "",
      };
    });
    setSelectedPostalCodeNumber("");

    setState((prev) => ({
      ...prev,
      postalCode: event.target.value,
    }));
    let pstlCodes;
    pstlCodes = postalCodes.filter((e, i, arr) =>
      e.code.includes(event.target.value)
    );
    if (pstlCodes) {
      setSelectedPostalCodes(pstlCodes);
    }
  };
  const {
    onChangeFunc: postalCodeChangeFunc,
    onBlurFunc: postalCodeBlurFunc,
    isValid: postalCodeIsValid,
    isInvalid: postalCodeInvalid,
  } = useInput(
    (val) => {
      return val.length && val !== "Zip";
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
      return val.length;
    },
    howLongLivedInputHandler,
    state.howManyYearsLived
  );

  useEffect(() => {
    if (
      emailIsValid &&
      address1IsValid &&
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

    ctx.dispatch({
      type: "ADD_FORM2_DATA",
      payload: {
        email: state.email,
        address1: state.address1,
        address2: state.address2,
        country: state.country,
        city: state.city,
        postalCode: state.postalCode,
        howManyYearsLived: state.howManyYearsLived,
        countries: countries,
        selectedCountries: selectedCountries,
        selectedStateTLA: selectedStateTLA,
        selectedCities: selectedCities,
        selectedPostalCodes: selectedPostalCodes,
        selectedPostalCodeNumber: selectedPostalCodeNumber,
      },
    });
    onForm2Submit(state);
  };

  const onBackHandler = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <WizzardFormLayout>
      <form id="form2" className={classes.form} autoComplete="off">
        <div className={classes.input_field}>
          <div className={classes.email_wrapper}>
            <Input
              type="text"
              name="Email"
              id="email"
              value={state.email}
              label={WIZARD_PAGE_2_EMAIL_LABEL}
              onChange={emailChangeFunc}
              onBlur={emailBlurFunc}
              className={classes.email}
              isInvalid={emailInvalid}
              errorMessage={WIZARD_PAGE_2_EMAIL_ERROR_MESSAGE}
            />
          </div>
          <div className={classes.address_wrapper}>
            <div className={classes.address}>
              <Input
                type="text"
                name="Address1"
                id="address1"
                value={state.address1}
                label={WIZARD_PAGE_2_ADDRESS_1_LABEL}
                onChange={address1ChangeFunc}
                onBlur={address1BlurFunc}
                isInvalid={address1Invalid}
                errorMessage={WIZARD_PAGE_2_ADDRESS_1_ERROR_MESSAGE}
              />
            </div>
            <div className={classes.address}>
              <Input
                type="text"
                name="Address"
                id="address2"
                value={state.address2}
                label={WIZARD_PAGE_2_ADDRESS_2_LABEL}
                notMandatory={true}
                onChange={address2ChangeFunc}
                onBlur={address2BlurFunc}
                isInvalid={address2Invalid}
              />
            </div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.state_city}>
              <div className={classes.countries_wrapper}>
                <Input
                  type="text"
                  name="Country"
                  id="country"
                  value={state.country}
                  label={WIZARD_PAGE_2_COUNTRY_LABEL}
                  className={classes.country}
                  onChange={selectChangeFunc}
                  onBlur={selectBlurFunc}
                  isInvalid={selectInvalid}
                  errorMessage={WIZARD_PAGE_2_COUNTRY_ERROR_MESSAGE}
                />
                {!selectedStateTLA && state.country !== "" && (
                  <div className={classes.search_countries}>
                    {selectedCountries.map((el, i, arr) => {
                      return (
                        <p
                          key={Math.random() + `${i}`}
                          onClick={() => manageCountriesHandler(el, i)}
                        >
                          {el.name}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className={classes.cities_wrapper}>
                <Select
                  value2={state.city}
                  value={selectedCities}
                  name="City"
                  id="city"
                  label={WIZARD_PAGE_2_CITY_LABEL}
                  notMandatory={false}
                  onChange={cityChangeFunc}
                  onBlur={cityBlurFunc}
                  isInvalid={cityInvalid}
                  errorMessage={WIZARD_PAGE_2_CITY_ERROR_MESSAGE}
                  disabled={!state.country}
                />
              </div>
              <div className={classes.postalCodes_wrapper}>
                <Input
                  type="text"
                  name="Zip"
                  id="postal"
                  value={state.postalCode}
                  label={WIZARD_PAGE_2_POSTAL_CODE_LABEL}
                  className={classes.postal}
                  disabled={
                    state.city !== "" && state.city !== "City" ? false : true
                  }
                  onChange={postalCodeChangeFunc}
                  onBlur={postalCodeBlurFunc}
                  isInvalid={postalCodeInvalid}
                  errorMessage={WIZARD_PAGE_2_POSTAL_CODE_ERROR_MESSAGE}
                />
                {!selectedPostalCodeNumber && state.postalCode !== "" && (
                  <div className={classes.search_postalCodes}>
                    {selectedPostalCodes.map((el, i, arr) => {
                      return (
                        <p
                          key={Math.random() + `${i}`}
                          onClick={() => managePostalCodesHandler(el, i)}
                        >
                          {el.code}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <Input
              type="number"
              name="Time"
              id="time"
              value={state.howManyYearsLived}
              label={WIZARD_PAGE_2_HOW_LONG_LIVED_LABEL}
              className={classes.time}
              onChange={howLongLivedChangeFunc}
              onBlur={howLongLivedBlurFunc}
              isInvalid={howLongLivedInvalid}
              errorMessage={WIZARD_PAGE_2_HOW_LONG_LIVED_ERROR_MESSAGE}
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

WizzardPage2.propTypes = {
  props: PropTypes.shape({
    onForm2Submit: PropTypes.func,
    setStep: PropTypes.func,
  }),
};

export default WizzardPage2;
