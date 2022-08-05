import classes from "./HeaderAndFooterLayout.module.scss";
const HeaderAndFooterLayout = ({ props: { children } }) => {
  return <div className={classes.container}>{children}</div>;
};

export default HeaderAndFooterLayout;
