/**
 * questions.js — Complete assessment question bank.
 *
 * Questions are organised in three groups:
 *  - commonQuestions:   asked of every student (class, language, career values)
 *  - questions9_10:     stream-selection questions for Classes 9 & 10
 *  - questions11_12:    career & degree questions for Classes 11 & 12
 *
 * Question shape:
 *  {
 *    id:          string  — unique key used in the answers payload
 *    question:    string  — displayed question text
 *    type:        'single' | 'multi' | 'text'
 *    options?:    Array<{ value: string, label: string, icon?: string }>
 *    required:    boolean
 *  }
 *
 * Full implementation (options, icons, copy) added in Phase 3.
 */

export const commonQuestions = [
  {
    id: 'language',
    question: 'Which language do you prefer?',
    type: 'single',
    required: true,
    options: [
      { value: 'English', label: 'English' },
      { value: 'Hindi',   label: 'Hindi (Coming Soon)' },
    ],
  },
  {
    id: 'career_values',
    question: 'What matters most to you in a career?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Helping Others',    label: 'Helping Others' },
      { value: 'Technology',        label: 'Technology' },
      { value: 'Creativity',        label: 'Creativity' },
      { value: 'Leadership',        label: 'Leadership' },
      { value: 'Financial Stability', label: 'Financial Stability' },
      { value: 'Entrepreneurship',  label: 'Entrepreneurship' },
    ],
  },
]

// ─── Classes 9–10 ────────────────────────────────────────────────────────────
// Goal: recommend the most suitable academic stream.

export const questions9_10 = [
  {
    id: 'favorite_subjects',
    question: 'Which subjects do you enjoy the most?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Mathematics',       label: 'Mathematics' },
      { value: 'Science',           label: 'Science' },
      { value: 'English',           label: 'English' },
      { value: 'Social Studies',    label: 'Social Studies' },
      { value: 'Commerce',          label: 'Commerce' },
      { value: 'Computer Science',  label: 'Computer Science' },
      { value: 'Arts & Crafts',     label: 'Arts & Crafts' },
      { value: 'Physical Education', label: 'Physical Education' },
    ],
  },
  {
    id: 'interests',
    question: 'What are your main interests outside school?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Coding & Technology', label: 'Coding & Technology' },
      { value: 'Drawing & Design',    label: 'Drawing & Design' },
      { value: 'Reading & Writing',   label: 'Reading & Writing' },
      { value: 'Sports & Fitness',    label: 'Sports & Fitness' },
      { value: 'Music & Performing Arts', label: 'Music & Performing Arts' },
      { value: 'Science & Experiments', label: 'Science & Experiments' },
      { value: 'Business & Finance',  label: 'Business & Finance' },
      { value: 'Helping & Social Work', label: 'Helping & Social Work' },
    ],
  },
  {
    id: 'hobbies',
    question: 'How do you like to spend your free time?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Building / Making things', label: 'Building / Making things' },
      { value: 'Reading books',            label: 'Reading books' },
      { value: 'Playing outdoor sports',   label: 'Playing outdoor sports' },
      { value: 'Playing video games',      label: 'Playing video games' },
      { value: 'Cooking / Baking',         label: 'Cooking / Baking' },
      { value: 'Painting / Drawing',       label: 'Painting / Drawing' },
      { value: 'Volunteering',             label: 'Volunteering' },
      { value: 'Watching documentaries',   label: 'Watching documentaries' },
    ],
  },
  {
    id: 'preferred_activities',
    question: 'Which type of activity do you enjoy most at school?',
    type: 'single',
    required: true,
    options: [
      { value: 'Solving problems & puzzles', label: 'Solving problems & puzzles' },
      { value: 'Creative projects',          label: 'Creative projects' },
      { value: 'Group discussions',          label: 'Group discussions' },
      { value: 'Experiments & practicals',   label: 'Experiments & practicals' },
      { value: 'Reading & writing',          label: 'Reading & writing' },
    ],
  },
  {
    id: 'learning_style',
    question: 'How do you learn best?',
    type: 'single',
    required: true,
    options: [
      { value: 'Practical / Hands-on',  label: 'Practical / Hands-on' },
      { value: 'Visual (diagrams, videos)', label: 'Visual (diagrams, videos)' },
      { value: 'Reading & notes',       label: 'Reading & notes' },
      { value: 'Group study',           label: 'Group study' },
      { value: 'Teaching others',       label: 'Teaching others' },
    ],
  },
  {
    id: 'personality_traits',
    question: 'Which words best describe you?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Curious',       label: 'Curious' },
      { value: 'Creative',      label: 'Creative' },
      { value: 'Logical',       label: 'Logical' },
      { value: 'Empathetic',    label: 'Empathetic' },
      { value: 'Leader',        label: 'Leader' },
      { value: 'Detail-oriented', label: 'Detail-oriented' },
      { value: 'Adventurous',   label: 'Adventurous' },
    ],
  },
  {
    id: 'biggest_concern',
    question: 'What is your biggest concern about choosing a stream?',
    type: 'single',
    required: true,
    options: [
      { value: 'Not knowing my strengths',         label: 'Not knowing my strengths' },
      { value: 'Parental or peer pressure',         label: 'Parental or peer pressure' },
      { value: 'Fear of a wrong decision',          label: 'Fear of a wrong decision' },
      { value: 'Limited career options in my area', label: 'Limited career options in my area' },
      { value: 'Unsure about future job prospects', label: 'Unsure about future job prospects' },
    ],
  },
]

