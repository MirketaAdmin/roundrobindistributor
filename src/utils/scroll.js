/**
 * Scrolls to the element with the given id. Returns false when it isn't on the page,
 * so callers can fall back to normal navigation.
 */
export function scrollToId(id, behavior = 'smooth') {
  const target = id ? document.getElementById(decodeURIComponent(id)) : null;
  if (!target) return false;
  target.scrollIntoView({ behavior, block: 'start' });
  return true;
}
