import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import StartApplicationProccessPage from "./pages/StartApplicationProccessPage/StartApplicationProccessPage";
import PrivacyNoticePage from "./pages/PrivacyNoticePage/PrivacyNoticePage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import AppLayout from "./layout/AppLayout/AppLayout";
import "./App.module.scss";

/**
 * Component that holds rendering logic of the whole app
 * @returns {JSX} Routes with paths to different pages as well as the header and the footer of the app
 */

function App() {
  return (
    <AppLayout>
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
    </AppLayout>
  );
}

export default App;
