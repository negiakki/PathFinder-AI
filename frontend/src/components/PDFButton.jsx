import { Download } from 'lucide-react'

/**
 * PDFButton — triggers the client-side PDF download.
 * Full implementation: Phase 7.
 *
 * Props:
 *   onClick:   () => void
 *   disabled:  boolean
 */
export default function PDFButton({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary gap-2 text-base px-8 py-4 w-full md:w-auto"
    >
      <Download size={20} />
      Download Career Report (PDF)
    </button>
  )
}
