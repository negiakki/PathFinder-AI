/**
 * CareerCard — displays a single career opportunity.
 * Full implementation: Phase 6.
 *
 * Props:
 *   career: {
 *     career_name:       string
 *     description:       string
 *     future_scope:      string
 *     required_education: string
 *     why_it_matches:    string
 *   }
 */
export default function CareerCard({ career }) {
  if (!career) return null
  return (
    <div className="card card-hover p-6 flex flex-col gap-3">
      <h3 className="text-base font-semibold text-text-primary">{career.career_name}</h3>
      <p className="text-sm text-text-secondary">{career.description}</p>
    </div>
  )
}
