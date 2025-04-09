import { z } from "zod";

export const equalOpportunitiesData = {
  id: 1,
  title: "Eden College Equal Opportunities Policy",
  statement: [
    {
      id: 1,
      text: "Eden College is committed to taking positive action to fight unlawful discrimination in every respect of its work.",
    },
    {
      id: 2,
      text: "Eden College is an equal opportunities employer and provider of Education Training and Employment. The aim of its equal opportunities policy is to ensure that no job applicant, learner or employee receives less favourable treatment on the grounds of race, colour, ethnic or national origin, religion, gender, sexual orientation, marital status, HIV antibody status, AIDS or disability, and age or should they be disadvantaged by requirement. Eden College will strive to redress any in balance that may become evident.",
    },
    {
      id: 3,
      text: "Eden College will endeavour to establish a broad base for consultation from learners to identify priorities and needs as reflected by the black and minority ethnic population at large, and in all campaign, work will maintain the objectives stated above.",
    },
    {
      id: 4,
      text: "The senior management team shall review the content and effectiveness of the policy whenevera new staff appointment is to be made, and at other times as may be necessary. The Director is responsible for the policy's day to day implementation.",
    },
    {
      id: 5,
      text: "Eden College will monitor and review the composition of its senior management team with the aim of promoting a broad-based representation.",
    },
  ],
  procedures: [
    {
      id: 1,
      text: "Employment procedures and practices will be undertaken strictly in accordance with the following and all other relevant legislation:",
      list: [
        {
          id: 1,
          text: "Race Relations Act 1976",
        },
        {
          id: 2,
          text: "Sex Discrimination Acts 1975-85",
        },
        {
          id: 3,
          text: "Equal Pay Act 1970",
        },
        {
          id: 4,
          text: "Disability Discrimination Act 1995",
        },
        {
          id: 5,
          text: "Rehabilitation of Offenders Act 1974",
        },
        {
          id: 6,
          text: "Equality Act 2010",
        },
      ],
    },
    {
      id: 2,
      text: "Eden College is committed to ensuring equality of access to all its services for learners. The management takes action to provide genuine equality of opportunity to counter past discrimination and to monitor the outcome. The senior management team will aim toensure that no sector of the community shall be denied access or receive a poor service on the grounds of age, race, gender, disability, being a lesbian or gay man, marital status, ethnicity or religious belief.The senior management team will aim to ensure that all its services will be provided in line with this anti-discrimination policy. In order to promote equality of access the executive will aim to ensure the following:",
      list: [
        {
          id: 1,
          text: "That services are based on consultation with those who receive the services being learners and positive steps are taken to include excluded groups in decision making.",
        },
        {
          id: 2,
          text: "That all services are flexible and responsive to the changing needs in the community.",
        },
        {
          id: 3,
          text: "That information on services is widely available and where necessary targeted to ensure maximum awareness of provisions.",
        },
        {
          id: 4,
          text: "That systems are developed to audit and monitor service delivery and consumer satisfaction. ",
        },
      ],
    },
  ],

  formFields: [
    {
      type: "checkbox",
      id: "agreement",
      section: "learner",
      editableBy: ["learner"],
      label: "I confirm that I have read and understood the above policy.",
      validation: z.boolean().refine((value) => value === true, {
        message: "You must check this box to continue.",
      }),
    },
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
      editableBy: ["learner", "accessor"],
      label: "Employer",
      placeholder: "Employer",
      validation: z.string().optional()
    },
    {
      type: "text",
      id: "courseDetails",
      section: "learner",
      editableBy: ["learner", "accessor"],
      label: "Course/Project Details",
      placeholder: "Course/Project Details",
      validation: z.string().optional()
    },
    {
      type: "signature",
      id: "candidateSignature",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "ldaName",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Name",
      placeholder: "LDA Name",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA Name must be at least 2 characters.",
      }),
    },
    {
      type: "signature",
      id: "ldaSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA signature must be at least 2 characters.",
      }),
    },
  ],
};
