import { Link } from 'react-router-dom';
import homeIcon from '../../assets/about/icon-home.png';
import './Breadcrumb.css';

/** "⌂ Home / Current page" trail shown at the top of inner pages.
    `currentTo` makes the last crumb a link (article pages: "Home / Insights"). */
export default function Breadcrumb({ current, currentTo, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`.trim()}>
      <ol className="breadcrumb__list">
        <li>
          <Link to="/" className="breadcrumb__home">
            <img src={homeIcon} alt="" width="16" height="17" className="breadcrumb__icon" />
            Home
          </Link>
        </li>
        {currentTo ? (
          <li className="breadcrumb__current">
            <Link to={currentTo} className="breadcrumb__current-link">
              {current}
            </Link>
          </li>
        ) : (
          <li aria-current="page" className="breadcrumb__current">
            {current}
          </li>
        )}
      </ol>
    </nav>
  );
}
