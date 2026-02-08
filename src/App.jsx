import DateGate from './components/DateGate';
import MusicPlayer from './components/MusicPlayer';
import VideoMessage from './components/video/VideoMessage';
import FloatingAnimals from './components/FloatingAnimals';
import { MusicProvider } from './context/MusicContext';
import './styles/base.css';
import './styles/animations.css';

function App() {
  return (
    <MusicProvider>
      <FloatingAnimals />
      <DateGate />
      <MusicPlayer />
      <VideoMessage />
    </MusicProvider>
  );
}

export default App;
