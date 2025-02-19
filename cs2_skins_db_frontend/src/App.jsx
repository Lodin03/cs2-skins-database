import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import SkinList from './pages/SkinList.jsx';
import DetailedSkin from './pages/DetailedSkin.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skins/:filterType/:filterValue" element={<SkinList />} />
          <Route path="/skins/:skinId" element={<DetailedSkin />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
