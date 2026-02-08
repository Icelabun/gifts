import '../styles/base.css';
import '../styles/animations.css';
import '../styles/afterDark.css';

export default function AfterDark({ onBack }) {
  return (
    <div className="after-dark-container">
      <div className="after-dark-content">
        <div className="after-dark-text">
          <p>This part is quieter.</p>
          <p>Slower.</p>
          <p>A little closer.</p>
          <p style={{ marginTop: '2rem' }}>I like the way you make me forget everything else.</p>
          <p>And I like that you know it.</p>
        </div>
        <div className="after-dark-back">
          <button onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
