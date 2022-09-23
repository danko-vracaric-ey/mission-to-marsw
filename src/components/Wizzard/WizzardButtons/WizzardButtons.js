import WizzardButtonsLayout from "../../../layout/WizzardButtonsLayout/WizzardButtonsLayout";
// import classes from "./WizzardButtons.module.scss";
import { WIZARD_BUTTON_BACK, WIZARD_BUTTON_CONTINUE } from "../../../static";
import PropTypes from "prop-types";
import { Col, Button } from "react-bootstrap";

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
      <Col className="my-auto">
        <Button onClick={onClickBackHandler} disabled={disabledBack}>
          {WIZARD_BUTTON_BACK}
        </Button>
      </Col>
      <Col className="my-auto d-flex justify-content-end">
        <Button disabled={disabled} onClick={onClickSubmitHandler}>
          {buttonText ? buttonText : WIZARD_BUTTON_CONTINUE}
        </Button>
      </Col>
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
