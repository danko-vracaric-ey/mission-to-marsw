// import classes from "./PrivacyNoticePage.module.scss";
import {
  PRIVACY_NOTICE_PAGE_HEADER,
  PRIVACY_NOTICE_PAGE_PARAGRAPH1,
  PRIVACY_NOTICE_PAGE_PARAGRAPH2,
} from "../../static";
import { Container } from "react-bootstrap";

/**
 *  A public notification page to users about ways their personal information may be used
 *
 * @returns {JSX} A multi-paragrapgh text about usage of user's personal information.
 */

const PrivacyNoticePage = () => {
  return (
    <Container>
      <h2>{PRIVACY_NOTICE_PAGE_HEADER}</h2>
      <p>{PRIVACY_NOTICE_PAGE_PARAGRAPH1}</p>
      <p>{PRIVACY_NOTICE_PAGE_PARAGRAPH2}</p>
    </Container>
  );
};

export default PrivacyNoticePage;
