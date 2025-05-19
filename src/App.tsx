import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpaceView from "./components/SpaceView";
import Cursos from "./components/Cursos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpaceView />} />
        <Route path="/:planet/cursos" element={<Cursos />} />
        <Route path="/:planet" element={<SpaceView />} />
      </Routes>
    </Router>
  );
}

export default App;
