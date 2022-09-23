import classes from "./WizzardButtonsLayout.module.scss";
import Row from "react-bootstrap/Row";

const WizzardButtonsLayout = (props) => {
  const { children } = props;
  return <Row className={`${classes.buttons}`}>{children}</Row>;
};

export default WizzardButtonsLayout;
