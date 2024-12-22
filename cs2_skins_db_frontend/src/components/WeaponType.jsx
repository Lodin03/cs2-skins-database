import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkinCard from '../components/SkinCard.jsx';
import './SkinCard.css'; 

const WeaponTypeList = () => {
  const { category, type } = useParams(); // Get weapon type from the URL parameter
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    console.log(`Category: ${category}, Type: ${type}`);
    const fetchSkins = async () => {
      try {
        const response = await fetch(`http://localhost:5000/skins/${category}/${type}`);
        const data = await response.json();
        setSkins(data);
      } catch (error) {
        console.error('Error fetching skins:', error);
      }
    };
    fetchSkins();
  }, [category, type]);

  return (
    <div className="home"> {/* Reuse the styling from SkinCard.css */}
      <h1 className="title">{type} Skins</h1>
      <div className="skins-container">
        {skins.length > 0 ? (
          skins.map((skin) => (
            <SkinCard key={skin._id} skin={skin} />
          ))
        ) : (
          <p>No skins found for {type}.</p>
        )}
      </div>
    </div>
  );
};

export default WeaponTypeList;
