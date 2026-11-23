import './Pill.css';

/**
 * Rounded label used across the homepage.
 * variant: "default" (industry pills, 25px) | "compact" (comparison table, 12px) | "chip" (hero, with icon)
 */
export default function Pill({ as: Tag = 'span', variant = 'default', icon, className = '', children }) {
  return (
    <Tag className={`pill pill--${variant} ${className}`.trim()}>
      {icon}
      {children}
    </Tag>
  );
}
