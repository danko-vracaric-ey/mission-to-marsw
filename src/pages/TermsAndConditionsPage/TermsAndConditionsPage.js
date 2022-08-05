import classes from "./TermsAndConditionsPage.module.scss";
import {
  TERMS_AND_CONDITIONS_PAGE_HEADER,
  TERMS_AND_CONDITIONS_PAGE_PARAGRAPH_1,
  TERMS_AND_CONDITIONS_PAGE_PARAGRAPH_2,
  TERMS_AND_CONDITIONS_PAGE_PARAGRAPH_3,
} from "../../static";
/**
 * A page that outlines rules and regulations of the app that user must adhere to.
 *
 * @returns {JSX} A multi-paragraph text detailing the set of regulations a user must follow in order to use the app.
 */
const TermsAndConditionsPage = () => {
  return (
    <div className={classes.container}>
      <h2>{TERMS_AND_CONDITIONS_PAGE_HEADER}</h2>
      <p>{TERMS_AND_CONDITIONS_PAGE_PARAGRAPH_1}</p>
      <p>{TERMS_AND_CONDITIONS_PAGE_PARAGRAPH_2}</p>
      <p>{TERMS_AND_CONDITIONS_PAGE_PARAGRAPH_3}</p>
    </div>
  );
};

export default TermsAndConditionsPage;
