import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.scss";
import HeaderAndFooterLayout from "../../layout/HeaderAndFooterLayout/HeaderAndFooterLayout";
import {
  FOOTER_PRIVACY_NOTICE_LINK_TEXT,
  FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT,
} from "../../static";
import { Contex } from "../../store/Store";

/**
 * Standard Footer with links that lead to important information concerning using the app
 * @returns {JSX} Two pages, one about privacy information and the other about terms of usage of the app
 */

const Footer = () => {
  const ctx = useContext(Contex);
  const { state } = ctx;

  const shouldShow = state.shouldShow;

  let landingFooterLinks = (
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
  );
  let wizzardFooterLinks = (
    <div className={classes.wrapper}>
      <div className={classes.privacynotice}>
        <p>{FOOTER_PRIVACY_NOTICE_LINK_TEXT}</p>
      </div>
      <div className={classes.terms}>
        <p>{FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT}</p>
      </div>
    </div>
  );

  return (
    <HeaderAndFooterLayout className={classes.container}>
      {shouldShow ? landingFooterLinks : wizzardFooterLinks}
    </HeaderAndFooterLayout>
  );
};

export default Footer;