// ─── Classes 11–12 ───────────────────────────────────────────────────────────
// Goal: recommend careers and higher education pathways.

export const questions11_12 = [
  {
    id: 'current_stream',
    question: 'Which stream are you currently studying in?',
    type: 'single',
    required: true,
    options: [
      { value: 'Science (PCM)',  label: 'Science (PCM)' },
      { value: 'Science (PCB)',  label: 'Science (PCB)' },
      { value: 'Commerce',       label: 'Commerce' },
      { value: 'Arts/Humanities', label: 'Arts / Humanities' },
      { value: 'Vocational',     label: 'Vocational' },
    ],
  },
  {
    id: 'favorite_subjects',
    question: 'Which subjects do you enjoy the most right now?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Mathematics',         label: 'Mathematics' },
      { value: 'Physics',             label: 'Physics' },
      { value: 'Chemistry',           label: 'Chemistry' },
      { value: 'Biology',             label: 'Biology' },
      { value: 'Computer Science',    label: 'Computer Science' },
      { value: 'Economics',           label: 'Economics' },
      { value: 'Accountancy',         label: 'Accountancy' },
      { value: 'History & Geography', label: 'History & Geography' },
      { value: 'English Literature',  label: 'English Literature' },
    ],
  },
  {
    id: 'career_interests',
    question: 'Which career fields interest you most?',
    type: 'multi',
    required: true,
    options: [
      { value: 'Engineering & Technology', label: 'Engineering & Technology' },
      { value: 'Medicine & Healthcare',    label: 'Medicine & Healthcare' },
      { value: 'Business & Management',    label: 'Business & Management' },
      { value: 'Arts, Design & Media',     label: 'Arts, Design & Media' },
      { value: 'Law & Governance',         label: 'Law & Governance' },
      { value: 'Teaching & Education',     label: 'Teaching & Education' },
      { value: 'Science & Research',       label: 'Science & Research' },
      { value: 'Defence & Civil Services', label: 'Defence & Civil Services' },
    ],
  },
  {
    id: 'preferred_college_type',
    question: 'What type of college are you aiming for?',
    type: 'single',
    required: true,
    options: [
      { value: 'IIT / NIT / AIIMS',       label: 'IIT / NIT / AIIMS (Top Government)' },
      { value: 'State Government College', label: 'State Government College' },
      { value: 'Private University',       label: 'Private University' },
      { value: 'Open / Distance Learning', label: 'Open / Distance Learning' },
      { value: 'Not decided yet',          label: 'Not decided yet' },
    ],
  },
  {
    id: 'budget_preference',
    question: 'What is your approximate education budget per year?',
    type: 'single',
    required: true,
    options: [
      { value: 'Under ₹50,000',         label: 'Under ₹50,000' },
      { value: '₹50,000 – ₹2,00,000',  label: '₹50,000 – ₹2,00,000' },
      { value: '₹2,00,000 – ₹5,00,000', label: '₹2,00,000 – ₹5,00,000' },
      { value: 'Above ₹5,00,000',       label: 'Above ₹5,00,000' },
    ],
  },
  {
    id: 'preferred_work_environment',
    question: 'What kind of work environment suits you best?',
    type: 'single',
    required: true,
    options: [
      { value: 'Office / Corporate',         label: 'Office / Corporate' },
      { value: 'Outdoor / Field work',       label: 'Outdoor / Field work' },
      { value: 'Creative studio',            label: 'Creative studio' },
      { value: 'Hospital / Lab',             label: 'Hospital / Lab' },
      { value: 'Own business / Startup',     label: 'Own business / Startup' },
      { value: 'Government / Public sector', label: 'Government / Public sector' },
    ],
  },
  {
    id: 'biggest_challenge',
    question: 'What is your biggest career challenge right now?',
    type: 'single',
    required: true,
    options: [
      { value: 'Choosing the right degree',          label: 'Choosing the right degree' },
      { value: 'Preparing for entrance exams',       label: 'Preparing for entrance exams' },
      { value: 'Understanding future job prospects', label: 'Understanding future job prospects' },
      { value: 'Managing financial constraints',     label: 'Managing financial constraints' },
      { value: 'Lack of career guidance',            label: 'Lack of career guidance' },
    ],
  },
]
