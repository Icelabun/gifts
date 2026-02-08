import { useState } from 'react';
import { valentinesWeek } from '../data/valentinesWeek';
import { isUnlocked, getTodayMMDD } from '../utils/dateUtils';
import DayView from './DayView';
import AfterDark from './AfterDark';
import Finale from './Finale';
import '../styles/base.css';
import '../styles/animations.css';

export default function DayCard() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAfterDark, setShowAfterDark] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const today = getTodayMMDD();

  const handleDayClick = (day) => {
    if (!isUnlocked(day.date)) return;
    
    if (day.date === '02-14') {
      setShowFinale(true);
    } else if (day.date === '02-13') {
      setSelectedDay(day);
    } else {
      setSelectedDay(day);
    }
  };

  const handleAfterDarkClick = () => {
    setShowAfterDark(true);
  };

  const handleBack = () => {
    setSelectedDay(null);
    setShowAfterDark(false);
    setShowFinale(false);
  };

  if (showFinale) {
    return <Finale onBack={handleBack} />;
  }

  if (showAfterDark) {
    return <AfterDark onBack={handleBack} />;
  }

  if (selectedDay) {
    return (
      <DayView 
        day={selectedDay} 
        onBack={handleBack}
        onAfterDark={selectedDay.date === '02-13' ? handleAfterDarkClick : null}
      />
    );
  }

  return (
    <div className="app-container fade-in">
      <h1 style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>
        Valentine's Week
      </h1>
      <div className="days-grid">
        {valentinesWeek.map((day) => {
          const unlocked = isUnlocked(day.date);
          const isToday = day.date === today;
          
          return (
            <div
              key={day.date}
              className={`day-card ${unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="day-card-title">
                {day.title}
                {isToday && unlocked && (
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#e53e3e' }}>
                    ●
                  </span>
                )}
              </div>
              <div className="day-card-date">
                {(() => {
                  const [month, dayNum] = day.date.split('-').map(Number);
                  const date = new Date(2024, month - 1, dayNum);
                  return date.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  });
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
