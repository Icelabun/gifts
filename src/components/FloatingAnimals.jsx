import { useState, useEffect } from 'react';
import '../styles/base.css';
import '../styles/animations.css';
import '../styles/floatingAnimals.css';

const animals = ['🐱', '🐶', '🐼'];
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];

export default function FloatingAnimals() {
  const [animalsList, setAnimalsList] = useState([]);
  const [heartsList, setHeartsList] = useState([]);

  useEffect(() => {
    // Create initial animals
    const createAnimals = () => {
      const newAnimals = [];
      for (let i = 0; i < 8; i++) {
        const random = Math.random();
        newAnimals.push({
          id: `animal-${i}`,
          emoji: animals[Math.floor(Math.random() * animals.length)],
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 15 + Math.random() * 10,
          size: 30 + Math.random() * 20,
          drift: (random - 0.5) * 150
        });
      }
      setAnimalsList(newAnimals);
    };

    // Create continuous floating hearts
    const createHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 12; i++) {
        const random = Math.random();
        newHearts.push({
          id: `heart-${i}`,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 12 + Math.random() * 8,
          size: 20 + Math.random() * 15,
          drift: (random - 0.5) * 100
        });
      }
      setHeartsList(newHearts);
    };

    createAnimals();
    createHearts();

    // Continuously add new hearts
    const heartInterval = setInterval(() => {
      setHeartsList(prev => {
        const random = Math.random();
        const newHeart = {
          id: `heart-${Date.now()}-${Math.random()}`,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
          left: Math.random() * 100,
          delay: 0,
          duration: 12 + Math.random() * 8,
          size: 20 + Math.random() * 15,
          drift: (random - 0.5) * 100
        };
        return [...prev.slice(-11), newHeart];
      });
    }, 3000);

    // Continuously add new animals
    const animalInterval = setInterval(() => {
      setAnimalsList(prev => {
        const random = Math.random();
        const newAnimal = {
          id: `animal-${Date.now()}-${Math.random()}`,
          emoji: animals[Math.floor(Math.random() * animals.length)],
          left: Math.random() * 100,
          delay: 0,
          duration: 15 + Math.random() * 10,
          size: 30 + Math.random() * 20,
          drift: (random - 0.5) * 150
        };
        return [...prev.slice(-7), newAnimal];
      });
    }, 5000);

    return () => {
      clearInterval(heartInterval);
      clearInterval(animalInterval);
    };
  }, []);

  return (
    <div className="floating-elements-container">
      {/* Floating Animals */}
      {animalsList.map(animal => (
        <div
          key={animal.id}
          className="floating-animal"
          style={{
            position: 'fixed',
            left: `${animal.left}%`,
            bottom: '-60px',
            fontSize: `${animal.size}px`,
            animationDelay: `${animal.delay}s`,
            animationDuration: `${animal.duration}s`,
            pointerEvents: 'none',
            zIndex: 50,
            '--drift': `${animal.drift}px`
          }}
        >
          {animal.emoji}
        </div>
      ))}

      {/* Floating Hearts */}
      {heartsList.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            position: 'fixed',
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            pointerEvents: 'none',
            zIndex: 50,
            '--drift': `${heart.drift}px`
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
