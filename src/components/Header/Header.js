import classes from "./Header.module.scss";
import ImageLogo from "./ImageLogo/ImageLogo";
import { Link } from "react-router-dom";

const Header = (prop) => {
  return (
    <div className={classes.container}>
      <Link to="/">
        <ImageLogo />
      </Link>
    </div>
  );
};

export default Header;
