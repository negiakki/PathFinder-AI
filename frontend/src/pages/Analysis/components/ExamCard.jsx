/**
 * ExamCard — Displays an entrance exam with icon and description.
 *
 * Props:
 *   exam: { name: string, description: string, icon: string }
 */
export default function ExamCard({ exam }) {
  return (
    <div className="card card-hover p-5 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-xl shrink-0">
        {exam.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-text-primary dark:text-gray-100">{exam.name}</h3>
        <p className="text-xs text-text-secondary dark:text-gray-400 mt-1 leading-relaxed">{exam.description}</p>
      </div>
    </div>
  )
}
