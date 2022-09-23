import classes from "./HeaderAndFooterLayout.module.scss";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

/**
 * A layout component used for Header and Footer component styling
 * @param {object} props Header/Footer data
 * @returns {JSX} All data defined inside this component
 */

const HeaderAndFooterLayout = (props) => {
  const { className, children } = props;
  return (
    <Navbar bg="dark" className={classes.container}>
      <Container>{children}</Container>
    </Navbar>
  );
};

export default HeaderAndFooterLayout;
