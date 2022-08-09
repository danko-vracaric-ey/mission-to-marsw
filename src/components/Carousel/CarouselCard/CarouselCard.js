import PropTypes from "prop-types";

import classes from "./CarouselCard.module.scss";

/**
 *  Card to show image and it's information inside the carousel
 * @param {string} url  Address of the image.
 * @param {string} explanation Description of the image.
 * @param {string} title Title of the event, ocurrence or other type of phenomenon shown in the image.
 * @returns {JSX} A card with an image and title and description section
 */

const CarouselCard = ({ image: { url, explanation, title } }) => {
  return (
    <div className={classes.container}>
      <div className={classes.picture}>
        <img src={url} alt="space" />
      </div>
      <div className={classes.info}>
        <p className={classes.info_title}>{title}</p>
        <p className={classes.description}>{explanation}</p>
      </div>
    </div>
  );
};

CarouselCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    explanation: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default CarouselCard;
