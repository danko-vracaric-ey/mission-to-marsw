import { Link } from "react-router-dom";

import HeaderAndFooterLayout from "../../layout/HeaderAndFooterLayout/HeaderAndFooterLayout";
import ImageLogo from "./ImageLogo/ImageLogo";
import classes from "./Header.module.scss";

/**
 *  Standard Header with app navigation elements
 * @returns {JSX} An app image logo
 */

const Header = () => {
  return (
    <HeaderAndFooterLayout className={classes.container}>
      <Link to="/">
        <ImageLogo />
      </Link>
    </HeaderAndFooterLayout>
  );
};

export default Header;
