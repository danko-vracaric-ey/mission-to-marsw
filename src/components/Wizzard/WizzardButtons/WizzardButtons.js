import WizzardButtonsLayout from "../../../layout/WizzardButtonsLayout/WizzardButtonsLayout";
import classes from "./WizzardButtons.module.scss";

const WizzardButtons = (props) => {
  const { onClickBackHandler, disabled, onClickSubmitHandler, buttonText } =
    props;
  return (
    <WizzardButtonsLayout>
      <div className={classes.button_back}>
        <button type="button" onClick={onClickBackHandler}>
          BACK
        </button>
      </div>
      <div className={classes.button_continue}>
        <button disabled={disabled} onClick={onClickSubmitHandler}>
          {buttonText ? buttonText : "CONTINUE"}
        </button>
      </div>
    </WizzardButtonsLayout>
  );
};

export default WizzardButtons;
