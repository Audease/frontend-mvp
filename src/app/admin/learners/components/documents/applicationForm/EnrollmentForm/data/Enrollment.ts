import { z } from "zod";

export const enrolmentData = {
  id: 1,
  title: "LEARNER ENROLMENT & DATA CAPTURE FORM 2024/2025",
  fields: [
    {
      type: "text",
      id: "topsid",
      section: "learner",
      editableBy: ["learner"],
      label: "TOPSID",
      placeholder: "Enter TOPSID",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "TOPSID must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "uln",
      section: "learner",
      editableBy: ["learner"],
      label: "ULN",
      placeholder: "Enter ULN",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "ULN must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "learnerReference",
      section: "learner",
      editableBy: ["learner"],
      label: "Learner Reference",
      placeholder: "Enter Learner Reference",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Learner reference must be at least 2 characters.",
      }),
    },
    {
      type: "multiselect",
      id: "preferredLanguages",
      label: "Preferred Languages",
      options: [
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "csharp", label: "C#" },
      ],
      validation: z
        .array(z.string())
        .min(1, { message: "Please select at least one option" }),
      disabled: false,
    },
  ],
  section: [
    {
      id: 1,
      title:
        "SECTION 01: Personal Information (Fill all details using BLOCK CAPITAL letters only)",
      p: "",
      fields: [
        {
          type: "text",
          id: "title",
          section: "learner",
          editableBy: ["learner"],
          label: "Title (Mr./Mrs./Miss. etc.)",
          placeholder: "Enter Title",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Title must be at least 2 characters.",
          }),
        },
        {
          type: "date",
          id: "dateOfBirth",
          section: "learner",
          editableBy: ["learner"],
          label: "Date of Birth",
          placeholder: "Enter Date of Birth",
          validation: z.string().date(),
        },
        {
          type: "text",
          id: "firstName",
          section: "learner",
          editableBy: ["learner"],
          label: "First Name",
          placeholder: "Enter First Name",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "First name must be at least 2 characters.",
          }),
        },
        {
          type: "text",
          id: "surname",
          section: "learner",
          editableBy: ["learner"],
          label: "Surname",
          placeholder: "Enter Surname",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Surname must be at least 2 characters.",
          }),
        },
        {
          type: "number",
          id: "ageOnAug312024",
          section: "learner",
          editableBy: ["learner"],
          label: "Age on 31 August 2024",
          placeholder: "Enter Age",
          validation: z.number().refine((value) => value >= 2, {
            message: "Must be a valid number",
          }),
          min: 0,
          max: 100,
        },
        {
          type: "tel",
          id: "nationalInsuranceNumber",
          section: "learner",
          editableBy: ["learner"],
          label: "National Insurance Number",
          placeholder: "Enter National Insurance Number",
          validation: z.string().regex(/^[A-Z]{2}\d{6}[A-D]$/, {
            message:
              "Must be a valid National Insurance Number (e.g., AB123456C)",
          }),
        },
        {
          type: "radio",
          id: "gender",
          section: "learner",
          editableBy: ["learner"],
          label: "Gender",
          options: [
            { label: "Female", value: "Female" },
            { label: "Male", value: "Male" },
          ],
          validation: z.enum(["Female", "Male"], {
            errorMap: () => ({ message: "Please select a valid gender" }),
          }),
        },
        {
          type: "text",
          id: "address",
          section: "learner",
          editableBy: ["learner"],
          label: "Address",
          placeholder: "Enter Address",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Address must be at least 2 characters.",
          }),
        },
        {
          type: "text",
          id: "postcode",
          section: "learner",
          editableBy: ["learner"],
          label: "Postcode",
          placeholder: "Enter Postcode",
          validation: z
            .string()
            .min(5, { message: "Postcode must be at least 5 characters" })
            .max(10, { message: "Postcode cannot exceed 10 characters" })
            .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, {
              message: "Please enter a valid UK postcode",
            }),
        },
        {
          type: "tel",
          id: "homePhone",
          section: "learner",
          editableBy: ["learner"],
          label: "Home Phone",
          placeholder: "Enter Home Phone",
          validation: z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits" })
            .max(15, { message: "Phone number cannot exceed 15 digits" })
            .regex(/^[+]?[\d\s-]+$/, {
              message: "Please enter a valid phone number",
            }),
        },
        {
          type: "tel",
          id: "mobile",
          section: "learner",
          editableBy: ["learner"],
          label: "Mobile",
          placeholder: "Enter Mobile",
          validation: z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits" })
            .max(15, { message: "Phone number cannot exceed 15 digits" })
            .regex(/^[+]?[\d\s-]+$/, {
              message: "Please enter a valid phone number",
            }),
        },
        {
          type: "email",
          id: "emailAddress",
          section: "learner",
          editableBy: ["learner"],
          label: "E-Mail Address",
          placeholder: "Enter Email",
          validation: z
            .string()
            .email({ message: "Please enter a valid email address" })
            .max(254, {
              message: "Email address cannot exceed 254 characters",
            }),
        },
      ],
    },
    {
      id: 2,
      title:
        "Emergency Contact Details (Please provide details of someone we can contact in case of an emergency)",
      p: "",
      fields: [
        {
          type: "text",
          id: "emergencyContactName",
          section: "learner",
          editableBy: ["learner"],
          label: "Emergency Contact Name",
          placeholder: "Enter Emergency Contact Name",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Contact name must be at least 2 characters.",
          }),
        },
        {
          type: "text",
          id: "relationshipToContact",
          section: "learner",
          editableBy: ["learner"],
          label: "Relationship to Contact",
          placeholder: "Enter Relationship",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Must be at least 2 characters.",
          }),
        },
        {
          type: "tel",
          id: "emergencyContactMobile",
          section: "learner",
          editableBy: ["learner"],
          label: "Emergency Contact Mobile Number",
          placeholder: "Enter Emergency Contact Mobile",
          validation: z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits" })
            .max(15, { message: "Phone number cannot exceed 15 digits" })
            .regex(/^[+]?[\d\s-]+$/, {
              message: "Please enter a valid phone number",
            }),
        },
        {
          type: "email",
          id: "emergencyContactEmail",
          section: "learner",
          editableBy: ["learner"],
          label: "Emergency Contact Email Address",
          placeholder: "Enter Emergency Contact Email",
          validation: z
            .string()
            .email({ message: "Please enter a valid email address" })
            .max(254, {
              message: "Email address cannot exceed 254 characters",
            }),
        },
        {
          type: "text",
          id: "emergencyContactAddress",
          section: "learner",
          editableBy: ["learner"],
          label: "Emergency Contact Address",
          placeholder: "Enter Emergency Contact Address",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Must be at least 2 characters.",
          }),
        },
      ],
    },
    {
      id: 3,
      title: "SECTION 02 : Equal Opportunities Monitoring",
      p: "",
      fields: [{ validation: z.string().max(50) }],
    },
    {
      id: 4,
      title:
        "2.1 Ethnicity (Tick (√) the box that best describes your ethnic group)",
      p: "",
      fields: [
        {
          type: "radio",
          id: "ethnicity",
          label: "Ethnicity",
          section: "learner",
          editableBy: ["learner"],
          options: [
            { label: "British", value: "british" },
            {
              label: "English/Welsh/Scottish/Northern Irish/British",
              value: "english_welsh_scottish_northern_irish_british",
            },
            { label: "Irish", value: "irish" },
            {
              label: "Gypsy or Irish traveler",
              value: "gypsy_or_irish_traveler",
            },
            {
              label: "Any other White background",
              value: "any_other_white_background",
            },
            {
              label: "Mixed/Multiple ethnic group",
              value: "mixed_multiple_ethnic_group",
            },
            {
              label: "White and Black Caribbean",
              value: "white_and_black_caribbean",
            },
            {
              label: "White and Black African",
              value: "white_and_black_african",
            },
            { label: "White and Asian", value: "white_and_asian" },
            {
              label: "Any other Mixed multiple ethnic background",
              value: "any_other_mixed_multiple_ethnic_background",
            },
            {
              label: "Black/African/Caribbean/Black British",
              value: "black_african_caribbean_black_british",
            },
            { label: "Asian/Asian British", value: "asian_asian_british" },
            { label: "African", value: "african" },
            { label: "Indian", value: "indian" },
            { label: "Caribbean", value: "caribbean" },
            { label: "Pakistani", value: "pakistani" },
            {
              label: "Any other Black African Caribbean background",
              value: "any_other_black_african_caribbean_background",
            },
            { label: "Bangladeshi", value: "bangladeshi" },
            { label: "Chinese", value: "chinese" },
            { label: "Arabian", value: "arabian" },
            {
              label: "Any other Asian background",
              value: "any_other_asian_background",
            },
            { label: "Other ethnic group", value: "other_ethnic_group" },
            { label: "Prefer not to say", value: "prefer_not_to_say" },
          ],
          validation: z.string(),
        },
      ],
    },
    {
      id: 5,
      title: "2.2 Religion (Tick (√) where applicable)",
      p: "",
      fields: [
        {
          type: "radio",
          id: "religion",
          section: "learner",
          editableBy: ["learner"],
          label: "Religion",
          options: [
            { label: "Christian", value: "christian" },
            { label: "Islam", value: "islam" },
            { label: "Sikh", value: "sikh" },
            { label: "Jewish", value: "jewish" },
            { label: "Hindu", value: "hindu" },
            { label: "Non-Religious", value: "non_religious" },
            {
              label: "Other: Please Specify",
              value: "other_please_specify",
            },
            { label: "Prefer not to say", value: "prefer_not_to_say" },
          ],
          validation: z.string(),
        },
      ],
    },
    {
      id: 6,
      title: "2.3 Please state what is your first language",
      p: "",
      fields: [
        {
          type: "text",
          id: "firstLanguage",
          section: "learner",
          editableBy: ["learner"],
          label: "First Language",
          placeholder: "Enter First Language",
          validation: z.string().refine((value) => value.trim().length >= 2, {
            message: "Must be at least 2 characters.",
          }),
        },
      ],
    },
    {
      id: 7,
      title: "2.4 Sexual Orientation (Tick (√) where applicable)",
      p: "",
      fields: [
        {
          type: "radio",
          id: "sexualOrientation",
          section: "learner",
          editableBy: ["learner"],
          label: "Sexual Orientation",
          options: [
            {
              label: "Heterosexual / Straight",
              value: "heterosexual_straight",
            },
            { label: "Bisexual", value: "bisexual" },
            { label: "Gay Man", value: "gay_man" },
            { label: "Gay woman / Lesbian", value: "gay_woman_lesbian" },
            { label: "Other", value: "other" },
            { label: "Prefer not to say", value: "prefer_not_to_say" },
          ],
          validation: z.string(),
        },
      ],
    },
    {
      id: 8,
      title: "2.5 Learning Support (Tick (√) where applicable)",
      p: "This section helps us to provide the additional support you need to succeed on your course and access the available facilities.",
      fields: [
        {
          type: "checkbox",
          id: "additionalSupportNeeds",
          section: "learner",
          editableBy: ["learner"],
          label: "Do you have any additional support needs?",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 9,
      title:
        "2.6 Learning Difficulties / Disabilities(LLDD) (Tick (√) where applicable)",
      p: "",
      fields: [
        {
          type: "multiselect",
          id: "learningDisability",
          label: "Do you consider yourself to a disability, learning difficulty or health problem?",
          options: [
            { value: "visual_impairment", label: "Visual impairment" },
            { value: "hearing_impairment", label: "Hearing impairment" },
            {
              value: "mobility_disability",
              label: "Disability affecting mobility",
            },
            {
              value: "profound_complex_disability",
              label: "Profound complex disability",
            },
            {
              value: "social_emotional_difficulties",
              label: "Social and emotional difficulties",
            },
            {
              value: "mental_health_difficulty",
              label: "Mental health difficulty",
            },
            {
              value: "other_medical_condition",
              label:
                "Other medical condition (e.g. epilepsy, asthma, diabetes)",
            },
            {
              value: "moderate_learning_difficulty",
              label: "Moderate learning difficulty",
            },
            {
              value: "severe_learning_difficulty",
              label: "Severe learning difficulty",
            },
            { value: "dyslexia", label: "Dyslexia" },
            { value: "dyscalculia", label: "Dyscalculia" },
            {
              value: "autism_spectrum_disorder",
              label: "Autism Spectrum disorder",
            },
            { value: "aspergers_syndrome", label: "Asperger’s Syndrome" },
            { value: "other_disability", label: "Other disability" },
            { value: "prefer_not_to_say", label: "Prefer not to say" },
          ],
          validation: z
            .array(z.string())
            .min(1, { message: "Please select at least one option" }),
          disabled: false,
        },
        {
          type: "text",
          id: "primaryHealthProblem",
          label:
            "Please tell us which of these you consider to be your primary health problem:",
          placeholder: "Specify Primary Health Problem",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 10,
      title: "",
      p: "",
      fields: [
        {
          type: "multiselect",
          id: "preferredLearningSupport",
          label: "Would you find learning easier with the following support? Please tick if appropriate.",
          options: [
            {
              value: "reading_writing_support",
              label: "Reading and writing support",
            },
            { value: "maths_support", label: "Math’s support" },
            {
              value: "english_language_support",
              label: "English language support",
            },
            { value: "equipment_support", label: "Equipment support" },
            {
              value: "other_specialist_support",
              label: "Other specialist support",
            },
          ],
          validation: z
            .array(z.string())
            .min(1, { message: "Please select at least one option" }),
          disabled: false,
        },
      ],
    },
    {
      id: 11,
      title: "SECTION 03: Employment Details",
      p: "",
      fields: [],
    },
    {
      id: 12,
      title:
        "3.1 – Employment Status (Please tick (√) boxes that apply to you)",
      p: "",
      fields: [],
    },
    {
      id: 13,
      title: "",
      p: "",
      fields: [
        {
          type: "radio",
          id: "employmentStatus",
          label: "Employed",
          options: [
            {
              label: "In paid employment 0 to 10 hours per week",
              value: "in_paid_employment_0_to_10_hours",
            },
            {
              label: "In paid employment 11 to 20 hours per week",
              value: "in_paid_employment_11_to_20_hours",
            },
            {
              label: "In paid employment 21 to 30 hours per week",
              value: "in_paid_employment_21_to_30_hours",
            },
            {
              label: "In paid employment 31+ hours per week",
              value: "in_paid_employment_31_plus_hours",
            },
          ],
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 14,
      title: "",
      p: "",
      fields: [
        {
          type: "radio",
          id: "employmentduration",
          label: "How long have you been employed",
          options: [
            { label: "Up to 3 months", value: "up_to_3_months" },
            { label: "4 – 6 months", value: "4_to_6_months" },
            { label: "7 - 12 months", value: "7_to_12_months" },
            { label: "More than 12 months", value: "more_than_12_months" },
          ],
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 14,
      title: "",
      p: "",
      fields: [
        {
          type: "radio",
          id: "selfEmployed",
          label: "Are you self-employed",
          options: [
            { label: "yes", value: "yes" },
            { label: "no", value: "no" },
          ],
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "workingDuration",
          label: "How long have you been self-employed in	month(s)/year(s)",
          placeholder: "How long have you been self-employed",
          validation: z.string().max(50),
        },
      ],
    },
    {
      id: 15,
      title: "",
      p: "",
      fields: [
        {
          type: "radio",
          id: "employmentStatus",
          label: "Employed",
          options: [
            {
              label: "In self-employment 0 to 10 hours per week",
              value: "in_self_employment_0_to_10_hours_per_week",
            },
            {
              label: "In self employment 11 to 20 hours per week",
              value: "in_self_employment_11_to_20_hours",
            },
            {
              label: "In self employment 21 to 30 hours per week",
              value: "in_self_employment_21_to_30_hours",
            },
            {
              label: "In self employment 31+ hours per week",
              value: "in_self_employment_31_plus_hours",
            },
          ],
          validation: z.string().optional(),
        },
        {
          type: "radio",
          id: "economicallyInactive",
          label:
            "Economically Inactive (Not in paid employment, not looking and/or available to start work)",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          validation: z.string().optional(),
        },
        {
          type: "radio",
          id: "unemployed",
          label: "Unemployed",
          options: [
            {
              label:
                "Not in paid employment, looking and available to start work",
              value: "Yes",
            },
            {
              label:
                "Not in paid employment, not looking and/or available to start work",
              value: "No",
            },
          ],
          validation: z.string().optional(),
        },
        {
          type: "radio",
          id: "unemployedDuration",
          label: "How long have you been unemployed",
          options: [
            { label: "Less than 6 months", value: "Less than 6 months" },
            { label: "6 – 11months", value: "6 – 11months" },
            { label: "12–23 months", value: "12–23 months" },
            { label: "24–35 months", value: "24–35 months" },
            { label: "36+ months", value: "36+ months" },
          ],
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 16,
      title: "3.2 – Employer Role",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "emloyerRole",
          label: "Have you been asked by an employer to attend a course?",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 17,
      title: "3.3 – Employer responsive courses only",
      p: "PLEASE COMPLETE IF YOUR EMPLOYER IS PAYING FOR COURSE FEES",
      fields: [
        {
          type: "text",
          id: "companyName",
          label: "Company/Organization Name",
          placeholder: "Enter Company/Organization Name",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "companyAddress",
          label: "Company/Organization Name",
          placeholder: "Enter Company/Organization Address",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "companyPostCode",
          label: "Post  Code",
          placeholder: "Enter Company Post Code",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "companyContactName",
          label: "Contact Name",
          placeholder: "Enter Company Contact Name",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "companyContactNumber",
          label: "Contact Number",
          placeholder: "Enter Company Contact Number",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 18,
      title: "3.4 – Benefit Receipt (please tick (√) where applicable)",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "benefitReceipt",
          label: "Are you registered with your local Job Centre Plus Office?",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "text",
          id: "jcpOffice",
          label: "If yes, please state your JCP office:",
          placeholder: "State your JCP office:",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 19,
      title:
        "3.5 – Benefit status (if you receive any of the income-based benefits below please tick (√) the relevant box)",
      p: "Job Seekers Allowance",
      fields: [
        {
          type: "checkbox",
          id: "universalCredit",
          label:
            "Universal Credit, and earn either less than 16 times the appropriate age-related rate of the national",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "minimumWage",
          label:
            "Minimum wage / national living wage a week, or £338 a month (individual claims) or£541 a month (household claims)",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 20,
      title: "",
      p: "Working Tax Credits",
      fields: [
        {
          type: "checkbox",
          id: "incomeSupport",
          label:
            "Income Support, and earn either less than 16 times the appropriate age-related rate of the national minimum wage/ national living wage a week, or £338 a month (individual claims) or £541 a month (household claims)",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 21,
      title: "",
      p: "Employment and Support Allowance (ESA)",
      fields: [
        {
          type: "checkbox",
          id: "housingBenefit",
          label: "Housing Benefit",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "pensionCredit",
          label: "Pension Credit",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "nationalInsurance",
          label: "National Insurance Contributions",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "employedEarning",
          label:
            "Are you employed and earning less than £20,572.00 annual gross salary",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "noBenefits",
          label: "No Benefits",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 22,
      title: "3.6 Current Situation (please tick (√) where applicable)",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "loneParent",
          label: "I am a lone parent",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "careLeaver",
          label: "I am a care leaver",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "exOffender",
          label: "I am an ex- offender",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "homelessPerson",
          label: "I am a Homeless Person",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "otherCollegeTraining",
          label:
            "Are you currently attending any other college or training provider",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "text",
          id: "proveDetails",
          label: "If yes, please provide details:",
          placeholder: "Prove details",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 23,
      title:
        "SECTION 04: Household Situation (please tick(√) which of the following apply to you)",
      p: "",
      fields: [
        {
          type: "radio",
          id: "householdSituation",
          label: "Household Situation",
          options: [
            {
              label:
                "No household member is in employment (with dependent children)",
              value: "no_employment_with_children",
            },
            {
              label:
                "No household member is in employment (no dependent children)",
              value: "no_employment_no_children",
            },
            {
              label: "Single adult household with dependent children",
              value: "single_adult_with_children",
            },
            { label: "None of the above", value: "none_of_the_above" },
            { label: "Prefer not to say", value: "prefer_not_to_say" },
          ],
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 24,
      title: "SECTION 05: Prior Attainment Level",
      p: "This section will help us determine whether your programme will be fully/co-funded by the GLA (Please tick the box(es) that apply to you)",
      fields: [
        {
          type: "checkbox",
          id: "formalQualifications",
          label: "I do not hold any formal qualifications",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "ESOL",
          label: "I hold ESOL, Literacy or Numeracy at Entry 1, 2 or 3",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "GCSE",
          label:
            "I hold a General Certificate of Secondary Education(GCSE) at grades D-G or fewerthan 5 at grades A-C or grade 3 or below (described as overall prior attainment at LEVEL 1)",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "level1",
          label: "I hold a full Level 1 qualification",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "GCSE2",
          label:
            "I hold a General Certificate of Secondary Education (GCSE) in five subjects, each at grade C or above, or grade 4 or above (described as overall prior attainment at LEVEL 2)",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "level2",
          label: "I hold a full Level 2 qualification",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "generalCertificateA",
          label:
            "I hold a General Certificate of Education at the advanced level in two subjects (A’ Level’s)",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "generalCertificateAS",
          label:
            "I hold a General Certificate of Education at the advanced subsidiary (AS) level in four subjects",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "QAALevel3",
          label:
            "I hold a Quality Assurance Agency Access to Higher Education (HE) Diploma at Level 3",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "level3",
          label: "I hold a full Level 3 qualification",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "level4",
          label:
            "I hold a Level 4 qualification or above (this includes Certificates of higher education at Level 4, Foundation degrees at Level 5, bachelor’s degrees; graduate certificates and diplomas etc.)",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "level6",
          label:
            "I hold a level 6; RQF/QCF Level 6 Award, Certificate or Diploma/bachelor’s degree / Graduate Certificate and Diploma",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "level7",
          label:
            "I hold a level 7; in RQF/QCF Level 7 or 8 Award, Certificate or Diploma/Master’s Degree / Postgraduate Certificate and Diploma",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 25,
      title:
        "English and Maths – Please state your highest grade in English and Maths",
      p: "",
      fields: [
        {
          type: "text",
          id: "GCSEEnglish",
          label: "GCSE English",
          placeholder: "GCSE English",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "FunctionalEnglish",
          label: "Functional Skills in English",
          placeholder: "Functional Skills in English",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "GCSEMaths",
          label: "GCSE Maths",
          placeholder: "GCSE Maths",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "FunctionalMaths",
          label: "Functional Skills in Maths",
          placeholder: "Functional Skills in Maths",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 26,
      title: "SECTION 06: Safeguarding Mandatory Completion",
      p: "Note: Relevant here means offences against the person, whether of a violent or sexual nature, and convictions involving unlawful supplying possessions of controlled drugs or substances.",
      fields: [
        {
          type: "checkbox",
          id: "criminalConvictions",
          label: "Do you have any relevant unspent criminal convictions?",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "text",
          id: "criminalConvictionsText",
          label: "Criminal convictions:",
          placeholder: "Criminal convictions",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 27,
      title: "SECTION 07: How did you hear about Eden College?",
      p: "",
      fields: [
        {
          type: "radio",
          id: "edenSource",
          label: "",
          options: [
            { label: "Used service before", value: "used_service_before" },
            { label: "Website", value: "website" },
            { label: "Local event", value: "local_event" },
            {
              label: "Advert in a newspaper or magazine",
              value: "advert_newspaper_magazine",
            },
            { label: "Twitter", value: "twitter" },
            { label: "Prospectus", value: "prospectus" },
            { label: "Facebook", value: "facebook" },
            {
              label: "Friend / Family member",
              value: "friend_family_member",
            },
            { label: "Job Centre Plus", value: "job_centre_plus" },
          ],
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 28,
      title: "SECTION 08: Residency Assessment",
      p: "",
      fields: [
        {
          type: "text",
          id: "residentialCountry",
          label: "Which country have you lived in for the last 3 years?",
          placeholder: "Which country have you lived in for the last 3 years?",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "officialNationality",
          label:
            "What is your nationality according to your official document?",
          placeholder: "Official Nationality",
          validation: z.string().optional(),
        },
        {
          type: "checkbox",
          id: "livedInUK",
          label:
            "If you have not lived in the UK/EU for the last 3 years, on what date did you enter the UK",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "refugeStatus",
          label: "Are you a Refugee?",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "radio",
          id: "asylumSeekerStatus",
          label: "Are you an Asylum Seeker?",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          validation: z.enum(["Yes", "No"]),
        },
        {
          type: "radio",
          id: "UKAsylumSeekerStatus",
          label:
            " If you are an Asylum Seeker have you: Lived in the UK for six months or longer while your claim is being considered by the Home Office, and no decision on your claim has been made; or",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          validation: z.enum(["Yes", "No"]),
        },
        {
          type: "radio",
          id: "careAsylumSeekerStatus",
          label:
            " Are you in the care of the local authority and are receiving local authority support under section 23 Corsection 23 CA of the Children Act 1989 or the Care Act 2014",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          validation: z.enum(["Yes", "No"]),
        },
      ],
    },
    {
      id: 29,
      title:
        "Do you have one of the following types of leave to enter or remain",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "discretionaryLeave",
          label: "Discretionary Leave",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "exceptionalLeave",
          label: "Exceptional Leave",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "humanitarianLeave",
          label: "Humanitarian Protection",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "leaveToRemain",
          label: "Indefinite Leave to Remain",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 30,
      title: "FOR OFFICE USE ONLY",
      p: "Residency Documentation:",
      fields: [
        {
          type: "text",
          id: "documentSeen",
          label: "Document Seen",
          placeholder: "Document Seen",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "documentReference",
          label: "Document Reference",
          placeholder: "Document Reference",
          validation: z.string().optional(),
        },
        {
          type: "date",
          id: "validFrom",
          label: "Valid From",
          placeholder: "Enter valid date",
          validation: z.string().date(),
        },
        {
          type: "date",
          id: "expiryDate",
          label: "Expiry Date",
          placeholder: "Enter expiry date",
          validation: z.string().date(),
        },
      ],
    },
    {
      id: 31,
      title: "Fee Remission Documentation Seen:",
      p: "",
      fields: [
        {
          type: "text",
          id: "benefitDocuments",
          label: "Benefit Documents",
          placeholder: "Benefit Documents",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "bankStatement",
          label: "Bank Statement",
          placeholder: "Bank Statement",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "wageSlips",
          label: "Wage Slips",
          placeholder: "Wage Slips",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "P60",
          label: "P60",
          placeholder: "P60",
          validation: z.string().optional(),
        },
      ],
    },
    {
      id: 32,
      title: "Proof of Address:",
      p: "",
      fields: [
        {
          type: "text",
          id: "proofDocumentSeen",
          label: "Document Seen",
          placeholder: "Document Seen",
          validation: z.string().optional(),
        },
      ],
    },
    // Gap
    {
      id: 34,
      title: "SECTION 10: Provider Declaration",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "providerCertify",
          label:
            "I certify that the evidence seen is correct to the best of my knowledge on start of the programme",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "text",
          id: "providerName",
          label: "Provider Name",
          placeholder: "Name",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "providerSign",
          label: "Provider Signature",
          placeholder: "Sign",
          validation: z.string().optional(),
        },
        {
          type: "date",
          id: "providerSignDate",
          label: "Date",
          placeholder: "Enter Date",
          validation: z.string().date(),
        },
      ],
    },
    {
      id: 35,
      title:
        "SECTION 11: Learning Agreementand Declaration – IMPORTANT ALLLEARNERS MUST READ AND SIGN",
      p: "",
      fields: [{ validation: z.string().max(50) }],
    },
    {
      id: 36,
      title: "Who we are and what we do",
      p: "Eden College is a non-profit based in Romford Essex. We are committed to raising the level of skills for life and work in Romford Essex.",
      fields: [{ validation: z.string().max(50) }],
    },
    {
      id: 37,
      title: "Why we need your information and how we use it",
      p: "Eden College collects and uses personal data to provide services to residents. The data we collect is done on the lawful basis of legitimate interest, contractual obligation or consent. We are committed to making sure that we protect the personal and confidential information we hold. We will ensure that the personal data we collect is dealt with legally, securely, efficiently and effectively, so we can provide the best possible services to our residents and other service users.",
      fields: [{ validation: z.string().max(50) }],
    },
    {
      id: 38,
      title: "Data we collect and why Courses where we do not receive funding",
      p: "For these courses we are the data controller under the Data Protection law as we collect and process personal information about you in order to provide services and meet our legal obligations.",
      fields: [{ validation: z.string().max(50) }],
    },
    {
      id: 39,
      title: "Privacy notice for Education Skills Funding Agency (ESFA)",
      p: "Please see the attached privacy notice for Education Skills Funding Agency (ESFA).",
      fields: [{ validation: z.string().max(50) }],
    },
    {
      id: 40,
      title: "Information and advice",
      p: "",
      fields: [
        {
          type: "radio",
          id: "receivedInfoStatus",
          label: "Did you receive information and advice from our staff?",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          validation: z.enum(["Yes", "No"]),
        },
      ],
    },
    {
      id: 41,
      title: "Contacting You",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "contactContactChange",
          label:
            "I agree to be contacted by Eden College if the dates or times for my course sessions change.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "contactSurverys",
          label:
            "I agree to be contacted for surveys and research to improve their services.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "contactFutureOpoortunities",
          label: "I agree to be contacted about future learning opportunities.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 42,
      title: "",
      p: "I agree to be contacted for the above by",
      fields: [
        {
          type: "checkbox",
          id: "contactPost",
          label: "Post",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "contactEmail",
          label: "Email",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "contactPhoneSMS",
          label: "Phone SMS",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 43,
      title: "Declaration",
      p: "",
      fields: [
        {
          type: "checkbox",
          id: "policyAgreed",
          label: "I agree to accept the policies of Eden College.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "confirmInformationAccuracy",
          label: "I confirm that the information I have provided is accurate.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "reduceFeeChange",
          label:
            "I agree to tell Eden College of any changes to my circumstances that could affect my entitlement to free or reduced fees.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "checkbox",
          id: "courseInfoConfirm",
          label:
            "I confirm I have received information about the course and I am aware that further information and advice is available.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
    },
    {
      id: 44,
      title: "Consent",
      p: "Under the Data Protection Act 2018, we need your consent before we can use your personal data. By signing the form you confirm that you consent to the use of your personal data as outlined above and by Eden College.",
      fields: [
        {
          type: "text",
          id: "consentSignature",
          label: "Signature",
          placeholder: "Sign",
          validation: z.string().optional(),
        },
        {
          type: "date",
          id: "dateOfConsent",
          label: "Date of Consent",
          placeholder: "Enter Date of Consent",
          validation: z.string().date(),
        },
      ],
    },
  ],
};
