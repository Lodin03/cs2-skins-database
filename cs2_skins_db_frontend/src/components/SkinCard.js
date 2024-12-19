import React from 'react';
import './SkinCard.css';

function SkinCard({ skin }) {
  return (
    <div className="skin-card">
      <h2>{skin.name}</h2>
      <img src={skin.imageUrl} alt={skin.name} />
      <p><b>Rarity:</b> {skin.rarity}</p>
      <p><b>Collection:</b> {skin.collection}</p>
      <p><b>Float Cap:</b> {skin.floatCap.min.toFixed(2)} to {skin.floatCap.max.toFixed(2)}</p>
      <p><b>Date Added:</b> {skin.dateAdded}</p>
    </div>
  );
}

export default SkinCard;
