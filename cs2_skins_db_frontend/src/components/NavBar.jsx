import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu.jsx';
import './NavBar.css';

function NavBar() {
  // Define the items for each dropdown menu
  const [cases] = useState(['Chroma Case', 'Chroma 2 Case', 'Chroma 3 Case', 'Clutch Case', 'CS20 Case', 'CS:GO Weapon Case', 'CS:GO Weapon Case 2', 'CS:GO Weapon Case 3', 'Danger Zone Case', 'Dreams & Nightmares Case', 'eSports 2013 Case', 'eSports 2013 Winter Case', 'eSports 2014 Summer Case', 'Falchion Case', 'Fracture Case', 'Gallery Case', 'Gamma 2 Case', 'Gamma Case', 'Glove Case', 'Horizon Case', 'Huntsman Weapon Case', 'Kilowatt Case', 'Operation Bravo Case', 'Operation Breakout Weapon Case', 'Operation Broken Fang Case', 'Operation Hydra Case', 'Operation Phoenix Weapon Case', 'Operation Riptide Case', 'Operation Vanguard Weapon Case', 'Operation Wildfire Case', 'Prisma 2 Case', 'Prisma Case', 'Recoil Case', 'Revolution Case', 'Revolver Case', 'Shadow Case', 'Shattered Web Case', 'Snakebite Case', 'Spectrum 2 Case', 'Spectrum Case', 'Winter Offensive Weapon Case']);
  const [pistols] = useState(['USP-S', 'P2000', 'Glock-18', 'P250', 'Dual Berettas', 'Five-Seven', 'Tec-9', 'CZ-75', 'Desert Eagle', 'R8 Revolver', 'Zeus x27']);
  const [midTier] = useState(['MAC-10', 'Nova', 'UMP-45', 'Sawed-Off', 'MP9', 'PP-Bizon', 'MP5-SD', 'MP7', 'Negev', 'MAG-7', 'XM1014', 'P90', 'M249']);
  const [rifles] = useState(['SSG 08', 'FAMAS', 'Galil AR', 'M4A1-S', 'M4A4', 'AK-47', 'AUG', 'SG 553', 'AWP', 'SCAR-20', 'G3SG1']);
  const [knives] = useState(['★ Bayonet', '★ Bowie Knife', '★ Butterfly Knife', '★ Classic Knife', '★ Falchion Knife', '★ Flip Knife', '★ Gut Knife', '★ Huntsman Knife', '★ Karambit', '★ Kukri Knife', '★ M9 Bayonet', '★ Navaja Knife', '★ Nomad Knife', '★ Paracord Knife', '★ Shadow Daggers', '★ Skeleton Knife', '★ Stiletto Knife', '★ Survival Knife', '★ Talon Knife', '★ Ursus Knife']);
  const [gloves] = useState(['All Gloves', '★ Bloodhound Gloves', '★ Broken Fang Gloves', '★ Driver Gloves', '★ Hand Wraps', '★ Hydra Gloves', '★ Moto Gloves', '★ Specialist Gloves', '★ Sport Gloves']);
  const [rarity] = useState(['Contraband', 'Covert', 'Classified', 'Restricted', 'Mil-Spec', 'Industrial Grade', 'Consumer Grade'])

  return (
    <nav className="navbar">
      <h1>CS2 Skins</h1>
      <ul className="nav-links">
        <li>Cases<DropdownMenu items={cases} /></li>
        <li>Pistols<DropdownMenu items={pistols} /></li>
        <li>Mid-Tier<DropdownMenu items={midTier} /></li>
        <li>Rifles<DropdownMenu items={rifles} /></li>
        <li>Knives<DropdownMenu items={knives} /></li>
        <li>Gloves<DropdownMenu items={gloves} /></li>
        <li>Rarity<DropdownMenu items={rarity} /></li>
      </ul>
    </nav>
  );
}

export default NavBar;
