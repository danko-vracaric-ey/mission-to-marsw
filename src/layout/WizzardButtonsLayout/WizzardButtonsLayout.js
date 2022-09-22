import classes from "./WizzardButtonsLayout.module.scss";

const WizzardButtonsLayout = (props) => {
  const { children } = props;
  return <div className={`${classes.buttons}`}>{children}</div>;
};

export default WizzardButtonsLayout;
