import classes from "./ImageLogo.module.scss";
/**
 * An image logo that a user can navigate back to Landing Page by clicking on it
 * @returns {JSX} An image with the app logo
 */

const ImageLogo = () => {
  return (
    <div className={classes.container}>
      <img src="https://svgur.com/i/jnN.svg" alt="imgLogo" />
    </div>
  );
};

export default ImageLogo;
