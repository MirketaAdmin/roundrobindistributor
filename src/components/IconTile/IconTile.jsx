import Icon from '../Icon/Icon.jsx';
import './IconTile.css';

/**
 * Tinted square holding an icon.
 * size: 40 (Trust bar, r8, 20px icon) | 44 (Problems, r10, 22px icon)
 * tone: brand | blue | red | amber | purple | indigo | orange — fill/icon pairs sampled from the frame
 */
export default function IconTile({ icon, size = 40, tone = 'brand', iconProps, className = '' }) {
  return (
    <span className={`icon-tile icon-tile--${size} icon-tile--${tone} ${className}`.trim()}>
      <Icon name={icon} className="icon-tile__icon" {...iconProps} />
    </span>
  );
}
