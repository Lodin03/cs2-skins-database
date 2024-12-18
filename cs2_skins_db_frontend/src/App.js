import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/skins')
      .then(response => setSkins(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  return (
    <div className="App">
      <h1>CS2 Skins</h1>
      <div className="skins-container">
        {skins.map(skin => (
          <div key={skin._id} className="skin-card">
            <h2>{skin.name}</h2>
            <img src={skin.imageUrl} alt={skin.name} />
            <p><b>Float Cap:</b> {skin.floatCap.min.toFixed(2)} to {skin.floatCap.max.toFixed(2)}</p>
            <p><b>Rarity:</b> {skin.rarity}</p>
            <p><b>Collection:</b> {skin.collection}</p>
            <p><b>Date Added:</b> {skin.dateAdded}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
