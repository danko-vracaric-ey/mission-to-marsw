import { Link } from "react-router-dom";

import classes from "./Footer.module.scss";
import HeaderAndFooterLayout from "../../layout/HeaderAndFooterLayout/HeaderAndFooterLayout";
import {
  FOOTER_PRIVACY_NOTICE_LINK_TEXT,
  FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT,
} from "../../static";

/**
 * Standard Footer with links that lead to important information concerning using the app
 * @returns {JSX} Two pages, one about privacy information and the other about terms of usage of the app
 */

const Footer = () => {
  return (
    <HeaderAndFooterLayout className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.privacynotice}>
          <Link to="/privacynotice">
            <p>{FOOTER_PRIVACY_NOTICE_LINK_TEXT}</p>
          </Link>
        </div>
        <div className={classes.terms}>
          <Link to="termsandcondition">
            <p>{FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT}</p>
          </Link>
        </div>
      </div>
    </HeaderAndFooterLayout>
  );
};

export default Footer;
