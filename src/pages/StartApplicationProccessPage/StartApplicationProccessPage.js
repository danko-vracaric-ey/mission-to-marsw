import classes from "./StartApplicationProccessPage.module.scss";

/**
 * Page where user can start their application process
 *
 * @returns {JSX}
 */

const StartApplicationProccessPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/af/Under_construction_icon-yellow.svg"
          alt="underConstruction"
        />
        <h2>Sorry, page under construction!</h2>
      </div>
    </div>
  );
};

export default StartApplicationProccessPage;
