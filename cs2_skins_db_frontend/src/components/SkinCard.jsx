import React from 'react';
import './SkinCard.css';

function SkinCard({ skin }) {

  const rarityColors = {
    'Extraordinary': '#EB4B4B',
    'Contraband': '#E4AE39',
    'Covert': '#EB4B4B',
    'Classified': '#D32CE6',
    'Restricted': '#8847FF',
    'Mil-Spec': '#4B69FF',
    'Industrial Grade': '#5E98D9',
    'Consumer Grade': '#B0C3D9',
  };
  
  const borderColor = rarityColors[skin.rarity]

  let caseImg;
  try {
    caseImg = require(`../images/${skin.collection.split(' ').join('-')}.png`);
  } catch (error) {
    console.error(`Image for collection ${skin.collection} not found. Using default image.`);
    caseImg = "Image not found"; // Fallback to default image
  }

  return (
    <div className="skin-card">
      <h2>{skin.name}</h2>
      <p className="rarity-tag" style={{ border: `0.25rem solid ${borderColor}`, backgroundColor: `${borderColor}`}}>{skin.rarity}</p>
      <img src={skin.imageUrl} alt={skin.name} />
      <p className="case-img"><img src={caseImg} alt={"Collection name" + skin.collection}/> {skin.collection}</p>
    </div>
  );
}

export default SkinCard;
