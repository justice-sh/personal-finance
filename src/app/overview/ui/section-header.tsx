import { DetailsLink } from "./details-link"

export function SectionHeader({ title, cta }: { title: string; cta: { label?: string; href: string } }) {
  return (
    <header className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-preset-4-bold xs-5:text-preset-2">{title}</h2>
      <DetailsLink href={cta.href} label={cta.label || "See Details"} />
    </header>
  )
}
