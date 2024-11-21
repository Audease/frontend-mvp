import { z } from "zod";

export const healthandSafetyData = {
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
      validation: z.string().min(2).max(100),
    },
    {
      type: "text",
      id: "employer",
      section: "learner",
      editableBy: ["learner"],
      label: "Employer",
      placeholder: "Employer",
      validation: z.string().min(2).max(100),
    },
    {
      type: "text",
      id: "courseDetails",
      section: "learner",
      editableBy: ["learner"],
      label: "Course/Project Details",
      placeholder: "Course/Project Details",
      validation: z.string().min(2).max(100),
    },
    {
      type: "text",
      id: "candidateSignature",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Signature",
      placeholder: "Candidate Signature",
      validation: z.string().min(2).max(100),
    },
    {
      type: "text",
      id: "ldaName",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Name",
      placeholder: "LDA Name",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA name must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "ldaSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Signature",
      placeholder: "LDA Signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA signature must be at least 2 characters.",
      }),
    },
  ],
};
