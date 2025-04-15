import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Battles from './pages/Battles/Battles';
import Cards from './pages/Cards/Cards';
import PopularCards from './pages/Cards/PopularCards';
import LessPopularCards from './pages/Cards/LessPopularCards';
import TopDecks from './pages/Cards/TopDecks';
import CardTrophies from './pages/Cards/CardTrophies';
import ComboLoss from './pages/Cards/ComboLoss';
import ComboNCards from './pages/Cards/ComboNCards';
import Players from './pages/Players/Players';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="batalhas" element={<Battles />} />
          <Route path="cartas" element={<Cards />} />
          <Route path="cartas/populares" element={<PopularCards />} />
          <Route path="cartas/menos-populares" element={<LessPopularCards />} />
          <Route path="cartas/decks" element={<TopDecks />} />
          <Route path="cartas/trofeus" element={<CardTrophies />} />
          <Route path="cartas/combos-perdedores" element={<ComboLoss />} />
          <Route path="cartas/combo-n-cartas" element={<ComboNCards />} />
          <Route path="jogadores" element={<Players />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;