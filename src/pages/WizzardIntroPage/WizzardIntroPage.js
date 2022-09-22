import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./WizzardIntroPage.module.scss";
import { Contex } from "../../store/Store";
import {
  WIZARD_INTRO_PAGE_HEADLINE,
  WIZARD_INTRO_PAGE_PARAGRAPH_PART_1,
  WIZARD_INTRO_PAGE_PRIVACY_NOTICE,
  WIZARD_INTRO_PAGE_TERMS_AND_CONDITIONS,
  WIZARD_INTRO_PAGE_PARAGRAPH_PART_2,
  WIZARD_INTRO_PAGE_HAVE_READ_DOCUMENTS,
  WIZARD_INTRO_PAGE_AGREE_CONDITIONS,
  WIZARD_INTRO_PAGE_PROCEDE_BUTTON,
  WIZARD_INTRO_PAGE_AND,
} from "../../static";

/**
 * Wizard introduction page where user verifies terms and conditions and enter the sign up process
 * @param {object} props Prop object holding function to change wizzard state and render Wizzard route
 * @returns {JSX} A signup information box prompting user to mark terms and condition inputs and a button to start sign up process
 */

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
        <h3 className={classes.headline}>{WIZARD_INTRO_PAGE_HEADLINE}</h3>
        <h4 className={classes.terms_summary}>
          {WIZARD_INTRO_PAGE_PARAGRAPH_PART_1}
          <Link to="/privacynotice">{WIZARD_INTRO_PAGE_PRIVACY_NOTICE}</Link>
          {WIZARD_INTRO_PAGE_AND}
          <Link to="/termsandcondition">
            {WIZARD_INTRO_PAGE_TERMS_AND_CONDITIONS}
          </Link>
          {WIZARD_INTRO_PAGE_PARAGRAPH_PART_2}
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
                {WIZARD_INTRO_PAGE_HAVE_READ_DOCUMENTS}
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
                {WIZARD_INTRO_PAGE_AGREE_CONDITIONS}
              </label>
            </div>
          </div>
          <div className={classes.button_wrapper}>
            <button disabled={!formIsValid} className={classes.procede}>
              {WIZARD_INTRO_PAGE_PROCEDE_BUTTON}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

WizzardIntroPage.propTypes = {
  props: PropTypes.shape({
    setInWizzard: PropTypes.func,
  }),
};

export default WizzardIntroPage;
