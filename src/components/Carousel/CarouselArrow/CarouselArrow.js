import classes from "./CarouselArrow.module.scss";
import PropTypes from "prop-types";

/**
 * Component for moving left and right through the slider
 * @param {object} props Image prop configuration data
 * @returns {JSX} Arrow image in svg format
 */

const CarouselArrow = (props) => {
  const { className, alt, onClick } = props;
  return (
    <div className={`${classes.wrapper} ${className}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e8/ArrowRight-gray.svg"
        alt={alt}
        onClick={onClick}
      ></img>
    </div>
  );
};

CarouselArrow.propTypes = {
  props: PropTypes.shape({
    className: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
  }),
};
export default CarouselArrow;
