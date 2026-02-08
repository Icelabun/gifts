import { useState, useEffect } from 'react';
import { valentinesWeek } from '../data/valentinesWeek';
import '../styles/base.css';
import '../styles/animations.css';

export default function Finale({ onBack }) {
  const [stage, setStage] = useState(0); // 0: love letter, 1: gift reveal, 2: quiz, 3: final line
  const [hearts, setHearts] = useState([]);
  const [fireworksTriggered, setFireworksTriggered] = useState(false);

  const valentinesDay = valentinesWeek.find(day => day.date === '02-14');

  useEffect(() => {
    if (stage === 0 && !fireworksTriggered) {
      // Trigger fireworks once
      setFireworksTriggered(true);
      createHearts();
      // Trigger fireworks after a brief delay
      setTimeout(() => {
        createFireworks();
      }, 500);
    }
  }, [stage, fireworksTriggered]);

  const createHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 4
      });
    }
    setHearts(newHearts);
  };

  const createFireworks = () => {
    // Create multiple firework bursts
    const colors = ['#ff6b9d', '#ffc93c', '#ff9ff3', '#54e346', '#4ecdc4', '#ffe66d'];
    const bursts = 3;
    
    for (let burst = 0; burst < bursts; burst++) {
      setTimeout(() => {
        const centerX = 50 + (Math.random() - 0.5) * 20;
        const centerY = 30 + (Math.random() - 0.5) * 20;
        
        for (let i = 0; i < 24; i++) {
          const particle = document.createElement('div');
          const rotation = i * 15;
          const color = colors[Math.floor(Math.random() * colors.length)];
          particle.className = 'firework-particle';
          particle.style.cssText = `
            position: fixed;
            top: ${centerY}%;
            left: ${centerX}%;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            --rotation: ${rotation}deg;
            transform: rotate(${rotation}deg) translateY(0);
            animation: firework 1.5s ease-out forwards;
          `;
          document.body.appendChild(particle);
          
          setTimeout(() => {
            if (particle.parentNode) {
              particle.remove();
            }
          }, 1500);
        }
      }, burst * 400);
    }
  };

  const handleContinue = () => {
    setStage(stage + 1);
  };

  if (stage === 0) {
    // Main Love Letter
    return (
      <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Floating Hearts */}
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart-float"
            style={{
              position: 'absolute',
              left: `${heart.left}%`,
              bottom: '-50px',
              fontSize: '2rem',
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            ❤️
          </div>
        ))}
        

        <div className="card glow fade-in" style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2d3748' }}>
            February 14 — Valentine's Day
          </h2>
          <div className="day-text text-reveal">
            {valentinesDay.text}
          </div>
          <div className="nav-buttons">
            <button onClick={handleContinue}>Continue...</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 1) {
    // Gift Reveal
    return (
      <div className="app-container fade-in">
        <div className="card">
          <div className="day-text text-reveal">
            "This is small compared to how I feel.
But it's real.
And it's yours."
          </div>
          <div className="nav-buttons">
            <button onClick={handleContinue}>Continue...</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 2) {
    // Interactive Moment (Quiz Ending Line)
    return (
      <div className="app-container fade-in">
        <div className="card">
          <div className="day-text text-reveal">
            "Turns out…
You already knew all the answers.
So did I."
          </div>
          <div className="nav-buttons">
            <button onClick={handleContinue}>Continue...</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 3) {
    // Final Line - no animation, no sound, centered, nothing after
    return (
      <div 
        className="app-container" 
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div 
          style={{
            fontSize: '1.8rem',
            color: '#fff',
            textAlign: 'center',
            fontStyle: 'italic',
            lineHeight: '1.6'
          }}
        >
          This is me choosing you.
        </div>
      </div>
    );
  }

  return null;
}
