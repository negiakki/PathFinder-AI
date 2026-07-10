/**
 * LoadingAnimation — AI analysis animated screen.
 * Full implementation: Phase 4.
 */
export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-8 h-8 border-4 border-ibm-blue border-t-transparent rounded-full animate-spin" />
      <p className="text-text-secondary text-sm">Analyzing your profile…</p>
    </div>
  )
}
