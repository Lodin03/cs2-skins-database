import React from 'react';
import './SkinCard.css';
import rarityColors from '../constants/rarityColors';
import { Link } from 'react-router-dom';

function SkinCard({ skin }) {  
  const borderColor = rarityColors[skin.rarity]

  let caseImg;
  try {
    // Cases including whitespace or ":" gets changed to -, to align with .png file
    caseImg = require(`../images/${skin.collection.split(' ').join('-').split(':').join('-')}.png`);
  } catch (error) {
    console.error(`Image for collection ${skin.collection} not found. Using default image.`);
    caseImg = "Image not found"; // Fallback to default image
  }

  return (
    <div className="skin-card">
      <Link to={`/skins/${skin._id}`} className="skin-card-link">
        <h2>{skin.name}</h2>
        <p className="rarity-tag" style={{ border: `0.25rem solid ${borderColor}`, backgroundColor: `${borderColor}`}}>{skin.rarity}</p>
        <img src={skin.imageUrl} alt={skin.name} />
        <p className="case-img"><img src={caseImg} alt={"Collection name" + skin.collection}/> {skin.collection}</p>
      </Link>
    </div>
  );
}

export default SkinCard;
