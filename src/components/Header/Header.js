import { Link } from "react-router-dom";

import HeaderAndFooterLayoutComponent from "../LayoutComponents/HeaderAndFooterLayoutComponent/HeaderAndFooterLayoutComponent";
import ImageLogo from "./ImageLogo/ImageLogo";
import classes from "./Header.module.scss";

/**
 *  Standard Header with app navigation elements
 * @returns {JSX} An app image logo
 */

const Header = () => {
  return (
    <HeaderAndFooterLayoutComponent className={classes.container}>
      <Link to="/">
        <ImageLogo />
      </Link>
    </HeaderAndFooterLayoutComponent>
  );
};

export default Header;
