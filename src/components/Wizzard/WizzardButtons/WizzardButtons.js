import WizzardButtonsLayout from "../../../layout/WizzardButtonsLayout/WizzardButtonsLayout";
import classes from "./WizzardButtons.module.scss";
import { WIZARD_BUTTON_BACK, WIZARD_BUTTON_CONTINUE } from "../../../static";
import PropTypes from "prop-types";

/**
 * Reusable pair of buttons
 *
 * @param {object} props Buttons prop configuration data
 * @returns {JSX} Buttons for moving backwards and forwards through wizard or app
 */

const WizzardButtons = (props) => {
  const {
    onClickBackHandler,
    disabled,
    disabledBack,
    onClickSubmitHandler,
    buttonText,
  } = props;
  return (
    <WizzardButtonsLayout>
      <div className={classes.button_back}>
        <button onClick={onClickBackHandler} disabled={disabledBack}>
          {WIZARD_BUTTON_BACK}
        </button>
      </div>
      <div className={classes.button_continue}>
        <button disabled={disabled} onClick={onClickSubmitHandler}>
          {buttonText ? buttonText : WIZARD_BUTTON_CONTINUE}
        </button>
      </div>
    </WizzardButtonsLayout>
  );
};

WizzardButtons.propTypes = {
  props: PropTypes.shape({
    onClickBackHandler: PropTypes.func,
    disabled: PropTypes.bool,
    disabledBack: PropTypes.bool,
    onClickSubmitHandler: PropTypes.func,
    buttonText: PropTypes.string,
  }),
};

export default WizzardButtons;
