import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import classes from "./StartApplicationProccessPage.module.scss";
import WizzardIntroPage from "../WizzardIntroPage/WizzardIntroPage";
import Wizzard from "../../components/Wizzard/Wizzard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Page where user can start their application process
 *
 * @returns {JSX}
 */

const StartApplicationProccessPage = () => {
  const [inWizzard, setInWizzard] = useState(false);

  return (
    <>
      <h2 className={classes.headline}>Application Wizzard</h2>

      <Row className="h-100 pt-5">
        <Col
          className="g-0"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
        >
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
        </Col>
      </Row>
    </>
  );
};

export default StartApplicationProccessPage;
