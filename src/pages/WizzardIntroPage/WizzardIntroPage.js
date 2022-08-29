import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./WizzardIntroPage.module.scss";
import { Contex } from "../../store/Store";

const WizzardIntroPage = (props) => {
  const ctx = useContext(Contex);
  const { setInWizzard } = props;

  const [state, setState] = useState({
    isWizzardOpen: false,
    read: false,
    agree: false,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  let navigate = useNavigate();

  const onReadHandler = (e) => {
    setState((prev) => {
      if (prev.read === false) {
      }
      return { ...prev, read: !prev.read };
    });
  };
  const onAgreeHandler = (e) => {
    setState((prev) => {
      if (prev.agree === false) {
      }
      return { ...prev, agree: !prev.agree };
    });
  };

  useEffect(() => {
    if (state.read && state.agree) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [state.read, state.agree]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    ctx.dispatch({
      type: "CLEAR_FORM_DATA",
    });

    setInWizzard(true);
    navigate("/application/signup");
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
            <button disabled={!formIsValid} className={classes.procede}>
              PROCEDE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WizzardIntroPage;
