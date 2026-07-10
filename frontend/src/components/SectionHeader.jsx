/**
 * SectionHeader — consistent section title + optional subtitle.
 *
 * Props:
 *   title:    string
 *   subtitle: string (optional)
 *   icon:     ReactNode (optional Lucide icon)
 */
export default function SectionHeader({ title, subtitle, icon }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {icon && <span className="text-ibm-blue">{icon}</span>}
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle && <p className="section-subtitle mt-1">{subtitle}</p>}
    </div>
  )
}
