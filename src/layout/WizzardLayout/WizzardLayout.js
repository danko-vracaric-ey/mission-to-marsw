import classes from "./WizzardLayout.module.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

/**
 * Component for holding wizard layout
 * @param {object} props Data needed to set up wizzard layout
 * @returns {JSX} Wizard layout which renders each wizzard page
 */

const WizzardLayout = (props) => {
  const { step, maxValue, className, stepCurrent } = props;

  return (
    <div className={classes.container}>
      <ProgressBar value={step} maxValue={maxValue} />
      <div className={`${classes.wrapper} ${className}`}>
        <div className={classes.step}>
          <h2>{stepCurrent}</h2>
          <div className={classes.mandatory}>
            <h4>
              Mandatory fields are labeled with <span>*</span>
            </h4>
          </div>
        </div>
        <>{props.children}</>
      </div>
    </div>
  );
};

export default WizzardLayout;
