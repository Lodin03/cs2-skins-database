import React from 'react';
import './SkinCard.css';

function SkinCard({ skin }) {

  const rarityColors = {
    'Contraband': '#E4AE39',
    'Covert': '#EB4B4B',
    'Classified': '#D32CE6',
    'Restricted': '#8847FF',
    'Mil-Spec': '#4B69FF',
    'Industrial Grade': '#5E98D9',
    'Consumer Grade': '#B0C3D9',
  };

  const borderColor = rarityColors[skin.rarity]
  return (
    <div className="skin-card">
      <h2>{skin.name}</h2>
      <p className="rarity-tag" style={{ border: `2px solid ${borderColor}`, backgroundColor: `${borderColor}`, color: "white"}}>{skin.rarity}</p>
      <img src={skin.imageUrl} alt={skin.name} />
      <p>{skin.collection}</p>
    </div>
  );
}

export default SkinCard;
