import { HashLink } from '../HashLink/HashLink.jsx';
import './Button.css';

/**
 * RRD button (Controls / 01 Buttons).
 * variant: primary | secondary | white | outline-light   size: md (36px) | lg (44px)
 * - `to`   → in-page / route link
 * - `href` → external link (new tab). Pass `href={null}` for a destination the client has
 *            not supplied yet: the button renders as designed but is marked unavailable.
 * - neither → <button> (pass type/onClick)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  iconStart,
  iconEnd,
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </>
  );

  if (to) {
    return (
      <HashLink to={to} className={classes} {...rest}>
        {content}
      </HashLink>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  if (href === null) {
    return (
      <span className={`${classes} is-pending`} aria-disabled="true" title="Link not configured yet" {...rest}>
        {content}
      </span>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
