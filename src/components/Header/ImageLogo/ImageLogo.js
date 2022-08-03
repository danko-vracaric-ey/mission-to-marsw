import classes from "./ImageLogo.module.scss";

const ImageLogo = (props) => {
  return (
    <div className={classes.container}>
      <img src="https://svgur.com/i/jnN.svg" alt="imgLogo" />
    </div>
  );
};

export default ImageLogo;
