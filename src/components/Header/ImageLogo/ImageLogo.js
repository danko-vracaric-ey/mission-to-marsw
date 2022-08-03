import classes from "./ImageLogo.module.scss";

const ImageLogo = (props) => {
  return (
    <div className={classes.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/34/EY_logo_2019.svg"
        alt="imgLogo"
      />
    </div>
  );
};

export default ImageLogo;
