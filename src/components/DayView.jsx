import { useEffect, useState } from 'react';
import '../styles/base.css';
import '../styles/animations.css';

export default function DayView({ day, onBack, onAfterDark }) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Slow reveal of text
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <div className="card fade-in">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2d3748' }}>
          {(() => {
            const [month, dayNum] = day.date.split('-').map(Number);
            const date = new Date(2024, month - 1, dayNum);
            return date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            });
          })()} — {day.title}
        </h2>
        <div 
          className={`day-text ${textVisible ? 'text-reveal' : ''}`}
          style={{ opacity: textVisible ? 1 : 0 }}
        >
          {day.text}
        </div>
        <div className="nav-buttons">
          {onAfterDark && (
            <button onClick={onAfterDark} style={{ marginRight: '1rem' }}>
              Continue...
            </button>
          )}
          <button onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
