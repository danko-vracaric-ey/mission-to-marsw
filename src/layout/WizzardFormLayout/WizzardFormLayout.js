import classes from "./WizzardFormLayout.module.scss";

const WizzardFormLayout = (props) => {
  const { children } = props;
  return <div className={`${classes.form}`}>{children}</div>;
};

export default WizzardFormLayout;
