import classes from "./CarouselCard.module.scss";
const CarouselCard = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.picture}>
        <img src={props.url} alt="space picture"></img>
      </div>
      <div className={classes.info}>
        <p className={classes.info_title}>{props.title}</p>
        <p classname={classes.description}>{props.description}...</p>
      </div>
    </div>
  );
};

export default CarouselCard;
