import classes from "./Footer.module.scss";
import { Link } from "react-router-dom";
const Footer = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.privacynotice}>
          <Link to="/privacynotice">
            <p>Privacy notice</p>
          </Link>
        </div>
        <div className={classes.terms}>
          <Link to="termsandcondition">
            <p>Terms And Conditions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
