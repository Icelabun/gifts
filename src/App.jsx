import DateGate from './components/DateGate';
import MusicPlayer from './components/MusicPlayer';
import VideoMessage from './components/video/VideoMessage';
import { MusicProvider } from './context/MusicContext';
import './styles/base.css';
import './styles/animations.css';

function App() {
  return (
    <MusicProvider>
      <DateGate />
      <MusicPlayer />
      <VideoMessage />
    </MusicProvider>
  );
}

export default App;
