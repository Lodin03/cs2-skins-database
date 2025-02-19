import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailedSkin.css';
import rarityColors from '../constants/rarityColors';

const DetailedSkin = () => {
  const { skinId } = useParams();
  const [skin, setSkin] = useState(null);

  useEffect(() => {
    const fetchSkinDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/skins/${skinId}`);
        setSkin(response.data);
      } catch (error) {
        console.error('Error fetching skin details:', error);
      }
    };

    fetchSkinDetails();
  }, [skinId]);

  // Ensure skin is loaded before accessing its properties
  if (!skin) return <div>Loading...</div>;

  const borderColor = rarityColors[skin.rarity]; 

  let caseImg;
  try {
    caseImg = require(`../images/${skin.collection.split(' ').join('-').split(':').join('-')}.png`);
  } catch (error) {
    console.error(`Image for collection ${skin.collection} not found. Using default image.`);
    caseImg = null; // Handle missing case image
  }


  return (
    <div className="detailed-skin" style={{ border: `0.25rem solid white` }}>
      <h1>{skin.name}</h1>
      <p className="rarity" style={{ backgroundColor: borderColor }}>
        {skin.rarity}
      </p>
      <img className="skin-image" src={skin.imageUrl} alt={skin.name} />

      <div className="case-info">
        {caseImg ? <img className="case-image" src={caseImg} alt={skin.collection} /> : <p>No Case Image</p>}
        <p className="case-name"><b>Case:</b> {skin.collection}</p>
      </div>

      <div className="separator"></div>

      <div className="skin-info">
        <p className="float-cap"><b>Float Cap:</b> {skin.floatCap.min.toFixed(2)} - {skin.floatCap.max.toFixed(2)}</p>
        <p><b>Description:</b> {skin.description}</p>
        <p><b>Finish Style:</b> {skin.finishStyle}</p>
        <p><b>Finish Catalog:</b> {skin.finishCatalog}</p>
        <p><b>Added:</b> {skin.dateAdded}</p>
        <p><b>Update:</b> {skin.update}</p>
      </div>

    </div>
  );
};

export default DetailedSkin;
