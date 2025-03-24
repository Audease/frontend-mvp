import { z } from "zod";

export const behaviouralData = {
  id: 3,
  title: "Eden College Behavioural Policy: In the Classroom",
  section: [
    {
      id: 1,
      title: "Introduction:",
      paragraph:
        "At Eden College the classroom environment is supportive of teaching and learning by providing procedures for dealing with the problem of the candidate/learner who is perceived to be disruptive.",
    },
    {
      id: 1,
      title: "The Policy and Process:",
      paragraph:
        "This document and policy is intended to provide due process in the treatment of learners who are involved in an incident of disruptive behaviour. A disruptive learner is a learner who engages in behaviour in the classroom that interferes with the process of teaching and learning. The procedure for dealing with this disruption in the classroom includes a number of rules and regulations which all staff should adhere to, these are as follows:",
    },
  ],
  bulletPoints: [
    {
      id: 1,
      paragraph:
        "Any candidate/learner whose behaviour is judged by the tutors to be disruptive shall be informed by the tutor that his/her actions are disruptive. The tutor shall explain how the behaviour disrupts the teaching/learning process, inform the learner that if the behaviour continues it will be reported to the Learning and Assessment Coordinator and request that the learner cease the behaviour. This explanation should take place in the classroom/training room at the time of the behaviour or at another time and place deemed appropriate by the tutor, this should be done during office hours.",
    },
    {
      id: 2,
      paragraph:
        "A learner may be dismissed by the tutor from any classroom period in which disruptive behaviour persists following the tutor’s request that it cease. Attendance at subsequent class period is allowed unless disruptive behaviour continues. If the learner refuses a request by the Learning and Development Adviser to leave the classroom following persistent disruptive behaviour, the police should be called.",
    },
    {
      id: 3,
      paragraph:
        "If at any time, the Learning and Development Adviser believes the learner poses a physical threat to him/her or other learners, the police should be called.",
    },
    {
      id: 4,
      paragraph:
        "If a learner’s disruptive behaviour continues following the request that it cease, the tutor shall refer the case to Learning and Assessment Coordinator for handling. The Coordinator will deal with the case according to the learner discipline procedures. Disenrollment from the class is a discipline sanction that may be used.",
    },
    {
      id: 5,
      paragraph:
        "A Learner involved in an incident of disruptive behaviour prior to its final resolution, he/she should contact the Learning and Assessment Coordinator to discuss this matter.",
    },
    {
      id: 6,
      paragraph:
        "If the final resolution of the incident is unsatisfactory to the tutor, he/she may request an administrative review by the Managing Director / Principal Learning and Development Adviser. (Freda Jacobson)",
    },
    {
      id: 7,
      paragraph:
        "As part of the process of ensuring that all facilitators and tutors are made aware of the policy and procedure on behavioural norms at Eden College an action plan and training and development session will be put together which will outline all the requirements of the policy and process.",
    },
  ],
  formFields: [
    {
      id: "agreement",
      label: "I have read and understood the policy.",
      type: "checkbox",
      section: "learner",
      editableBy: ["learner"],
      validation: z.boolean().refine((value) => value === true, {
        message: "You must agree to the policy",
      }),
    },
    {
      type: "text",
      id: "candidateName",
      label: "Candidate Name",
      section: "learner",
      editableBy: ["learner"],
      placeholder: "Candidate Name",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Candidate Name must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "employerName",
      label: "Employer",
      section: "learner",
      editableBy: ["learner", "accessor"],
      placeholder: "Employer",
      validation: z.string().optional()
    },

    {
      type: "text",
      id: "courseDetails",
      label: "Course/Project Details",
      section: "learner",
      editableBy: ["learner"],
      placeholder: "Course/Project Details",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Course Details must be at least 2 characters.",
      }),
    },
    {
      id: "candidateSignature",
      label: "Candidate Signature",
      section: "learner",
      editableBy: ["learner"],
      type: "signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      id: "ldaName",
      label: "Learning and Development Adviser Name",
      type: "text",
      section: "accessor",
      editableBy: ["accessor"],
      placeholder: "LDA Name",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA Name must be at least 2 characters.",
      }),
    },
    {
      id: "ldaSignature",
      label: "Learning and Development Adviser Signature",
      section: "admin",
      editableBy: ["accessor"],
      type: "text",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().optional().refine((value) => !value || value.trim().length >= 2, {
        message: "Signature must be at least 2 characters if provided.",
      }),
    },
  ],
};
