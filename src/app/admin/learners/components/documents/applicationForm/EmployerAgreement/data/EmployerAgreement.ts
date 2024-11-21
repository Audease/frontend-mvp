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
      section: "learner",
      editableBy: ["learner"],
      label:
        "I agree to the following in respect of the learner on NVQ/QCF programme",
      options: ["Yes", "No"],
      validation: z.boolean().refine((value) => value === true, {
        message: "Check box to agree",
      }),
    },
    {
      type: "text",
      id: "employerLearnerName",
      section: "learner",
      editableBy: ["learner"],
      label: "Learner Name",
      placeholder: "Learner Name",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Learner name must be at least 2 characters.",
      }),
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
      section: "learner",
      editableBy: ["learner"],
      label: "Learner signature:",
      placeholder: "Learner signature",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "learnerName",
      section: "learner",
      editableBy: ["learner"],
      label: "Learner Name",
      placeholder: "Learner Name",
      validation: z.string().refine((value) =>  value.trim().length >= 2, {
        message: "Name must be at least 2 characters.",
      }),
    },
    {
      type: "date",
      id: "learnerDate",
      section: "learner",
      editableBy: ["learner"],
      label: "Date",
      placeholder: "Enter Date",
      validation: z.string().date(),
    },
    {
      type: "text",
      id: "edenCollegeSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: "Eden College signature",
      placeholder: "Eden College signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      type: "date",
      id: "learningandAssessmentCoordinatorDate",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Assessment Coordinator Date",
      placeholder: "Learning and Assessment Coordinator Date",
      validation: z.string().optional(),
    },
    {
      type: "text",
      id: "edenCollegeName",
      section: "admin",
      editableBy: ["accessor"],
      label: "Name",
      placeholder: "Name",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "Name must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "employerSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: "Employer Signature",
      placeholder: "Employer Signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      type: "date",
      id: "employerSignatureDate",
      section: "admin",
      editableBy: ["accessor"],
      label: "Employer Signature Date",
      placeholder: "Employer Signature Date",
      validation: z.string().optional(),
    },
  ],
};
