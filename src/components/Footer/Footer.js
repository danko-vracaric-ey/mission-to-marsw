import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import classes from "./Footer.module.scss";
import HeaderAndFooterLayout from "../../layout/HeaderAndFooterLayout/HeaderAndFooterLayout";
import {
  FOOTER_PRIVACY_NOTICE_LINK_TEXT,
  FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT,
} from "../../static";
import { Nav } from "react-bootstrap";

/**
 * Standard Footer with links that lead to important information concerning using the app
 * @returns {JSX} Two pages, one about privacy information and the other about terms of usage of the app
 */

const Footer = () => {
  const location = useLocation();

  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setShouldShow(true);
    if (location.pathname === "/application/signup") {
      setShouldShow(false);
    }
    if (location.pathname === "/application/intro") {
      setShouldShow(false);
    }
  }, [location.pathname, shouldShow]);

  let landingFooterLinks = (
    <Nav>
      <Nav.Item>
        <Nav.Link to="/privacynotice" as={Link} className="text-light">
          <p>{FOOTER_PRIVACY_NOTICE_LINK_TEXT}</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="termsandcondition" as={Link} className="text-light">
          <p>{FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT}</p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
  let wizzardFooterLinks = (
    <Nav>
      <Nav.Item>
        <Nav.Link className="text-light" disabled>
          <p>{FOOTER_PRIVACY_NOTICE_LINK_TEXT}</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-light" disabled>
          <p>{FOOTER_TERMS_AND_CONDITIONS_LINK_TEXT}</p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );

  return (
    <HeaderAndFooterLayout>
      {shouldShow ? landingFooterLinks : wizzardFooterLinks}
    </HeaderAndFooterLayout>
  );
};

export default Footer;
