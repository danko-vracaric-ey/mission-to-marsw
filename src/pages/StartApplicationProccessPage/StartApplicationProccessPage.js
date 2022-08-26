import { Routes, Route, useParams } from "react-router-dom";
import { useState, useContext } from "react";

import classes from "./StartApplicationProccessPage.module.scss";
import WizzardIntroPage from "../WizzardIntroPage/WizzardIntroPage";
import Wizzard from "../../components/Wizzard/Wizzard";
import { Contex } from "../../store/Store";

/**
 * Page where user can start their application process
 *
 * @returns {JSX}
 */

const StartApplicationProccessPage = () => {
  const applicationData = useContext(Contex);
  const [inWizzard, setInWizzard] = useState(
    localStorage.getItem("isWizzardOpen") === "true"
  );

  return (
    <div className={classes.container}>
      <div className={classes.headline_wrapper}>
        <h2 className={classes.headline}>Application Wizzard</h2>
      </div>
      <div className={classes.wrapper}>
        <Routes>
          <Route
            path="intro"
            element={<WizzardIntroPage setInWizzard={setInWizzard} />}
          />
          {inWizzard && (
            <Route
              path="signup"
              element={<Wizzard setInWizzard={setInWizzard} />}
            />
          )}
          <Route
            path="*"
            element={<WizzardIntroPage setInWizzard={setInWizzard} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default StartApplicationProccessPage;
