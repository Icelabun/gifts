import { useState, useRef } from 'react';
import { isFebruary14 } from '../../utils/dateUtils';
import '../../styles/base.css';
import '../../styles/animations.css';
import '../../styles/videoMessage.css';

export default function VideoMessage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const isFeb14 = isFebruary14();

  // Don't render anything if it's not February 14
  if (!isFeb14) {
    return null;
  }

  const handlePlay = () => {
    setShowVideo(true);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.warn('Video play failed:', e);
      });
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="video-message-container">
      {!showVideo ? (
        <div className="video-preview" onClick={handlePlay}>
          <div className="video-preview-content">
            <div className="play-button">▶️</div>
            <div className="video-preview-text">
              <h3>A Message for You</h3>
              <p>Click to play</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="video-player"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/video/me.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button 
            className="video-close-btn"
            onClick={() => {
              setShowVideo(false);
              setIsPlaying(false);
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            }}
            title="Close video"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
