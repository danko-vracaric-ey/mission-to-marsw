import classes from "./AppLayout.module.scss";

/**
 * A container layout component for App component styiling
 * @param {object} props App data
 * @returns {JSX} Whole app data defined inside this component
 */

const AppLayout = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default AppLayout;
