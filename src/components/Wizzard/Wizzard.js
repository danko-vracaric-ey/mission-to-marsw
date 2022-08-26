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

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    postalCode: "",
    howManyYearsLived: "",
    agriculturalSkills: "No",
    agriculturalSkillsDetails: "",
    metalworkSkills: "No",
    metalworkSkillsDetails: [],
    Marking: false,
    markingValue: "",
    Cutting: false,
    cuttingValue: "",
    Drilling: false,
    drillingValue: "",
    CuttingThreads: false,
    cuttingThreadsValue: "",
    Filling: false,
    fillingValue: "",
    Joining: false,
    joiningValue: "",
    convicted: "No",
    reasons: [{ whatName: "", whenName: "" }],
    airplaneSkills: "No",
    carSkills: "No",
    bicycleSkills: "No",
  });

  const onForm1Submit = (form1data) => {
    setStep((prev) => {
      return prev + 1;
    });
    setFormData((prev) => {
      return {
        ...prev,
        title: form1data.title,
        firstName: form1data.firstName,
        lastName: form1data.lastName,
        dateOfBirth: form1data.dateOfBirth,
      };
    });
  };
  const onForm2Submit = (form2data) => {
    setStep((prev) => {
      return prev + 1;
    });
    setFormData((prev) => {
      return {
        ...prev,
        email: form2data.email,
        address1: form2data.address1,
        address2: form2data.address2,
        country: form2data.country,
        city: form2data.city,
        postalCode: form2data.postalCode,
        howManyYearsLived: form2data.howManyYearsLived,
      };
    });
  };

  const onForm3Submit = (form3data) => {
    setFormData((prev) => {
      return {
        ...prev,
        agriculturalSkills: form3data.agriculturalSkills,
        agriculturalSkillsDetails: form3data.agriculturalSkillsDetails,
        metalworkSkills: form3data.metalworkSkills,
        Marking: form3data.Marking,
        Cutting: form3data.Cutting,
        Drilling: form3data.Drilling,
        CuttingThreads: form3data.CuttingThreads,
        Filling: form3data.Filling,
        Joining: form3data.Joining,
        convicted: form3data.convicted,
        reasons: form3data.reasons,
        airplaneSkills: form3data.airplaneSkills,
        carSkills: form3data.airplaneSkills,
        bicycleSkills: form3data.bicycleSkills,
      };
    });
  };
  const selectedWizzardPage = () => {
    if (step === 0) {
      return (
        <WizzardPage1
          onForm1Submit={onForm1Submit}
          setStep={setStep}
          wizzard1Data={{
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
          }}
        />
      );
    }
    if (step === 1) {
      return (
        <WizzardPage2
          onForm2Submit={onForm2Submit}
          setStep={setStep}
          wizzard2Data={{
            email: formData.email,
            address1: formData.address1,
            address2: formData.address2,
            country: formData.country,
            city: formData.city,
            postalCode: formData.postalCode,
            howManyYearsLived: formData.howManyYearsLived,
          }}
        />
      );
    }
    if (step === 2) {
      return (
        <WizzardPage3
          onForm3Submit={onForm3Submit}
          setStep={setStep}
          setInWizzard={setInWizzard}
          wizzard3Data={{
            agriculturalSkills: formData.agriculturalSkills,
            agriculturalSkillsDetails: formData.agriculturalSkillsDetails,
            metalworkSkills: formData.metalworkSkills,
            metalworkSkillsDetails: formData.metalworkSkillsDetails,
            Marking: formData.Marking,
            markingValue: formData.markingValue,
            Cutting: formData.Cutting,
            cuttingValue: formData.cuttingValue,
            Drilling: formData.drillingValue,
            CuttingThreads: formData.cuttingThreadsValue,
            cuttingThreadsValue: formData.cuttingThreadsValue,
            Filling: formData.Filling,
            fillingValue: formData.fillingValue,
            Joining: formData.Joining,
            joiningValue: formData.joiningValue,
            convicted: formData.convicted,
            reasons: formData.reasons,
            airplaneSkills: formData.airplaneSkills,
            carSkills: formData.carSkills,
            bicycleSkills: formData.bicycleSkills,
          }}
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
