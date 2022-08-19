import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import classes from "./WizzardIntroPage.module.scss";
import { Contex } from "../../store/Store";

const WizzardIntroPage = (props) => {
  const { setInWizzard } = props;
  const ctx = useContext(Contex);
  const applicationData = ctx;
  const [state, setState] = useState({
    isWizzardOpen: false,
    read: localStorage.getItem("read") === "true",
    agree: localStorage.getItem("agree") === "true",
  });

  const onReadHandler = (e) => {
    setState((prev) => {
      return { ...prev, read: !prev.read };
    });
  };
  const onAgreeHandler = (e) => {
    setState((prev) => {
      return { ...prev, agree: !prev.agree };
    });
  };

  let navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (state.read && state.agree) {
      setInWizzard(true);
      localStorage.setItem("isWizzardOpen", true);
      localStorage.setItem("read", true);
      localStorage.setItem("agree", true);
      ctx.dispatch({
        type: "ADD_FORM_INTRO_DATA",
        payload: {
          isWizzardOpen: true,
          read: state.read,
          agree: state.agree,
        },
      });
      setInWizzard(true);
      localStorage.setItem("isWizzardOpen", "true");
      navigate("/application/1");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.agreement_wrapper}>
        <h3 className={classes.headline}>
          Privacy Notice & Terms and Conditions agreement.
        </h3>
        <h4 className={classes.terms_summary}>
          You are about to start application process for EY-NASA mission to
          Mars. Please read „Privacy Notice“ and „Terms and Conditions“ before
          giving your consent. If you agree, EY and NASA will use the data for
          the purposes of the legitimate interest(s) of the Mars mission. The
          specific legitimate interest(s) are the provision of mission planning
          and are for internal use by EY and NASA employees.
        </h4>
      </div>
      <div className={classes.validation_wrapper}>
        <form className={classes.intro_form} onSubmit={onSubmitHandler}>
          <div className={classes.inputs}>
            <div className={classes.first_input}>
              <input
                type="checkbox"
                id="read"
                onChange={onReadHandler}
                checked={state.read}
              />
              <label htmlFor="read">
                I have read the above-mentioned documents.
              </label>
            </div>
            <div className={classes.second_input}>
              <input
                type="checkbox"
                id="agree"
                onChange={onAgreeHandler}
                checked={state.agree}
              />
              <label htmlFor="agree">
                I agree to above mentioned conditions.
              </label>
            </div>
          </div>
          <div className={classes.button_wrapper}>
            <button
              disabled={!state.read || !state.agree}
              className={classes.procede}
            >
              PROCEDE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WizzardIntroPage;
