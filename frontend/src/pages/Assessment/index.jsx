import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Brain } from 'lucide-react'
import { useAppContext } from '../../context/AppContext.jsx'
import { analyzeAssessment } from '../../services/api.js'
import { commonQuestions, questions9_10, questions11_12 } from './questions.js'
import ProgressBar from '../../components/ProgressBar.jsx'
import OptionCard from '../../components/OptionCard.jsx'
import Button from '../../components/Button.jsx'
import ThemeToggle from '../../components/ThemeToggle.jsx'

// ─── Screens ─────────────────────────────────────────────────────────────────
const SCREEN = { WELCOME: 'welcome', QUESTIONS: 'questions', LOADING: 'loading' }

// ─── Build question sequence based on class answer ───────────────────────────
function buildQuestions(answers) {
  const cls = answers?.class_group
  const tail = cls === '9-10' ? questions9_10 : cls === '11-12' ? questions11_12 : []
  return [...commonQuestions, ...tail]
}

// ─── CLASS-SELECTION question (step 0, always first) ─────────────────────────
const CLASS_QUESTION = {
  id: 'class_selected',
  question: 'Which class are you currently studying in?',
  description: 'This helps us tailor the assessment to your stage of education.',
  type: 'single',
  required: true,
  options: [
    { value: '9',  label: 'Class 9', icon: '📘' },
    { value: '10', label: 'Class 10', icon: '📘' },
    { value: '11', label: 'Class 11', icon: '🎓' },
    { value: '12', label: 'Class 12', icon: '🎓' },
  ],
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen() {
  const steps = [
    'Mapping your interests…',
    'Analysing your strengths…',
    'Matching career profiles…',
    'Building your Career Profile…',
  ]
  const [stepIndex, setStepIndex] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'))
    }, 400)
    const stepTimer = setInterval(() => {
      setStepIndex(i => Math.min(i + 1, steps.length - 1))
    }, 900)
    return () => { clearInterval(dotTimer); clearInterval(stepTimer) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-gray-900 px-6 transition-colors duration-300">
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <div className="flex flex-col items-center gap-8 text-center max-w-sm w-full">
        {/* Brain icon ring */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-ibm-blue border-t-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-ibm-blue/20 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
          <Brain size={36} className="text-ibm-blue" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100">
            🧠 Building your Career Profile{dots}
          </h2>
          <p
            key={stepIndex}
            className="text-text-secondary dark:text-gray-400 text-sm transition-all duration-500"
            style={{ animation: 'fadeIn 0.5s ease' }}
          >
            {steps[stepIndex]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={[
                'w-2 h-2 rounded-full transition-all duration-500',
                i <= stepIndex ? 'bg-ibm-blue scale-125' : 'bg-border dark:bg-gray-700',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-gray-900 px-6 transition-colors duration-300">
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 flex items-center justify-center">
            <Brain size={40} className="text-ibm-blue" />
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100 leading-tight">
            Discover Your Career Path
          </h1>
          <p className="text-lg text-text-secondary dark:text-gray-400 leading-relaxed">
            Answer a few quick questions about your interests and strengths.
            We'll build a personalised career profile just for you — in under 5 minutes.
          </p>
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-6 text-sm text-text-secondary dark:text-gray-400">
          <span className="flex items-center gap-1.5">✅ 8 questions</span>
          <span className="flex items-center gap-1.5">⚡ ~3 minutes</span>
          <span className="flex items-center gap-1.5">🎯 100% personalised</span>
        </div>

        {/* CTA */}
        <Button fullWidth onClick={onStart} className="text-base py-4">
          Start Assessment <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  )
}

// ─── Single Question View ─────────────────────────────────────────────────────
function QuestionView({ question, answer, onAnswer, onNext, onBack, isFirst, isLast, currentIndex, totalQuestions }) {
  const isMulti = question.type === 'multi'
  const selected = isMulti ? (Array.isArray(answer) ? answer : []) : answer
  const hasAnswer = isMulti ? selected.length > 0 : Boolean(answer)

  function handleOptionClick(value) {
    if (isMulti) {
      const next = selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
      onAnswer(question.id, next)
    } else {
      onAnswer(question.id, value)
    }
  }

  // Keyboard: Enter / Space on focused option are handled natively by <button>
  function handleKeyDown(e) {
    if (e.key === 'Enter' && hasAnswer) onNext()
    if (e.key === 'Backspace' && !isFirst) onBack()
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-surface dark:bg-gray-900 transition-colors duration-300"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      {/* Top bar */}
      <div className="w-full px-6 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Question + options */}
      <div className="flex-1 flex flex-col justify-center px-6 py-4 max-w-2xl mx-auto w-full">
        <div
          key={question.id}
          className="space-y-6"
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          {/* Question header */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-ibm-blue">
              {isMulti ? 'Select all that apply' : 'Choose one'}
            </p>
            <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 leading-snug">
              {question.question}
            </h2>
            {question.description && (
              <p className="text-text-secondary dark:text-gray-400 text-sm">{question.description}</p>
            )}
          </div>

          {/* Options grid */}
          <div className={[
            'grid gap-3',
            question.options?.length > 4 ? 'sm:grid-cols-2' : 'grid-cols-1',
          ].join(' ')}>
            {question.options?.map(opt => {
              const isSelected = isMulti
                ? selected.includes(opt.value)
                : selected === opt.value
              return (
                <OptionCard
                  key={opt.value}
                  label={opt.icon ? `${opt.icon}  ${opt.label}` : opt.label}
                  selected={isSelected}
                  onClick={() => handleOptionClick(opt.value)}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="w-full px-6 pb-10 pt-4 max-w-2xl mx-auto">
        <div className="flex gap-3">
          {!isFirst && (
            <Button variant="secondary" onClick={onBack} className="min-w-[100px]">
              <ArrowLeft size={16} /> Back
            </Button>
          )}
          <Button
            fullWidth
            onClick={onNext}
            disabled={!hasAnswer}
          >
            {isLast ? 'See My Results' : 'Continue'} <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

// ─── Assessment Page (orchestrator) ──────────────────────────────────────────
export default function Assessment() {
  const navigate = useNavigate()
  const { answers, saveAnswer, resetSession, setReport, setIsLoading, setError, error } = useAppContext()

  const [screen, setScreen] = useState(SCREEN.WELCOME)
  const [questionIndex, setQuestionIndex] = useState(0)

  // The first question is always the class-selection; the rest come from the bank.
  const classAnswer = answers['class_group']
  const tailQuestions = classAnswer === '9-10'
    ? questions9_10
    : classAnswer === '11-12'
    ? questions11_12
    : []
  // Full sequence: class question → common (minus class) → class-specific
  const allQuestions = [CLASS_QUESTION, ...commonQuestions, ...tailQuestions]
  const totalQuestions = allQuestions.length
  const currentQuestion = allQuestions[questionIndex] ?? null

  const isFirst = questionIndex === 0
  const isLast  = questionIndex === totalQuestions - 1

  function handleStart() {
    resetSession()
    setQuestionIndex(0)
    setScreen(SCREEN.QUESTIONS)
  }

  function handleAnswer(id, value) {
    saveAnswer(id, value)
    // Derive the grouped class_group value the backend/branching logic expects
    if (id === 'class_selected') {
      const group = (value === '9' || value === '10') ? '9-10' : '11-12'
      saveAnswer('class_group', group)
    }
  }

  const handleNext = useCallback(() => {
    if (isLast) {
      setScreen(SCREEN.LOADING)
      setIsLoading(true)
      setError(null)
      const { class_selected, ...rest } = answers
      const payload = { ...rest, current_class: class_selected }
      analyzeAssessment(payload)
        .then(report => {
          setReport(report)
          setIsLoading(false)
          navigate('/analysis')
        })
        .catch(err => {
          setError(err.message)
          setIsLoading(false)
          setScreen(SCREEN.QUESTIONS)
        })
    } else {
      setQuestionIndex(i => i + 1)
    }
  }, [isLast, navigate, answers, setReport, setIsLoading, setError])

  const handleBack = useCallback(() => {
    setQuestionIndex(i => Math.max(i - 1, 0))
  }, [])

  // ── Render ──
  if (screen === SCREEN.WELCOME) return <WelcomeScreen onStart={handleStart} />
  if (screen === SCREEN.LOADING) return <LoadingScreen />

  if (!currentQuestion) return null

  return (
    <>
      {error && (
        <div className="fixed top-0 inset-x-0 z-50 bg-red-50 border-b border-red-200 px-6 py-3 text-center text-sm text-red-700">
          {error} — Please check your connection and try again.
        </div>
      )}
      <QuestionView
        key={currentQuestion.id}
        question={currentQuestion}
        answer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
        isFirst={isFirst}
        isLast={isLast}
        currentIndex={questionIndex}
        totalQuestions={totalQuestions}
      />
    </>
  )
}
