/**
 * mockAnalysis.js — Mock backend response for career analysis.
 *
 * To switch to real data, replace:
 *   const analysis = mockData
 * with:
 *   const analysis = await fetch('/api/analysis').then(res => res.json())
 */

const mockData = {
  recommendedCareer: {
    title: 'Software Engineer',
    description:
      'Design, build, and maintain software systems that power modern applications. Software Engineers work across web, mobile, AI, and systems domains — shaping technology used by millions.',
    matchPercentage: 94,
  },

  summary:
    'Your analytical mindset, curiosity for problem-solving, and strong logical reasoning make you an ideal fit for a career in technology. You thrive in structured yet creative environments and enjoy building things from scratch.',

  strengths: [
    'Logical & Analytical Thinking',
    'Creative Problem Solving',
    'Fast Learner',
    'Attention to Detail',
    'Strong Mathematical Aptitude',
  ],

  topCareerMatches: [
    {
      title: 'Software Engineer',
      matchPercentage: 94,
      description:
        'Build scalable software products across web, mobile, and cloud platforms using modern programming languages and frameworks.',
    },
    {
      title: 'Data Scientist',
      matchPercentage: 88,
      description:
        'Extract insights from large datasets using statistical analysis, machine learning, and data visualization tools.',
    },
    {
      title: 'Product Manager',
      matchPercentage: 81,
      description:
        'Lead cross-functional teams to define, build, and launch products that solve real user problems.',
    },
    {
      title: 'AI/ML Engineer',
      matchPercentage: 78,
      description:
        'Design and deploy machine learning models and AI systems that automate complex decision-making processes.',
    },
    {
      title: 'Cybersecurity Analyst',
      matchPercentage: 72,
      description:
        'Protect digital infrastructure by identifying vulnerabilities, monitoring threats, and securing systems.',
    },
  ],

  recommendedDegrees: [
    'B.Tech in Computer Science & Engineering',
    'B.E. in Information Technology',
    'B.Sc. in Mathematics & Computing',
    'BCA (Bachelor of Computer Applications)',
    'B.Tech in Artificial Intelligence & Data Science',
  ],

  entranceExams: [
    {
      name: 'JEE Main',
      description: 'Gateway to NITs, IIITs, and GFTIs for B.Tech admissions across India.',
      icon: '🎓',
    },
    {
      name: 'JEE Advanced',
      description: 'Premier examination for admission to the prestigious IITs.',
      icon: '🏆',
    },
    {
      name: 'CUET',
      description: 'Common University Entrance Test for central university UG programs.',
      icon: '📋',
    },
    {
      name: 'BITSAT',
      description: 'Entrance for BITS Pilani, Goa & Hyderabad — top private engineering colleges.',
      icon: '⚡',
    },
    {
      name: 'VITEEE',
      description: 'VIT University entrance exam for engineering programs.',
      icon: '📐',
    },
    {
      name: 'SRMJEEE',
      description: 'SRM Joint Engineering Entrance Examination for B.Tech programs.',
      icon: '🔬',
    },
  ],

  skillsToDevelop: [
    'Data Structures & Algorithms',
    'Python Programming',
    'Web Development (HTML/CSS/JS)',
    'Database Management (SQL)',
    'Version Control (Git)',
    'System Design Fundamentals',
    'Cloud Computing Basics',
    'Machine Learning Concepts',
    'Problem Solving & Competitive Coding',
    'Communication & Collaboration',
  ],

  roadmap: [
    {
      stage: 'Now (Class 9–10)',
      description:
        'Build a strong foundation in Mathematics and Science. Start learning basic programming with Python or Scratch. Explore coding challenges on platforms like Code.org.',
    },
    {
      stage: 'Class 11–12',
      description:
        'Choose PCM (Physics, Chemistry, Mathematics) stream. Prepare for JEE Main/Advanced. Learn web development basics and contribute to small personal projects.',
    },
    {
      stage: 'Entrance Exams',
      description:
        'Appear for JEE Main, BITSAT, CUET, or equivalent exams. Target reputed engineering colleges. Build competitive programming skills on LeetCode/Codeforces.',
    },
    {
      stage: 'Undergraduate Degree',
      description:
        'Pursue B.Tech/BE in Computer Science. Focus on Data Structures, Algorithms, DBMS, Operating Systems, and Networks. Complete internships and open-source contributions.',
    },
    {
      stage: 'Internship & Projects',
      description:
        'Land internships at tech companies. Build a portfolio of real-world projects. Gain exposure to cloud, AI/ML, and DevOps domains.',
    },
    {
      stage: 'Career Launch',
      description:
        'Apply for Software Engineer roles at product companies, startups, or MNCs. Consider postgraduate studies (M.Tech/MS/MBA) for advanced career paths.',
    },
  ],

  learningResources: [
    {
      title: 'CS50: Introduction to Computer Science',
      category: 'Online Course',
      description:
        'Harvard\'s legendary free course covering programming fundamentals, algorithms, and web development — perfect for beginners.',
    },
    {
      title: 'LeetCode',
      category: 'Practice Platform',
      description:
        'Sharpen Data Structures & Algorithms skills with thousands of coding problems used in top tech company interviews.',
    },
    {
      title: 'The Odin Project',
      category: 'Web Development',
      description:
        'A free, open-source full-stack web development curriculum that takes you from zero to job-ready.',
    },
    {
      title: 'Khan Academy — Math & Computer Science',
      category: 'Foundation',
      description:
        'Build strong mathematical and computational thinking fundamentals with interactive lessons and exercises.',
    },
    {
      title: 'MIT OpenCourseWare — 6.006 Algorithms',
      category: 'Advanced',
      description:
        'MIT\'s free algorithms course covering dynamic programming, graph algorithms, and computational complexity.',
    },
    {
      title: 'GitHub Student Developer Pack',
      category: 'Tooling',
      description:
        'Free access to 100+ developer tools — cloud credits, domains, IDEs, and more — exclusively for students.',
    },
  ],
}

export default mockData
