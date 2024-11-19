import { z } from "zod";

export const privacyNotice =  {
    id: 11,
    title: "ESFA Privacy Notice 2024 to 2025",
    subtitle: "How We Use Your Personal Information",
    description: [
      {
        id: 1,
        paragraph:
          "This privacy notice is issued by the Education and Skills Funding Agency (ESFA), on behalf of the Secretary of State for the Department of Education (DfE). It is to inform learners how their personal information will be used by the DfE, the ESFA (an executive agency of the DfE) and any successor bodies to these organisations.",
      },
      {
        id: 2,
        paragraph:
          "For the purposes of relevant data protection legislation, the DfE is the data controller for personal data processed by the ESFA. Your personal information is used by the DfE to exercise its functions and to meet its statutory responsibilities, including under the Apprenticeships, Skills, Children and Learning Act 2009 and to create and maintain a unique learner number (ULN) and a personal learning record (PLR). Your information will be securely destroyed after it is no longer required for these purposes.",
      },
      {
        id: 3,
        paragraph:
          "Your information may be used for education, training, employment and well-being related purposes, including for research. The DfE and the English European Social Fund (ESF) Managing Authority (or gents acting on their behalf) may contact you in order for them to carry out research and evaluation to inform the effectiveness of training.",
      },
      {
        id: 4,
        paragraph:
          "Your information may also be shared with other third parties for the above purposes, but only where the law allows it and the sharing is in compliance with data protection legislation.",
      },
    ],
    section: [
      {
        id: 1,
        title: "",
        p: "You can agree to be contacted by other third parties by ticking any of the following ",
        fields: [
          {
            type: "checkbox",
            id: "aboutCourses",
            label: "About courses or learning opportunities.",
            options: ["Yes", "No"],
            validation: z.boolean(),
          },
          {
            type: "checkbox",
            id: "forSurveys",
            label: "For surveys and research.",
            options: ["Yes", "No"],
            validation: z.boolean(),
          },
          {
            type: "checkbox",
            id: "byPost",
            label: "By Post",
            options: ["Yes", "No"],
            validation: z.boolean(),
          },
          {
            type: "checkbox",
            id: "byPhone",
            label: "By Phone",
            options: ["Yes", "No"],
            validation: z.boolean(),
          },
          {
            type: "checkbox",
            id: "byEmail",
            label: "By E-Mail",
            options: ["Yes", "No"],
            validation: z.boolean(),
          },
        ],
      },
      {
        id: 2,
        title: "",
        p: "Further information about use of and access to your personal data, details of organisations with whom we regularly share data, information about how long we retain your data, and how to change your consent to being contacted, please visit:",
        fields: [{ validation: z.string().max(50) }],
      },
      {
        id: 3,
        title: "",
        p: "https://www.gov.uk/government/publications/esfa-privacy-notice",
        fields: [{ validation: z.string().max(50) }],
      },
      {
        id: 4,
        title: "Learner Declaration",
        p: "I confirm that I have been provided with a copy of the Privacy Notices in relation to my enrolment and I agree to share this information with relevant bodies.",
        fields: [
          {
            type: "text",
            id: "declarationName",
            label: "Name",
            placeholder: "Name",
            validation: z.string().optional(),
          },
          {
            type: "text",
            id: "declarationSign",
            label: "Signature",
            placeholder: "Sign",
            validation: z.string().optional(),
          },
        ],
      },
    ],
  }