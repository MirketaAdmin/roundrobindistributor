import Icon from '../../../../components/Icon/Icon.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Pill from '../../../../components/Pill/Pill.jsx';
import SmartLink from '../../../../components/SmartLink/SmartLink.jsx';
import { ARTICLE_LINKS, SECTION_IDS } from '../../../../config/links.js';
import { COMPARISON } from '../../../../data/home.js';
import './Comparison.css';

export default function Comparison() {
  const [needHead, nativeHead, rrdHead] = COMPARISON.headers;

  return (
    <section id={SECTION_IDS.comparison} className="comparison" aria-labelledby="comparison-title">
      <div className="container">
        <SectionHeading
          id="comparison-title"
          eyebrow={COMPARISON.eyebrow}
          title={COMPARISON.title}
          subtitle={COMPARISON.subtitle}
          className="comparison__heading"
        />

        <div className="comparison__scroller">
          <table className="comparison__table">
            <thead>
              <tr>
                <th scope="col">{needHead}</th>
                <th scope="col">{nativeHead}</th>
                <th scope="col" className="comparison__rrd-head">
                  {rrdHead}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map(([need, native, rrd]) => (
                <tr key={need}>
                  <th scope="row">{need}</th>
                  <td>
                    <Pill variant="compact">{native}</Pill>
                  </td>
                  <td className="comparison__rrd">
                    <span className="comparison__check">
                      <Icon name="CircleCheck" className="comparison__check-icon" />
                      {rrd}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="comparison__more">
          {/* Article URL pending from client — see ARTICLE_LINKS */}
          <SmartLink href={ARTICLE_LINKS['omni-channel-alternative']} className="comparison__link">
            {COMPARISON.link}
            <Icon name="ArrowRight" className="comparison__link-icon" />
          </SmartLink>
        </p>
      </div>
    </section>
  );
}
