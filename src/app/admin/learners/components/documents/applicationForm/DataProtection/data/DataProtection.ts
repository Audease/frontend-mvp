import { z } from "zod";

export const dataProtectionData = {
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
      section: "learner",
      editableBy: ["learner"],
      label:
        "I confirm that I have read the summary of Eden college Data Protection policy set out in this form and consent to the Eden college holding and processing the categories of personal data about me in the attached schedule for the specified purposes (summarised therein) in respect of my application(s) for admission, as a learner if successful, and after completion and achievement.",
      validation: z.boolean().refine((value) => value === true, {
        message: "You must check this box to continue.",
      }),
    },
    {
      type: "checkbox",
      id: "altConfirm",
      section: "learner",
      editableBy: ["learner"],
      label:
        "In the event that my application to Eden College is unsuccessful I consent to my personal data held on computer and in my files being passed to a not her training organisation for consideration for admission.",
      validation: z.boolean().refine((value) => value === true, {
        message: "You must check this box to continue.",
      }),
    },
    {
      type: "checkbox",
      id: "feedbackConfirm",
      section: "learner",
      editableBy: ["learner"],
      label:
        "I have read and understand the statement on the confidentiality of the admissions process as outlined above and I accept this. I am also aware of the feedback arrangements.",
      validation: z.boolean().refine((value) => value === true, {
        message: "You must check this box to continue.",
      }),
    },
    {
      type: "text",
      id: "fullName",
      section: "learner",
      editableBy: ["learner"],
      label: "Full Name",
      placeholder: "Full Name",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Candidate Name must be at least 2 characters.",
      }),
    },
    {
      label: "Subject / Course Applied for",
      type: "text",
      section: "learner",
      editableBy: ["learner"],
      id: "CourseAppliedfor",
      placeholder: "Subject / Course Applied for",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Course applied for must be at least 2 characters.",
      }),
    },
  ],
};
