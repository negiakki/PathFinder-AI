import { useState } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { downloadReportAsPDF } from '../../../utils/pdfExport.js'

/**
 * ActionPanel — Download report (client-side PDF) + Retake assessment actions.
 *
 * Props:
 *   reportRef: ref to the rendered report content to export
 *   report:    the analysis report (used for the recommended career title)
 */
export default function ActionPanel({ reportRef, report }) {
  const navigate = useNavigate()
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)
    try {
      await downloadReportAsPDF(reportRef, report?.recommendedCareer?.title)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="card p-8 md:p-10 text-center space-y-6 bg-gradient-to-br from-surface to-white dark:from-gray-800 dark:to-gray-800">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-text-primary dark:text-gray-100">Ready to Take Action?</h2>
        <p className="text-text-secondary dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          Save your career report for future reference or retake the assessment to explore a different path.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="btn-primary flex-1 py-3"
        >
          <Download size={16} /> {isDownloading ? 'Preparing PDF…' : 'Download Report'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/assessment')}
          className="btn-secondary flex-1 py-3"
        >
          <RotateCcw size={16} /> Retake Assessment
        </button>
      </div>

      <p className="text-xs text-text-secondary/60 dark:text-gray-500">
        Free to retake anytime
      </p>
    </div>
  )
}
