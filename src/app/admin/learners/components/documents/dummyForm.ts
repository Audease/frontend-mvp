import z from "zod";

export const applicationForm = [
  {
    id: 1,
    name: "Eden college application form",
    description: "This is Eden College Application Form",
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
          placeholder:
            "Type in your surname and credentials to append signature",
          validation: z.string().min(3),
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
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "candidateSignature",
          label: "Candidate Signature",
          placeholder:
            "Type in your surname and credentials to append signature",
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
          id: 1,
          p: "The data you provide on your application form and the information in your assignments will be treated confidentially, and we willcomplywiththerequirementsofthe1998DataProtection Act as well as the new GDPR regulations to ensure your data is securely kept with Eden College. This means that you have the right to see the data and information that is being kept about you if you want to.",
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
          label: "Candidate Name",
          placeholder: "Candidate Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "employer",
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
          id: "ldaName",
          label: "Learning and Development Adviser Name",
          placeholder: "Eden College Allocated LDA",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "eldaName",
          label: "Eden College Allocated LDA",
          placeholder: "Eden College Allocated LDA",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "ldaSignature",
          label: "Learning and Development Adviser Signature",
          placeholder: "Eden College Allocated LDA Signature",
          validation: z.string().min(1),
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
    dataProtection: {
      id: 5,
      title: "Data Protection Consent Form - Students Enrolment",
      section1: {
        id: 1,
        title: "Eden College Obligations to the Students",
        sections: [
          {
            id: 1,
            title: "Eden College Obligations to the Students",
            content:
              "Eden College recognizes its responsibilities under the Data Protection Act1998 in respect of the data that it maintains on computer and in relevant filing systems in respect of applicants for admission and of members of the organisation. Like all educational establishments, Eden college holds and processes information about its applicants and students for various purposes (for example, to help in the running of the admissions process, to record academic progress, to operate the organisation accounting, and security systems and to enable correspondence and communications).Eden College must comply with the data protection principles which are set out in the Data Protection Act1998 (the1998Act).For example: information must be collected and used fairly, stored safely and not disclosed to any other person unlawfully. It is Eden college policy to seek the consent of students for admission to hold and process personal data, including sensitive personal data, about them. A refusal to consent to the processing of the information listed below will delay the processing of applications.",
          },
          {
            id: 2,
            title: "Data Processing",
            content:
              "Listed in the enclosed schedule are the main categories of data which the Eden College may hold / process,	the	main	purpose(s) for	holding /	processing	such	data,	the	possible disclosures of such data and the likely sources of such data. In addition to having a legitimate basis for processing	data, Eden College has an additional duty to process that data fairly (for example, in accordance with any duty of confidence owed to you).",
          },
          {
            id: 3,
            title: "Students’ Obligations",
            content:
              "Students must now, and as members, ensure that any personal data provided to the organisation are accurate and up-to-date. They must ensure that any changes of address or other personal details are notified to the Tutor for Admissions or to their Tutor after admission. They should also be aware that if they take up a place at Eden College they will be required to sign an Eden college data protection consent form prior to matriculation.",
          },
          {
            id: 4,
            title: "Retention of Data",
            content:
              "Eden College will keep some classes of information for longer than others. These will include information held, for example, for reference and archive purposes. Some data on students maybe held/processed indefinitely in an anonymous form for statistical records and research.",
          },
          {
            id: 5,
            title: "Data Protection Officer",
            content:
              "Eden College Data Protection Officer is the Freda Jacobson. All enquiries regarding the 1998 Act and the organisation policy should be made to the Data Protection Officer.",
          },
        ],
      },
      section2: {
        id: 2,
        title: "The Students’ Obligations of Confidentiality",
        paragraphs: [
          {
            id: "p1",
            text: "I agree to Eden College, processing data contained in my personal file whether provided in confidence or by other individuals or institutions. I recognize that some of the information received by Eden College will have been provided confidentially. I accept that this information will be retained by Eden College for as long as it remains relevant. In the case of unsuccessful applications this normally means that files will be destroyed on 31March in the year following application.",
          },
          {
            id: "p2",
            text: "Sharing details of your admissions assessment and/or interviews risks compromising our standards of admission, and could harm the interpretation of your own performance. You understand that the organization expects you to maintain confidentiality. Therefore you must not disclose the content of any admissions assessment or interview to other applicants or any commercial organisations at any point, either during the admissions process or while you are a student at Eden College. This includes, but is not limited to, communication indirectly or directly by email, websites, chatrooms and texts with other applicants. While we understand that you may wish to discuss your interviews with advisers at your training centre, you are requested not to share full details of any questions asked with them. The organization will treat any breach of confidentiality as a very serious matter.",
          },
        ],
      },
      section3: {
        id: 3,
        title: "Feedback on Applications",
        paragraph: [
          {
            id: "p1",
            p: "Eden College is happy to provide feedback, when requested, to clients who have been informally interviewed by the organisation, but have failed to secure an offer on a course from Eden College.",
          },
          {
            id: "p2",
            p: "This is for two reasons:",
          },
        ],
        list: [
          {
            id: "l1",
            text: "The referee is well placed to judge the best way to convey the feedback to you so that it is received as a beneficial learning experience;",
          },
          {
            id: "l2",
            text: "The provision of feedback to your learning centre informs advisers of future applicants about the standards and requirements for the relevant course and is therefore of wider benefit to the admissions process.",
          },
        ],
      },
      section4: {
        id: 3,
        title: "Data Protection Act 1998:",
        content: [
          {
            id: 1,
            title: "Schedule Data Processing",
            text: "Listed below are the main categories of data which the organisation may hold/process, the main purpose(s) for holding/processing such data, the possible disclosures of such data and the likely sources of such data.",
            data: "Personal details (including address and contact details); academic record; qualification and skills; student record; student financial record; immigration status.",
            mainP:
              "To assess applications from students for admission and assist in the admissions process; Accommodation issues; to process proper and up-to-date records of academic progress, development and welfare; fees and charges administration/collection; legal issues and obligations (e.g. Health & Safety record; UK Border Agency reporting); communications/mailings; references.",
            mainSnD:
              "Application forms; family; local authority (and other governmental bodies); examination results; scholarships; Student Loans Company; examination boards; other educational institutions; employers and potential employers; legal representatives; admissions officers; UK Border Agency.",
          },
          {
            id: 2,
            title: "Medical records",
            text: "Provision of healthcare",
            data: "Family; Senior Tutor; other authorized Eden College staff; relevant authorized staff of the organisation; general practitioners; other medical practitioners",
            mainP: "Equal opportunities monitoring",
            mainSnD: "Applications forms; Eden College staff.",
          },
          {
            id: 3,
            title: "Criminal records and Eden College security systems",
            text: "",
            data: "",
            mainP: "Disciplinary matters; legal obligations",
            mainSnD:
              "Application forms; police (and other authorities); legal representatives; court service; CCTV Lock records (accessed only when necessary).",
          },
        ],
      },
      consentConfirmation: [
        {
          type: "checkbox",
          id: "confirm",
          label:
            "I confirm that I have read the summary of Eden college Data Protection policy set out in this form and consent to the Eden college holding and processing the categories of personal data about me in the attached schedule for the specified purposes (summarised therein) in respect of my application(s) for admission, as a learner if successful, and after completion and achievement.",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must check this box to continue.",
          }),
        },
        {
          type: "checkbox",
          id: "altConfirm",
          label:
            "In the event that my application to Eden College is unsuccessful I consent to my personal data held on computer and in my files being passed to a not her training organisation for consideration for admission.",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must check this box to continue.",
          }),
        },
        {
          type: "checkbox",
          id: "feedbackConfirm",
          label:
            "I have read and understand the statement on the confidentiality of the admissions process as outlined above and I accept this. I am also aware of the feedback arrangements.",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must check this box to continue.",
          }),
        },
        {
          type: "text",
          id: "fullName",
          label: "Full Name",
          placeholder: "Full Name",
          validation: z.string().min(2).max(100),
        },
        {
          label: "Subject / Course Applied for",
          type: "text",
          id: "CourseAppliedfor",
          placeholder: "Subject / Course Applied for",
          validation: z.string().min(2).max(100),
        },
      ],
    },
    equalOpportunitiesPolicy: {
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
          type: "text",
          id: "candidateName",
          label: "Candidate Name",
          placeholder: "Candidate Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "employer",
          label: "Employer",
          placeholder: "Employer",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "courseDetails",
          label: "Course/Project Details",
          placeholder: "Course/Project Details",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "candidateSignature",
          label: "Candidate Signature",
          placeholder:
            "Type in your surname and credentials to append signature",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "ldaName",
          label: "Learning and Development Adviser Name",
          placeholder: "LDA Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "ldaSignature",
          label: "Learning and Development Adviser Signature",
          placeholder: "LDA Signature",
          validation: z.string().min(2).max(100),
        },
        {
          type: "checkbox",
          id: "agreement",
          label: "I confirm that I have read and understood the above policy.",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must check this box to continue.",
          }),
        },
      ],
    },
    healthAndSafetyPolicy: {
      id: 1,
      title: "HEALTH AND SAFETY POLICY",
      purpose:
        "The purpose of this policy is to ensure active, consultative commitment to health and safety management at Eden College.",
      audience: [
        {
          id: 1,
          title:
            "To every manager, client, staff member, student, visitor or person with business at Eden College; the policy is governed by the following legislation:",
        },
        {
          id: 2,
          title:
            "Health and Safety in Employment Act 1992, Health and Safety in Employment Amendment Act 2002, Health and Safety in Employment Regulations 1995, Health and Safety in Employment (Prescribed Matters) Regulations 2003, Injury Prevention, Rehabilitation Compensation Act 2001",
        },
        {
          id: 3,
          title:
            "Eden College regards the promotion and maintenance of occupational health, safety and loss control as mutual objectives for everyone who works, studies, visits, or has business at the centre. Health, safety is to be ranked equal with the centre’s primary aims and objectives and be integrated with all other functions within the centre. To ensure a safe and health work environment, the centre will develop and maintain a Health and Safety environment, operational and management System.",
        },
      ],
      lists: [
        {
          id: 1,
          title: "THE CENTRE MANAGEMENT WILL:",
          points: [
            {
              id: 1,
              point:
                "provide leadership, examples and commitment to health and safety policy and objectives",
            },
            {
              id: 2,
              point:
                "ensure coordination of health and safety systems within centre regions and nationally shared services",
            },
            {
              id: 3,
              point:
                "ensure appropriate resources are allocated to health and safety",
            },
            {
              id: 4,
              point:
                "set health and safety objectives and performance criteria for all managers and campus regions",
            },
            {
              id: 5,
              point:
                "annually review health and safety objectives and managers' performance",
            },
            {
              id: 6,
              point:
                "require accurate and timely reporting and recording of all incidents and injuries",
            },
            {
              id: 7,
              point:
                "investigate all reported incidents and injuries to ensure all contributing factors are identified and, where appropriate, plans are formulated to take corrective action",
            },
            {
              id: 8,
              point:
                "actively encourage the early reporting of any pain or discomfort, provide a treatment and rehabilitation plan that ensures a safe, early and durable return to work for injured staff",
            },
            {
              id: 9,
              point:
                "identify all existing and new hazards and take all practicable steps to eliminate, isolate or minimise the exposure to any hazards deemed to be significant",
            },
            {
              id: 10,
              point:
                "review accident statistics to ensure adequacy of hazard controls",
            },
            {
              id: 11,
              point:
                "ensure that all staff, students, visitors and those who have business on the centre sites are made aware of the hazards in their work area and are adequately trained to enable them to perform in a safe manner",
            },
            {
              id: 12,
              point:
                "encourage staff and student consultation and participation in all matters relating to health and safety",
            },
            {
              id: 13,
              point:
                "promote a system of continuous improvement, including	an annual review of policies and three yearly reviews of procedures",
            },
            {
              id: 14,
              point:
                "meet obligations under the Health and Safety Legislation, Regulations, Codes of Practices and any relevant Standards of Guidelines",
            },
            {
              id: 15,
              point:
                "every staff member, student, visitor or person with business at Eden College expected to share in the commitment to this policy",
            },
            {
              id: 16,
              point:
                "ensuring that all accidents, incidents and unsafe conditions are reported to the appropriate person",
            },
          ],
        },
        {
          id: 2,
          title:
            "The Centre Manager (Learning and Assessment Coordinator) undertakes the following:",
          points: [
            {
              id: 1,
              point:
                "provide leadership, examples and commitment to health and safety policy and objectives",
            },
            {
              id: 2,
              point:
                "ensure coordination of health and safety systems within centre regions and nationally shared services",
            },
            {
              id: 3,
              point:
                "ensure appropriate resources are allocated to health and safety",
            },
            {
              id: 4,
              point:
                "set health and safety objectives and performance criteria for all managers and campus regions",
            },
            {
              id: 5,
              point:
                "annually review health and safety objectives and managers’ performance",
            },
            {
              id: 6,
              point:
                "require accurate and timely reporting and recording of all incidents and injuries",
            },
            {
              id: 7,
              point:
                "investigate all reported incidents and injuries to ensure all contributing factors are identified and, where appropriate, plans are formulated to take corrective action",
            },
            {
              id: 8,
              point:
                "actively encourage the early reporting of any pain or discomfort",
            },
            {
              id: 9,
              point:
                "provide a treatment and rehabilitation plan that ensures a safe, early and durable return to work for injured staff",
            },
            {
              id: 10,
              point:
                "identify all existing and new hazards and take all practicable steps to eliminate, isolate or minimise the exposure to any hazards deemed to be significant",
            },
            {
              id: 11,
              point:
                "review accident statistics to ensure adequacy of hazards controls, the centre sites are made aware of the hazards in their work area and are adequately trained to enable them to perform in a safe manner",
            },
            {
              id: 12,
              point:
                "ensure that all staff, students, visitors and those who have business on the centre sites are made aware of the hazards in their work area and are adequately trained to enable them to perform in a safe manner",
            },
            {
              id: 13,
              point:
                "encourage staff and student consultation and participation in all matters relating to health and safety",
            },
            {
              id: 14,
              point:
                "promote a system of continuous improvement, including an annual review of policies and three-yearly reviews of procedures",
            },
            {
              id: 15,
              point:
                "meet obligations under the Health and Safety Legislation, Regulations, Codes of Practice and any relevant Standards or Guidelines",
            },
            {
              id: 16,
              point:
                "ensure that every staff member, student, visitor or person with business at Eden College is expected to share in the commitment to this policy",
            },
            {
              id: 17,
              point:
                "ensure that all accidents, incidents, and unsafe conditions are reported to the appropriate authority",
            },
          ],
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
          id: "employer",
          label: "Employer",
          placeholder: "Employer",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "courseDetails",
          label: "Course/Project Details",
          placeholder: "Course/Project Details",
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
          id: "ldaName",
          label: "Learning and Development Adviser Name",
          placeholder: "LDA Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "ldaSignature",
          label: "Learning and Development Adviser Signature",
          placeholder: "LDA Signature",
          validation: z.string().min(2).max(100),
        },
        {
          type: "checkbox",
          id: "agreement",
          label: "I confirm that I have read and understood the above policy.",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must check this box to continue.",
          }),
        },
      ],
    },
    guidancePolicy: {
      id: 1,
      title: "Eden College INFORMATION, ADVICE AND GUIDANCE POLICY",
      commitment:
        "Eden College is committed to delivering an Information, Advice and Guidance (IAG) service that provides a range of opportunities for learners, employers and partners to make informed choices about their training and development needs.",
      body: [
        {
          id: 1,
          title: "Eden College Training IAG Service Delivery",
          points: [
            {
              id: 1,
              point: "Pre-Learning: ",
              description:
                "Choosing a programme with Eden or any other provider that is most suited to the learner's needs, considering location, content, level, delivery style, costs, qualification, entry requirements, support available, etc.",
            },
            {
              id: 2,
              point: "At Induction: ",
              description:
                "Via learner progress reviews, advice on learner support, and possible progression routes. For the employer, mid-course reviews are conducted.",
            },
            {
              id: 3,
              point: "Post-Learning: ",
              description:
                "Final progress reviews, exit interview, and learner questionnaire to identify further learning opportunities. For the employer, end-course reviews.",
            },
            {
              id: 4,
              point: "At Any Time: ",
              description:
                "Referral to other agencies and training providers for advice on careers, work, and learning that may be outside the scope of what Eden provides.",
            },
          ],
        },
        {
          id: 2,
          title:
            "To ensure that IAG service are accessible to all and are of high quality, we well: ",
          points: [
            {
              id: 1,
              point: "Achieve Matrix IAG Quality Mark: ",
              description:
                "Work towards achieving and maintaining the Matrix IAG quality mark to ensure IAG services meet the standards within this framework.",
            },
            {
              id: 2,
              point: "Comprehensive Marketing Materials: ",
              description:
                "Ensure that marketing, promotional, and information materials are comprehensive, accessible, and available in a range of formats.",
            },
            {
              id: 3,
              point:
                "Monitor the effectiveness and improve the quality of information, advice and guidance via: ",
              sub_points: [
                {
                  id: 1,
                  sub_point: "Customer feedback",
                },
                {
                  id: 2,
                  sub_point: "Staff feedback",
                },
                {
                  id: 3,
                  sub_point: "Employer feedback",
                },
                {
                  id: 4,
                  sub_point: "Partner College feedback",
                },
                {
                  id: 5,
                  sub_point:
                    "Analysis of initial Learner Profiles, ILPs, career aspirations and Learner Progress Reviews",
                },
                {
                  id: 6,
                  sub_point: "Analysis of outcomes for learners",
                },
                {
                  id: 7,
                  sub_point:
                    "Annual review, renewal & update of information materials",
                },
              ],
            },
            {
              id: 4,
              point: "Professional Training for SR Staff",
              description:
                "Provide opportunities for SR staff to obtain professional training and/or qualifications in IAG to ensure understanding of: ",
              sub_points: [
                {
                  id: 1,
                  sub_point:
                    "IAG policy, strategy, aims, objectives, procedures and performance indicators",
                },
                {
                  id: 2,
                  sub_point: "Equality and diversity",
                },
                {
                  id: 3,
                  sub_point: "Confidentiality issues",
                },
                {
                  id: 4,
                  sub_point: "Learner support, including financial support",
                },
                {
                  id: 5,
                  sub_point: "Referral systems (internal and external)",
                },
                {
                  id: 6,
                  sub_point: "Customer Care, Health & Safety and Safeguarding",
                },
                {
                  id: 7,
                  sub_point: "Technological support",
                },
                {
                  id: 8,
                  sub_point: "Information sources",
                },
              ],
            },
            {
              id: 5,
              point: "Develop and Review Partnerships: ",
              description:
                "Develop and review partnerships and networks to support provision of impartial IAG and referral to appropriate partners and other external agencies/services",
            },
            {
              id: 6,
              point: "Embed IAG in Quality Assurance: ",
              description:
                "Embed IAG in quality assurance, staff development and training and the performance review/appraisal processes",
            },
            {
              id: 7,
              point: "Information, Advice and guidance Aim",
              description:
                "All Eden staff involved in the delivery of the IAG service are expected to support and potential learners, clients, employers and partners to make informed choices by giving IAG that is: ",
              sub_points: [
                {
                  id: 1,
                  sub_point:
                    "Impartial: We won’t look at learning programmes delivered by Eden and our partners organisations. We will help clients look at what other providers are offering. They will be told how to find out more–perhaps given a phone number or website address, and other referral appointments made for clients where Eden unable to provide the service.",
                },
                {
                  id: 2,
                  sub_point:
                    "Confidential:Nothing from the discussion will be shared with anyone else without the client’s knowledge or permission. Except the exclusions to confidentiality of which all Advisers and practitioners are aware of.",
                },
                {
                  id: 3,
                  sub_point:
                    "Fair: Clients will be treated fairly and equally, in line with the Eden College, Equality, Diversity and Inclusion Policy",
                },
                {
                  id: 4,
                  sub_point:
                    "Transparent: Learners, clients and stakeholders will be told what will happen. If, at anytime, learners do not understand what is going on, they will been courage to ask their Learning, Development Adviser and Careers Advisers to explain.",
                },
              ],
            },
            {
              id: 7,
              point: "IAG OBJECTIVES",
              sub_points: [
                {
                  id: 1,
                  sub_point:
                    "To provide impartial information, advice and guidance to learners at all stages of their learning journey, these include; pre-learning, induction, in-learning and post-learning on exit",
                },
                {
                  id: 2,
                  sub_point:
                    "To provide impartial information, advice and guidance to all learners that enables them to make informed choice about their options and next steps in relation to their chosen course’s programme/s and aspirations",
                },
                {
                  id: 3,
                  sub_point:
                    "To provide support that enables learners to develop self and opportunity awareness",
                },
                {
                  id: 4,
                  sub_point: "To achieve nationally recognized qualifications.",
                },
                {
                  id: 5,
                  sub_point:
                    "To makeapositiveprogressionintoemploymentorfurtherlearningand/ortraining",
                },
              ],
            },
            {
              id: 8,
              point: " In delivery these objectives Eden College staff will: ",
              sub_points: [
                {
                  id: 1,
                  sub_point:
                    "Establish effective communication with learners and potential learners.",
                },
                {
                  id: 2,
                  sub_point:
                    "Identify information requested by learners and potential learners.",
                },
                {
                  id: 3,
                  sub_point:
                    "Supply information materials to learners and potential learners.",
                },
                {
                  id: 4,
                  sub_point:
                    "Assist learners and potential learners to clarify their requirements.",
                },
                {
                  id: 5,
                  sub_point:
                    "Identify a range of options for achieving learner requirements.",
                },
                {
                  id: 6,
                  sub_point:
                    "Enable learners and potential learners to select a course of action.",
                },
                {
                  id: 7,
                  sub_point: "Maintain and improve information material.",
                },
              ],
            },
          ],
        },
      ],
      table: {
        title: "Eden College Information, Advice & Guidance Process",
        paragraph:
          "The process flow diagram over leaf outlines the IAG process steps and opportunities to deliver information, advice and guidance.",
        processData: {
          columns: [
            {
              header: "Pre-Learning",
              sections: [
                {
                  title: "EMPLOYER",
                  items: [
                    "Organisational Needs Analysis",
                    "Investigate Training Plan",
                    "Continuous Improvement Plan",
                    "Agree Outcomes to be achieved",
                    "Advise learning and development outcomes to be delivered",
                  ],
                },
              ],
            },
            {
              header: "In Learning",
              sections: [
                {
                  title: "LEARNER",
                  items: [
                    "IAG Guidance notes",
                    "My Learning Journey",
                    "My Personal Skills Review",
                    "My Programme Plan and Tracker",
                    "Enrolment & Data Capture Form",
                    "Apprenticeship IAG document",
                  ],
                },
              ],
            },
            {
              header: "Learning",
              sections: [
                {
                  title: "LEARNER",
                  items: [
                    "Learner Progress Reviews - monthly",
                    "Process Tracker",
                    "One to One meeting",
                    "Project Updates",
                  ],
                },
                {
                  title: "EMPLOYER",
                  items: [],
                },
              ],
            },
            {
              header: "Post-Learning",
              sections: [
                {
                  title: "LEARNER",
                  items: [
                    "Final Progress Review",
                    "Final interview",
                    "Exit Interview",
                    "Learner Questionnaire",
                  ],
                },
                {
                  title: "EMPLOYER",
                  items: [],
                },
              ],
            },
            {
              header: "Support Process",
              sections: [
                {
                  title: "",
                  items: [
                    "IAG Policy",
                    "Appraisal Process",
                    "Strategic Plan",
                    "Information Hand-outs",
                    "IAG Observation",
                    "Lesson Observations",
                    "Equality, Diversity and inclusion",
                    "Safeguarding Policy",
                    "Confidentiality & Professional integrity",
                    "Continuing Professional Development",
                  ],
                },
              ],
            },
          ],
        },
        toc: [
          {
            id: 1,
            text: "Feedback and Continuous Improvement",
          },
          {
            id: 2,
            text: "Progress Trackers",
          },
          {
            id: 3,
            text: "Standardisation Meetings",
          },
          {
            id: 4,
            text: "Monthly Meetings",
          },
          {
            id: 5,
            text: "Team Meetings",
          },
          {
            id: 6,
            text: "Lessons Observations",
          },
          {
            id: 7,
            text: "IAG Process Observation",
          },
          {
            id: 8,
            text: "CPD Process",
          },
          {
            id: 9,
            text: "Learner Questionnaire",
          },
        ],
      },
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
          id: "employer",
          label: "Employer",
          placeholder: "Employer",
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
          id: "ldaName",
          label: "Learning and Development Adviser Name",
          placeholder: "LDA Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "ldaSignature",
          label: "Learning and Development Adviser Signature",
          placeholder: "LDA Signature",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "eldaName",
          label: " Eden College Allocated LDA",
          placeholder: "LDA Name",
          validation: z.string().min(2).max(100),
        },
        {
          type: "text",
          id: "eldaSignature",
          label: " Eden College Allocated LDA Signature",
          placeholder: "LDA Signature",
          validation: z.string().min(2).max(100),
        },
        {
          type: "checkbox",
          id: "agreement",
          label: "I confirm that I have read and understood the above policy.",
          validation: z.boolean().refine((value) => value === true, {
            message: "You must check this box to continue.",
          }),
        },
      ],
    },
    enrollmentForm: {
      id: 1,
      title: "LEARNER ENROLMENT & DATA CAPTURE FORM 2024/2025",
      fields: [
        {
          type: "text",
          id: "topsid",
          label: "TOPSID",
          placeholder: "Enter TOPSID",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "uln",
          label: "ULN",
          placeholder: "Enter ULN",
          validation: z.string(),
        },
        {
          type: "text",
          id: "learnerReference",
          label: "Learner Reference",
          placeholder: "Enter Learner Reference",
          validation: z.string().optional(),
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
              label: "Title (Mr./Mrs./Miss. etc.)",
              placeholder: "Enter Title",
              validation: z.string().max(10),
            },
            {
              type: "date",
              id: "dateOfBirth",
              label: "Date of Birth",
              placeholder: "Enter Date of Birth",
              validation: z.string().date(),
            },
            {
              type: "text",
              id: "firstName",
              label: "First Name",
              placeholder: "Enter First Name",
              validation: z.string().min(2).max(50),
            },
            {
              type: "text",
              id: "surname",
              label: "Surname",
              placeholder: "Enter Surname",
              validation: z.string().min(2).max(50),
            },
            {
              type: "number",
              id: "ageOnAug312024",
              label: "Age on 31 August 2024",
              placeholder: "Enter Age",
              validation: z.string(),
              min: 0,
              max: 100,
            },
            {
              type: "tel",
              id: "nationalInsuranceNumber",
              label: "National Insurance Number",
              placeholder: "Enter National Insurance Number",
              validation: z.string(),
            },
            {
              type: "radio",
              id: "gender",
              label: "Gender",
              options: [
                { label: "Female", value: "Female" },
                { label: "Male", value: "Male" },
              ],
              validation: z.enum(["Female", "Male"]),
            },
            {
              type: "text",
              id: "address",
              label: "Address",
              placeholder: "Enter Address",
              validation: z.string().max(200),
            },
            {
              type: "text",
              id: "postcode",
              label: "Postcode",
              placeholder: "Enter Postcode",
              validation: z.string().max(10),
            },
            {
              type: "tel",
              id: "homePhone",
              label: "Home Phone",
              placeholder: "Enter Home Phone",
              validation: z.string(),
            },
            {
              type: "tel",
              id: "mobile",
              label: "Mobile",
              placeholder: "Enter Mobile",
              validation: z.string(),
            },
            {
              type: "email",
              id: "emailAddress",
              label: "E-Mail Address",
              placeholder: "Enter Email",
              validation: z.string().email(),
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
              label: "Emergency Contact Name",
              placeholder: "Enter Emergency Contact Name",
              validation: z.string().min(2).max(100),
            },
            {
              type: "text",
              id: "relationshipToContact",
              label: "Relationship to Contact",
              placeholder: "Enter Relationship",
              validation: z.string().max(50),
            },
            {
              type: "tel",
              id: "emergencyContactMobile",
              label: "Emergency Contact Mobile Number",
              placeholder: "Enter Emergency Contact Mobile",
              validation: z.string(),
            },
            {
              type: "email",
              id: "emergencyContactEmail",
              label: "Emergency Contact Email Address",
              placeholder: "Enter Emergency Contact Email",
              validation: z.string().email().optional(),
            },
            {
              type: "text",
              id: "emergencyContactAddress",
              label: "Emergency Contact Address",
              placeholder: "Enter Emergency Contact Address",
              validation: z.string().max(200),
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
              validation: z.string().optional(),
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
              validation: z.string().optional(),
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
              label: "First Language",
              placeholder: "Enter First Language",
              validation: z.string().max(50),
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
              validation: z.string().optional(),
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
          p: "Do you consider yourself to a disability, learning difficulty or health problem?",
          fields: [
            {
              type: "checkbox",
              id: "visualImpairment",
              label: "Visual impairment",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "hearingImpairment",
              label: "Hearing impairment",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "mobilityDisability",
              label: "Disability affecting mobility",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "profoundComplexDisability",
              label: "Profound complex disability",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "socialEmotionalDifficulties",
              label: "Social and emotional difficulties",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "mentalHealthDifficulty",
              label: "Mental health difficulty",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "otherMedicalCondition",
              label:
                "Other medical condition (e.g. epilepsy, asthma, diabetes)",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "moderateLearningDifficulty",
              label: "Moderate learning difficulty",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "severeLearningDifficulty",
              label: "Severe learning difficulty",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "dyslexia",
              label: "Dyslexia",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "dyscalculia",
              label: "Dyscalculia",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "autismSpectrumDisorder",
              label: "Autism Spectrum disorder",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "aspergersSyndrome",
              label: "Asperger’s Syndrome",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "otherDisability",
              label: "Other disability",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "preferNotToSay",
              label: "Prefer not to say",
              options: ["Yes", "No"],
              validation: z.boolean(),
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
          p: "Would you find learning easier with the following support? Please tick if appropriate.",
          fields: [
            {
              type: "checkbox",
              id: "readingWritingSupport",
              label: "Reading and writing support",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "mathSupport",
              label: "Math’s support",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "englishLanguageSupport",
              label: "English language support",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "equipmentSupport",
              label: "Equipment support",
              options: ["Yes", "No"],
              validation: z.boolean(),
            },
            {
              type: "checkbox",
              id: "otherSpecialistSupport",
              label: "Other specialist support",
              options: ["Yes", "No"],
              validation: z.boolean(),
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
              label:
                "Are you registered with your local Job Centre Plus Office?",
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
              placeholder:
                "Which country have you lived in for the last 3 years?",
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
          title:
            "Data we collect and why Courses where we do not receive funding",
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
              label:
                "I agree to be contacted about future learning opportunities.",
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
              label:
                "I confirm that the information I have provided is accurate.",
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
    },
    privacyNotice: {
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
    },
    award: {
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
    },
    employerAgreement: {
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
    },
    participantAgreement: {
      id: 14,
      title: "PARTICIPANT AGREEMENT",
      agreement: [
        {
          type: "checkbox",
          id: "courseInfoConfirm",
          label: "I agree	to	notify	Eden College if: ",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
      ],
      notificationConditions: [
        "I take any time off due to sickness.",
        "I give notice or intend to leave my current place of work.",
        "I am given notice or dismissed from my current job.",
        "I take a holiday exceeding 10 working days",
        "I decided not to attend any longer",
      ],
      agreementConditions: {
        title: "I also agree: ",
        conditions: [
          "That I have left and do not plan to return to full time education",
          "To carry out the tasks set by my Learning and Development Adviser within the agreed timescale",
          "To not cancel appointments except in exceptional circumstances",
          "To be punctual for appointments and bring all items/evidence required",
          "To inform Eden College of any changes in my personal or working circumstances",
          "To inform Eden College of any accidents or near misses that I have at work",
          "To attend, if necessary, underpinning knowledge-training sessions",
        ],
        formFields: [
          {
            type: "text",
            id: "participantAgreementSignature",
            label: "Signature",
            placeholder: "Signature",
            validation: z.string().optional(),
          },
          {
            type: "date",
            id: "dateOfParticipantAgreement",
            label: "Date of Agreement",
            placeholder: "Enter Date of Agreement",
            validation: z.string().date(),
          },
        ],
      },
      collegeInformation: {
        title: "College Information",
        LDA: {
          text: "Your Learning and Development Adviser is Eden College Allocated LDA Your Learning and Careers Adviser is",
          name: "Freda Jacobson",
        },
        contactPerson: {
          text: "Should you have any questions or issues please contact either your Allocated Learning and Development Adviser and for information, advice and guidance support contact",
          name: "Freda Jacobson",
        },
      },
    },
    extremisimPolicy: {
      id: 14,
      title: "Preventing Extremism and Radicalisation Policy",
      description:
        "Eden College is committed to providing a secure environment for learners and stakeholders, where learners feel safe and are kept safe. Eden College recognizes that safeguarding is everyone’s responsibility irrespective of the role they undertake or whether their role has direct contactor responsibility for learners or not.",
      content: [
        {
          title:
            "Safeguarding vulnerable people from radicalization is no different from safeguarding them from other forms of harm’ (Home Office, Prevent Strategy – June2015)",
          paragraphs: [
            "Eden College delivery of the outcomes to all learners, as set out in s10(2) of the Children’s Act 2004.This Preventing Extremism and Radicalisation Safeguarding Policy is one element with in our overall arrangements to safeguarding and promote the welfare of all learners in line with our statutory duties set out at s175 of the Education Act 2002.",
            "Our College’s Preventing Extremism and Radicalisation Safeguarding Policy also draws upon the guidance contained in the DfE publication “Keeping Learners safe in Education, 2014”, and specifically DCSF Resources “Learning Together to be Safe, “Prevent: Resources Guide”, “Tackling Extremism in the UK”, DfE’s “Teaching Approaches that help build resilience to Extremism among Young People”, Peter Clarke’s Report (July2014), “Keeping Children Safe in Education” (April2020), the “Counter –Terrorism and Security Act”(2015)and the “Prevent Duty”(June2015).",
            "We recognize that the management has a responsibility to pay ‘due respect to the need to prevent people being drawn into terrorism’ (Counter Terrorism and Security Act, 2015) and ensure the College has a clear approach to implementing the Prevent duty and keeping learners safe from the dangers of radicalisation and extremism’.",
          ],
          lists: {
            title: "Links to other policies",
            p: "The Preventing Extremism and Radicalisation Policy links to the following College policies;",
            li: [
              "Safeguarding Policy and Child Protection",
              "Staffs afer working practices policy",
              "Equal Opportunity Policy",
              "Anti – bullying Policy",
              "Getting It Right Policy",
              "E – Safety Policy",
            ],
          },
        },
        {
          title: "Objectives",
          paragraphs: [
            "The Preventing Radicalisation and Extremism Policy is intended to provide a framework for dealing with issues relating to vulnerability, radicalization and exposure to extreme views.",
            "There are different forms of extremist organisations in the UK and the world, i.e.–ISIL (Islamic State), AL – Qaeda, Boko Haram,   British Defense League, Animal Rights extremist groups such as SPEAK, Irish Republican Army (IRA), Anti–Abortion Groups, to name a few.",
            "We recognise that we are well placed to be able to identify safeguarding issues linked to the dangers of extremist views and this policy clearly sets out how the college will deal with such incidents and identifies how the curriculum and ethos underpins our actions.",
          ],
          lists: {
            title: "",
            p: "The objectives are that:",
            li: [
              "All staff including – teachers, teaching assistants and non–teaching staff will have an understanding of what radicalization and extremism are and why we need to be vigilant in college.",
              "All staff, teachers, teaching assistants and non–teaching staff will know what the college policy is on tackling extremism and radicalisation and will follow the policy guidance swiftly when issues arise.",
              "All members of staff are able to identify learners who may be vulnerable to radicalisation and respond by following whole colleague safeguarding procedures with immediate effect.",
              "All learners will understand the dangers of radicalization and exposure to extremist views; learning about key British values to build resilience against these views and knowing what to do if they experience them.",
              "All parents/carers and learners will know that the College has policies in place to keep Learners safe from harm and that the College regularly reviews its systems to ensure they are appropriate and effective.",
            ],
          },
        },
        {
          title: "Definitions",
          paragraphs: [
            "When operating this policy College uses the following accepted Governmental definition of radicalisation and extremism which is: Radicalisation – ‘the process by which a person comes to support terrorism or forms of extremism leading to terrorism’(Prevent Strategy)",
            "Extremism–‘vocal or active opposition to fundamental British values, including democracy, the rule of law, individual liberty, and mutual respect tolerance of different faith and beliefs; and/or calls for the death of members in our armed forces, whether in this country or oversees’ (Prevent).",
          ],
          lists: {
            title: "",
            p: "",
            li: [],
          },
        },
        {
          title: "Ethos and Practice",
          paragraphs: [
            "There is no place for extremist views of any kind in our College, whether from internal sources– learners, staff orgovernors, or external sources–college community, external agencies or individuals. Our learners see our Colleges a safe place where they can explore controversial issues safely and where our teachers encourage and facilitate this –we have a duty to ensure this happens.",
            "As a College we recognise that extremism and exposure to extremist materials and influences can lead to poor outcomes for learners and so should be addressed as a safeguarding concern as set out in this policy. We also recognize that if we fail to challenge extremist views we are failing to protect our learners, staff and other visitors to our college.",
            "Extremists of all persuasions aim to develop destructive relationships between different communities by promoting division, and mistrust of others based on ignorance or prejudice and thereby limiting the life chances of young people. Education is a powerful weapon against this; equipping young people, adults and others with the knowledge, skills and critical thinking to challenge and debate in an informed way. Therefore at Eden College we will provide a broad and balanced curriculum so that our learners are enriched, understand and become tolerant of difference and diversity and also to ensure that they thrive, feel valued and not marginalised.",
            "Furthermore, at Eden College we are aware that learners can be exposed to extremist influences or prejudiced views from an early age which emanate from a variety of sources and media, including via the internet and at times learners themselves reflect or display views that may be discriminatory, prejudices or extremist, including using derogatory language. As part of our whole college e–safety programme we highlight the potential risks learners may face in relation to on–line radicalization and encourage students to report any concerns they may have for themselves or other students to their Learning and Development Adviser or the Confide system, to the Principle Learning and Development Adviser/ Managing Director.",
            "Discrimination or extremist views, including derogatory language, displayed by learners or staff will always be challenged and where appropriate dealt with in line with our getting-it-Right system and the Code of Behaviour for staff. There is no single way of identifying a learner who is likely to be susceptible to terrorist ideology.",
          ],
          lists: {
            title: "",
            p: "As part of wider safeguarding responsibilities staff will be alert to:",
            li: [
              "Disclosures by learners of their exposure to extremist actions, views or materials of others outside of college such as in their homes or community groups, especially where learners have not actively sought this out.",
              "Graffiti symbols, writing or artwork promoting extremist messages or images.",
              "Learners accessing extremist materials online, including through, social networking sites.",
              "Distributing extremist literature and documentation.",
              "Parental reports of changes in behaviour, friendship or actions and requests for assistance.",
              "Partner schools, local authority services and police reports of issues affecting learners in other schools or settings.",
              "Learners voicing opinions drawn from extremist ideologies and narratives.",
              "Changes in behaviour which could indicate that they are in need of help or protection.",
              "Use of extremist or ‘hate’ terms to exclude others or incite violence",
              "Intolerance of difference, whether secular or religious or, in line with in our equalities policy, views based on but not exclusive to gender, disability, homophobia, race, colour or culture.",
              "Attempts to impose extremist views or practices on others.",
              "Anti–Western or Anti–British views.",
            ],
          },
        },
        {
          title: "",
          paragraphs: [],
          lists: {
            title: "",
            p: "Use of extremist language:",
            li: [
              "‘Dawlah’ –term used by ISIL to refer to the ‘Islamic state’",
              "‘Jihad’ – means ‘struggle’ or ’violence’",
              "‘Caliphate’– ISIL supporters describe the territory they control in Iraq/Syria",
              "‘Mujahid’– someone who wants to fights as part of the ‘Jihad’",
              "‘Shahada’ – refers to someone considered to be a martyr.",
              "‘Kuffar’ – a term used by ISIL to describe non–Muslims",
              "‘Ummah’ – the phrase is used by ISIL to refer to the ‘world community of Muslims’",
              "‘Rafidha’ – word is used by ISIL to refer to those who refuse to accept the Islamic state. ",
            ],
          },
        },
        {
          title: "",
          paragraphs: [],
          lists: {
            title: "",
            p: "We recognize that learners in vulnerable social and domestic situations (mental health issues, single parent families, involvement in gangs) may be at greater risk of radicalization than other learners. Through weekly safeguarding meetings information is shared on targeted learners and appropriate external support accessed as necessary. In conclusion we will closely follow any locally agreed procedure as set out by the Local Authority and criteria for safeguarding individuals vulnerable to extremism and radicalisation.",
            li: [],
          },
        },
        {
          title: "Ethos and Approach ",
          paragraphs: [
            "We will all strive to eradicate the myths and assumptions that can lead to some learners becoming alienated and disempowered, especially where the narrow approaches learners may experience elsewhere may make it harder for them to challenge or question these radical influences.",
            "This guidance and support will be delivered through the whole College curriculum, form programme and PSD coverage. We will ensure that all of our support and approaches will help our Learners build resilience to extremism and give them a positive sense of identity through the development of critical thinking skills.",
            "We will develop strategies and staff training to ensure that all our staff are equipped to recognise extremism and are skilled and confident enough to challenge it.",
          ],
          lists: {
            title: "",
            p: "",
            li: [],
          },
        },
      ],
      formFields: [
        {
          type: "checkbox",
          id: "extremisimPolicyAgreed",
          label: "I confirm that I have read and understood the above policy.",
          options: ["Yes", "No"],
          validation: z.boolean(),
        },
        {
          type: "text",
          id: "extremismCandidateName",
          label: "Candidate Name",
          placeholder: "Candidate Name",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "extremismCandidateEmployer",
          label: "Employer",
          placeholder: "Employer",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "extremismCourseDetails",
          label: "Course/Project Details",
          placeholder: "Course/Project Details",
          validation: z.string().optional(),
        },
        {
          type: "text",
          id: "extremismCandidateSignature",
          label: "Candidate Signature",
          placeholder: "Candidate Signature",
          validation: z.string().optional(),
        },
        {
          type: "date",
          id: "extremismDate",
          label: "Date",
          placeholder: "Enter Date",
          validation: z.string().date(),
        },
      ],
      official: {
        title: "FOR OFFICIALS ONLY",
        formFields: [
          {
            type: "text",
            id: "extremismLDAName",
            label: "Learning and Development Adviser Name",
            placeholder: "Learning and Development Adviser Name",
            validation: z.string().optional(),
          },
          {
            type: "text",
            id: "extremismECAName",
            label: "Eden College Allocated LDA",
            placeholder: "Employer",
            validation: z.string().optional(),
          },
          {
            type: "text",
            id: "extremismLDASignature",
            label: "Learning and Development Adviser Signature",
            placeholder: "Learning and Development Adviser Signature",
            validation: z.string().optional(),
          },
          {
            type: "text",
            id: "extremismECASignature",
            label: "Eden College Allocated LDA Signature",
            placeholder: "Eden College Allocated LDA Signature",
            validation: z.string().optional(),
          },
          {
            type: "date",
            id: "extremismOficialDate",
            label: "Date",
            placeholder: "Enter Date",
            validation: z.string().date(),
          },
        ],
      }
    },
  },
];
