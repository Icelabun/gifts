import { useState, useEffect } from 'react';
import { getCountdownToFeb7 } from '../utils/dateUtils';
import '../styles/base.css';
import '../styles/animations.css';

export default function Countdown() {
  const [countdown, setCountdown] = useState(getCountdownToFeb7());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownToFeb7());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container fade-in">
      <h1 className="countdown-title">Valentine's Week</h1>
      <div className="countdown-display">
        <div className="countdown-unit">
          <div className="countdown-value">{countdown.days}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-value">{countdown.hours}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-value">{countdown.minutes}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-value">{countdown.seconds}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
      <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', marginTop: '2rem' }}>
        Something beautiful is waiting for you...
      </p>
    </div>
  );
}
