import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import Appeal from "./applicationForm/Appeal";
import Complaint from "./applicationForm/Complaint";
import BehaviouralPolicy from "./applicationForm/BehaviouralPolicy/BehaviouralPolicy";
import CandidateRecordForm from "./applicationForm/CandidateRecord";
import Confidentiality from "./applicationForm/Confidentiality/Confidentiality";
import DataProtection from "./applicationForm/DataProtection/DataProtection";
import EqualOpportunitiesPolicy from "./applicationForm/EqualOpoortunities/EqualOpportunities";
import HealthSafetyPolicy from "./applicationForm/HealthSafetyPolicy/HealthSafetyPolicy";
import GuidancePolicy from "./applicationForm/GuidancePolicy/GuidancePolicy";

type Props = {};

const styles = StyleSheet.create({
  text1: {
    padding: 10,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: 1.5,
  },
  inputStyle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#555",
  },
  section: { textAlign: "center", margin: 30 },
  image: { flexGrow: 8, padding: 10 },
});

const styles2 = StyleSheet.create({
  page: { flexDirection: "row" },
  image: { flexGrow: 8, backgroundColor: "grey", padding: 10 },
  text: {
    flexGrow: 3,
    backgroundColor: "#f0f0f0",
    color: "#212121",
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
});

const FormPDFDocument = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image style={styles2.image} src="/mountains.jpg" />
      </Page>
      <Page
        size="A4"
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              textTransform: "capitalize",
            }}
          >
            EDEN COLLEGE LEARNER ENROLMENT FORM
          </Text>
        </View>
      </Page>
      <Page size="A4" style={{ padding: 20 }}>
        <View>
          {/* Appeal  */}
          <View>
            <Appeal />
          </View>
          {/* Complaint  */}
          <View>
            <Complaint />
          </View>
          {/* Beahvioural Policy  */}
          <View>
            <BehaviouralPolicy />
            <Text style={styles.text1}>
              Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.candidateName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Candidate Signature:{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.candidateSignature}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Course Details:{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.courseDetails}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Employer Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.employerName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              LDA Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.ldaName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              LDA Signature:{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.ldaSignature}
              </Text>
            </Text>
            <Text style={styles.text1}>
              I confirm that I have read and understood the above policy :{" "}
              <Text style={styles.inputStyle}>
                {formData.behavioural.agreement ? "Yes" : "No"}
              </Text>
            </Text>
          </View>
          {/* Candidate Record  */}
          <View>
            <CandidateRecordForm />;
            <Text style={styles.text1}>
              Candidate Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.candidateName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Gender:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.gender}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Company:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.company}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Date of Birth:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.dateOfBirth}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Programme Title:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.programmeTitle}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Level:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.level}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Do you wish the above name to appear on your certificate?:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.nameOnCertificate ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.text1}>
              If no, please specify:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.alternativeName || "N/A"}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Candidate Signature:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.candidateSignature}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Candidate Signature Date:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.candidateSignatureDate}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Learning and Assessment Data Officer:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.learningOfficer}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Learning Officer Signature Date:{" "}
              <Text style={styles.inputStyle}>
                {formData.candidaterecord.learningOfficerDate}
              </Text>
            </Text>
          </View>
          {/* Confidentiality  */}
          <View>
            <Confidentiality />
            <Text style={styles.text1}>
              Candidate Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.candidateName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Employer:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.employer}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Course/Project Details:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.courseDetails}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Candidate Signature:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.candidateSignature}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Candidate Signature Date:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.candidateSignatureDate}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Learning and Development Adviser Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.ldaName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Learning and Development Adviser Signature:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.ldaSignature}
              </Text>
            </Text>
            <Text style={styles.text1}>
              LDA Signature Date:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.ldaSignatureDate}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Eden College Allocated LDA:{" "}
              <Text style={styles.inputStyle}>
                {formData.confidentiality.eldaName}
              </Text>
            </Text>
          </View>
          {/* Data Protection  */}
          <View>
            <DataProtection />
            <Text style={{ ...styles.text1 }}>
              I confirm that I have read the summary of Eden College Data
              Protection policy set out in this form and consent to Eden College
              holding and processing the categories of personal data about me in
              the attached schedule for the specified purposes (summarised
              therein) in respect of my application(s) for admission, as a
              learner if successful, and after completion and achievement:{" "}
              <Text style={styles.inputStyle}>
                {formData.dataprotection.confirm ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.text1}>
              In the event that my application to Eden College is unsuccessful,
              I consent to my personal data held on computer and in my files
              being passed to another training organisation for consideration
              for admission:{" "}
              <Text style={styles.inputStyle}>
                {formData.dataprotection.altConfirm ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.text1}>
              I have read and understand the statement on the confidentiality of
              the admissions process as outlined above and I accept this. I am
              also aware of the feedback arrangements:{" "}
              <Text style={styles.inputStyle}>
                {formData.dataprotection.feedbackConfirm ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Full Name:{" "}
              <Text style={styles.inputStyle}>
                {formData.dataprotection.fullName}
              </Text>
            </Text>
            <Text style={styles.text1}>
              Subject / Course Applied for:{" "}
              <Text style={styles.inputStyle}>
                {formData.dataprotection.CourseAppliedfor}
              </Text>
            </Text>
          </View>
          {/* Equal Opportunities  */}
          <View>
            <EqualOpportunitiesPolicy />
            {/* Form  */}
            <View>
              <Text style={styles.text1}>
                Candidate Name:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.candidateName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Candidate Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.candidateSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Course Details:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.courseDetails}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Employer:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.employer}
                </Text>
              </Text>
              <Text style={styles.text1}>
                LDA Name:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.ldaName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                LDA Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.ldaSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                I confirm that I have read and understood the above policy:{" "}
                <Text style={styles.inputStyle}>
                  {formData.equalopportunities.altConfirm ? "Yes" : "No"}
                </Text>
              </Text>
            </View>
          </View>
          {/* Health and Safety Policy */}
          <View>
            <HealthSafetyPolicy />
            {/* Form  */}
            <View>
              <Text style={styles.text1}>
                Candidate Name:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.candidateName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Candidate Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.candidateSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Course Details:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.courseDetails}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Employer:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.employer}
                </Text>
              </Text>
              <Text style={styles.text1}>
                LDA Name:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.ldaName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                LDA Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.ldaSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                I confirm that I have read and understood the above policy:{" "}
                <Text style={styles.inputStyle}>
                  {formData.healthandsafetypolicy.agreement ? "Yes" : "No"}
                </Text>
              </Text>
            </View>
          </View>
          {/* Guidance Policy  */}
          <View>
            <GuidancePolicy />
            {/* Form  */}
            <View>
              <Text style={styles.text1}>
                Candidate Name:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.candidateName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Candidate Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.candidateSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Employer:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.employer}
                </Text>
              </Text>
              <Text style={styles.text1}>
                LDA Name:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.ldaName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                LDA Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.ldaSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Eden College Allocated LDA:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.eldaName}
                </Text>
              </Text>
              <Text style={styles.text1}>
                Eden College Allocated LDA Signature:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.eldaSignature}
                </Text>
              </Text>
              <Text style={styles.text1}>
                I confirm that I have read and understood the above policy:{" "}
                <Text style={styles.inputStyle}>
                  {formData.guidancepolicy.agreement ? "Yes" : "No"}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FormPDFDocument;
