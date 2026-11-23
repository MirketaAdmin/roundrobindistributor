import { HashLink } from '../HashLink/HashLink.jsx';

/**
 * Text link that resolves to an in-page/route link (`to`), an external link (`href`),
 * or — when `href` is null because the client hasn't supplied the URL yet — a
 * non-interactive span marked aria-disabled. Never renders href="#".
 */
export default function SmartLink({ to, href, className = '', children, ...rest }) {
  if (to) {
    return (
      <HashLink to={to} className={className} {...rest}>
        {children}
      </HashLink>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <span className={`${className} is-pending`.trim()} aria-disabled="true" title="Link not configured yet" {...rest}>
      {children}
    </span>
  );
}
