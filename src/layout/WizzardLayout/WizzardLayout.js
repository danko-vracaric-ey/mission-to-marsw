import classes from "./WizzardLayout.module.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Container, Row, Col } from "react-bootstrap";

/**
 * Component for holding wizard layout
 * @param {object} props Data needed to set up wizzard layout
 * @returns {JSX} Wizard layout which renders each wizzard page
 */

const WizzardLayout = (props) => {
  const { step, maxValue, className, stepCurrent } = props;

  return (
    <Container>
      <ProgressBar value={step} maxValue={maxValue} />

      <Row>
        <Col xs={12} md={6}>
          <h2>{stepCurrent}</h2>
        </Col>
        <Col xs={12} md={6}>
          <div className={classes.mandatory}>
            <h6>
              Mandatory fields are labeled with <span>*</span>
            </h6>
          </div>
        </Col>
        <>{props.children}</>
      </Row>
    </Container>
  );
};

export default WizzardLayout;
