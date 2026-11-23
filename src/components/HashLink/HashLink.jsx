import { Link, useLocation } from 'react-router-dom';
import { scrollToId } from '../../utils/scroll.js';

/**
 * Router link that smooth-scrolls to `#section` targets on the current page.
 * `to="#id"` (no path) means a section on the current page; `/path#id` a section on that route.
 * If the target section doesn't exist the URL still updates (no dead click).
 */
export function HashLink({ to, onClick, ...rest }) {
  const { pathname } = useLocation();

  function handleClick(event) {
    onClick?.(event);
    const [path, hash] = to.split('#');
    if (!hash || (path || pathname) !== pathname) return;
    if (!scrollToId(hash)) return;
    event.preventDefault();
    window.history.replaceState(null, '', `#${hash}`);
  }

  return <Link to={to} onClick={handleClick} {...rest} />;
}
