import { z } from "zod";

export const childProtection = {
  id: 1,
  title: "Safeguarding and Child Protection Policy",
  description:
    "Eden College fully recognises its responsibilities safeguarding and child protection.",
  points: [
    {
      text: "Our policy applies to all staff, learners and volunteers working in the College. There are five main elements to our policy:",
      points: [
        "Ensuring we practice safe recruitment in checking the suitability of staff and volunteers to work with learners.",
        "Raising awareness of safeguarding child protection, present and FGM issues and equipping learners with the skills needed to keep them safe.",
        "Developing and then implementing procedures for identifying and reporting cases, or suspected cases, of abuse.",
        "Supporting learners who have been abused in accordance with his/her agreed safeguarding and protection plan.",
        "Establishing a safe environment in which learners can learn and develop.",
      ],
    },
    {
      text: "We recognise that because of the day to day contact with learners, College staffs are well placed to observe the outward signs of abuse. Eden College will therefore:",
      points: [
        "Establish and maintain an environment where learners feel secure, are encouraged to talk, and are listened to.",
        "Ensure learners know that there are adults in the College whom they can approach if they are worried. Designated/lead safeguarding offer-being Freda Jacobson.",
        "Include opportunities in the curriculum for learners to develop the skills they need to recognise and stay safe from abuse.",
      ],
    },
    {
      text: "We will follow the procedures set out by the Local Safeguarding Learners Board and take account of guidance issued by the Department for Education and Skills to:",
      points: [
        "Ensure every member of staff (including temporary and supply staff and volunteers) and governing body knows the name of the designated senior person responsible for safeguarding and child protection and their role.(Freda Jacobson Designated safeguarding and child protection – Managing Director and Principal Learning and Development Adviser)",
        "Ensure all staff and volunteers understand their responsibilities in being alert to the signs of abuse and responsibility for referring any concerns to the designated senior person responsible for protection.",
        "Ensure that learners, staff and officers, including visitors have an understanding of the responsibility placed on the college for safeguarding and child protection by setting out its obligations in the college prospectus/leaflets and other publishing materials",
        "Notify social services if there is an unexplained absence of more than two days of a learner who is on the safeguarding and child protection register.",
        "Develop effective links with relevant agencies and co-operate as required with their enquiries regarding safeguarding and child protection matters including attendance at case conferences.",
        "Keep written records of concerns about learners, even where there is no need to refer the matter immediately.",
        "Ensure all records are kept securely; separate from the main learner file, and in locked locations.",
        "Develop and then follow procedures where an allegation is made against a member of staff or volunteer.",
        "Ensure safe recruitment practices are always followed.",
      ],
    },
    {
      text: "We recognise that learners who are abused or witness violence may find it difficult to develop a sense of self-worth. They may feel helplessness, humiliation and some sense of blame. Eden College may be the only stable, secure and predictable element in the lives of learners at risk. When at College their behaviour may be challenging and defiant or they may be withdrawn. Eden College will endeavour to support learners through:",
      points: [
        "The content of the curriculum.",
        "The college ethos which promotes a positive, supportive and secure environment and gives learner a sense of being valued.",
        "The college behaviour policy which is aimed at supporting vulnerable learner in the college. The college will ensure that the learner knows that some behaviour is unacceptable but they are valued and not to be blamed for any abuse which has occurred.",
        "Liaison with other agencies that support the learner such as social services, Child and Adult Mental Health Service, education welfare service and educational psychology service.",
        "Ensuring that, where a learner on the child protection register leaves, their information is transferred to the new provision immediately and that the child's social worker is informed.",
      ],
    },
  ],
  formFields: [
    {
      type: "checkbox",
      id: "childProtectionPolicyCheck",
      section: "learner",
      editableBy: ["learner"],
      label: "I confirm that I have read and understood the above policy.",
      validation: z.boolean().refine((value) => value === true, {
        message: "You must agree to the terms and conditions",
      }),
    },
    {
      type: "text",
      id: "childProtectionName",
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
      id: "childProtectionEmployer",
      section: "learner",
      editableBy: ["learner"],
      label: "Employer",
      placeholder: "Employer",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Employer must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "childProtectionCourseDetails",
      section: "learner",
      editableBy: ["learner"],
      label: "Course/Project Details",
      placeholder: "Course/Project Details",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Course details must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "childProtectionCandidateSignature",
      section: "learner",
      editableBy: ["learner"],
      label: "Candidate Signature",
      placeholder: "Type in your surname and credentials to append signature",
      validation: z.string().refine((value) => value.trim().length >= 2, {
        message: "Signature must be at least 2 characters.",
      }),
    },
    {
      type: "date",
      id: "childProtectionDate",
      section: "learner",
      editableBy: ["learner"],
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
        id: "childProtectionLDAName",
        section: "admin",
        editableBy: ["accessor"],
        label: "Learning and Development Adviser Name",
        placeholder: "Learning and Development Adviser Name",
        validation: z
            .string()
            .refine((value) => !value || value.trim().length >= 2, {
              message: "Adviser Name must be at least 2 characters.",
            }),
      },
      {
        type: "text",
        id: "childProtectionECAName",
        section: "admin",
        editableBy: ["accessor"],
        label: "Eden College Allocated LDA",
        placeholder: "Eden College Allocated LDA",
        validation: z
            .string()
            .refine((value) => !value || value.trim().length >= 2, {
              message: "LDA Name must be at least 2 characters.",
            }),
      },
      {
        type: "text",
        id: "childProtectionLDASignature",
        section: "admin",
        editableBy: ["accessor"],
        label: "Learning and Development Adviser Signature",
        placeholder: "Learning and Development Adviser Signature",
        validation: z
            .string()
            .refine((value) => !value || value.trim().length >= 2, {
              message: "LDA Signature must be at least 2 characters.",
            }),
      },
      {
        type: "text",
        id: "childProtectionECASignature",
        section: "admin",
        editableBy: ["accessor"],
        label: "Eden College Allocated LDA Signature",
        placeholder: "Eden College Allocated LDA Signature",
        validation: z
            .string()
            .refine((value) => !value || value.trim().length >= 2, {
              message: "ELDA Name must be at least 2 characters.",
            }),
      },
      {
        type: "date",
        id: "childProtectionOficialDate",
        section: "admin",
        editableBy: ["accessor"],
        label: "Date",
        placeholder: "Enter Date",
        validation: z.string().optional(),
      },
    ],
  },
};
