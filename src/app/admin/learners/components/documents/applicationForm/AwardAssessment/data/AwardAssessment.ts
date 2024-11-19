import { z } from "zod";

export const awardAssessmentData = {
  id: 12,
  title: "LEARNING AGREEMENT BETWEEN EDEN COLLEGE & LEARNERS",
  subTitle:
    "For the Learning delivery, Development and Assessment of the following NVQ/QCF award:",
  formFields: [
    {
      type: "text",
      id: "nameOfAward",
      label: "Name of Award",
      placeholder: "Name of Award",
      validation: z.string().min(2).max(100),
    },
    {
      type: "date",
      id: "dateofRegistrationWithEdenCollege:",
      label: "Date of registration with Eden College:",
      placeholder: "Enter valid date",
      validation: z.string().date(),
    },
    {
      type: "text",
      id: "candidateEnrolmentNo",
      label: "Candidate enrolment No",
      placeholder: "Candidate enrolment No",
      validation: z.string().min(2).max(100),
    },
    {
      type: "date",
      id: "targetCompletionDate",
      label: "Target completion date (12 months from start date)",
      placeholder: "Enter valid date",
      validation: z.string().date(),
    },
  ],
  arrangement: {
    interest:
      "In the interest of all parties and to ensure the successful achievement of the above award, the following arrangement should be confirmed and signed:",
    personas: [
      {
        id: "candidate",
        title: "Candidate",
        description:
          "I have read and understand the role and expectation of the candidate in the induction pack given to me. I confirm that I have been inducted for this course and hereby undertake to:",
        points: [
          {
            p: "Attend NVQ/QCF workshops as scheduled until completion of my award",
          },
          {
            p: "Prepare for assessments and workshops ensuring that all evidence is accessible to my Learning and Development Adviser/Assessor",
          },
          {
            p: "Inform all others involved in the assessment process, including my manager and supervisors",
          },
        ],
      },
      {
        id: "college",
        title: "What the college expects from you",
        description: "",
        points: [
          {
            p: "Personal commitment to your college course and the individual learning goals.",
          },
          {
            p: "Punctual attendance at all required activities and explanation of any absence to your tutor.",
          },
          {
            p: "Immediate contact with the college to notify absence.",
          },
          {
            p: "Completion of course related work and the acceptance of any conditions or specific requirements laid down in the course handbook.",
          },
          {
            p: "Behaviour in a way which does not offend others, is not discriminatory, and shows care, consideration and respect to all staff and fellow students.",
          },
          {
            p: "Acceptance of responsibility to keep the college clean and tidy.",
          },
          {
            p: "Compliance with the requirements of the Health and Safety Act 1974 and other legislation.",
          },
        ],
      },
      {
        id: "services",
        title: "",
        description:
          "Eden College is dedicated to your success. To help you identify, plan for and achieve your educational, career and lifelong learning objectives, we have established a number of support services to help make your studying with us easy as possible. These services include: ",
        points: [
          {
            p: "A caring and friendly place where serious and committed student scan study.",
          },
          {
            p: "A learning environment free from discrimination.",
          },
          {
            p: "Applications are dealt with promptly and efficiently.",
          },
          {
            p: "Admission to learning programmes on a fair basis.",
          },
          {
            p: "Comprehensive introduction or induction programme.",
          },
          {
            p: "High quality teaching and a commitment to the promotion of learning.",
          },
          {
            p: "Regular reviews with your personal tutor.",
          },
          {
            p: "Outgoing internal assessment and a profile of your progress at regular intervals.",
          },
          {
            p: "Work experience placements.",
          },
          {
            p: "Expect help and impartial advice and guidance on progression to the job market, training for higher and further education and how to apply.",
          },
          {
            p: "Access to the Skills Centre, books and IT resources.",
          },
          {
            p: "Opportunities to express your views through student’s representation of Academic board and governing body.",
          },
          {
            p: "Access to formal complaints procedures.",
          },
          {
            p: "Information about students’ activities and events.",
          },
          {
            p: "Induction for the candidate.",
          },
          {
            p: "Assessment.",
          },
          {
            p: "Assessor keeps appointments and notifies the learner with as much notice as possible if changes to dates and times have to be made.",
          },
          {
            p: "Records of assessment are maintained safely and securely and are only available to those who should have access to them.",
          },
          {
            p: "Feedback on assessment is given as soon as possible after each assessment takes place.",
          },
          {
            p: "Feedback product assessment will take a minimum of 4 weeks to de sent to candidates.",
          },
          ,
          {
            p: "The assessment complaints and appeals procedure is fully implemented when appropriate.",
          },
          ,
          {
            p: "Certificates will be issued following approval by the external verifier. The time scale for certification from the date of submission of a fully assessed portfolio is a minimum of 6 weeks. Candidate intending to use the qualification for further and higher education should note these time scales.",
          },
        ],
      },
    ],
    formFields: [
      {
        type: "checkbox",
        id: "awardAgreement",
        label: "I agree with the terms and condition of this agreement",
        options: ["Yes", "No"],
        validation: z.boolean(),
      },
      {
        type: "text",
        id: "nameOfCandidate",
        label: "Name of candidate",
        placeholder: "Name of candidate",
        validation: z.string().min(2).max(100),
      },
      {
        type: "text",
        id: "candidateSignature",
        label: "Candidate Signature",
        placeholder: "Candidate Signature",
        validation: z.string().min(2).max(100),
      },
      {
        type: "text",
        id: "candidateEmployer",
        label: "Employer",
        placeholder: "Employer",
        validation: z.string().min(2).max(100),
      },
      {
        type: "text",
        id: "currentPosition",
        label: "Current Position",
        placeholder: "Current Position",
        validation: z.string().min(2).max(100),
      },
      {
        type: "date",
        id: "employerDate",
        label: "Date",
        placeholder: "Enter valid date",
        validation: z.string().date(),
      },
    ],
    eden: {
      p: "On behalf of Eden College",
      formFields: [
        {
          type: "text",
          id: "edenStaffName",
          label: "Name",
          placeholder: "Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "edenStaffPosition",
          label: "Position",
          placeholder: "Position",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "edenSignature",
          label: "Signature",
          placeholder: "Signature",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "currentPosition",
          label: "Current Position",
          placeholder: "Current Position",
          validation: z.string().min(2).max(100),
        },
        {
          type: "date",
          id: "employerDate",
          label: "Date",
          placeholder: "Enter valid date",
          validation: z.string().date(),
        },
      ],
    },
  },
};
