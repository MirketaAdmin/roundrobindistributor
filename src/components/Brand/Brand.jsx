import { Link } from 'react-router-dom';
import logoOnWhite from '../../assets/logos/rrd-logo-header.png';
import logoOnLavender from '../../assets/logos/rrd-logo-footer.png';
import './Brand.css';

/**
 * RRD lockup: logo (74×61, cropped from the PNG reference on the surface it sits on) + name + subtitle.
 * surface: "white" (header) | "lavender" (footer).
 * `subtitle` may be a string (wraps to the title's width, as in the footer)
 * or an array of explicit lines (as in the header).
 */
export default function Brand({ subtitle, surface = 'white', className = '', onClick }) {
  const lines = Array.isArray(subtitle) ? subtitle : null;
  return (
    <Link to="/" className={`brand ${className}`.trim()} aria-label="Round Robin Distributor home" onClick={onClick}>
      <img
        src={surface === 'lavender' ? logoOnLavender : logoOnWhite}
        alt=""
        width="74"
        height="61"
        className="brand__logo"
      />
      <span className={`brand__text${lines ? '' : ' brand__text--wrap'}`}>
        <span className="brand__title">Round Robin Distributor</span>
        {lines ? (
          lines.map((line) => (
            <span key={line} className="brand__subtitle">
              {line}
            </span>
          ))
        ) : (
          <span className="brand__subtitle">{subtitle}</span>
        )}
      </span>
    </Link>
  );
}
