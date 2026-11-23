import { useCallback, useState } from 'react';
import Button from '../../../../components/Button/Button.jsx';
import Icon from '../../../../components/Icon/Icon.jsx';
import VideoModal from '../../../../components/VideoModal/VideoModal.jsx';
import { EXTERNAL_LINKS, VIDEO_LINKS } from '../../../../config/links.js';
import { RATINGS } from '../../../../data/home.js';
import './Ratings.css';

export default function Ratings() {
  const [activeVideo, setActiveVideo] = useState(null);
  const closeVideo = useCallback(() => setActiveVideo(null), []);
  const { testimonial } = RATINGS;

  return (
    <section className="ratings" aria-labelledby="ratings-title">
      <div className="container">
        <h2 id="ratings-title" className="ratings__title">
          {RATINGS.title}
        </h2>

        <ul className="ratings__stats">
          {RATINGS.stats.map((stat) => (
            <li key={stat.value} className="ratings__stat">
              {stat.stars ? (
                <>
                  <span className="ratings__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </span>
                  <span className="ratings__stat-title">{stat.value}</span>
                </>
              ) : (
                <>
                  <span className="ratings__value">{stat.value}</span>
                  <span className="ratings__label">{stat.label}</span>
                </>
              )}
              <span className="ratings__caption">{stat.caption}</span>
            </li>
          ))}
        </ul>

        <figure className="ratings__testimonial">
          <div>
            <span className="ratings__stars ratings__stars--quote" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
            <blockquote className="ratings__quote">{testimonial.quote}</blockquote>
            <figcaption className="ratings__author">
              <strong>— {testimonial.author}</strong> {testimonial.role}
            </figcaption>
          </div>
          <Button
            href={EXTERNAL_LINKS.appExchange}
            variant="white"
            className="ratings__appexchange"
            iconEnd={<Icon name="ArrowUpRight" className="ratings__appexchange-icon" />}
          >
            View on AppExchange
          </Button>
        </figure>

        <h3 className="ratings__videos-title">{RATINGS.videosTitle}</h3>
        <ul className="ratings__videos">
          {RATINGS.videos.map((video) => {
            const url = VIDEO_LINKS[video.id];
            return (
              <li key={video.id} className="ratings__video">
                <div className="ratings__thumb">
                  <button
                    type="button"
                    className="ratings__play"
                    aria-label={`Play video: ${video.title}`}
                    disabled={!url}
                    title={url ? undefined : 'Video link not configured yet'}
                    onClick={() => setActiveVideo({ title: video.title, url })}
                  >
                    <Icon name="Play" className="ratings__play-icon" fill="currentColor" />
                  </button>
                </div>
                <div className="ratings__video-body">
                  <h4 className="ratings__video-title">{video.title}</h4>
                  <p className="ratings__video-text">{video.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <VideoModal video={activeVideo} onClose={closeVideo} />
    </section>
  );
}
