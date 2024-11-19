import { z } from "zod";

export const skillsAssesment = {
  id: 1,
  title: "Skills Self-Assessment",
  instructions:
    "Respond to each statement below as honestly as you can, indicating whether it is an accurate description of you. At the end of the assessment, you will see your scores to see which are your strongest and weakest aspects of the PLTS skills. You can then decide how to work on improving these areas.",
  grade: [
    { digit: "1", text: "Never" },
    { digit: "2", text: "Rarely" },
    { digit: "3", text: "Sometimes" },
    { digit: "4", text: "Usualy" },
    { digit: "5", text: "Always" },
  ],
  sections: [
    {
      title: "Section 1: Self-Management",
      variables: [
        {
          id: "getting_involved",
          name: "I am always looking for new challenges or opportunities to get involved with things",
        },
        {
          id: "perseverance",
          name: "I can persevere with a task or challenge, even when the going gets tough",
        },
        {
          id: "organisation",
          name: "I can organise my time and resources effectively",
        },
        {
          id: "balance",
          name: "I can balance my time between school work, homework and other activities",
        },
        {
          id: "coping",
          name: "I can cope well when the situation changes, and I know where to go for help when I need it",
        },
        {
          id: "manage_emotions",
          name: "I can manage my own emotions in difficult times and I build good relationships with my peers",
        },
      ],
    },
    {
      title: "Section 2: Team-Working",
      variables: [
        {
          id: "group_work",
          name: "I can work well with any group, even if it’s not a group of friends",
        },
        {
          id: "idea_discussion",
          name: "I can discuss my ideas with working partners and come to an agreement",
        },
        {
          id: "behavioural_change",
          name: "I can change how I behave to either lead a group, or to help others",
        },
        {
          id: "encouragement",
          name: "I encourage other people to share their views, and I listen to them",
        },
        {
          id: "takin_up_reponsibilities",
          name: "I can take on a responsibility in a group, and make a good contribution",
        },
        {
          id: "giving_advice",
          name: "I can give good advice on how to improve, and act on advice when it is given to me",
        },
      ],
    },
    {
      title: "Section 3: Reflective Learning",
      variables: [
        {
          id: "success_criteria_scale",
          name: "I can use success criteria and scales to review and assess my own work",
        },
        {
          id: "target_setting",
          name: "I can set my own targets for improving my work",
        },
        {
          id: "improvement_identification",
          name: "I can look back over my work and identify how to improve it for myself",
        },
        {
          id: "taking_compliments",
          name: "I can take compliments, and advice for improvement, and respond positively",
        },
        {
          id: "identify_improvement",
          name: "I can identify ways in which I can improve as a learner",
        },
        {
          id: "work_presentation",
          name: "I can think of how best to present my work to suit a particular audience or need",
        },
      ],
    },
    {
      title: "Section 4: Creative Thinking",
      variables: [
        {
          id: "innovating_ideas",
          name: "I can come up with original and new ideas to complete a task or solve a problem",
        },
        {
          id: "investigating_things",
          name: "I can think of ways to extend my learning, asking new questions or investigating new things",
        },
        {
          id: "linking_lessons",
          name: "I can link together what I have learned in different places and lessons",
        },
        {
          id: "questioninig_thinking",
          name: "I can ask questions to check whether what someone is thinking is correct including myself",
        },
        {
          id: "trying_out_different_ways_of_working",
          name: "I can try out different ways of working and follow these through to completion",
        },
        {
          id: "idea_modification",
          name: "I can modify my ideas to adapt to new circumstances",
        },
      ],
    },
    {
      title: "Section 5: Effective Participation",
      variables: [
        {
          id: "taking_part_in_discussion",
          name: "I can take part in a discussion, and help to come to a decision or agreement",
        },
        {
          id: "communicationg_ideas",
          name: "I can put my ideas across well to others to persuade them of something",
        },
        {
          id: "thinking_of_ways_to_help_group",
          name: "I can think of ways to help my group to solve problems or achieve goals",
        },
        {
          id: "identify_better_ways_for_team_to_work_better",
          name: "I can identify ways in which my team can work better, and share these with them",
        },
        {
          id: "work_with_others_to_find_suitable_work_pattern",
          name: "I can work with others to find the best way of working to suit the whole team",
        },
        {
          id: "team_support_despite_initial_disagreement",
          name: "I can support my team and work towards a common goal, even if I did not agree at first",
        },
      ],
    },
    {
      title: "Section 6: Independent Enquiry",
      variables: [
        {
          id: "i_think_of_things_that_I_want_to_learn_about_for_myself",
          name: "I think of things that I want to learn about for myself",
        },
        {
          id: "i_can_find_out_about_things_independently",
          name: "I can find out about things independently",
        },
        {
          id: "i_can_easily_look_at_things_from_other_people’s_points_of_view",
          name: "I can easily look at things from other people’s points of view",
        },
        {
          id: "i’m_good_at_working_out_what_information_is_useful_and_accurate",
          name: "I’m good at working out what information is useful and accurate",
        },
        {
          id: "i_am_good_at_explaining_why_things_have_happened",
          name: "I am good at explaining why things have happened",
        },
        {
          id: "i_can_explain_my_answers_using_the_information_I_have_found_out",
          name: "I can explain my answers using the information I have found out",
        },
      ],
    },
  ],
  summary: {
    p: "Find the highest-scoring and the lowest-scoring sections of your assessment to complete the following statements:",
    formFields: [
      {
        type: "text",
        id: "strongestPLTS",
        label: "My strongest area of the PLTS skills is:",
        placeholder: "Candidate Name",
        validation: z.string().min(2).max(100),
      },
      {
        type: "text",
        id: "weakPLTS",
        label: "The area I most need to develop is:",
        placeholder: "Candidate Name",
        validation: z.string().min(2).max(100),
      },
    ],
  },
};
