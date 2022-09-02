import { useContext } from "react";

import classes from "./ProgressBar.module.scss";
import { Contex } from "../../store/Store";
import { WIZARD_LAYOUT_PROGRESS_BAR_TEXT } from "../../static";

/**
 * Component for visualizing sign up progress in wizard layout
 * @param {object} props Line configuration data
 * @returns {JSX} Horizontal progress line
 */

const ProgressBar = (props) => {
  const ctx = useContext(Contex);
  const formIsValid = ctx.state.formIsValid;
  const { value, maxValue } = props;

  let barFillWidth = "0%";

  if (maxValue <= 3) {
    barFillWidth = Math.ceil(value * 33.3) + "%";
  }
  if (formIsValid) {
    barFillWidth = 99.99 + "%";
  }

  return (
    <div className={classes.container}>
      <div className={classes.first}>
        {formIsValid ? (
          <span>3/3 {WIZARD_LAYOUT_PROGRESS_BAR_TEXT}</span>
        ) : (
          <span>
            {value}/{maxValue} {WIZARD_LAYOUT_PROGRESS_BAR_TEXT}
          </span>
        )}
      </div>

      <div className={classes.chart}>
        <div className={classes.inner}>
          <div className={classes.fill} style={{ width: barFillWidth }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
