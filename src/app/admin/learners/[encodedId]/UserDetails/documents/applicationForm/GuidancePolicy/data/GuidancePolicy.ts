import { z } from "zod";

export const guidancePolicyData = {
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
      editableBy: ["learner", "accessor"],
      label: "Employer",
      placeholder: "Employer",
      validation: z.string().optional(),
    },
    {
      type: "signature",
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
      type: "signature",
      id: "ldaSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: "Learning and Development Adviser Signature",
      placeholder: "LDA Signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA signature must be at least 2 characters.",
      }),
    },
    {
      type: "text",
      id: "eldaName",
      section: "admin",
      editableBy: ["accessor"],
      label: " Eden College Allocated LDA",
      placeholder: "ELDA Name",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "ELDA name must be at least 2 characters.",
      }),
    },
    {
      type: "signature",
      id: "eldaSignature",
      section: "admin",
      editableBy: ["accessor"],
      label: " Eden College Allocated LDA Signature",
      placeholder: "ELDA Signature",
      validation: z.string().refine((value) => !value || value.trim().length >= 2, {
        message: "LDA signature must be at least 2 characters.",
      }),
    },
  ],
};
