import classes from "./App.module.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import StartApplicationProccessPage from "./pages/StartApplicationProccessPage/StartApplicationProccessPage";
import PrivacyNoticePage from "./pages/PrivacyNoticePage/PrivacyNoticePage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  console.log("1");
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Header></Header>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/application"
            element={<StartApplicationProccessPage />}
          />
          <Route path="/privacynotice" element={<PrivacyNoticePage />} />
          <Route
            path="/termsandcondition"
            element={<TermsAndConditionsPage />}
          />
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
