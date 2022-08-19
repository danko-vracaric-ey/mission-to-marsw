import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./Wizzard.module.scss";

import WizzardPage1 from "../../pages/WizzardPage1/WizzardPage1";
import WizzardPage2 from "../../pages/WizzardPage2/WizzardPage2";
import WizzardPage3 from "../../pages/WizzardPage3/WizzardPage3";
import WizzardLayout from "../../layout/WizzardLayout/WizzardLayout";

const Wizzard = (props) => {
  const { page } = useParams();
  const { inWizzard } = props;
  const [formData, setFormData] = useState({
    title: localStorage.getItem("title"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    dateOfBirth: localStorage.getItem("dateOfBirth"),
    email: localStorage.getItem("email"),
    address1: localStorage.getItem("address1"),
    address2: localStorage.getItem("address2"),
    state: localStorage.getItem("state"),
    city: localStorage.getItem("city"),
    postalCode: localStorage.getItem("postalCode"),
    howManyYearsLived: localStorage.getItem("howManyYearsLived"),
    agriculturalSkills: localStorage.getItem("agriculturalSkills")
      ? localStorage.getItem("agriculturalSkills")
      : "No",
    agriculturalSkillsDetails: localStorage.getItem("agriculturalSkillsDetails")
      ? localStorage.getItem("agriculturalSkillsDetails")
      : "",
    metalworkSkills: localStorage.getItem("metalworkSkils"),
    Marking: localStorage.getItem("Marking") === "true",
    Cutting: localStorage.getItem("Cutting") === "true",
    Drilling: localStorage.getItem("Drilling") === "true",
    CuttingThreads: localStorage.getItem("CuttingThreads") === "true",
    Filling: localStorage.getItem("Filling") === "true",
    Joining: localStorage.getItem("Joining") === "true",
    convicted: localStorage.getItem("convicted")
      ? localStorage.getItem("convicted")
      : "No",
    reasons: [],
    airplaneSkills: localStorage.getItem("airplaneSkills")
      ? localStorage.getItem("airplaneSkills")
      : "No",
    carSkills: localStorage.getItem("carSkills")
      ? localStorage.getItem("carSkills")
      : "No",
    bicycleSkills: localStorage.getItem("bicycleSkills")
      ? localStorage.getItem("bicycleSkills")
      : "No",
  });
  localStorage.setItem("niz", ["a", "b"]);
  const b = localStorage.getItem("niz");

  const onForm1Submit = (form1data) => {
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
    setFormData((prev) => {
      return {
        ...prev,
        email: form2data.email,
        address1: form2data.address1,
        address2: form2data.address2,
        state: form2data.state,
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

  console.log(formData, "JA SAM FORM DATA");
  const navigate = useNavigate();

  useEffect(() => {
    if (page.length !== 1) {
      navigate("/application/intro");
    }
    if (!/[1 2 3]/.test(page)) {
      navigate("/application/intro");
    }
    if (!inWizzard) {
      navigate("/application/intro");
    }
  }, [page, navigate]);

  const count = 3;

  return (
    <div className={classes.container}>
      <WizzardLayout step={page} maxValue={count}>
        {page === "1" && <WizzardPage1 onForm1Submit={onForm1Submit} />}
        {page === "2" && <WizzardPage2 onForm2Submit={onForm2Submit} />}
        {page === "3" && <WizzardPage3 onForm3Submit={onForm3Submit} />}
      </WizzardLayout>
    </div>
  );
};

export default Wizzard;
