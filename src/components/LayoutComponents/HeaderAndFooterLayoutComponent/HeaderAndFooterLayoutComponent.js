import classes from "./HeaderAndFooterLayoutComponent.module.scss";

/**
 * A layout component used for Header and Footer component styling
 * @param {object} props Header/Footer data
 * @returns {JSX} All data defined inside this component
 */

const HeaderAndFooterLayoutComponent = (props) => {
  return (
    <div className={`${classes.containerx} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default HeaderAndFooterLayoutComponent;
