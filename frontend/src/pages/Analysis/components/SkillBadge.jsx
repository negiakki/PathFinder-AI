/**
 * SkillBadge — A single skill chip/badge for the "Skills to Develop" section.
 *
 * Props:
 *   label: string
 */
export default function SkillBadge({ label }) {
  return (
    <span className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-950 text-ibm-blue text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-800 transition-all duration-smooth hover:bg-ibm-blue hover:text-white hover:border-ibm-blue hover:shadow-sm cursor-default">
      {label}
    </span>
  )
}
