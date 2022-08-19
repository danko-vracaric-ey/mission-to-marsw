import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import Carousel from "../../components/Carousel/Carousel";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import classes from "./LandingPage.module.scss";
import {
  LANDING_PAGE_LOADING_TEXT,
  LANDING_PAGE_PARAGRAPH,
  LANDING_PAGE_START_APPLICATION_BUTTON,
} from "../../static";

/**
 * Landing/Home page is the first page that loads on the user's screen when user lauches the app,
 *
 * @returns {JSX} a slider type carousel and a section where user can read about, click and start the application process
 */

const LandingPage = () => {
  const [data, setData] = useState([]);
  const count = 5;
  const {
    error,
    isLoading,
    fetchData: getImageOfTheDay,
  } = useAxios(
    `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${process.env.REACT_APP_API_KEY}`
  );
  useEffect(() => {
    getImageOfTheDay(setData);
  }, [getImageOfTheDay]);

  let content;

  if (data.length > 0) {
    content = <Carousel data={data} />;
  }
  if (isLoading) {
    content = (
      <div className={classes.loading}>
        <p>{LANDING_PAGE_LOADING_TEXT}</p>
        <div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (error) {
    content = (
      <div className={classes.loading}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {content}

      <div className={classes.start_application_container}>
        <p>{LANDING_PAGE_PARAGRAPH}</p>
        <Link to="/application/intro">
          <button className={classes.start_application_button}>
            {LANDING_PAGE_START_APPLICATION_BUTTON}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
