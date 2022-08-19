import classes from "./WizzardLayout.module.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const WizzardLayout = (props) => {
  const { step, maxValue, className } = props;

  return (
    <div className={classes.container}>
      <ProgressBar value={step * 1 - 1} maxValue={maxValue} />
      <div className={`${classes.wrapper} ${className}`}>
        <div className={classes.step}>
          <h2>Step {step}</h2>
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
