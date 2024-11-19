import { z } from "zod";

export const employerAgreeemnt = {
  id: 13,
  title:
    "Learning Contract / Agreement Between Eden College, Learner and Employer",
  subTitle: "Employer:",
  fields: [
    {
      type: "checkbox",
      id: "employerLearnerAgreement",
      label:
        "I agree to the following in respect of the learner on NVQ/QCF programme",
      options: ["Yes", "No"],
      validation: z.boolean(),
    },
    {
      type: "text",
      id: "employerLearnerName",
      label: "Learner Name",
      placeholder: "Learner Name",
      validation: z.string().min(1).max(50).optional(),
    },
  ],
  agreement: {
    p: "In relation to the above learner I agree to ensure that:",
    points: [
      "Sufficient time is allocated for the learner to demonstrate competence to the Learning and Development Adviser at the work place and where necessary some time to carry out any additional work needed.",
      "Support learner and provide opportunities for them to demonstrate competence against the full award requirements.",
      "Appropriate training is accessed/provided if paid for where further training needs are identified, such as basic skills.",
      "Appropriate arrangements are made to enable the candidate to complete training and assessment, and take action when learner fails to attend classes or submit work regularly for assessment.",
      "Any changes to the candidate’s job role or working conditions which may impact upon the achievement of the award will be communicated to Eden College as soon as reasonable practicable but not later than a week after the change occurs.",
      "Any contributions from work colleagues, managers, supervisors and witnesses are provided, for Learning, development and assessment purposes are signed and dated.",
      "Contribute as appropriate to the evaluation of Learning, Development and Assessment processes.",
    ],
  },
  formFields: [
    {
      type: "text",
      id: "learnerSignature",
      label: "Learner signature:",
      placeholder: "Learner signature",
      validation: z.string().optional(),
    },
    {
      type: "text",
      id: "learnerName",
      label: "Learner Name",
      placeholder: "Learner Name",
      validation: z.string().optional(),
    },
    {
      type: "date",
      id: "learnerDate",
      label: "Date",
      placeholder: "Enter Date",
      validation: z.string().date(),
    },
    {
      type: "text",
      id: "edenCollegeSignature",
      label: "Eden College signature",
      placeholder: "Eden College signature",
      validation: z.string().optional(),
    },
    {
      type: "date",
      id: "learningandAssessmentCoordinatorDate",
      label: "Learning and Assessment Coordinator Date",
      placeholder: "Learning and Assessment Coordinator Date",
      validation: z.string().date(),
    },
    {
      type: "text",
      id: "edenCollegeName",
      label: "Name",
      placeholder: "Name",
      validation: z.string().optional(),
    },
    {
      type: "text",
      id: "employerSignature",
      label: "Employer Signature",
      placeholder: "Employer Signature",
      validation: z.string().optional(),
    },
    {
      type: "date",
      id: "employerSignatureDate",
      label: "Employer Signature Date",
      placeholder: "Employer Signature Date",
      validation: z.string().date(),
    },
  ],
};
