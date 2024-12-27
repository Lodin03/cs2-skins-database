import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import SkinList from './pages/SkinList.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skins/:filterType/:filterValue" element={<SkinList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
