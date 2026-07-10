/**
 * OptionCard — a selectable answer card in the Assessment.
 * Full implementation: Phase 3.
 *
 * Props:
 *   label:      string
 *   selected:   boolean
 *   onClick:    () => void
 *   disabled:   boolean
 */
export default function OptionCard({ label, selected = false, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'card w-full text-left px-6 py-4 cursor-pointer',
        'transition-all duration-smooth',
        selected
          ? 'bg-ibm-blue text-white border-ibm-blue shadow-md'
          : 'hover:border-ibm-blue hover:-translate-y-0.5 hover:shadow-md',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    >
      <span className="font-medium">{label}</span>
    </button>
  )
}
