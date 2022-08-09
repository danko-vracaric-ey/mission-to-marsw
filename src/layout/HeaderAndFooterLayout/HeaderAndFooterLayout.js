import classes from "./HeaderAndFooterLayout.module.scss";

/**
 * A layout component used for Header and Footer component styling
 * @param {object} props Header/Footer data
 * @returns {JSX} All data defined inside this component
 */

const HeaderAndFooterLayout = (props) => {
  const { className, children } = props;
  return <div className={`${classes.containerx} ${className}`}>{children}</div>;
};

export default HeaderAndFooterLayout;
