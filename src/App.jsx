import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Insights from './pages/Insights/Insights.jsx';
import Article from './pages/Article/Article.jsx';
import Legal from './pages/Legal/Legal.jsx';
import Support from './pages/Support/Support.jsx';
import ThankYou from './pages/ThankYou/ThankYou.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import { ROUTES } from './config/links.js';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        <Route path={ROUTES.insights} element={<Insights />} />
        <Route path={ROUTES.article} element={<Article />} />
        <Route path={ROUTES.legal} element={<Legal />} />
        <Route path={ROUTES.support} element={<Support />} />
        <Route path={ROUTES.thankYou} element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
