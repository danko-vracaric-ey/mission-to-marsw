import { useState } from "react";
import PropTypes from "prop-types";

import classes from "./Wizzard.module.scss";

import WizzardPage1 from "../../pages/WizzardPage1/WizzardPage1";
import WizzardPage2 from "../../pages/WizzardPage2/WizzardPage2";
import WizzardPage3 from "../../pages/WizzardPage3/WizzardPage3";
import WizzardLayout from "../../layout/WizzardLayout/WizzardLayout";
import { WIZARD_STEP_1, WIZARD_STEP_2, WIZARD_STEP_3 } from "../../static";

/**
 * A Component that renders wizard pages and handle wizard logic
 *
 * @param {object} props A function handling wizard rendering path
 * @returns {JSX} Each wizard page based on current step in the wizard
 */

const Wizzard = (props) => {
  const { setInWizzard } = props;
  const steps = [WIZARD_STEP_1, WIZARD_STEP_2, WIZARD_STEP_3];

  const [step, setStep] = useState(0);

  const onForm1Submit = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };
  const onForm2Submit = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };

  const selectedWizzardPage = () => {
    if (step === 0) {
      return <WizzardPage1 onForm1Submit={onForm1Submit} setStep={setStep} />;
    }
    if (step === 1) {
      return <WizzardPage2 onForm2Submit={onForm2Submit} setStep={setStep} />;
    }
    if (step === 2) {
      return <WizzardPage3 setStep={setStep} setInWizzard={setInWizzard} />;
    }
  };

  return (
    <div className={classes.container}>
      <WizzardLayout
        step={step}
        maxValue={steps.length}
        stepCurrent={steps[step]}
      >
        {selectedWizzardPage()}
      </WizzardLayout>
    </div>
  );
};

Wizzard.propTypes = {
  props: PropTypes.shape({
    setInWizzard: PropTypes.func,
  }),
};

export default Wizzard;
