import classes from "./ProgressBar.module.scss";

const ProgressBar = (props) => {
  let barFillWidth = "%0";
  if (props.maxValue <= 3) {
    barFillWidth = Math.ceil(props.value * 33.3) + "%";
  }

  return (
    <div className={classes.container}>
      <div className={classes.first}>
        <span>
          {props.value}/{props.maxValue} Completed
        </span>
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
