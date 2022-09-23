import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import StartApplicationProccessPage from "./pages/StartApplicationProccessPage/StartApplicationProccessPage";
import PrivacyNoticePage from "./pages/PrivacyNoticePage/PrivacyNoticePage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import AppLayout from "./layout/AppLayout/AppLayout";
import classes from "./App.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./custom.scss";

/**
 * Component that holds rendering logic of the whole app
 * @returns {JSX} Routes with paths to different pages as well as the header and the footer of the app
 */

function App() {
  return (
    <div fluid className={` ${classes.container}`}>
      <BrowserRouter>
        <Header></Header>

        <Container className={`g-0 ${classes.row} my-5 px-2`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/application/*"
              element={<StartApplicationProccessPage />}
            />
            <Route path="/privacynotice" element={<PrivacyNoticePage />} />
            <Route
              path="/termsandcondition"
              element={<TermsAndConditionsPage />}
            />
            <Route path="*" element={<LandingPage />}></Route>
          </Routes>
        </Container>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
