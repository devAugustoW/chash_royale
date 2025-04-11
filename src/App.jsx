import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Layout from './components/Layout';
//import Home from './pages/Home';
//import Battles from './pages/Battles';
//import Cards from './pages/Cards';
//import Players from './pages/Players';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="batalhas" element={<Battles />} />
          <Route path="cartas" element={<Cards />} />
          <Route path="jogadores" element={<Players />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;