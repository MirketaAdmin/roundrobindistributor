import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { scrollToId } from '../../utils/scroll.js';

/* Route changes start at the top; `/#section` URLs (incl. from other routes) land on the section. */
function useScrollRestoration() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash || !scrollToId(hash.slice(1), 'auto')) window.scrollTo(0, 0);
  }, [pathname, hash]);
}

/** Site chrome shared by every page: header, page content, footer. */
export default function MainLayout() {
  useScrollRestoration();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
