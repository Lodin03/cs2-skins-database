import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SkinCard from '../components/SkinCard.jsx';
import rarityOrder from '../constants/rarityOrder.js'
import '../components/SkinCard.jsx';

const SkinList = () => {
  const { filterType, filterValue } = useParams(); // Get the filter type and value from the URL parameters
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        // Adjust API endpoint based on the filter type
        const response = await axios.get(`http://localhost:5000/skins/${filterType}/${filterValue}`);
        // Sort the skins based on rarityOrder
        const sortedSkins = response.data.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
        setSkins(sortedSkins);
      } catch (error) {
        console.error('Error fetching skins:', error);
      }
    };
    fetchSkins();
  }, [filterType, filterValue]);

  return (
    <div className="home">
      <h1 className="title">{filterValue} Skins</h1>
      <div className="skins-container">
        {skins.length > 0 ? (
          skins.map((skin) => <SkinCard key={skin._id} skin={skin} />)
        ) : (
          <p>No skins found for {filterValue}.</p>
        )}
      </div>
    </div>
  );
};

export default SkinList;
