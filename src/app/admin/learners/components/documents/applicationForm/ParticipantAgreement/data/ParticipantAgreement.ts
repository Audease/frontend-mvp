import { z } from "zod";

export const participantAgreementData = {
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
};
