import './SectionHeading.css';

/**
 * Eyebrow + H2 + optional subtitle, as repeated across homepage sections.
 * eyebrowStyle: "text" (coloured overline) | "pill" (tinted capsule) | "pill-dark" (navy sections)
 */
export default function SectionHeading({
  id,
  eyebrow,
  eyebrowStyle = 'text',
  eyebrowIcon,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = '',
}) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${theme} ${className}`.trim()}>
      {eyebrow && (
        <p className={`section-heading__eyebrow section-heading__eyebrow--${eyebrowStyle}`}>
          {eyebrowIcon}
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
