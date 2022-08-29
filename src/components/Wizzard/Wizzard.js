import { useState } from "react";

import classes from "./Wizzard.module.scss";

import WizzardPage1 from "../../pages/WizzardPage1/WizzardPage1";
import WizzardPage2 from "../../pages/WizzardPage2/WizzardPage2";
import WizzardPage3 from "../../pages/WizzardPage3/WizzardPage3";
import WizzardLayout from "../../layout/WizzardLayout/WizzardLayout";

const Wizzard = (props) => {
  const { setInWizzard } = props;
  const steps = ["Step 1", "Step 2", "Step 3"];

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

  const onForm3Submit = () => {};
  const selectedWizzardPage = () => {
    if (step === 0) {
      return <WizzardPage1 onForm1Submit={onForm1Submit} setStep={setStep} />;
    }
    if (step === 1) {
      return <WizzardPage2 onForm2Submit={onForm2Submit} setStep={setStep} />;
    }
    if (step === 2) {
      return (
        <WizzardPage3
          onForm3Submit={onForm3Submit}
          setStep={setStep}
          setInWizzard={setInWizzard}
        />
      );
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

export default Wizzard;
