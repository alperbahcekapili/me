import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PortfolioGrid from './components/PortfolioGrid';
import Presentation from './components/Presentation';
import AtilimPresentation from './components/AtilimPresentation';
import BlogPost from './components/BlogPost';
import Writings from './components/Writings';
import WritingDetail from './components/WritingDetail';
import './App.css';

const MainPortfolio = () => {
  return (
    <div className="main-portfolio-layout">
      {/* Top 40% Hero: Photo, Bio, Greetings & Socials */}
      <Home />


      {/* Bottom 60% Grid Dashboard: Companies, Academic, Projects, Blogs, Talks, Books, Photos */}
      <PortfolioGrid />

      {/* Footer */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Alper Bahçekapılı • Built with React & Vite</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/atilim-ieee" element={<AtilimPresentation />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/writings/:slug" element={<WritingDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
