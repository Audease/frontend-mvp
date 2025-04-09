import { z } from "zod";

export const candidateRecordData = {
  id: 4,
  title: "Candidate Registration and Certification Record",
  formFields: [
    {
      type: "text",
      id: "candidateName",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Name (in BLOCK CAPITALS)",
      placeholder: "Candidate Name",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Candidate Name must be at least 2 characters.",
      }),
    },
    {
      type: "select",
      id: "gender",
      section: "learner",
      editableBy: ["learner"],
      label: "Gender",
      placeholder: "Gender",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Select Gender",
      }),
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
        { value: "prefer_not_to_say", label: "Prefer not to say" },
      ],
    },
    {
      type: "text",
      id: "company",
      section: "learner",
      editableBy: ["learner", "accessor"],
      label: "Company",
      placeholder: "Company",
      validation: z.string().optional()
    },
    {
      type: "date",
      id: "dateOfBirth",
      section: "learner",
      editableBy: ["learner"],
      label: "Date of Birth",
      placeholder: "YYYY-MM-DD",
      validation: z.string().date(),
    },
    {
      type: "text",
      id: "programmeTitle",
      section: "learner",
      editableBy: ["learner", "accessor"],
      label: "Programme Title",
      placeholder: "Programme Title",
      validation: z.string().optional()
    },
    {
      type: "number",
      id: "level",
      section: "learner",
      editableBy: ["learner", "accessor"],
      label: "Level",
      placeholder: "Level",
      validation: z.number().optional(),
      min: 0,
      max: 10,
    },
    {
      type: "checkbox",
      id: "nameOnCertificate",
      section: "learner",
      editableBy: ["learner"],
      label: "Do you wish the above name to appear on your certificate?",
      validation: z.boolean().optional(),
    },
    {
      type: "text",
      id: "alternativeName",
      section: "learner",
      editableBy: ["learner"],
      label: "If no, please specify (in BLOCK CAPITALS)",
      placeholder: "Alternative Name",
      validation: z.string().optional(),
    },
    {
      type: "signature",
      id: "candidateSignature",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Type in your signature",
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
        .optional()
    },
    {
      type: "text",
      id: "learningOfficer",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Assessment Data Officer",
      placeholder: "Officer Name",
      validation: z
        .string()
        .refine((value) => !value || value.trim().length >= 2, {
          message: "Officer Name must be at least 2 characters.",
        }),
    },
    {
      type: "date",
      id: "learningOfficerDate",
      section: "admin",
      editableBy: ["accessor"],
      label: "Date",
      placeholder: "YYYY-MM-DD",
      validation: z
        .string()
        .optional()
        .optional(),
    },
  ],
};
