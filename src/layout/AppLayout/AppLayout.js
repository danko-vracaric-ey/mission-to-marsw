import classes from "./AppLayout.module.scss";
import Container from "react-bootstrap/Container";

/**
 * A container layout component for App component styiling
 * @param {object} props App data
 * @returns {JSX} Whole app data defined inside this component
 */

const AppLayout = (props) => {
  return <Container>{props.children}</Container>;
};

export default AppLayout;
