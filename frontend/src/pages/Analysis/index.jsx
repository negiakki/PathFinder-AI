import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../../layout/Navbar.jsx'
import Footer from '../../layout/Footer.jsx'
import { useAppContext } from '../../context/AppContext.jsx'
import AnalysisHero from './components/AnalysisHero.jsx'
import CareerMatchCard from './components/CareerMatchCard.jsx'
import DegreeCard from './components/DegreeCard.jsx'
import SkillBadge from './components/SkillBadge.jsx'
import RoadmapTimeline from './components/RoadmapTimeline.jsx'
import ExamCard from './components/ExamCard.jsx'
import DashboardResourceCard from './components/DashboardResourceCard.jsx'
import ActionPanel from './components/ActionPanel.jsx'
import SectionBlock from './components/SectionBlock.jsx'

/**
 * Analysis — Career Analysis Dashboard.
 *
 * Reads the analysis report from AppContext, which is populated by
 * the Assessment page via POST /api/analyze.
 */
export default function Analysis() {
  const navigate = useNavigate()
  const { report, isLoading, error } = useAppContext()
  const reportRef = useRef(null)

  // ─── Loading state ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-gray-900 transition-colors duration-300">
        <p className="text-text-secondary dark:text-gray-400 text-sm">Loading your career analysis…</p>
      </div>
    )
  }

  // ─── Error state ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-gray-900 px-6 gap-4 text-center transition-colors duration-300">
        <p className="text-lg font-semibold text-text-primary dark:text-gray-100">Something went wrong</p>
        <p className="text-sm text-text-secondary dark:text-gray-400 max-w-sm">{error}</p>
        <button
          onClick={() => navigate('/assessment')}
          className="btn-primary px-6 py-2.5 text-sm mt-2"
        >
          Try Again
        </button>
      </div>
    )
  }

  // ─── No report — redirect back to assessment ───────────────────────────────
  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-gray-900 px-6 gap-4 text-center transition-colors duration-300">
        <p className="text-lg font-semibold text-text-primary dark:text-gray-100">No analysis found</p>
        <p className="text-sm text-text-secondary dark:text-gray-400">Please complete the assessment first.</p>
        <button
          onClick={() => navigate('/assessment')}
          className="btn-primary px-6 py-2.5 text-sm mt-2"
        >
          Start Assessment
        </button>
      </div>
    )
  }

  const analysis = report

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        <div ref={reportRef} className="max-w-page mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16 bg-surface dark:bg-gray-900">

          {/* ── 1. Hero Recommendation ──────────────────────────────────── */}
          <AnalysisHero
            recommendedCareer={analysis.recommendedCareer}
            summary={analysis.summary}
          />

          {/* ── 2. Why This Career ──────────────────────────────────────── */}
          <SectionBlock
            title="Why This Career Fits You"
            subtitle="Based on your interests, personality, and strengths from the assessment."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths panel */}
              <div className="card p-6 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-ibm-blue">Your Strengths</p>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength) => (
                    <li key={strength} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-ibm-success shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-text-primary dark:text-gray-100">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personality / summary panel */}
              <div className="card p-6 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-100 dark:border-blue-900">
                <p className="text-xs font-bold uppercase tracking-widest text-ibm-blue">Your Profile Summary</p>
                <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">{analysis.summary}</p>

                <div className="pt-2 border-t border-border/60 dark:border-gray-700">
                  <p className="text-xs font-bold uppercase tracking-widest text-ibm-blue mb-3">Top Match</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-ibm-blue">
                      {analysis.recommendedCareer.matchPercentage}%
                    </span>
                    <div>
                      <p className="text-sm font-bold text-text-primary dark:text-gray-100">{analysis.recommendedCareer.title}</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">Career match based on your assessment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionBlock>

          {/* ── 3. Top Career Matches ────────────────────────────────────── */}
          <SectionBlock
            title="Top Career Matches"
            subtitle="Careers ranked by compatibility with your unique profile."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {analysis.topCareerMatches.map((career, index) => (
                <CareerMatchCard key={career.title} career={career} rank={index + 1} />
              ))}
            </div>
          </SectionBlock>

          {/* ── 4. Recommended Degrees ──────────────────────────────────── */}
          <SectionBlock
            title="Recommended Degrees"
            subtitle="Academic programs that best align with your career goals."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.recommendedDegrees.map((degree) => (
                <DegreeCard key={degree} degree={degree} />
              ))}
            </div>
          </SectionBlock>

          {/* ── 5. Skills to Develop ─────────────────────────────────────── */}
          <SectionBlock
            title="Skills to Develop"
            subtitle="Key competencies that will set you apart in this field."
          >
            <div className="flex flex-wrap gap-3">
              {analysis.skillsToDevelop.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </SectionBlock>

          {/* ── 6. Entrance Exams ────────────────────────────────────────── */}
          <SectionBlock
            title="Entrance Exams to Target"
            subtitle="Recommended competitive exams on your path to this career."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.entranceExams.map((exam) => (
                <ExamCard key={exam.name} exam={exam} />
              ))}
            </div>
          </SectionBlock>

          {/* ── 7. Learning Roadmap ──────────────────────────────────────── */}
          <SectionBlock
            title="Your Learning Roadmap"
            subtitle="A step-by-step path from where you are today to your career goal."
          >
            <div className="max-w-2xl">
              <RoadmapTimeline roadmap={analysis.roadmap} />
            </div>
          </SectionBlock>

          {/* ── 8. Learning Resources ────────────────────────────────────── */}
          <SectionBlock
            title="Learning Resources"
            subtitle="Curated resources hand-picked for your career path."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {analysis.learningResources.map((resource) => (
                <DashboardResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </SectionBlock>

        </div>

        {/* ── 9. Action Panel (excluded from PDF export) ────────────────── */}
        <div className="max-w-page mx-auto px-4 sm:px-6 pb-14">
          <ActionPanel reportRef={reportRef} report={analysis} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
