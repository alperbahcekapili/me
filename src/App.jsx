import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ExperienceCircle from './components/ExperienceCircle';
import Showcase from './components/Showcase';
import Presentation from './components/Presentation';
import './App.css'; // Keep if we have app specific globals or overrides

const MainPortfolio = () => {
  return (
    <div className="snap-container">
      <section id="home">
        <Home />
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="arrow">↓</div>
        </div>
      </section>

      <section id="experience">
        <ExperienceCircle />
      </section>

      <section id="showcase">
        <Showcase />
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/presentation" element={<Presentation />} />
      </Routes>
    </Router>
  );
}

export default App;
