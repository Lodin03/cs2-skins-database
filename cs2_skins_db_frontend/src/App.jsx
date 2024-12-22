import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import WeaponType from './components/WeaponType.jsx'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skins/:category/:type" element={<WeaponType />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
