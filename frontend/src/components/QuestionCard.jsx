/**
 * QuestionCard — displays a single assessment question.
 * Full implementation: Phase 3.
 *
 * Props:
 *   question: { id, question, type, options }
 */
export default function QuestionCard({ question }) {
  if (!question) return null
  return (
    <div className="card p-8 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-text-primary leading-snug">
        {question.question}
      </h2>
    </div>
  )
}
