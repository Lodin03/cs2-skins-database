import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SkinCard from '../components/SkinCard';
import './Home.css';

function Home() {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/skins')
      .then(response => setSkins(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  return (
    <div className="home">
      <h1 className="title">All Skins</h1>
      <div className="skins-container">
        {skins.map(skin => (
          <SkinCard key={skin._id} skin={skin} />
        ))}
      </div>
    </div>
  );
}

export default Home;