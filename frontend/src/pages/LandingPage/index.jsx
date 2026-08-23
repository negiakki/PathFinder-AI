import { useNavigate } from 'react-router-dom'
import {
  Target, BookOpen, Map, Lightbulb,
  ArrowRight, GraduationCap, Brain, Rocket,
} from 'lucide-react'
import Navbar from '../../layout/Navbar.jsx'
import Footer from '../../layout/Footer.jsx'

const FEATURES = [
  {
    icon: <Target size={28} className="text-ibm-blue" />,
    title: 'Stream Guidance',
    desc: 'Get matched to the right academic stream — Science, Commerce, or Arts — based on your unique interests and strengths.',
  },
  {
    icon: <BookOpen size={28} className="text-ibm-blue" />,
    title: 'Career Planning',
    desc: 'Explore curated career options suited to your profile with real-world scope and salary insights.',
  },
  {
    icon: <Map size={28} className="text-ibm-blue" />,
    title: 'Learning Roadmap',
    desc: 'Receive a personalized month-by-month roadmap to build skills and reach your career goals.',
  },
  {
    icon: <Lightbulb size={28} className="text-ibm-blue" />,
    title: 'Skill Development',
    desc: 'Discover the skills that matter most for your path and find trusted resources to develop them fast.',
  },
]

const STEPS = [
  {
    icon: <GraduationCap size={40} className="text-ibm-blue" />,
    step: '01',
    title: 'Career Discovery',
    desc: 'Answer a short, guided assessment about your interests, strengths, and aspirations.',
  },
  {
    icon: <Brain size={40} className="text-ibm-blue" />,
    step: '02',
    title: 'AI Analysis',
    desc: 'IBM watsonx.ai analyzes your profile and builds a personalized career recommendation.',
  },
  {
    icon: <Rocket size={40} className="text-ibm-blue" />,
    step: '03',
    title: 'Career Report',
    desc: 'Receive a full career report with pathways, resources, and your personal roadmap.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-page mx-auto px-6 pt-20 pb-24 flex flex-col-reverse lg:flex-row items-center gap-12">

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary dark:text-gray-100 leading-tight tracking-tight">
              Your Personal{' '}
              <span className="text-ibm-blue">AI Career</span>{' '}
              Counselor
            </h1>

            <p className="mt-5 text-lg text-text-secondary dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Helping students in Classes&nbsp;9–12 discover the right academic stream and
              career path using AI-powered personalized guidance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/assessment')}
                className="btn-primary px-7 py-3.5 text-base"
              >
                Start Career Discovery
                <ArrowRight size={18} />
              </button>
              <a
                href="#how-it-works"
                className="btn-secondary px-7 py-3.5 text-base"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-1 flex justify-center">
            <HeroIllustration />
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────── */}
        <section id="features" className="bg-white dark:bg-gray-800 border-y border-border dark:border-gray-800 transition-colors duration-300">
          <div className="max-w-page mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl">Everything you need to choose your path</h2>
              <p className="section-subtitle mt-2 text-base">
                From stream selection to skill-building — all in one personalized report.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="card card-hover p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-text-primary dark:text-gray-100 text-lg">{title}</h3>
                  <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────── */}
        <section id="how-it-works" className="max-w-page mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl">How It Works</h2>
            <p className="section-subtitle mt-2 text-base">
              Three simple steps to your personalized career roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ icon, step, title, desc }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center gap-4">
                {/* Connector line (desktop only) */}
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-border dark:bg-gray-700" />
                )}
                <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center z-10">
                  {icon}
                </div>
                <span className="text-xs font-bold text-ibm-blue tracking-widest">STEP {step}</span>
                <h3 className="font-semibold text-text-primary dark:text-gray-100 text-lg">{title}</h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/assessment')}
              className="btn-primary px-8 py-4 text-base"
            >
              Start Career Discovery
              <ArrowRight size={18} />
            </button>
            <p className="mt-3 text-sm text-text-secondary dark:text-gray-400">Free · No sign-up required · Takes ~5 minutes</p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

/* ── Inline SVG Illustration ─────────────────────────────── */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm lg:max-w-md"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="200" cy="160" r="140" fill="#EFF4FF" />

      {/* Graduation cap */}
      <rect x="140" y="90" width="120" height="80" rx="12" fill="#0F62FE" opacity="0.12" />
      <rect x="155" y="105" width="90" height="50" rx="8" fill="#0F62FE" opacity="0.2" />
      <polygon points="200,80 240,100 200,120 160,100" fill="#0F62FE" />
      <rect x="234" y="100" width="4" height="22" rx="2" fill="#0F62FE" />
      <circle cx="236" cy="124" r="5" fill="#8A3FFC" />

      {/* Roadmap line */}
      <path d="M100 200 Q150 170 200 200 Q250 230 300 200" stroke="#0F62FE" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
      <circle cx="100" cy="200" r="6" fill="#0F62FE" />
      <circle cx="200" cy="200" r="6" fill="#8A3FFC" />
      <circle cx="300" cy="200" r="6" fill="#0F62FE" />

      {/* Cards */}
      <rect x="85" y="215" width="70" height="40" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="93" y="224" width="40" height="5" rx="2.5" fill="#0F62FE" opacity="0.5" />
      <rect x="93" y="233" width="30" height="4" rx="2" fill="#6F6F6F" opacity="0.4" />
      <rect x="93" y="241" width="35" height="4" rx="2" fill="#6F6F6F" opacity="0.3" />

      <rect x="165" y="215" width="70" height="40" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="173" y="224" width="40" height="5" rx="2.5" fill="#8A3FFC" opacity="0.6" />
      <rect x="173" y="233" width="30" height="4" rx="2" fill="#6F6F6F" opacity="0.4" />
      <rect x="173" y="241" width="35" height="4" rx="2" fill="#6F6F6F" opacity="0.3" />

      <rect x="245" y="215" width="70" height="40" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="253" y="224" width="40" height="5" rx="2.5" fill="#0F62FE" opacity="0.5" />
      <rect x="253" y="233" width="30" height="4" rx="2" fill="#6F6F6F" opacity="0.4" />
      <rect x="253" y="241" width="35" height="4" rx="2" fill="#6F6F6F" opacity="0.3" />

      {/* Sparkles */}
      <circle cx="320" cy="100" r="4" fill="#8A3FFC" opacity="0.7" />
      <circle cx="80" cy="130" r="3" fill="#0F62FE" opacity="0.5" />
      <circle cx="340" cy="200" r="2.5" fill="#0F62FE" opacity="0.4" />
    </svg>
  )
}
