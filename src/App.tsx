import SpaceView from './components/SpaceView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cursos from './components/Cursos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpaceView />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </Router>
  );
}

export default App;
