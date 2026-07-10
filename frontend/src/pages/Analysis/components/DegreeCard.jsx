import { GraduationCap } from 'lucide-react'

/**
 * DegreeCard — Displays a recommended degree.
 *
 * Props:
 *   degree: string
 */
export default function DegreeCard({ degree }) {
  return (
    <div className="card card-hover p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 flex items-center justify-center shrink-0">
        <GraduationCap size={20} className="text-ibm-blue" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary dark:text-gray-100 leading-snug">{degree}</p>
        <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">Undergraduate Program</p>
      </div>
    </div>
  )
}
