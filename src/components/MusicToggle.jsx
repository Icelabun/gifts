import { useState, useEffect, useRef } from 'react';
import '../styles/base.css';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!window.AudioContext && !window.webkitAudioContext) {
      // Browser doesn't support Web Audio API
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      let oscillator = null;
      let gainNode = null;

      if (isPlaying) {
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3 note
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        
        audioRef.current = { oscillator, gainNode, audioContext };
      } else if (audioRef.current) {
        // Fade out
        const { gainNode, oscillator, audioContext } = audioRef.current;
        const currentTime = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + 3);
        
        setTimeout(() => {
          try {
            oscillator.stop();
            audioContext.close();
          } catch (e) {
            // Ignore errors on cleanup
          }
          audioRef.current = null;
        }, 3000);
      }

      return () => {
        if (audioRef.current && !isPlaying) {
          try {
            audioRef.current.oscillator.stop();
            audioRef.current.audioContext.close();
          } catch (e) {
            // Ignore errors on cleanup
          }
        }
      };
    } catch (error) {
      // Silently fail if audio can't be initialized
      console.warn('Audio initialization failed:', error);
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-toggle">
      <button onClick={toggleMusic} title={isPlaying ? 'Pause music' : 'Play music'}>
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
