// Full-length exam definitions
const FULL_EXAMS = [
  {
    id: 'exam_1',
    title: 'Full-Length Practice Exam 1',
    sections: [
      {
        id: 'cp',
        label: 'Chemical & Physical Foundations',
        abbrev: 'C/P',
        timeMin: 95,
        questions: EXAM1_CP_QUESTIONS
      },
      {
        id: 'cars',
        label: 'Critical Analysis & Reasoning Skills',
        abbrev: 'CARS',
        timeMin: 90,
        passageBased: true,
        // Real CARS: 9 passages, 53 questions, 90 minutes
        passageIds: ['p_cars_1','p_cars_2','p_cars_3','p_cars_4','p_cars_5','p_cars_6','p_cars_7','p_cars_8','p_cars_9']
      },
      {
        id: 'bb',
        label: 'Biological & Biochemical Foundations',
        abbrev: 'B/B',
        timeMin: 95,
        questions: EXAM1_BB_QUESTIONS
      },
      {
        id: 'ps',
        label: 'Psychological, Social & Biological Foundations',
        abbrev: 'P/S',
        timeMin: 95,
        questions: EXAM1_PS_QUESTIONS
      }
    ]
  }

  ,{
    id: 'exam_2',
    title: 'Full-Length Practice Exam 2',
    sections: [
      {
        id: 'cp',
        label: 'Chemical & Physical Foundations',
        abbrev: 'C/P',
        timeMin: 95,
        questions: EXAM2_CP_QUESTIONS
      },
      {
        id: 'cars',
        label: 'Critical Analysis & Reasoning Skills',
        abbrev: 'CARS',
        timeMin: 90,
        passageBased: true,
        // Real CARS: 9 passages, 53 questions, 90 minutes
        passageIds: ['p_e2cars_1','p_e2cars_2','p_e2cars_3','p_e2cars_4','p_e2cars_5','p_e2cars_6','p_e2cars_7','p_e2cars_8','p_e2cars_9']
      },
      {
        id: 'bb',
        label: 'Biological & Biochemical Foundations',
        abbrev: 'B/B',
        timeMin: 95,
        questions: EXAM2_BB_QUESTIONS
      },
      {
        id: 'ps',
        label: 'Psychological, Social & Biological Foundations',
        abbrev: 'P/S',
        timeMin: 95,
        questions: EXAM2_PS_QUESTIONS
      }
    ]
  }
];
