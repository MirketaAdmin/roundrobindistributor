import { useEffect, useRef } from 'react';
import './VideoModal.css';

const isFile = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

/**
 * Accessible video dialog (native <dialog>): Escape / backdrop / close button dismiss it,
 * focus returns to the trigger. Accepts an embeddable URL (YouTube/Vimeo embed) or a video file.
 */
export default function VideoModal({ video, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (video && !dialog.open) dialog.showModal();
    if (!video && dialog.open) dialog.close();
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [video, onClose]);

  return (
    <dialog
      ref={ref}
      className="video-modal"
      aria-label={video?.title}
      onClick={(event) => event.target === ref.current && ref.current.close()}
    >
      {video && (
        <div className="video-modal__frame">
          <button type="button" className="video-modal__close" aria-label="Close video" onClick={() => ref.current.close()}>
            <span aria-hidden="true">×</span>
          </button>
          {isFile(video.url) ? (
            <video src={video.url} controls autoPlay className="video-modal__media" />
          ) : (
            <iframe
              src={video.url}
              title={video.title}
              className="video-modal__media"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      )}
    </dialog>
  );
}
