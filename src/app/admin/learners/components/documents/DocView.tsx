"use client";

import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import Appeal from "./applicationForm/Appeal";
import Complaint from "./applicationForm/Complaint";
import { applicationForm } from "./dummyForm";
import BehaviouralPolicy from "./applicationForm/BehaviouralPolicy/BehaviouralPolicy";
import CandidateRecordForm from "./applicationForm/CandidateRecord";
import Confidentiality from "./applicationForm/Confidentiality/Confidentiality";
import DataProtection from "./applicationForm/DataProtection/DataProtection";
import EqualOpportunitiesForm from "./applicationForm/EqualOpoortunities/EqualOpportunitiesForm";
import EqualOpportunitiesPolicy from "./applicationForm/EqualOpoortunities/EqualOpportunities";
import HealthSafetyPolicy from "./applicationForm/HealthSafetyPolicy/HealthSafetyPolicy";

const styles = StyleSheet.create({
  text1: { padding: 5, textTransform: "capitalize", fontSize: "12px" },
  section: { textAlign: "center", margin: 30 },
});

const FormPDFDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={{ padding: 20 }}>
      <View>
        <Appeal />
        <Complaint />
        <BehaviouralPolicy />
        <Text style={styles.text1}>
          Name: {formData.behavioural.candidateName}
        </Text>
        <Text style={styles.text1}>
          Candidate Signature: {formData.behavioural.candidateSignature}
        </Text>
        <Text style={styles.text1}>
          Course Details: {formData.behavioural.courseDetails}
        </Text>
        <Text style={styles.text1}>
          Employer Name: {formData.behavioural.employerName}
        </Text>
        <Text style={styles.text1}>
          LDA Name: {formData.behavioural.ldaName}
        </Text>
        <Text style={styles.text1}>
          LDA Signature: {formData.behavioural.ldaSignature}
        </Text>
        <CandidateRecordForm />;
        <Text style={styles.text1}>
          Candidate Name: {formData.candidaterecord.candidateName}
        </Text>
        <Text style={styles.text1}>
          Gender: {formData.candidaterecord.gender}
        </Text>
        <Text style={styles.text1}>
          Company: {formData.candidaterecord.company}
        </Text>
        <Text style={styles.text1}>
          Date of Birth: {formData.candidaterecord.dateOfBirth}
        </Text>
        <Text style={styles.text1}>
          Programme Title: {formData.candidaterecord.programmeTitle}
        </Text>
        <Text style={styles.text1}>
          Level: {formData.candidaterecord.level}
        </Text>
        <Text style={styles.text1}>
          Do you wish the above name to appear on your certificate?:{" "}
          {formData.candidaterecord.nameOnCertificate ? "Yes" : "No"}
        </Text>
        <Text style={styles.text1}>
          If no, please specify: {formData.candidaterecord.alternativeName}
        </Text>
        <Text style={styles.text1}>
          Candidate Signature: {formData.candidaterecord.candidateSignature}
        </Text>
        <Text style={styles.text1}>
          Candidate Signature Date:{" "}
          {formData.candidaterecord.candidateSignatureDate}
        </Text>
        <Text style={styles.text1}>
          Learning and Assessment Data Officer:{" "}
          {formData.candidaterecord.learningOfficer}
        </Text>
        <Text style={styles.text1}>
          Learning Officer Signature Date:{" "}
          {formData.candidaterecord.learningOfficerDate}
        </Text>
        {/* Confidentiality  */}
        <Confidentiality />
        <Text style={styles.text1}>
          Candidate Name: {formData.confidentiality.candidateName}
        </Text>
        <Text style={styles.text1}>
          Employer: {formData.confidentiality.employer}
        </Text>
        <Text style={styles.text1}>
          Course/Project Details: {formData.confidentiality.courseDetails}
        </Text>
        <Text style={styles.text1}>
          Candidate Signature: {formData.confidentiality.candidateSignature}
        </Text>
        <Text style={styles.text1}>
          Candidate Signature Date:{" "}
          {formData.confidentiality.candidateSignatureDate}
        </Text>
        <Text style={styles.text1}>
          Learning and Development Adviser Name:{" "}
          {formData.confidentiality.ldaName}
        </Text>
        <Text style={styles.text1}>
          Learning and Development Adviser Signature:{" "}
          {formData.confidentiality.ldaSignature}
        </Text>
        <Text style={styles.text1}>
          LDA Signature Date: {formData.confidentiality.ldaSignatureDate}
        </Text>
        {/* Data Protection  */}
        <DataProtection />
        <Text style={styles.text1}>
        I confirm that I have read the summary of Eden college Data Protection policy set out in this form and consent to the Eden college holding and processing the categories of personal data about me in the attached schedule for the specified purposes (summarised therein) in respect of my application(s) for admission, as a learner if successful, and after completion and achievement: {formData.dataprotection.confirm ? "Yes" : "No"
          }
        </Text>
        <Text style={styles.text1}>
        In the event that my application to Eden College is unsuccessful I consent to my personal data held on computer and in my files being passed to a not her training organisation for consideration for admission: {formData.dataprotection.altConfirm ? "Yes" : "No"
          }
        </Text>
        <Text style={styles.text1}>
        I have read and understand the statement on the confidentiality of the admissions process as outlined above and I accept this. I am also aware of the feedback arrangements: {formData.dataprotection.feedbackConfirm ? "Yes" : "No"
          }
        </Text>
        <Text style={styles.text1}>
        Full Name: {formData.dataprotection.fullName
          }
        </Text>
        <Text style={styles.text1}>
        Subject / Course Applied for: {formData.dataprotection.CourseAppliedfor
          }
        </Text>

        <EqualOpportunitiesForm />
      </View>
    </Page>
  </Document> 
);

