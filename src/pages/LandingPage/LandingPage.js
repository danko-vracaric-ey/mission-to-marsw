import classes from "./LandingPage.module.scss";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
const LandingPage = (props) => {
  const [data, setData] = useState([]);
  const {
    error,
    isLoading,
    fetchData: getImageOfTheDay,
  } = useAxios(
    "https://api.nasa.gov/planetary/apod?count=16&api_key=ybCNsvKIe13FyF9pD466eYomPJEc5rWBOdUTN7w9"
  );
  useEffect(() => {
    getImageOfTheDay(setData);
  }, []);

  let content;

  if (data.length > 0) {
    content = <Carousel data={data} />;
  }
  if (isLoading) {
    content = (
      <div className={classes.loading}>
        <p>Please wait page is Loading</p>
        <div>
          <LoadingSpinner></LoadingSpinner>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          suscipit risus id dignissim suscipit. Maecenas ornare sapien et enim
          imperdiet dapibus.
        </p>
        <Link to="/application">
          <button className={classes.start_application_button}>
            Start Application Proccess
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
