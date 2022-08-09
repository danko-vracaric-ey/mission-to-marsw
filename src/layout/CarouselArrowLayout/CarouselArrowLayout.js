import classes from "./CarouselArrowLayout.module.scss";

/**
 * A container layout component for Arrow component width
 * @param {object} props Arrow data
 * @returns {JSX} Whole arrow data defined inside this component
 */

const CarouselArrowLayout = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default CarouselArrowLayout;