const DocView = ({ onBackClick }) => {
  const [formData, setFormData] = useState({
    behavioural: {},
    candidaterecord: {},
    confidentiality: {},
    dataprotection: {},
    equalopportunities: {},
    healthAndSafetyPolicy: {},
  });

  const [CollegeName, setCollegeName] = useState<string>("");
  const [formContent, setFormContent] = useState<string>("Appeal");
  const [totalSectionNumber, setTotalSectionNumber] = useState<number>();
  const [sectionNumber, setSectionNumber] = useState<number>(1);

  // Array of components
  const formComponents = [
    "Appeal",
    "Complaint",
    "BehaviouralPolicy",
    "CandidateRecord",
    "Confidentiality",
    "DataProtection",
    "EqualOpportunities",
    "HealthSafetyPolicy",
  ];

  useEffect(() => {
    const form = applicationForm[0];
    if (form) {
      setCollegeName(form.name);
      setTotalSectionNumber(formComponents.length);
    }
  }, []);

  // Load saved form data on initial render
  const FORM_STORAGE_KEY = "multi-step-form-data";
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleSaveFormData = (data, formType) => {
    setFormData((prevData) => ({
      ...prevData,
      [formType.toLowerCase()]: {
        ...prevData[formType.toLowerCase()],
        ...data,
      },
    }));
  };

  const renderFormComponent = () => {
    switch (formContent) {
      case "Appeal":
        return <Appeal {...{ onNextClick }} />;
      case "Complaint":
        return <Complaint {...{ onPrevClick, onNextClick }} />;
      case "BehaviouralPolicy":
        return (
          <BehaviouralPolicy
            formData={formData.behavioural}
            setFormData={(data) => handleSaveFormData(data, "behavioural")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        );
      case "CandidateRecord":
        return (
          <CandidateRecordForm
            formData={formData.candidaterecord}
            setFormData={(data) => handleSaveFormData(data, "candidaterecord")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        );
      case "Confidentiality":
        return (
          <Confidentiality
            formData={formData.confidentiality}
            setFormData={(data) => handleSaveFormData(data, "confidentiality")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        );
        case "DataProtection":
        return (
          <DataProtection
            formData={formData.dataprotection}
            setFormData={(data) => handleSaveFormData(data, "dataprotection")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        );
        case "EqualOpportunities":
          return (
            <EqualOpportunitiesPolicy
              formData={formData.equalopportunities}
              setFormData={(data) => handleSaveFormData(data, "equalopportunities")}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
            />
          );
        case "HealthSafetyPolicy":
          return (
            <HealthSafetyPolicy
              formData={formData.healthAndSafetyPolicy}
              setFormData={(data) => handleSaveFormData(data, "healthAndSafetyPolicy")}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
            />
          );
      default:
        return <Appeal {...{ onNextClick }} />;
    }
  };

  const onNextClick = () => {
    setSectionNumber((prev) => Math.min(prev + 1, totalSectionNumber));
    setFormContent(formComponents[sectionNumber] || "Appeal");
  };

  const onPrevClick = () => {
    setSectionNumber((prev) => Math.max(prev - 1, 1));
    setFormContent(formComponents[sectionNumber - 2] || "Appeal");
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <div className="flex flex-row justify-between m-4">
        <button onClick={onBackClick}>Back</button>
        <h3>{`Page ${sectionNumber} of  ${totalSectionNumber}`}</h3>
      </div>
      <div>
        <h2 className="text-center text-xl my-6 font-bold capitalize">
          {CollegeName}
        </h2>
      </div>
      <div>
        <div>{renderFormComponent()}</div>
        <div>
          <PDFDownloadLink
            document={<FormPDFDocument formData={formData} />}
            fileName="form.pdf"
          >
            {/* {({ loading }) =>
              loading ? "Loading document..." : "Download PDF"
            } */}
            Download PDF
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default DocView;
