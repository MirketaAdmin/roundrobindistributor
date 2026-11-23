import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';

export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <SEO title="Page not found" description="The page you requested does not exist." robots="noindex, follow" />
      <h1>Page not found</h1>
      <p>
        <Link to="/">Return to the homepage</Link>
      </p>
    </main>
  );
}
