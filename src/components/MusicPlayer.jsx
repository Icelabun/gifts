import { useMusic } from '../context/MusicContext';
import '../styles/base.css';
import '../styles/musicPlayer.css';

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    isExpanded,
    togglePlay,
    handleNext,
    handlePrevious,
    handleSeek,
    setVolume,
    setIsExpanded,
    formatTime,
    playlist,
    selectSong,
    currentSongIndex
  } = useMusic();

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`music-player ${isExpanded ? 'expanded' : ''}`}>
      {/* Minimized View */}
      <div className="music-player-minimized" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="music-info-mini">
          <div className="music-title-mini">{currentSong.title}</div>
          <div className="music-artist-mini">{currentSong.artist}</div>
        </div>
        <button 
          className="music-play-btn"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="music-player-expanded">
          <div className="music-header">
            <h3>Music</h3>
            <button 
              className="close-btn"
              onClick={() => setIsExpanded(false)}
              title="Minimize"
            >
              ✕
            </button>
          </div>

          {/* Current Song Info */}
          <div className="current-song-info">
            {currentSong.cover && (
              <img 
                src={currentSong.cover} 
                alt={currentSong.title}
                className="song-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="song-details">
              <div className="song-title">{currentSong.title}</div>
              <div className="song-artist">{currentSong.artist}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="progress-bar"
            />
          </div>

          {/* Controls */}
          <div className="music-controls">
            <button 
              onClick={handlePrevious}
              className="control-btn"
              title="Previous"
            >
              ⏮️
            </button>
            <button 
              onClick={togglePlay}
              className="control-btn play-pause-btn"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button 
              onClick={handleNext}
              className="control-btn"
              title="Next"
            >
              ⏭️
            </button>
          </div>

          {/* Volume Control */}
          <div className="volume-control">
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>

          {/* Playlist */}
          <div className="playlist-container">
            <div className="playlist-title">Playlist</div>
            <div className="playlist-songs">
              {playlist.map((song, index) => (
                <div
                  key={song.id}
                  className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
                  onClick={() => {
                    if (index !== currentSongIndex) {
                      selectSong(index);
                    }
                  }}
                >
                  <div className="playlist-item-number">{index + 1}</div>
                  <div className="playlist-item-info">
                    <div className="playlist-item-title">{song.title}</div>
                    <div className="playlist-item-artist">{song.artist}</div>
                  </div>
                  {index === currentSongIndex && isPlaying && (
                    <div className="playing-indicator">♪</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
