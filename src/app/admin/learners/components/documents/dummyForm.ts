import z from "zod";

export const applicationForm = [
  {
    id: 1,
    name: "Eden college application form",
    description: "This is Eden College Application Form",
    appeal: {
      sid: 1,
      title: "Appeals Procedure",
      description:
        "All learners have the right to appeal in case of concerns, disagreements and disputes about the interpretation of standards and / or an assessment decision as well as an information, advice and guidance intervention. Appeals are referred to the Centre Coordinator (the Learning and Assessment Coordinator) in the first instance who then passes this to the Internal Verifier. The Internal Verifier requires copies of all relevant material, following receipt of such, discusses the matter individually with the candidates and assessor/trainers/tutors/ Careers Adviser- Consultants concerned in a formal meeting. If it is not clear to make a decision on this basis. The Internal Verifier seeks guidance from the Principal Learning and Development Adviser, being the Managing Director. The Principal Learning Development Adviser then forms a separate appeals panel to look at the case in more depth and at this point a decision is made. The panel normally consists of an independent representative agreed by the learner, a trainer/tutor or assess or who is not familiar with the learner’s work. If the dispute is still unresolved the matter is referred to the External Verifier / Chief Verifier of the awarding body concerned.",
      diagram: [
        {
          id: 1,
          title:
            "Candidate/Client-Dispute (Learning and Assessment Coordinator)",
          text: "Learning and Assessment Coordinator records receipt of disagreement immediately. And gives details of disagreement/complaint to the relevant Eden College Internal Verifier in no more than five days.",
        },
        {
          id: 2,
          title: "Eden College Internal Verifier",
          text: "Internal Verifier is given five days to review the case and if the Internal Verifier cannot resolve the case the Internal Verifier passes details to the chair of the panel of adjudicators. Normally Independent assessors who are not familiar with the learner.",
        },
        {
          id: 3,
          title: "Panel of Independent Adjudications",
          text: "Panel is given two days from sitting to come to a decision.",
        },
        {
          id: 4,
          title: "Case not resolved",
          text: "If the panel cannot come to a decision they must pass on their findings after three days to the awarding body, external Verifier to make a decision and recommendations. Timescale to be negotiated with the Awarding body concerned. (TQUK, Pearson, Cache, VTCT, Active IQ)",
        },
      ],
    },
    complaints: {
      id: 2,
      title: "Statement of Complaints",
      description: [
        {
          id: 1,
          paragraph:
            "Please take a few moments to reflect back on your course and ask yourself if you where happy with this. And complete our client satisfaction/course evaluation questionnaire. All clients’ views will be considered in reviewing our plans for the future, and welcomed as a means of ensuring that we provide a high quality service.",
        },
        {
          id: 2,
          paragraph:
            "Eden College aims to provide high quality services, both for learners / other clients employers and IAG clients. We believe we achieve this most of the time: if we are getting it right please let us know. You can do this by speaking or e-mailing The Learning and Assessment Coordinator.",
        },
        {
          id: 3,
          paragraph:
            "In order to ensure our services, remain at a high and improving standard, we have a procedure through which you can let us know for any reason you are not satisfied with your dealings with the organisation.",
        },
        {
          id: 4,
          paragraph:
            "Often, we will be able to give you a response straight away. When the matter is more complicated we will give you at least an initial response, and then a full response within five working days.",
        },
        {
          id: 5,
          paragraph:
            "If you are not satisfied with our responses or wish to raise the matter more formally, please write to the Principal Learning and Development Adviser,(Managing Director) Details of the name and address of both the Principal Learning and Development Adviser and chair of the College can be obtained from our Leaning and Assessment Coordinator at Eden College info@edencollege.co.uk or 01708 726660.(If your complaint is about the Principal, please write to the Chair, (again contact details can be obtained from the Learning and Assessment Coordinator who will report the matter to the next Advisory Board meeting, which will decide on any further steps to resolve the situation.",
        },
        {
          id: 6,
          paragraph:
            "All written complaints will be logged. You will receive a written acknowledgement within three working days. The aim is to investigate your complaint properly and give you a reply within ten working days, setting out how the problem will be dealt with. If this is not possible, an interim response will be made informing you of the action taken to date or being considered.",
        },
        {
          id: 7,
          paragraph:
            "Finally, please also let us know if you are happy with our services.",
        },
      ],
    },
    behavioural: {
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
          type: "text",
          id: "candidateName",
          label: "Candidate Name",
          placeholder: "Candidate Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "employerName",
          label: "Employer",
          placeholder: "Employer",
          validation: z.string().min(2).max(100),
        },

        {
          type: "text",
          id: "courseDetails",
          label: "Course/Project Details",
          placeholder: "Course/Project Details",
          validation: z.string().min(2).max(250),
        },
        {
          id: "candidateSignature",
          label: "Candidate Signature",
          type: "text",
          placeholder: "Candidate Signature",
          validation: z.string().min(1),
        },
        {
          id: "ldaName",
          label: "Learning and Development Adviser Name",
          type: "text",
          placeholder: "LDA Name",
          validation: z.string().min(2).max(100),
        },
        {
          id: "ldaSignature",
          label: "Learning and Development Adviser Signature",
          type: "text",
          placeholder: "LDA Signature",
          validation: z.string().min(1),
        },
        {
          id: "agreement",
          label: "I have read and understood the policy.",
          type: "checkbox",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must agree to the policy",
          }),
        },
      ],
    },
    candidateRecord: {
      id: 4,
      title: "Candidate Registration and Certification Record",
      formFields: [
        {
          type: "text",
          id: "candidateName",
          label: "Candidate Name (in BLOCK CAPITALS)",
          placeholder: "Candidate Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "select",
          id: "gender",
          label: "Gender",
          placeholder: "Gender",
          validation: z.string().min(1).max(50),
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
          label: "Company",
          placeholder: "Company",
          validation: z.string().min(2).max(100),
        },
        {
          type: "date",
          id: "dateOfBirth",
          label: "Date of Birth",
          placeholder: "YYYY-MM-DD",
          validation: z.string().date(),
        },
        {
          type: "text",
          id: "programmeTitle",
          label: "Programme Title",
          placeholder: "Programme Title",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "level",
          label: "Level",
          placeholder: "Level",
          validation: z.string().min(1).max(50),
        },
        {
          type: "checkbox",
          id: "nameOnCertificate",
          label: "Do you wish the above name to appear on your certificate?",
          validation: z.boolean(),
        },
        {
          type: "text",
          id: "alternativeName",
          label: "If no, please specify (in BLOCK CAPITALS)",
          placeholder: "Alternative Name",
          validation: z.string().min(1).max(50).optional(),
        },
        {
          type: "text",
          id: "candidateSignature",
          label: "Candidate Signature",
          placeholder: "Candidate Signature",
          validation: z.string().min(1),
        },
        {
          type: "date",
          id: "candidateSignatureDate",
          label: "Date",
          placeholder: "YYYY-MM-DD",
          validation: z.string().date(),
        },
        {
          type: "text",
          id: "learningOfficer",
          label: "Learning and Assessment Data Officer",
          placeholder: "Officer Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "date",
          id: "learningOfficerDate",
          label: "Date",
          placeholder: "YYYY-MM-DD",
          validation: z.string().date(),
        },
      ],
    },
    confidentiality: {
      id: 4,
      title: "Confidentiality and Privacy Agreement",
      paragraphs: [
        {
          id:1,
          p: "The data you provide on your application form and the information in your assignments will be treated confidentially, and we willcomplywiththerequirementsofthe1998DataProtection Act as well as the new GDPR regulations to ensure your data is securely kept with Eden College. This means that you have the right to see the data and information that is being kept about you if you want to.",
        },
        {
          id:2,
          p: "You also have the right to say whether this or other information about you is shared with other organisations. We will be able to help you more effectively if we are able to share information with e.g. Schools, Colleges, other Eden College trainers and assessors, training organisations and employers. If you are unhappy about this, please let us know now or at any time in the future.",
        },
        {
          id:2,
          p: "I am aware that – Eden College will create and maintain computer and paper records on me, both during my course and after I complete the course. These records will be processed in compliance with the Data Protection Act 1998.",
        },
        {
          id:3,
          p: "I consent that the information in the records may be used for reports, both internally within the training centre and to external bodies working with the centre in candidate administration.I agree that basic information can be shared with other organisations if necessary and in my interest. I understand that sensitive information will be treated separately.",
        },
      ],
      formFields: [
        {
          type: "text",
          id: "candidateName",
          label: "Candidate Name",
          placeholder: "Candidate Name",
          validation: "z.string().min(2).max(100)",
        },
        {
          type: "text",
          id: "employer",
          label: "Employer",
          placeholder: "Employer",
          validation: "z.string().min(2).max(100)",
        },
        {
          type: "text",
          id: "courseDetails",
          label: "Course/Project Details",
          placeholder: "Course/Project Details",
          validation: "z.string().min(2).max(250)",
        },
        {
          type: "text",
          id: "candidateSignature",
          label: "Candidate Signature",
          placeholder: "Candidate Signature",
          validation: "z.string().min(1)",
        },
        {
          type: "date",
          id: "candidateSignatureDate",
          label: "Date",
          placeholder: "YYYY-MM-DD",
          validation: z.string().date(),
        },
        {
          type: "text",
          id: "ldaName",
          label: "Learning and Development Adviser Name (please print)",
          placeholder: "Eden College Allocated LDA",
          validation: "z.string().min(2).max(100)",
        },
        {
          type: "text",
          id: "ldaSignature",
          label: "Learning and Development Adviser Signature",
          placeholder: "Eden College Allocated LDA",
          validation: "z.string().min(1)",
        },
        {
          type: "date",
          id: "ldaSignatureDate",
          label: "Date",
          placeholder: "YYYY-MM-DD",
          validation: z.string().date(),
        },
      ],
    },

    // scetion: [
    //   {
    //     sid: 2,
    //     title: "Section B",
    //     description: "lorem ipsum",
    //     fields: [
    //       {
    //         id: 1,
    //         name: "firstName",
    //         label: "First name",
    //         placeholder: "John Doe",
    //         description: "Please enter your first name",
    //         type: "text",
    //         required: true,
    //       },
    //       {
    //         id: 2,
    //         name: "lastName",
    //         label: "Last Name",
    //         placeholder: "John Doe",
    //         description: "Please enter your last name",
    //         type: "text",
    //         required: true,
    //       },
    //       {
    //         id: 3,
    //         name: "middleName",
    //         label: "Middle Name",
    //         placeholder: "John Doe",
    //         description: "Please enter your middle name",
    //         type: "text",
    //         required: true,
    //       },
    //     ],
    //     fields2: [
    //       {
    //         id: 1,
    //         name: "gender",
    //         label: "Gender",
    //         placeholder: "John Doe",
    //         description: "Please enter your gender",
    //         type: "text",
    //         required: true,
    //       },
    //       {
    //         id: 1,
    //         name: "gender",
    //         label: "Gender",
    //         placeholder: "John Doe",
    //         description: "Please enter your gender",
    //         type: "select",
    //         required: true,
    //       },
    //     ],
    //   },
    // ],
  },
];
