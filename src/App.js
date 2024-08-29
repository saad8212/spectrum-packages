import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StepProgressBar from "./components/Progressbar";
import SurveyStep from "./components/SurveyStep";
import CongratsPage from "./components/CongratsPage";
import SurveyTable from "./components/SurveyTable"; // Import SurveyTable
import { submitSurvey } from "./services/apiService"; // Import the service function
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<SurveyTable />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    provider: "",
    currentProvider: "",
    usage: "",
    connection: "",
    speed: "",
    urgency: "",
    zipCode: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    callBackTime: "",
  });

  const [errors, setErrors] = useState({});

  const questions = [
    {
      question: "Do you currently have an internet service provider?",
      options: ["Yes", "No"],
      type: "radio",
      name: "provider",
    },
    {
      question: "What provider are you currently using?",
      options: ["Verizon", "Xfinity", "AT&T", "Other"],
      type: "radio",
      name: "currentProvider",
      condition: formData.provider === "Yes",
    },
    {
      question: "What do you use the internet for the most?",
      options: ["Browsing/Shopping", "Work", "Streaming Videos", "All/Other"],
      type: "radio",
      name: "usage",
    },
    {
      question: "What type of internet connection do you currently have?",
      options: ["Fiber", "Cable", "Satellite", "Other", "Don't Know"],
      type: "radio",
      name: "connection",
    },
    {
      question: "What internet speed do you need?",
      options: ["300mb", "500mb", "1000mb", "Help me decide"],
      type: "radio",
      name: "speed",
    },
    {
      question: "How soon do you need service?",
      options: [
        "ASAP",
        "Within a week or so",
        "Within a month",
        "I'm not sure",
      ],
      type: "radio",
      name: "urgency",
    },
    {
      question: "What is your zip code?",
      type: "text",
      name: "zipCode",
      placeholder: "Enter your ZIP code",
    },
    {
      question: "What is your email?",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
    },
    {
      question: "Contact details",
      fields: ["firstName", "lastName", "phone", "callBackTime"],
      type: "contact",
      callBackTimeOptions: [
        "ASAP",
        "Within an hour",
        "Within a day",
        "Tomorrow",
        "Do not call back",
      ],
    },
  ];

  const filteredQuestions = questions.filter(
    (question) => question.condition === undefined || question.condition
  );

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "zipCode":
        if (!/^\d{5}(-\d{4})?$/.test(value)) {
          errorMsg = "Invalid ZIP code format.";
        }
        break;
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errorMsg = "Invalid email address.";
        }
        break;
      case "phone":
        if (value.length < 8 || value.length > 20) {
          errorMsg = "Phone number must be between 8 and 20 characters.";
        }
        break;
      default:
        if (!value) {
          errorMsg = "This field is required.";
        }
    }

    return errorMsg;
  };

  const validateCurrentStep = () => {
    const currentQuestion = filteredQuestions[currentStep];
    let newErrors = {};

    if (currentQuestion.type === "contact") {
      currentQuestion.fields.forEach((field) => {
        const errorMsg = validateField(field, formData[field]);
        if (errorMsg) newErrors[field] = errorMsg;
      });
    } else {
      const errorMsg = validateField(
        currentQuestion.name,
        formData[currentQuestion.name]
      );
      if (errorMsg) newErrors[currentQuestion.name] = errorMsg;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateCurrentStep()) {
      setErrors({});
      if (currentStep === filteredQuestions.length - 1) {
        // Final step: submit data using the service function
        try {
          const data = await submitSurvey(formData);
          console.log("Survey submitted successfully:", data);
          setCurrentStep(currentStep + 1); // Move to CongratsPage
        } catch (error) {
          console.error("Failed to submit survey:", error.message);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  return (
    <div className="App">
      <header className="header">
        Get Fast, Reliable Internet from a Trusted Provider
      </header>
      {currentStep < filteredQuestions.length ? (
        <>
          <StepProgressBar
            totalSteps={filteredQuestions.length}
            currentStep={currentStep}
          />
          <SurveyStep
            question={filteredQuestions[currentStep]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleInputChange={handleInputChange}
            formData={formData}
            errors={errors}
            currentStep={currentStep}
          />
        </>
      ) : (
        <CongratsPage formData={formData} />
      )}
    </div>
  );
};

export default App;
