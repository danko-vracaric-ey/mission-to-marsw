import classes from "./LandingPage.module.scss";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const LandingPage = (props) => {
  const {
    error,
    isLoading,
    fetchData: getImageOfTheDay,
    data,
  } = useAxios(
    "https://api.nasa.gov/planetary/apod?count=16&api_key=ybCNsvKIe13FyF9pD466eYomPJEc5rWBOdUTN7w9"
  );
  useEffect(() => {
    getImageOfTheDay();
  }, []);
  console.log(data);
  return (
    <div className={classes.container}>
      {!isLoading ? (
        <Carousel data={data} />
      ) : (
        <div className={classes.loading}>
          <p>Please wait page is Loading</p>
          <div>
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div>
      )}
      <div className={classes.start_application_container}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          suscipit risus id dignissim suscipit. Maecenas ornare sapien et enim
          imperdiet dapibus.
        </p>
        <button className={classes.start_application_button}>
          Start Application Proccess
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
