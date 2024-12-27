import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu.jsx';
import navbarLinks from '../constants/navbarLinks.js';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="home-link">
        <h1>CS2 Skins</h1> 
      </Link>
      <ul className="nav-links">
        <li>Cases<DropdownMenu routeType="case" items={navbarLinks.cases} /></li>
        <li>Pistols<DropdownMenu routeType="Pistol" items={navbarLinks.pistols} /></li>
        <li>Mid-Tier<DropdownMenu routeType="Mid-Tier" items={navbarLinks.midTier} /></li>
        <li>Rifles<DropdownMenu routeType="Rifle" items={navbarLinks.rifles} /></li>
        <li>Knives<DropdownMenu routeType="Knife" items={navbarLinks.knives} /></li>
        <li>Gloves<DropdownMenu routeType="Gloves" items={navbarLinks.gloves} /></li>
        <li>Rarity<DropdownMenu routeType="rarity" items={navbarLinks.rarity} /></li>
        <li>Collections<DropdownMenu routeType="collection" items={navbarLinks.collections} /></li>
      </ul>
    </nav>
  );
}

export default NavBar;
