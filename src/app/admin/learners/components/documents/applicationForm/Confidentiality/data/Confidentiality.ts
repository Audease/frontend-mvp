import { z } from "zod";

export const confidentialityData = {
  id: 4,
  title: "Confidentiality and Privacy Agreement",
  paragraphs: [
    {
      id: 1,
      p: "The data you provide on your application form and the information in your assignments will be treated confidentially, and we will comply with the requirements of the 1998 Data Protection Act as well as the new GDPR regulations to ensure your data is securely kept with Eden College. This means that you have the right to see the data and information that is being kept about you if you want to.",
    },
    {
      id: 2,
      p: "You also have the right to say whether this or other information about you is shared with other organisations. We will be able to help you more effectively if we are able to share information with e.g. Schools, Colleges, other Eden College trainers and assessors, training organisations and employers. If you are unhappy about this, please let us know now or at any time in the future.",
    },
    {
      id: 2,
      p: "I am aware that – Eden College will create and maintain computer and paper records on me, both during my course and after I complete the course. These records will be processed in compliance with the Data Protection Act 1998.",
    },
    {
      id: 3,
      p: "I consent that the information in the records may be used for reports, both internally within the training centre and to external bodies working with the centre in candidate administration.I agree that basic information can be shared with other organisations if necessary and in my interest. I understand that sensitive information will be treated separately.",
    },
  ],
  formFields: [
    {
      type: "text",
      id: "candidateName",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Name",
      placeholder: "Candidate Name",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Candidate Name must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "employer",
      section: "learner",
      editableBy: ["learner"],
      label: "Employer",
      placeholder: "Employer",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Employer must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "courseDetails",
      section: "learner",
      editableBy: ["learner"],
      label: "Course/Project Details",
      placeholder: "Course/Project Details",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Course details must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "candidateSignature",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Candidate Signature must be at least 2 characters.",
      }),
    },
    {
      type: "date",
      id: "candidateSignatureDate",
      section: "learner",
      editableBy: ["learner"],
      label: "Date",
      placeholder: "YYYY-MM-DD",
      validation: z
      .string()
      .refine((value) =>  /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "Date must be in the format YYYY-MM-DD",
      }),
    },
    {
      type: "text",
      id: "ldaName",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Name",
      placeholder: "Eden College Allocated LDA",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA name must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "eldaName",
      section: "admin",
      editableBy: ["accessor"],
      label: "Eden College Allocated LDA",
      placeholder: "Eden College Allocated LDA",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "Eden College Allocated LDA name must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "ldaSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      type: "date",
      id: "ldaSignatureDate",
      section: "admin",
      editableBy: ["accessor"],
      label: "Date",
      placeholder: "YYYY-MM-DD",
      validation: z
      .string().optional()
      .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "Date must be in the format YYYY-MM-DD",
      }),
    },
  ],
};
