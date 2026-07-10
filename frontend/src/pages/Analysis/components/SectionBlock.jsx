/**
 * SectionBlock — Consistent section wrapper with title and optional subtitle.
 *
 * Props:
 *   title:    string
 *   subtitle: string (optional)
 *   children: ReactNode
 */
export default function SectionBlock({ title, subtitle, children }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="section-title text-2xl">{title}</h2>
        {subtitle && <p className="section-subtitle mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
